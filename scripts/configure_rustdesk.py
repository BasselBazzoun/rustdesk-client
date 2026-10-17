#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import pathlib
import re
import shutil
import sys

# RustDesk reads a few options ONLY from BUILTIN_SETTINGS (populated at
# startup from the signed custom-client config), never from DEFAULT_SETTINGS.
# src/tray.rs::start_tray() gates the tray icon on
# get_builtin_option("hide-tray"). If hide-tray lands in DEFAULT_SETTINGS
# (where inject_default_settings() puts everything), the tray icon still
# shows. So these keys must be split out into BUILTIN_SETTINGS.
# (Root-caused 2026-10-14: tray icon survived --option hide-tray Y and
# CLIENT_CONFIG hide-tray.)
BUILTIN_KEYS = {"hide-tray", "hide-stop-service"}



def patch_cm_hide_main_dart(source_dir):
    """Force-hide CM window at startup via main.dart (2026-10-15).
    runConnectionManagerScreen() overwrites ServerModel.hideCm from the
    hide_cm config, so the server_model.dart patch alone is not enough.
    This forces hide=true unconditionally.
    """
    main_dart = source_dir / "flutter" / "lib" / "main.dart"
    if not main_dart.exists():
        print("Skipped CM main.dart patch; not found: " + str(main_dart))
        return
    text = read_text(main_dart)
    marker = "// CUSTOM-BUILD: always hide CM window"
    if marker in text:
        print("CM main.dart patch already applied, skipping")
        return
    old_line = '  final hide = await bind.cmGetConfig(name: "hide_cm") == \'true\';'
    if text.count(old_line) != 1:
        print("Warning: hide_cm line count != 1, skipping CM main.dart patch")
        return
    new_line = '  final hide = true; ' + marker
    text = text.replace(old_line, new_line, 1)
    write_text(main_dart, text)
    print("Patched main.dart: CM window always hidden at startup")

def patch_cm_hide_window(source_dir):
    """Force-hide the Connection Manager window on incoming sessions (2026-10-14).
    Upstream 1.5.0 commented out the allow-hide-cm logic, so the CM window
    always pops up on the controlled side when someone connects. This patch
    forces hideCm=true in the Flutter ServerModel, so the CM window never shows.
    """
    dart_file = source_dir / "flutter" / "lib" / "models" / "server_model.dart"
    if not dart_file.exists():
        print("Skipped CM patch; not found: " + str(dart_file))
        return
    text = read_text(dart_file)
    marker = "// CUSTOM-BUILD: always hide CM window"
    if marker in text:
        print("CM patch already applied, skipping")
        return
    old_line = "  bool hideCm = false;"
    if text.count(old_line) != 1:
        print("Warning: hideCm line count != 1, skipping CM patch")
        return
    new_line = "  bool hideCm = true; " + marker
    text = text.replace(old_line, new_line, 1)
    write_text(dart_file, text)
    print("Patched server_model.dart: CM window always hidden")

def patch_tray_hide_windows(source_dir):
    """Force-hide tray on Windows via src/tray.rs patch (2026-10-14)."""
    tray_rs = source_dir / "src" / "tray.rs"
    if not tray_rs.exists():
        print("Skipped tray patch; not found: " + str(tray_rs))
        return
    text = read_text(tray_rs)
    marker = "// CUSTOM-BUILD: always hide tray on Windows"
    if marker in text:
        print("Tray patch already applied, skipping")
        return
    old_fn = "pub fn start_tray() {"
    if text.count(old_fn) != 1:
        print("Warning: start_tray count != 1, skipping tray patch")
        return
    new_fn = old_fn + "\n    " + marker + "\n    #[cfg(target_os = \"windows\")]\n    {\n        return;\n    }"
    text = text.replace(old_fn, new_fn, 1)
    write_text(tray_rs, text)
    print("Patched src/tray.rs: tray always hidden on Windows")



def rust_string(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def read_text(path: pathlib.Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: pathlib.Path, text: str) -> None:
    path.write_text(text, encoding="utf-8")


def replace_one(path: pathlib.Path, pattern: str, replacement: str, label: str) -> None:
    text = read_text(path)

    new_text, count = re.subn(
        pattern,
        replacement,
        text,
        flags=re.MULTILINE | re.DOTALL,
    )

    if count != 1:
        raise RuntimeError(
            f"Expected to replace exactly one occurrence of {label} in {path}, "
            f"but replaced {count}."
        )

    write_text(path, new_text)
    print(f"Updated {label}")


def replace_optional(
    path: pathlib.Path, pattern: str, replacement: str, label: str
) -> int:
    if not path.exists():
        print(f"Skipped {label}; file not found: {path}")
        return 0

    text = read_text(path)

    new_text, count = re.subn(
        pattern,
        replacement,
        text,
        flags=re.MULTILINE | re.DOTALL,
    )

    if count:
        write_text(path, new_text)
        print(f"Updated {label} ({count})")
    else:
        print(f"Skipped {label}; no matching pattern found")

    return count


def update_desktop_file(path: pathlib.Path, app_name: str, description: str) -> None:
    if not path.exists():
        print(f"Skipped desktop file; not found: {path}")
        return

    if not app_name and not description:
        return

    text = read_text(path)

    if app_name:
        text = re.sub(r"^Name=.*$", f"Name={app_name}", text, flags=re.MULTILINE)

    if description:
        text = re.sub(
            r"^Comment=.*$", f"Comment={description}", text, flags=re.MULTILINE
        )

    write_text(path, text)
    print(f"Updated desktop file: {path}")


def touch_if_exists(path: pathlib.Path, label: str) -> None:
    if path.exists():
        path.touch()
        print(f"Touched {label}: {path}")


def touch_resource_build_inputs(source_dir: pathlib.Path) -> None:
    """Force build systems to recompile embedded resources after branding changes.

    RustDesk embeds icons through a few different platform-specific resource
    compilers. Some of those build scripts do not declare the icon files as
    rebuild inputs, so an incremental build can otherwise reuse the previous
    RustDesk icon even after the files were copied.
    """
    for rel, label in (
        ("build.rs", "root Cargo build script"),
        ("libs/portable/build.rs", "portable Cargo build script"),
        ("flutter/windows/runner/Runner.rc", "Windows runner resource script"),
    ):
        touch_if_exists(source_dir / rel, label)


def copy_branding_assets(source_dir: pathlib.Path, asset_dir_value: str) -> None:
    if not asset_dir_value:
        return

    asset_dir = pathlib.Path(asset_dir_value).resolve()

    if not asset_dir.exists():
        print(f"Branding asset directory not found, skipped: {asset_dir}")
        return

    mapping: list[tuple[str, str]] = [
        # Native/package resources
        ("icon.ico", "res/icon.ico"),
        ("tray-icon.ico", "res/tray-icon.ico"),
        ("icon.png", "res/icon.png"),
        ("32x32.png", "res/32x32.png"),
        ("64x64.png", "res/64x64.png"),
        ("128x128.png", "res/128x128.png"),
        ("128x128@2x.png", "res/128x128@2x.png"),
        ("logo.svg", "res/logo.svg"),
        ("logo-header.svg", "res/logo-header.svg"),
        ("rustdesk-banner.svg", "res/rustdesk-banner.svg"),
        ("scalable.svg", "res/scalable.svg"),
        ("mac-icon.png", "res/mac-icon.png"),
        ("mac-tray-dark-x2.png", "res/mac-tray-dark-x2.png"),
        ("mac-tray-light-x2.png", "res/mac-tray-light-x2.png"),
        # Windows Flutter runner generated icon
        ("icon.ico", "flutter/windows/runner/resources/app_icon.ico"),
        # Flutter runtime assets
        ("logo.png", "flutter/assets/logo.png"),
        ("icon.png", "flutter/assets/icon.png"),
        ("icon.ico", "flutter/assets/icon.ico"),
        ("logo.svg", "flutter/assets/icon.svg"),
    ]

    copied = 0

    for src_name, dst_name in mapping:
        src = asset_dir / src_name
        dst = source_dir / dst_name

        if src.exists():
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(src, dst)
            copied += 1
            print(f"Copied branding asset: {src_name} -> {dst_name}")

    # Current RustDesk Linux packages install res/scalable.svg as the hicolor
    # scalable app icon. The branding bundle historically only provided
    # logo.svg, so keep supporting that by using it as a fallback.
    scalable_svg = asset_dir / "scalable.svg"
    logo_svg = asset_dir / "logo.svg"
    if not scalable_svg.exists() and logo_svg.exists():
        dst = source_dir / "res" / "scalable.svg"
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(logo_svg, dst)
        copied += 1
        print("Copied branding fallback: logo.svg -> res/scalable.svg")

    if copied == 0:
        print(f"No known branding assets found in {asset_dir}")
    else:
        touch_resource_build_inputs(source_dir)
        print(f"Copied {copied} branding asset(s)")


def inject_default_settings(
    config_file: pathlib.Path,
    host: str,
    key: str,
    relay: str,
    api: str,
    client_config: str,
) -> None:
    entries: list[tuple[str, str]] = [
        ("custom-rendezvous-server", host),
        ("key", key),
    ]

    if relay:
        entries.append(("relay-server", relay))

    if api:
        entries.append(("api-server", api))

    builtin_entries: list[tuple[str, str]] = []
    if client_config:
        try:
            extra = json.loads(client_config)
            if isinstance(extra, dict):
                for k, v in extra.items():
                    if str(k) in BUILTIN_KEYS:
                        builtin_entries.append((str(k), str(v)))
                    else:
                        entries.append((str(k), str(v)))
            else:
                print(
                    "Warning: CLIENT_CONFIG is not a JSON object; ignoring",
                    file=sys.stderr,
                )
        except json.JSONDecodeError as exc:
            print(
                f"Warning: failed to parse CLIENT_CONFIG: {exc}; ignoring",
                file=sys.stderr,
            )

    rust_entries = ", ".join(
        f'("{rust_string(k)}".to_owned(), "{rust_string(v)}".to_owned())'
        for k, v in entries
    )

    replacement = (
        "pub static ref DEFAULT_SETTINGS: RwLock<HashMap<String, String>> = "
        f"RwLock::new(HashMap::from([{rust_entries}]));"
    )

    replace_one(
        config_file,
        r"pub\s+static\s+ref\s+DEFAULT_SETTINGS\s*:\s*RwLock\s*<\s*HashMap\s*<\s*String\s*,\s*String\s*>\s*>\s*=\s*Default::default\s*\(\s*\)\s*;",
        replacement,
        "DEFAULT_SETTINGS",
    )

    # hide-tray / hide-stop-service must live in BUILTIN_SETTINGS, otherwise
    # src/tray.rs never sees them (it only calls get_builtin_option()).
    if builtin_entries:
        rust_builtin_entries = ", ".join(
            f'("{rust_string(k)}".to_owned(), "{rust_string(v)}".to_owned())'
            for k, v in builtin_entries
        )
        builtin_replacement = (
            "pub static ref BUILTIN_SETTINGS: RwLock<HashMap<String, String>> = "
            f"RwLock::new(HashMap::from([{rust_builtin_entries}]));"
        )
        replace_one(
            config_file,
            r"pub\s+static\s+ref\s+BUILTIN_SETTINGS\s*:\s*RwLock\s*<\s*HashMap\s*<\s*String\s*,\s*String\s*>\s*>\s*=\s*Default::default\s*\(\s*\)\s*;",
            builtin_replacement,
            "BUILTIN_SETTINGS",
        )
        print(f"Injected {len(builtin_entries)} builtin setting(s) into BUILTIN_SETTINGS")


def apply_server_config(
    source_dir: pathlib.Path,
    host: str,
    key: str,
    relay: str,
    api: str,
    client_config: str,
) -> None:
    config_file = source_dir / "libs" / "hbb_common" / "src" / "config.rs"

    if not config_file.exists():
        raise FileNotFoundError(f"Config file not found: {config_file}")

    if not host:
        raise ValueError("Missing --host / RENDEZVOUS_SERVER")

    if not key:
        raise ValueError("Missing --key / custom server key")

    replace_one(
        config_file,
        r"pub\s+const\s+RENDEZVOUS_SERVERS\s*:\s*&\s*\[\s*&str\s*\]\s*=\s*&\s*\[.*?\]\s*;",
        f'pub const RENDEZVOUS_SERVERS: &[&str] = &["{rust_string(host)}"];',
        "RENDEZVOUS_SERVERS",
    )

    inject_default_settings(
        config_file=config_file,
        host=host,
        key=key,
        relay=relay,
        api=api,
        client_config=client_config,
    )
 # patch_tray_hide_windows(source_dir)
# patch_cm_hide_window(source_dir)
# patch_cm_hide_main_dart(source_dir)

    print("Self-hosted server configuration injected")


def apply_branding(
    source_dir: pathlib.Path,
    app_name: str,
    app_id: str,
    description: str,
    company: str,
    asset_dir: str,
) -> None:
    if not any([app_name, app_id, description, company, asset_dir]):
        print("No branding values/assets provided; branding skipped")
        return

    cargo_file = source_dir / "Cargo.toml"
    config_file = source_dir / "libs" / "hbb_common" / "src" / "config.rs"

    if not cargo_file.exists():
        raise FileNotFoundError(f"Cargo.toml not found: {cargo_file}")

    if not config_file.exists():
        raise FileNotFoundError(f"Config file not found: {config_file}")

    if app_name:
        replace_optional(
            cargo_file,
            r'ProductName\s*=\s*".*?"',
            f'ProductName = "{rust_string(app_name)}"',
            "Windows ProductName",
        )

    if description:
        replace_optional(
            cargo_file,
            r'FileDescription\s*=\s*".*?"',
            f'FileDescription = "{rust_string(description)}"',
            "Windows FileDescription",
        )

        replace_optional(
            cargo_file,
            r'\bdescription\s*=\s*".*?"',
            f'description = "{rust_string(description)}"',
            "package description",
        )

    if app_id:
        replace_optional(
            cargo_file,
            r'identifier\s*=\s*".*?"',
            f'identifier = "{rust_string(app_id)}"',
            "bundle identifier",
        )

        parts = app_id.split(".")
        if len(parts) >= 2:
            mac_org = ".".join(parts[:-1])
            replace_optional(
                config_file,
                r'pub\s+static\s+ref\s+ORG\s*:\s*RwLock\s*<\s*String\s*>\s*=\s*RwLock::new\(".*?"\.to_owned\(\)\)\s*;',
                f'pub static ref ORG: RwLock<String> = RwLock::new("{rust_string(mac_org)}".to_owned());',
                "macOS ORG",
            )

    if company:
        replace_optional(
            cargo_file,
            r'LegalCopyright\s*=\s*".*?"',
            f'LegalCopyright = "Copyright © {rust_string(company)}. All rights reserved."',
            "Windows LegalCopyright",
        )

    update_desktop_file(
        source_dir / "res" / "rustdesk.desktop",
        app_name=app_name,
        description=description,
    )

    update_desktop_file(
        source_dir / "res" / "rustdesk-link.desktop",
        app_name=app_name,
        description=description,
    )

    copy_branding_assets(source_dir=source_dir, asset_dir_value=asset_dir)

    print("Branding injection finished")


def apply_links(source_dir: pathlib.Path, website_url: str, privacy_url: str) -> None:
    if not website_url and not privacy_url:
        print("No link overrides provided; link patching skipped")
        return

    files = [
        source_dir
        / "flutter"
        / "lib"
        / "desktop"
        / "pages"
        / "desktop_setting_page.dart",
        source_dir / "flutter" / "lib" / "mobile" / "pages" / "settings_page.dart",
        source_dir / "flutter" / "lib" / "desktop" / "pages" / "install_page.dart",
        source_dir / "flutter" / "lib" / "common.dart",
    ]

    for path in files:
        if not path.exists():
            print(f"Skipped link patching; file not found: {path}")
            continue

        text = read_text(path)
        original = text

        if privacy_url:
            text = text.replace("https://rustdesk.com/privacy.html", privacy_url)

        if website_url:
            text = text.replace("https://rustdesk.com", website_url)

        if text != original:
            write_text(path, text)
            print(f"Updated links in {path.relative_to(source_dir)}")
        else:
            print(f"No link matches in {path.relative_to(source_dir)}")

    print("Link patching finished")


def patch_rpm_dependencies(source_dir: pathlib.Path) -> None:
    fedora_spec = source_dir / "res" / "rpm-flutter.spec"
    suse_spec = source_dir / "res" / "rpm-flutter-suse.spec"

    # Fedora/RHEL spec
    replace_optional(
        fedora_spec,
        r"(Requires:\s+gtk3 libxcb libXfixes alsa-lib libva pam gstreamer1-plugins-base)(\n)",
        r"\1, glibc >= 2.31, libstdc++ >= 10.2.1\2",
        "fedora rpm runtime dependencies",
    )

    # openSUSE spec
    replace_optional(
        suse_spec,
        r"(Requires:\s+gtk3 libxcb1 libXfixes3 alsa-utils libXtst6 libva2 pam gstreamer-plugins-base gstreamer-plugin-pipewire)(\n)",
        r"\1, glibc >= 2.31, libstdc++6 >= 10.2.1\2",
        "suse rpm runtime dependencies",
    )


def patch_deb_dependencies(source_dir: pathlib.Path) -> None:
    build_py = source_dir / "build.py"
    if not build_py.exists():
        print("Skipped deb dependency patch; build.py not found")
        return

    # Insert minimum libc6/libstdc++6 into the .deb control template. This
    # makes dpkg refuse to install the package on distributions that are too
    # old to satisfy the glibc/libstdc++ baseline we build against
    # (currently glibc 2.31 / GLIBCXX_3.4.28, i.e. Ubuntu 20.04 / Debian 11).
    replace_optional(
        build_py,
        r"(libpam0g, gstreamer1\.0-pipewire)(%s)",
        r"\1, libc6 (>= 2.31), libstdc++6 (>= 10.2.1)\2",
        "deb runtime dependencies",
    )


def apply_flutter_titles(source_dir: pathlib.Path, app_name: str, company: str) -> None:
    if not app_name and not company:
        print("No app name or company provided; title patching skipped")
        return

    common_file = source_dir / "flutter" / "lib" / "common.dart"
    if common_file.exists() and app_name:
        text = read_text(common_file)
        original = text

        # Patch getWindowName() to use the branded name for the window title bar
        text = text.replace(
            "  final name = bind.mainGetAppNameSync();",
            f'  final name = "{app_name}";',
        )

        if text != original:
            write_text(common_file, text)
            print("Updated window title (flutter/lib/common.dart)")
        else:
            print("No window title match found")
    elif not common_file.exists():
        print(f"Skipped title patching; file not found: {common_file}")

    settings_file = (
        source_dir
        / "flutter"
        / "lib"
        / "desktop"
        / "pages"
        / "desktop_setting_page.dart"
    )
    if settings_file.exists():
        text = read_text(settings_file)
        original = text

        if app_name:
            # Patch about dialog title
            text = text.replace(
                "_Card(title: translate('About RustDesk'), children: [",
                f"_Card(title: 'About {app_name}', children: [",
            )

        if company:
            # Patch hardcoded copyright in about dialog
            text = text.replace(
                "Purslane Ltd.",
                company,
            )

            # Remove the upstream slogan/tagline
            text = re.sub(
                r"Text\(\s*translate\(['\"]Slogan_tip['\"]\),\s*style:\s*TextStyle\([\s\S]*?\),\s*\)\s*,?",
                "",
                text,
            )

        if text != original:
            write_text(settings_file, text)
            if app_name:
                print(
                    "Updated about dialog title (flutter/lib/desktop/pages/desktop_setting_page.dart)"
                )
            if company:
                print(
                    "Updated about dialog copyright (flutter/lib/desktop/pages/desktop_setting_page.dart)"
                )
        else:
            print("No about dialog matches found")
    else:
        print(f"Skipped about dialog patching; file not found: {settings_file}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Inject self-hosted RustDesk server config and optional branding."
    )

    parser.add_argument("--source-dir", required=True)

    parser.add_argument("--host", required=True)
    parser.add_argument("--key", required=True)
    parser.add_argument("--relay", default="")
    parser.add_argument("--api", default="")

    parser.add_argument("--app-name", default="")
    parser.add_argument("--app-id", default="")
    parser.add_argument("--description", default="")
    parser.add_argument("--company", default="")
    parser.add_argument("--asset-dir", default="")
    parser.add_argument("--website-url", default="")
    parser.add_argument("--privacy-url", default="")
    parser.add_argument("--client-config", default="")

    return parser.parse_args()


def main() -> int:
    args = parse_args()

    source_dir = pathlib.Path(args.source_dir).resolve()

    if not source_dir.exists():
        print(f"Source directory not found: {source_dir}", file=sys.stderr)
        return 1

    host = args.host.strip()
    key = args.key.strip()
    relay = args.relay.strip()
    api = args.api.strip()

    app_name = args.app_name.strip()
    app_id = args.app_id.strip()
    description = args.description.strip()
    company = args.company.strip()
    asset_dir = args.asset_dir.strip()
    website_url = args.website_url.strip()
    privacy_url = args.privacy_url.strip()
    client_config = args.client_config.strip()

    try:
        apply_server_config(
            source_dir=source_dir,
            host=host,
            key=key,
            relay=relay,
            api=api,
            client_config=client_config,
        )

        apply_branding(
            source_dir=source_dir,
            app_name=app_name,
            app_id=app_id,
            description=description,
            company=company,
            asset_dir=asset_dir,
        )

        apply_links(
            source_dir=source_dir,
            website_url=website_url,
            privacy_url=privacy_url,
        )

        patch_deb_dependencies(source_dir=source_dir)
        patch_rpm_dependencies(source_dir=source_dir)

        apply_flutter_titles(source_dir=source_dir, app_name=app_name, company=company)

    except Exception as exc:
        print(f"Configuration failed: {exc}", file=sys.stderr)
        return 1

    print("RustDesk customization finished successfully")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
