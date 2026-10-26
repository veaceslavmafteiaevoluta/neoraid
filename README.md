<p align="center"><img src="assets/logo.png" alt="Neoraid" width="220"></p>

# Neoraid

A modern theme for the **Unraid 7.3** webGUI that keeps the Unraid palette. It is a plugin that adds a stylesheet layer on top of the stock theme: no system file is changed, and removing the plugin brings back the original look.

![Dashboard, dark mode](screenshots/dashboard-dark.jpg)

| Light mode | Custom accent |
| --- | --- |
| ![Dashboard, light mode](screenshots/dashboard-light.jpg) | ![Dashboard with a blue accent and round corners](screenshots/accent-blue.jpg) |

## Features

- **Light and dark** — follows *Settings → Display Settings* (white/azure = light, black/gray = dark). A switch in the navigation bar changes it on the fly, for that browser. The Vue header and the notification panel follow it too.
- **Redesigned webGUI** — navigation, tabs, tables, usage meters, forms, buttons, toggles, menus, dialogs and tooltips, with Inter as the interface font.
- **Dashboard** — equal columns, tiles as cards, Docker, VM and Virtual Machines Usage cards that fill the row at any browser zoom, smooth CPU and network charts in the accent colour, thinner RAM rings with a dedicated palette.
- **Settings → Neoraid** — accent colour, default mode for every browser, density, corners, font, switch on or off, with a live preview.
- **Plugin pages** — Community Applications, Unassigned Devices, Preclear, ZFS Master, folder.view and the Active Streams Dashboard tile get dedicated styles; other plugins inherit the theme colours.

## Requirements

Unraid **7.3.0** or later (developed and tested on 7.3.3 and 7.3.4).

## Install

In Unraid go to **Plugins → Install Plugin**, paste this URL and press **Install**:

```
https://raw.githubusercontent.com/veaceslavmafteiaevoluta/neoraid/main/dist/neoraid.plg
```

Reload the page. Updates show up in **Plugins → Check for Updates**.

## Settings

**Settings → User Preferences → Neoraid**

| Option | Values | What it changes |
| --- | --- | --- |
| Accent colour | 8 presets or any colour | Active page, links, focus, primary buttons, toggles, usage bars, charts, the UNRAID logo |
| Default mode | Follow Display Settings / Light / Dark | The mode every browser starts in; the switch still changes it per browser |
| Density | Comfortable / Compact | Height of table rows and controls |
| Corners | Standard / Sharp / Round | Radius of cards, tables, buttons and fields |
| Font | Inter (included) / System font | Interface typeface |
| Light/dark switch | Show / Hide | The switch in the navigation bar |

Every change previews immediately; **Apply** saves it for all pages and browsers, **Default** restores the initial values. Settings are stored in `/boot/config/plugins/neoraid/neoraid.cfg`.

## Screenshots

| | |
| --- | --- |
| ![Main](screenshots/main-dark.jpg) Main | ![Docker](screenshots/docker-dark.jpg) Docker |
| ![VMs](screenshots/vms-dark.jpg) VMs | ![Shares](screenshots/shares-dark.jpg) Shares |
| ![Settings](screenshots/settings-dark.jpg) Settings | ![Neoraid settings](screenshots/neoraid-settings.jpg) Settings → Neoraid |
| ![Apps](screenshots/apps-dark.jpg) Apps (Community Applications) | ![Plugins](screenshots/plugins-dark.jpg) Plugins |
| ![Tools](screenshots/tools-dark.jpg) Tools | |

Personal data (server name, container and VM names, shares, disk serials, IP addresses, paths) is blurred.

## Uninstall

**Plugins → Installed Plugins → Neoraid → Remove**, then reload the page. The plugin folder and its settings are deleted and the webGUI looks exactly as before.

## Known limitations

- The login page keeps the stock look: it does not load plugin pages.
- The Vue header keeps its own layout; the theme sets its colours.
- The option list of a native `<select>` is drawn by the operating system.
- App icons and badges in Community Applications are images from the CA feed.
- The sidebar layouts (gray and azure themes) have had less testing than the top navigation.

## Repository

| Path | Contents |
| --- | --- |
| `dist/neoraid.plg` | The plugin, a single self-contained file |
| `src/` | Sources: stylesheet, script, pages, default settings, font, Plugins list icon |
| `screenshots/` | The images above |
| `assets/` | Logo |
| `ca_profile.xml`, `plugins/neoraid.xml` | Community Applications listing |

## AI-assisted development

Neoraid was developed with the help of AI ([Claude Code](https://claude.com/claude-code) by Anthropic), used as a coding assistant for the stylesheet, the script, the build tooling and the documentation. Every change was reviewed, installed and checked by hand on a real Unraid 7.3 server, in light and dark mode, before release. Commits written with AI assistance carry a `Co-Authored-By` trailer.

## Acknowledgements

Neoraid was inspired by two community projects:

- [Unraid Glass Themes](https://github.com/Wh1t3Rose/Unraid-Themes) by Wh1t3Rose — the main inspiration: the translucent glass touches and the approach of staying faithful to the stock Unraid look.
- [Aurora Theme](https://github.com/Tunefish92/Aurora-Theme) by Tunefish — the idea of shipping a full webGUI theme as an Unraid plugin, with settings and a light/dark switch.

Neoraid is an independent codebase; no code from either project is included. Thanks to both authors.

## Credits

- [Inter](https://rsms.me/inter/) by Rasmus Andersson, SIL Open Font License 1.1 (`src/fonts/LICENSE-Inter.txt`), embedded in the plugin.
- Unraid is a trademark of Lime Technology, Inc. Neoraid is an independent project, not affiliated with or endorsed by Lime Technology.

## License

[MIT](LICENSE)
