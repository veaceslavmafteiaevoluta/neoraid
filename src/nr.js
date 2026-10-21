// Neoraid: activates the theme layer and adds the light/dark switch.
// Runs in <head>, so the saved mode is applied before the first paint.
(function () {
  var root = document.documentElement;
  var KEY = 'nr-mode';
  root.classList.add('nr');

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(mode) {
    try {
      if (mode) localStorage.setItem(KEY, mode); else localStorage.removeItem(KEY);
    } catch (e) { /* private mode: the switch still works for this page */ }
  }

  // Options from Settings > Neoraid, printed by Neoraid.page
  var DEFAULT_ACCENT = '#ff8c2f';
  var cfg = window.nrConfig || {};

  // Accent text must stay readable (WCAG 4.5:1) on the darkest light surface
  // (--nr-surface-3) and the lightest dark one: start from 72% of the accent
  // mixed with black or white, and add more black or white while needed.
  function luminance(rgb) {
    var c = rgb.map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function textPct(accent, other, surface) {
    var a = [1, 3, 5].map(function (i) { return parseInt(accent.substr(i, 2), 16); });
    var s = luminance(surface);
    for (var pct = 72; pct > 20; pct -= 2) {
      var l = luminance(a.map(function (v, i) { return v * pct / 100 + other[i] * (1 - pct / 100); }));
      if ((Math.max(l, s) + 0.05) / (Math.min(l, s) + 0.05) >= 4.5) break;
    }
    return pct;
  }

  // Hue (degrees) and HSL saturation of a #rrggbb colour
  function hueSat(hex) {
    var c = [1, 3, 5].map(function (i) { return parseInt(hex.substr(i, 2), 16) / 255; });
    var max = Math.max.apply(null, c), min = Math.min.apply(null, c), d = max - min;
    var l = (max + min) / 2, h = 0;
    if (d) {
      if (max === c[0]) h = ((c[1] - c[2]) / d + 6) % 6;
      else if (max === c[1]) h = (c[2] - c[0]) / d + 2;
      else h = (c[0] - c[1]) / d + 4;
    }
    return [h * 60, d ? d / (1 - Math.abs(2 * l - 1)) : 0];
  }
  // The orange logos (UNRAID wordmark, Plugins list icon) follow the accent:
  // rotate their hue by the distance from the stock orange, scale saturation
  function logoFilter(accent) {
    var from = hueSat(DEFAULT_ACCENT), to = hueSat(accent);
    var sat = Math.min(1.2, to[1] / from[1]);
    return 'hue-rotate(' + Math.round(to[0] - from[0]) + 'deg) saturate(' + sat.toFixed(2) + ')';
  }

  // A custom accent recolours every token derived from the brand orange
  function accentCss(accent) {
    if (!/^#[0-9a-f]{6}$/i.test(accent || '') || accent.toLowerCase() === DEFAULT_ACCENT) return '';
    var mix = function (pct, other) { return 'color-mix(in srgb, ' + accent + ' ' + pct + '%, ' + other + ')'; };
    var dark = 'html.nr.Theme--black:not(.nr-light), html.nr.Theme--gray:not(.nr-light), html.nr.nr-dark';
    return 'html.nr {' +
      '--nr-accent: ' + accent + ';' +
      '--nr-logo-filter: ' + logoFilter(accent) + ';' +
      '--nr-accent-text: ' + mix(textPct(accent, [0, 0, 0], [239, 238, 236]), '#000') + ';' +
      '--nr-accent-soft: ' + mix(12, 'transparent') + ';' +
      '--nr-focus-ring: 0 0 0 3px ' + mix(32, 'transparent') + ';' +
      '--nr-brand-gradient: linear-gradient(90deg, ' + mix(70, '#000') + ', ' + accent + ');' +
      '--nr-primary-gradient: linear-gradient(180deg, ' + mix(92, '#fff') + ', ' + mix(86, '#000') + ');' +
      '}' + dark + ' {' +
      '--nr-accent-text: ' + mix(textPct(accent, [255, 255, 255], [42, 41, 39]), '#fff') + ';' +
      '--nr-accent-soft: ' + mix(14, 'transparent') + ';' +
      '--nr-focus-ring: 0 0 0 3px ' + mix(38, 'transparent') + ';' +
      '}';
  }
  function applyConfig() {
    ['density', 'radius', 'font', 'switch'].forEach(function (key) {
      if (cfg[key]) root.setAttribute('data-nr-' + key, cfg[key]); else root.removeAttribute('data-nr-' + key);
    });
    var css = accentCss(cfg.accent);
    var style = document.getElementById('nr-accent');
    if (!css) { if (style) style.parentNode.removeChild(style); return; }
    if (!style) {
      style = document.createElement('style');
      style.id = 'nr-accent';
      (document.head || root).appendChild(style);
    }
    style.textContent = css;
  }
  applyConfig();

  // The Unraid theme picked in Display Settings decides the default,
  // unless the plugin settings pin a mode for every browser
  function stockIsDark() {
    return root.classList.contains('Theme--black') || root.classList.contains('Theme--gray');
  }
  function pinnedMode() {
    return cfg.mode === 'dark' || cfg.mode === 'light' ? cfg.mode : null;
  }
  function defaultIsDark() {
    var pinned = pinnedMode();
    return pinned ? pinned === 'dark' : stockIsDark();
  }
  function isDark() {
    if (root.classList.contains('nr-dark')) return true;
    if (root.classList.contains('nr-light')) return false;
    return stockIsDark();
  }
  // mode: this browser's choice from the switch, or null to use the default
  function apply(mode) {
    mode = mode || pinnedMode();
    root.classList.remove('nr-dark', 'nr-light');
    if (mode === 'dark' || mode === 'light') root.classList.add('nr-' + mode);
  }

  // The Vue components (header, notifications, modals) use Tailwind's `.dark`
  // class on <html>, <body> and every .unapi scope, plus --theme-dark-mode,
  // all set from the server theme. Keep them in step with the switch.
  function syncVue() {
    var dark = isDark();
    var flag = dark ? '1' : '0';
    if (root.style.getPropertyValue('--theme-dark-mode') !== flag) root.style.setProperty('--theme-dark-mode', flag);
    var scopes = [root, document.body].concat(Array.prototype.slice.call(document.querySelectorAll('.unapi')));
    scopes.forEach(function (el) {
      if (el && el.classList.contains('dark') !== dark) el.classList.toggle('dark', dark);
    });
  }

  // Vue mounts late and re-applies the server theme, so watch for it. Only
  // mutations that can touch a scope trigger a sync: the Dashboard rewrites
  // its tables every second, so added nodes count only when they bring a new
  // .unapi scope. Our own writes settle after one pass because syncVue only
  // changes what differs.
  function hasScope(node) {
    return node.nodeType === 1 && (node.classList.contains('unapi') || !!node.querySelector('.unapi'));
  }
  function relevant(record) {
    var t = record.target;
    if (t === root || t === document.body) return true;
    if (record.type === 'childList') {
      for (var i = 0; i < record.addedNodes.length; i++) if (hasScope(record.addedNodes[i])) return true;
      return false;
    }
    return t.classList && t.classList.contains('unapi');
  }
  // The array usage pill prints its value inside the fill, which is too narrow
  // to hold it; mirror it to an attribute the stylesheet centres on the pill.
  function syncUsage() {
    document.querySelectorAll('#menu .usage-bar').forEach(function (bar) {
      var label = bar.textContent.trim();
      if (bar.getAttribute('data-nr-label') !== label) bar.setAttribute('data-nr-label', label);
    });
  }

  // Dashboard rows are blocks in the theme; jQuery's show() writes back an
  // inline `display: table-row`, which shrinks the row (and the CPU chart).
  // Rows like #cpu_chart are hidden by default, so keep an inline value.
  function fixRow(el) {
    if (el.tagName === 'TR' && el.style.display === 'table-row' && el.closest('table.dashboard')) el.style.display = 'block';
  }

  new MutationObserver(function (records) {
    var vue = false, usage = false;
    for (var i = 0; i < records.length; i++) {
      var t = records[i].target;
      if (!vue && relevant(records[i])) vue = true;
      if (t.nodeType === 1) {
        if (!usage && t.closest('#menu .usage-bar')) usage = true;
        if (records[i].attributeName === 'style') fixRow(t);
      }
    }
    if (vue) syncVue();
    if (usage) syncUsage();
  }).observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'style'] });

  apply(read());
  syncVue();

  // Dashboard charts. The pies take their "used"/"free" colours from the
  // global `colors` array and the CPU/network lines are SmoothieCharts with
  // grid and label colours printed by DashStats.page for the stock theme.
  // Point both at the theme tokens; Smoothie reads its options every frame.
  function token(css, name) {
    return css.getPropertyValue(name).trim();
  }
  // RAM segment colours: distinct hues that sit well next to the accent in
  // both modes, instead of the stock brown/yellow/salmon
  var SEGMENTS = ['#3b82f6', '#14b8a6', '#a855f7', '#ec4899', '#eab308', '#22c55e', '#06b6d4', '#f43f5e', '#6366f1', '#84cc16'];

  // Inline styles read back as rgb(), so compare colours in that form
  var probe = document.createElement('i');
  function normal(colour) {
    probe.style.color = '';
    probe.style.color = colour;
    return probe.style.color || colour;
  }
  function swapColours(el, prop, from, to) {
    var value = el.style[prop];
    if (!value) return;
    for (var i = 0; i < from.length; i++) {
      var a = normal(from[i]), b = normal(to[i]);
      if (a !== b) value = value.split(a).join(b);
    }
    if (value !== el.style[prop]) el.style[prop] = value;
  }
  function syncCharts() {
    var css = getComputedStyle(root);
    var used = token(css, '--nr-accent');
    var free = token(css, '--nr-surface-3');
    if (Array.isArray(window.colors) && window.colors.length > 1 && used && free) {
      // colors[0] used, [1] free, [2..] the RAM segments (VM, ZFS, Docker, ...)
      var after = [used, free].concat(SEGMENTS).slice(0, window.colors.length);
      var before = window.colors.slice(0, after.length);
      for (var c = 0; c < after.length; c++) window.colors[c] = after[c];
      // Repaint what is on screen now instead of waiting for the next update
      document.querySelectorAll('.pie').forEach(function (el) { swapColours(el, 'background', before, after); });
      document.querySelectorAll('#dynamic .fa-circle').forEach(function (el) { swapColours(el, 'color', before, after); });
    }
    [window.cpuchart, window.netchart].forEach(function (chart) {
      if (!chart || !chart.options || !chart.options.grid || !chart.options.labels) return;
      var o = chart.options;
      // Horizontal guides only, smooth curves, headroom so peaks are not cut
      o.grid.strokeStyle = token(css, '--nr-border');
      o.grid.millisPerLine = 0;
      o.grid.borderVisible = false;
      o.interpolation = 'bezier';
      o.maxValueScale = 1.12;
      o.labels.fillStyle = token(css, '--nr-muted');
      o.labels.fontFamily = token(css, '--nr-font') || o.labels.fontFamily;
      (chart.seriesSet || []).forEach(function (series, i) {
        // CPU load and network outbound draw in the accent colour
        if (i === (chart === window.cpuchart ? 0 : 1)) series.options.strokeStyle = used;
        var line = normal(series.options.strokeStyle);
        series.options.lineWidth = 2;
        // Soft area under the line: the stroke colour at low opacity
        if (/^rgb\(/.test(line)) series.options.fillStyle = line.replace('rgb(', 'rgba(').replace(')', ', .12)');
      });
    });
  }

  var refreshSwitch = function () {};

  function mountSwitch() {
    var anchor = document.querySelector('#menu .nr-anchor');
    if (!anchor || anchor.querySelector('.nr-mode')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nr-mode';
    btn.setAttribute('role', 'switch');
    btn.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i><span class="nr-mode-thumb"></span><i class="fa fa-moon-o" aria-hidden="true"></i>';

    function sync() {
      var dark = isDark();
      btn.setAttribute('aria-checked', dark ? 'true' : 'false');
      btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', 'Dark mode');
    }
    btn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      // Matching the default needs no override: forget the choice
      var override = (next === 'dark') === defaultIsDark() ? null : next;
      apply(override);
      write(override);
      sync();
      syncVue();
      syncCharts();
    });
    sync();
    refreshSwitch = sync;
    anchor.appendChild(btn);
  }

  // Live preview for the settings page: apply options without saving them
  window.nrTheme = {
    preview: function (options) {
      cfg = options || {};
      applyConfig();
      apply(read());
      refreshSwitch();
      syncVue();
      syncCharts();
    }
  };

  function ready() {
    mountSwitch();
    syncVue();
    syncUsage();
    document.querySelectorAll('table.dashboard tr[style]').forEach(fixRow);
    syncCharts();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
