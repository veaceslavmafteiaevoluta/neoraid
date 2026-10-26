# Changelog

## 2026.10.26g

- Dashboard: the Active Streams tile (plugin from Apps) is no longer collapsed to an empty box. Its icon sits on the same plate as the other tiles, its dividers are visible in light mode and its "no servers configured" notice uses the theme warning colour.

## 2026.10.26f

- Dashboard: containers with an update show their name in the accent colour, as on the Docker page, instead of the info blue.

## 2026.10.26e

- Dashboard: the "Outbound" legend of the Interface chart uses the accent colour, like its line, instead of the stock orange.

## 2026.10.26d

- Dashboard: the Virtual Machines Usage cards match the Docker and VM cards (rounded corners, icon next to the name), with the metrics below a divider, full-width usage bars with a visible track, and two cards per row (one in a narrow card).

## 2026.10.26b

- Dashboard: in a narrow System card (browser zoom, smaller windows) the memory legend moves above the usage rings, so the last ring is no longer cut off. At normal width the layout is unchanged.

## 2026.10.26a

- Dashboard: Docker and VM cards fill the row and stay three per row at any width, so browser zoom or a narrow column no longer drops one to the next line (two per row in a very narrow card). Long names get more room before they are cut.

## 2026.10.21p

- folder.view: the expand button sits next to the folder name instead of below it, and the container previews are no longer cut at the bottom.
- folder.view folder editor: no bullet points, labels aligned with the other fields, On/Off next to each switch, compact colour reset button, subtle row borders in the container list.
- Docker: the autostart "wait" field lines up under the switch.
- Docker, advanced view: the CPU & Memory load column lines up with the rest of the row again (its cells jumped to the top), with percentage and bar on one line as on the Dashboard and memory below.

## 2026.10.21n

- Docker with folder.view: folder names use the text colour like container names, and the accent colour when the folder has an update.
- Docker: "apply update" is a plain accent link without the outline, and its icon and the "update ready" one line up with the other rows.

## 2026.10.21l

- Docker: containers with an update take the accent colour, including the ones marked by folder.view (its highlight was hidden by the theme).
- Docker version column restyled: "up-to-date" in neutral text with a green check, "update ready" as an accent pill, "apply update" as a small button, "force update" and "latest" muted.

## 2026.10.21k

- A custom accent colour now also tints the UNRAID logo in the header.
- Plugins: Neoraid shows its own icon, tinted with the accent colour; clicking it opens *Settings → Neoraid*.
- Docker: container names use the text colour, as on the Dashboard; containers with an update and "update ready" / "apply update" are shown in the info blue.
- VMs: VM names and vCPU counts use the text colour too.
- Unassigned Devices: the mount point of remote SMB/NFS shares (pencil + name) no longer turns into a squeezed icon button.
- Unassigned Devices dialogs (SweetAlert 2) follow the light and dark mode instead of staying white; the protocol picker no longer shows stray squares next to the NFS and SMB icons, and the success icon shown after a removal no longer has a white blob over it.

## 2026.10.21e

- Community Applications listing files (`ca_profile.xml`, `plugins/neoraid.xml`), in preparation for the submission to Apps.
- Stylesheet tidy-up: duplicate ZFS Master and sidebar rules merged, with no visual change.

## 2026.10.21d

- VM editor: CPU pinning boxes follow the theme in light and dark mode (they stayed light in a forced dark mode), readable core labels, P-core marker in the info colour.
- Users: the default avatar sits on a round plate and turns light in dark mode.
- Dashboard: CPU load percentages use the theme colours (neutral, warning and danger above the thresholds) instead of the stock green; tile column headers and memory legend have more contrast.
- Light mode: secondary text, success and warning colours are slightly darker, so small labels and status text reach a 4.5:1 contrast. The vDisk path in the VM editor and "Show more" in Apps are readable too.
- Custom accent colours: link and accent text is darkened (light mode) or lightened (dark mode) only as much as needed to reach a 4.5:1 contrast, so light accents such as green or teal stay readable.
- Sidebar layouts (gray, azure): menu labels no longer show cut off next to the icons, and the rail has no horizontal scrollbars; a label opens only for the hovered item.
- Faster page script on the Dashboard: the Vue dark-mode sync only runs when a new Vue component appears.
- Release notes in *Plugins* now come from the changelog.

## 2026.10.20t

First public release.

- Theme layer for the Unraid 7.3 webGUI that keeps the Unraid palette; removing the plugin restores the stock look.
- Light and dark mode following *Display Settings*, with a switch in the navigation bar; the Vue header and notification panel follow it.
- *Settings → Neoraid*: accent colour, default mode, density, corners, font, switch visibility, with live preview.
- Redesigned navigation, tabs, tables, usage meters, forms, buttons, toggles, context menus, dialogs, tooltips, file tree, select2 and system log colours.
- Dashboard: equal columns, card tiles, Docker and VM cards, smooth CPU and network charts, RAM rings with a dedicated palette.
- Dedicated styles for Community Applications, Unassigned Devices, Preclear and ZFS Master.
- Plugin updates through *Plugins → Check for Updates*.
