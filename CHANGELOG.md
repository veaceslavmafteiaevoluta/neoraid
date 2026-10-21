# Changelog

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
