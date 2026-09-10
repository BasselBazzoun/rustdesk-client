# rustdesk-client

Custom RustDesk client builder with self-hosted server defaults and branding injection.

## Overview

This repository automates the build and packaging of a customized [RustDesk](https://github.com/rustdesk/rustdesk) client. It fetches the upstream RustDesk source, injects your self-hosted server configuration and branding, then builds signed packages for Linux, Windows, macOS, and Android via GitHub Actions.

## What It Does

- **Source**: Clones the official RustDesk repository at a configurable tag/branch/commit.
- **Server Injection**: Hardcodes your rendezvous, relay, and API server addresses plus your public key into the client.
- **Branding**: Replaces the window title, about dialog, copyright, and visual assets.
- **Links**: Patches website and privacy-policy URLs in the client UI.
- **Builds**: Produces platform-native packages:
  - **Linux**: DEB, RPM, AppImage, Flatpak
  - **Windows**: MSI installer + portable executable
  - **macOS**: DMG (x64 & ARM64)
  - **Android**: APK (arm64, armv7, x86_64)
- **Release**: Automatically publishes a GitHub Release with all artifacts.

## Repository Layout

```
├── .github/
│   ├── actions/           # Reusable composite actions (prepare, build, collect)
│   └── workflows/
│       └── build.yml      # Main build & release workflow
├── scripts/
│   └── configure_rustdesk.py   # Injection logic for config & branding
├── branding/              # Custom icons, logos, and assets (optional)
└── BUILD.md               # macOS self-hosted runner setup instructions
```

## Quick Start

1. **Fork this repository**.
2. **Configure repository secrets & variables** (see tables below).
3. **Add branding assets** to a `branding/` directory (optional).
4. **Run the workflow** manually via GitHub Actions (`Build RustDesk`).

## Secrets

Set these as **repository secrets** (`Settings → Secrets and variables → Secrets`):

| Secret | Description | Example |
|--------|-------------|---------|
| `RENDEZVOUS_SERVER` | ID / rendezvous server (`hbbs`) host or IP | `id.example.com` |
| `RELAY_SERVER` | Relay server (`hbbr`) host or IP (optional) | `relay.example.com` |
| `API_SERVER` | API server for Pro login / web console (optional) | `https://api.example.com` |
| `RS_PUB_KEY` | Public key from `id_ed25519.pub` (injected as custom server key, upstream network key is kept) | `1Mf5l...` |

## Variables

Set these as **repository variables** (`Settings → Secrets and variables → Variables`):

| Variable | Description | Example |
|----------|-------------|---------|
| `CLIENT_NAME` | Window title and About dialog title (install path & binary name stay `RustDesk`) | `greenSec RustDesk Client` |
| `CLIENT_IDENTIFIER` | Bundle identifier / application ID (reverse-DNS) | `de.greensec.rustdesk` |
| `CLIENT_DESCRIPTION` | Short description used in `.desktop` files and Windows metadata | `Secure remote desktop` |
| `CLIENT_COMPANY` | Company name used in copyright strings | `greenSec GmbH` |
| `WEBSITE_URL` | Website URL shown in the About dialog | `https://greensec.de` |
| `PRIVACY_URL` | Privacy policy URL shown in the About dialog | `https://greensec.de/datenschutz` |
| `CLIENT_CONFIG` | JSON object of extra RustDesk client settings (see below) | `{"access-mode":"full","enable-record-session":"Y"}` |

### Advanced Client Settings (`CLIENT_CONFIG`)

The `CLIENT_CONFIG` variable lets you inject any RustDesk client configuration option as default settings. These are baked into the client at build time and act as factory defaults that users can still override in the UI.

Set `CLIENT_CONFIG` as a **repository variable** containing a single-line JSON object:

```json
{"access-mode":"custom","enable-clipboard":"N","enable-file-transfer":"N"}
```

**Common settings you may want to pre-configure:**

| Setting | Values | Description |
|---------|--------|-------------|
| `access-mode` | `custom`, `full`, `view` | Default permission level for incoming connections |
| `enable-keyboard` | `Y` / `N` | Allow remote keyboard/mouse input |
| `enable-clipboard` | `Y` / `N` | Allow clipboard sharing |
| `enable-file-transfer` | `Y` / `N` | Allow file transfer |
| `enable-camera` | `Y` / `N` | Allow camera access |
| `enable-terminal` | `Y` / `N` | Allow terminal access |
| `enable-audio` | `Y` / `N` | Allow audio forwarding |
| `enable-tunnel` | `Y` / `N` | Allow TCP tunneling |
| `enable-remote-restart` | `Y` / `N` | Allow remote restart |
| `enable-record-session` | `Y` / `N` | Allow session recording |
| `enable-block-input` | `Y` / `N` | Allow blocking local input (Windows) |
| `enable-privacy-mode` | `Y` / `N` | Allow privacy mode |
| `stop-service` | `Y` / `N` | Stop the background service / ID registration |
| `whitelist` | comma-separated IDs | Restrict incoming connections to listed IDs |

For the full list of available settings, see the [RustDesk Advanced Client Settings documentation](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/).

## Asset Branding

Place image assets in a `branding/` directory at the root of this repository. The build workflow automatically copies them into the RustDesk source tree.

**Expected filenames and their targets:**

| File in `branding/` | Replaces upstream asset | Used for |
|---------------------|------------------------|----------|
| `icon.ico` | `res/icon.ico` | Windows application icon |
| `tray-icon.ico` | `res/tray-icon.ico` | Windows tray icon |
| `icon.png` | `res/icon.png` | Linux application icon |
| `32x32.png` | `res/32x32.png` | Small icon (32×32 px) |
| `64x64.png` | `res/64x64.png` | Medium icon (64×64 px) |
| `128x128.png` | `res/128x128.png` | Large icon (128×128 px) |
| `128x128@2x.png` | `res/128x128@2x.png` | Retina icon (256×256 px) |
| `logo.svg` | `res/logo.svg` | Application logo (SVG) |
| `logo-header.svg` | `res/logo-header.svg` | Header/logo in UI |
| `rustdesk-banner.svg` | `res/rustdesk-banner.svg` | Banner image |
| `scalable.svg` | `res/scalable.svg` | **Linux system icon** (installed into icon theme as `rustdesk.svg`) |
| `mac-icon.png` | `res/mac-icon.png` | macOS application icon |
| `mac-tray-dark-x2.png` | `res/mac-tray-dark-x2.png` | macOS dark-mode tray icon (@2x) |
| `mac-tray-light-x2.png` | `res/mac-tray-light-x2.png` | macOS light-mode tray icon (@2x) |
| `logo.png` | `flutter/assets/logo.png` | Logo shown in the home page UI |
| `icon.png` | `flutter/assets/icon.png` | Icon shown in the Flutter UI (fallback for `icon.svg`) |
| `icon.ico` | `flutter/assets/icon.ico` | **Windows taskbar/window icon** (loaded at runtime by the Flutter runner, overrides `app_icon.ico`) |

**Windows-specific note:**
- `icon.ico` is copied to **both** `res/icon.ico` (used by the Rust build) **and** `flutter/windows/runner/resources/app_icon.ico` (used by the Flutter Windows runner). If you only change the tray icon, provide `tray-icon.ico`.
- To change the **taskbar / window icon** on Windows, you must provide `icon.ico`.

**Linux-specific note:**
- `scalable.svg` is installed into the system icon theme as `rustdesk.svg`. If you skip it, the Linux taskbar / application menu may still show the upstream icon.
- The Linux runner also falls back to local `res/32x32.png`, `res/64x64.png`, `res/128x128.png`, and `res/128x128@2x.png` when the app is run without installation (e.g., directly from the build directory).

Only include the files you want to override; missing ones will keep the upstream defaults.

## Workflow Inputs

| Input | Description | Default |
|-------|-------------|---------|
| `rustdesk_ref` | RustDesk tag, branch, or commit to build | `1.4.7` |
| `publish_release` | Create/update a GitHub Release | `true` |
| `release_tag` | Custom release tag (auto-generated if empty) | `""` |
| `prerelease` | Mark release as prerelease | `false` |
| `use_github_runners` | Use GitHub-hosted runners instead of self-hosted runners | `true` |
| `build_linux` | Build Linux packages | `true` |
| `build_windows` | Build Windows packages | `true` |
| `build_macos_x64` | Build macOS x64 (Intel) package | `true` |
| `build_macos_arm64` | Build macOS ARM64 (Apple Silicon) package | `true` |
| `build_android` | Build Android packages | `true` |
| `website_url` | Override the website URL for this run | falls back to `vars.WEBSITE_URL` or `https://greensec.de` |
| `privacy_url` | Override the privacy policy URL for this run | falls back to `vars.PRIVACY_URL` or `https://greensec.de/datenschutz` |

## Build Environments

- **Linux**: Ubuntu 22.04 GitHub-hosted runner building inside an Ubuntu 20.04 container to keep the glibc 2.31 / libstdc++ 3.4.28 baseline compatible with older targets (self-hosted runners run directly on the host unless a container is configured).
- **Windows**: Windows runner with LLVM, Rust, Flutter (GitHub-hosted or self-hosted)
- **macOS**: macOS Sonoma (14+) self-hosted runner with Xcode, Homebrew, Rust, Flutter, CocoaPods
- **Android**: Ubuntu 22.04 GitHub-hosted runner (no self-hosted setup required)

See `BUILD.md` for detailed macOS runner setup instructions.

## License

This builder tooling follows the same license terms as the upstream [RustDesk](https://github.com/rustdesk/rustdesk) project.
