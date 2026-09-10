let currentLanguage = 'en';

const I18N = {
  en: {
    'page.title': 'RustDesk Clients',
    'page.description': 'Download preconfigured RustDesk clients for self-hosted RustDesk servers.',
    'hero.actionsLabel': 'Primary actions',
    'downloads.title': 'Downloads',
    'recommended.eyebrow': 'Recommended for this device',
    'recommended.defaultTitle': 'Choose a download',
    'recommended.defaultCta': 'View options',
    'recommended.defaultDescription': 'Recommended for the detected platform.',
    'recommended.downloadCta': 'Download',
    'recommended.macosTitle': 'Choose the right macOS DMG file',
    'recommended.macosDescription': 'Apple Silicon and Intel builds are available. These official upstream builds must be configured manually after installation.',
    'recommended.macosCta': 'View macOS options',
    'recommended.iosTitle': 'No iOS build is provided here',
    'recommended.iosDescription': 'Install RustDesk from the App Store and configure it using the QR code or configuration string in the Mobile Installation section below.',
    'recommended.iosCta': 'View mobile installation',
    'platform.detected': 'Detected on this device',
    'noBuild.linux': 'No Linux builds available yet.',
    'noBuild.windows': 'No Windows builds available yet.',
    'noBuild.macos': 'No macOS builds available yet.',
    'noBuild.android': 'No Android builds available yet.',
    'macos.noteText': 'These are official upstream builds and do not include your self-hosted server configuration.',
    'macos.noteLink': 'See manual setup steps.',
    'android.noteText': 'These are official upstream builds and do not include your self-hosted server configuration.',
    'android.noteLink': 'See manual setup steps.',
    'manual.quickImportTitle': 'Quick Import (recommended)',
    'manual.quickStep1': 'Open RustDesk and click the <strong>menu button</strong> (⋯) next to your ID.',
    'manual.quickStep2': 'Select <strong>Network</strong> and unlock the settings with administrator privileges.',
    'manual.quickStep3': 'Open <strong>ID/Relay Server</strong>, click <i class="ti ti-clipboard"></i> (<strong>Import Server Config</strong>), and paste the configuration string from the <a href="#config">Desktop Client Configuration</a> section.',
    'manual.manualEntryTitle': 'Manual Entry',
    'manual.manualStep1': 'Open RustDesk → <strong>ID/Relay Server</strong> settings (see Quick Import).',
    'manual.manualStepApply': 'Click <strong>Apply</strong> or <strong>OK</strong> to save.',
    'config.title': 'Desktop Client Configuration',
    'config.note': 'The downloads on this page are <strong>preconfigured</strong>.<br>You only need this section when using the <strong>macOS</strong> upstream client or a standard RustDesk client.',
    'config.copyHelp': 'Copy this configuration string and paste it into RustDesk via <strong>Settings → Network → ID/Relay Server → <i class="ti ti-clipboard"></i> (Import Server Config)</strong>:',
    'config.textareaAria': 'Encoded RustDesk server configuration',
    'config.copyButton': 'Copy configuration',
    'config.idServer': 'ID server',
    'config.relayServer': 'Relay server',
    'config.apiServer': 'API server',
    'config.key': 'Key',
    'config.noConfig': 'No configuration available.',
    'toast.noConfig': 'No configuration available to copy.',
    'toast.copied': 'Copied to the clipboard.',
    'toast.copyFailed': 'Copy failed. Select the text and copy it manually.',
    'footer.latestBuild': 'Latest build',
    'footer.impress': 'Legal notice',
    'footer.prerelease': '(pre-release)',
    'asset.windows.title': 'Windows app',
    'asset.windows.description': '64-bit version for Windows.',
    'asset.appimage.title': 'Linux AppImage',
    'asset.appimage.description': 'Recommended for many x86_64 Linux desktop systems, including older distributions such as Ubuntu 20.04 / Debian 11.',
    'asset.deb.title': 'Ubuntu/Debian package',
    'asset.deb.description': 'For Debian, Ubuntu, Linux Mint, and compatible distributions.',
    'asset.suse.title': 'openSUSE RPM package',
    'asset.suse.description': 'RPM package for openSUSE-based systems.',
    'asset.rpm.title': 'Fedora/RHEL RPM package',
    'asset.rpm.description': 'For Fedora, Red Hat Enterprise Linux, Rocky Linux, AlmaLinux, and compatible distributions.',
    'asset.flatpak.title': 'Linux Flatpak bundle',
    'asset.flatpak.description': 'For desktop environments that prefer Flatpak packages. Requires the 24.08 Freedesktop runtime.',
    'asset.androidArm64.title': 'Android APK for most phones and tablets',
    'asset.androidArm64.description': 'Recommended for most modern Android phones and tablets.',
    'asset.androidArm32.title': 'Android APK for older 32-bit devices',
    'asset.androidArm32.description': 'Use this only for older Android devices that do not support 64-bit apps.',
    'asset.androidX64.title': 'Android APK for emulators and x86_64 devices',
    'asset.androidX64.description': 'Use this for Android emulators or x86_64 Android devices.',
    'asset.macosArm.title': 'macOS DMG for Apple Silicon',
    'asset.macosArm.description': 'Use this for Macs with M1, M2, M3, M4, or newer Apple Silicon chips.',
    'asset.macosIntel.title': 'macOS DMG for Intel Macs',
    'asset.macosIntel.description': 'Use this for older Intel-based Macs.',
    'compatibility.title': 'System Requirements',
    'compatibility.linuxTitle': 'Linux',
    'compatibility.linuxBody': 'The .deb, .rpm and AppImage packages are built on Ubuntu 20.04 and require a 64-bit distribution with glibc 2.31 or newer and libstdc++ GLIBCXX_3.4.28 or newer (e.g. Ubuntu 20.04, Debian 11, Linux Mint 20 or newer).',
    'compatibility.flatpakTitle': 'Flatpak',
    'compatibility.flatpakBody': 'The Flatpak bundle requires the <code>org.freedesktop.Platform/x86_64/24.08</code> runtime. Install it first if it is not already on your system:<br><code>flatpak install flathub org.freedesktop.Platform/x86_64/24.08</code>',
    'compatibility.troubleTitle': 'Troubleshooting',
    'compatibility.glibcError': '<strong>GLIBC_2.34 / GLIBCXX_3.4.29 not found:</strong> Your distribution is older than the build baseline. Use the AppImage or Flatpak, or upgrade your system.',
    'compatibility.flatpakError': '<strong>Flatpak runtime not found:</strong> Add the Flathub remote and install the runtime first with the command above.',
    'mobile.title': 'Mobile Installation',
    'mobile.qrAria': 'QR code for the RustDesk server configuration',
    'mobile.qrLabel': 'Scan this QR code in the RustDesk mobile app',
    'mobile.androidTitle': 'Android',
    'mobile.androidStep1': 'Download and install the official RustDesk APK for your device from the list above.',
    'mobile.androidStep2': 'Open RustDesk, go to <strong>Settings</strong>, and tap the <i class="ti ti-qrcode"></i> (<strong>QR code icon</strong>) in the upper-right corner. Allow camera access and scan the QR code above.',
    'mobile.androidStep3': 'Alternatively, go to <strong>Settings → ID/Relay Server</strong> and paste the configuration string from the <a href="#config">Desktop Client Configuration</a> section, or enter the server details manually.',
    'mobile.iosTitle': 'iOS',
    'mobile.iosStep1': 'Install RustDesk from the <a href="https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015" target="_blank" rel="noopener">App Store</a>.',
    'mobile.iosStep2': 'Open RustDesk, go to <strong>Settings</strong>, and tap the <i class="ti ti-qrcode"></i> (<strong>QR code icon</strong>) in the upper-right corner. Allow camera access and scan the QR code above.',
    'mobile.iosStep3': 'Alternatively, go to <strong>Settings → ID/Relay Server</strong> and paste the configuration string from the <a href="#config">Desktop Client Configuration</a> section, or enter the server details manually.'
  },
  de: {
    'page.title': 'RustDesk-Clients',
    'page.description': 'Laden Sie angepasste RustDesk-Clients für einen selbst gehosteten RustDesk-Server herunter.',
    'hero.actionsLabel': 'Hauptaktionen',
    'downloads.title': 'Downloads',
    'recommended.eyebrow': 'Empfohlen für dieses Gerät',
    'recommended.defaultTitle': 'Download auswählen',
    'recommended.defaultCta': 'Optionen anzeigen',
    'recommended.defaultDescription': 'Empfohlen für die erkannte Plattform.',
    'recommended.downloadCta': 'Herunterladen',
    'recommended.macosTitle': 'Passende macOS-DMG-Datei auswählen',
    'recommended.macosDescription': 'Es gibt Builds für Apple Silicon und Intel. Diese offiziellen Upstream-Builds müssen nach der Installation manuell konfiguriert werden.',
    'recommended.macosCta': 'macOS-Optionen anzeigen',
    'recommended.iosTitle': 'Hier wird kein iOS-Build angeboten',
    'recommended.iosDescription': 'Installieren Sie RustDesk aus dem App Store und konfigurieren Sie es mit dem QR-Code oder der Konfigurationszeichenfolge im Abschnitt „Installation auf Mobilgeräten“ unten.',
    'recommended.iosCta': 'Installation auf Mobilgeräten anzeigen',
    'platform.detected': 'Auf diesem Gerät erkannt',
    'noBuild.linux': 'Noch keine Linux-Builds verfügbar.',
    'noBuild.windows': 'Noch keine Windows-Builds verfügbar.',
    'noBuild.macos': 'Noch keine macOS-Builds verfügbar.',
    'noBuild.android': 'Noch keine Android-Builds verfügbar.',
    'macos.noteText': 'Dies sind offizielle Upstream-Builds. Die automatische Konfiguration ist darin nicht enthalten. Siehe ',
    'macos.noteLink': 'manuelle Einrichtung',
    'android.noteText': 'Dies sind offizielle Upstream-Builds. Die automatische Konfiguration ist darin nicht enthalten. Siehe ',
    'android.noteLink': 'manuelle Einrichtung',
    'manual.quickImportTitle': 'Schnellimport (empfohlen)',
    'manual.quickStep1': 'Öffnen Sie RustDesk und klicken Sie neben Ihrer ID auf die <strong>Menüschaltfläche</strong> (⋯).',
    'manual.quickStep2': 'Wählen Sie <strong>Netzwerk</strong> und entsperren Sie die Einstellungen mit Administratorrechten.',
    'manual.quickStep3': 'Öffnen Sie <strong>ID/Relay-Server</strong>, klicken Sie auf <i class="ti ti-clipboard"></i> (<strong>Serverkonfiguration importieren</strong>) und fügen Sie die Konfigurationszeichenfolge aus dem Abschnitt <a href="#config">Desktop-Client-Konfiguration</a> ein.',
    'manual.manualEntryTitle': 'Manuelle Eingabe',
    'manual.manualStep1': 'Öffnen Sie in RustDesk die <strong>ID/Relay-Server</strong>-Einstellungen (siehe Schnellimport).',
    'manual.manualStepApply': 'Klicken Sie zum Speichern auf <strong>Übernehmen</strong> oder <strong>OK</strong>.',
    'config.title': 'Desktop-Client-Konfiguration',
    'config.note': 'Die Downloads auf dieser Seite sind bereits <strong>vorkonfiguriert</strong>.<br>Sie benötigen diesen Abschnitt nur, wenn Sie den <strong>macOS</strong>-Upstream-Client oder einen regulären RustDesk-Client verwenden.',
    'config.copyHelp': 'Kopieren Sie diese Konfigurationszeichenfolge und fügen Sie sie in RustDesk unter <strong>Einstellungen → Netzwerk → ID/Relay-Server → <i class="ti ti-clipboard"></i> (Serverkonfiguration importieren)</strong> ein:',
    'config.textareaAria': 'Kodierte RustDesk-Serverkonfiguration',
    'config.copyButton': 'Konfiguration kopieren',
    'config.idServer': 'ID-Server',
    'config.relayServer': 'Relay-Server',
    'config.apiServer': 'API-Server',
    'config.key': 'Schlüssel',
    'config.noConfig': 'Keine Konfiguration verfügbar.',
    'toast.noConfig': 'Keine Konfiguration zum Kopieren verfügbar.',
    'toast.copied': 'In die Zwischenablage kopiert.',
    'toast.copyFailed': 'Kopieren fehlgeschlagen. Markieren Sie den Text und kopieren Sie ihn manuell.',
    'footer.latestBuild': 'Aktueller Build',
    'footer.impress': 'Impressum',
    'footer.prerelease': '(Vorabversion)',
    'asset.windows.title': 'Windows-App',
    'asset.windows.description': '64-Bit-Version für Windows.',
    'asset.appimage.title': 'Linux-AppImage',
    'asset.appimage.description': 'Empfohlen für viele x86_64-Linux-Desktop-Systeme, einschließlich älterer Distributionen wie Ubuntu 20.04 / Debian 11.',
    'asset.deb.title': 'Ubuntu-/Debian-Paket',
    'asset.deb.description': 'Für Debian, Ubuntu, Linux Mint und kompatible Distributionen.',
    'asset.suse.title': 'openSUSE-RPM-Paket',
    'asset.suse.description': 'RPM-Paket für openSUSE-basierte Systeme.',
    'asset.rpm.title': 'Fedora-/RHEL-RPM-Paket',
    'asset.rpm.description': 'Für Fedora, Red Hat Enterprise Linux, Rocky Linux, AlmaLinux und kompatible Distributionen.',
    'asset.flatpak.title': 'Linux-Flatpak-Bundle',
    'asset.flatpak.description': 'Für Desktop-Umgebungen, in denen Flatpak bevorzugt wird. Benötigt die 24.08 Freedesktop-Laufzeitumgebung.',
    'asset.androidArm64.title': 'Android-APK für die meisten Smartphones und Tablets',
    'asset.androidArm64.description': 'Empfohlen für die meisten modernen Android-Smartphones und Tablets.',
    'asset.androidArm32.title': 'Android-APK für ältere 32-Bit-Geräte',
    'asset.androidArm32.description': 'Nur für ältere Android-Geräte, die keine 64-Bit-Apps unterstützen.',
    'asset.androidX64.title': 'Android-APK für Emulatoren und x86_64-Geräte',
    'asset.androidX64.description': 'Für Android-Emulatoren oder x86_64-Android-Geräte.',
    'asset.macosArm.title': 'macOS-DMG für Apple Silicon',
    'asset.macosArm.description': 'Für Macs mit M1, M2, M3, M4 oder neueren Apple-Silicon-Chips.',
    'asset.macosIntel.title': 'macOS-DMG für Intel-Macs',
    'asset.macosIntel.description': 'Für ältere Intel-basierte Macs.',
    'compatibility.title': 'Systemanforderungen',
    'compatibility.linuxTitle': 'Linux',
    'compatibility.linuxBody': 'Die .deb-, .rpm- und AppImage-Pakete werden unter Ubuntu 20.04 erstellt und benötigen eine 64-Bit-Distribution mit glibc 2.31 oder neuer und libstdc++ GLIBCXX_3.4.28 oder neuer (z. B. Ubuntu 20.04, Debian 11, Linux Mint 20 oder neuer).',
    'compatibility.flatpakTitle': 'Flatpak',
    'compatibility.flatpakBody': 'Das Flatpak-Bundle benötigt die Laufzeitumgebung <code>org.freedesktop.Platform/x86_64/24.08</code>. Installieren Sie diese zuerst, falls sie noch nicht vorhanden ist:<br><code>flatpak install flathub org.freedesktop.Platform/x86_64/24.08</code>',
    'compatibility.troubleTitle': 'Fehlerbehebung',
    'compatibility.glibcError': '<strong>GLIBC_2.34 / GLIBCXX_3.4.29 not found:</strong> Ihre Distribution ist älter als die Build-Basis. Verwenden Sie das AppImage oder Flatpak, oder aktualisieren Sie Ihr System.',
    'compatibility.flatpakError': '<strong>Flatpak-Laufzeitumgebung nicht gefunden:</strong> Fügen Sie das Flathub-Remote hinzu und installieren Sie die Laufzeitumgebung zuerst mit dem Befehl oben.',
    'mobile.title': 'Installation auf Mobilgeräten',
    'mobile.qrAria': 'QR-Code für die RustDesk-Serverkonfiguration',
    'mobile.qrLabel': 'Scannen Sie diesen QR-Code in der mobilen RustDesk-App',
    'mobile.androidTitle': 'Android',
    'mobile.androidStep1': 'Laden Sie die offizielle RustDesk-APK für Ihr Gerät aus der Liste oben herunter und installieren Sie sie.',
    'mobile.androidStep2': 'Öffnen Sie RustDesk, gehen Sie zu <strong>Einstellungen</strong> und tippen Sie oben rechts auf das <i class="ti ti-qrcode"></i> (<strong>QR-Code-Symbol</strong>). Gewähren Sie den Kamerazugriff und scannen Sie den QR-Code oben.',
    'mobile.androidStep3': 'Alternativ gehen Sie zu <strong>Einstellungen → ID/Relay-Server</strong> und fügen Sie die Konfigurationszeichenfolge aus dem Abschnitt <a href="#config">Desktop-Client-Konfiguration</a> ein oder geben Sie die Serverdetails manuell ein.',
    'mobile.iosTitle': 'iOS',
    'mobile.iosStep1': 'Installieren Sie RustDesk aus dem <a href="https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015" target="_blank" rel="noopener">App Store</a>.',
    'mobile.iosStep2': 'Öffnen Sie RustDesk, gehen Sie zu <strong>Einstellungen</strong> und tippen Sie oben rechts auf das <i class="ti ti-qrcode"></i> (<strong>QR-Code-Symbol</strong>). Gewähren Sie den Kamerazugriff und scannen Sie den QR-Code oben.',
    'mobile.iosStep3': 'Alternativ gehen Sie zu <strong>Einstellungen → ID/Relay-Server</strong> und fügen Sie die Konfigurationszeichenfolge aus dem Abschnitt <a href="#config">Desktop-Client-Konfiguration</a> ein oder geben Sie die Serverdetails manuell ein.'
  }
};

document.addEventListener('DOMContentLoaded', function () {
  currentLanguage = getPreferredLanguage();
  applyLanguage(currentLanguage);

  // Set initial active state on language selector
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    const isActive = btn.getAttribute('data-lang') === currentLanguage;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  // Language selector click handlers
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const lang = btn.getAttribute('data-lang');
      if (lang) switchLanguage(lang);
    });
  });

  enhanceDownloadLinks();

  // Auto-select text in read-only config inputs on focus/click
  document.querySelectorAll('.config-value').forEach(function (input) {
    input.addEventListener('focus', function () {
      input.select();
    });
    input.addEventListener('click', function () {
      input.select();
    });
  });

  // Auto-select all text in the config-string textarea on focus/click
  const configString = document.getElementById('config-string');
  if (configString) {
    configString.addEventListener('focus', function () {
      configString.select();
    });
    configString.addEventListener('click', function () {
      configString.select();
    });
  }

  // Inline copy buttons (copy previous sibling input value)
  document.querySelectorAll('[data-copy-prev]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const input = btn.previousElementSibling;
      if (!input || !input.value) return;
      copyText(input.value).then(function () {
        showToast(t('toast.copied', 'Copied to the clipboard.'));
      }).catch(function () {
        showToast(t('toast.copyFailed', 'Copy failed. Select the text and copy it manually.'));
      });
    });
  });

  // Copy buttons
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetSel = btn.getAttribute('data-copy');
      const target = document.querySelector(targetSel);
      if (!target) return;
      const text = target.value || target.textContent || '';
      if (!text.trim()) {
        showToast(t('toast.noConfig', 'No configuration available to copy.'));
        return;
      }

      copyText(text).then(function () {
        showToast(t('toast.copied', 'Copied to the clipboard.'));
      }).catch(function () {
        showToast(t('toast.copyFailed', 'Copy failed. Select the text and copy it manually.'));
      });
    });
  });

  // Detect user platform and highlight matching card without moving the viewport.
  const platform = detectPlatform();
  if (platform) {
    const card = document.querySelector('[data-platform="' + platform + '"]');
    if (card) {
      card.classList.add('is-detected');
      const label = card.querySelector('.detected-label');
      if (label) label.hidden = false;
    }
  }
  updateRecommendedDownload(platform);
});

function getPreferredLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get('lang');
  if (queryLanguage && I18N[queryLanguage.toLowerCase()]) {
    return queryLanguage.toLowerCase();
  }

  const languages = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || navigator.userLanguage || 'en'];

  return languages.some(function (language) {
    return /^de\b/i.test(language);
  }) ? 'de' : 'en';
}

function switchLanguage(language) {
  if (!I18N[language] || language === currentLanguage) return;

  currentLanguage = language;
  applyLanguage(language);
  updateRecommendedDownload(detectPlatform());

  // Update URL without reload
  const url = new URL(window.location);
  url.searchParams.set('lang', language);
  window.history.replaceState({}, '', url);

  // Update active button state
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    const isActive = btn.getAttribute('data-lang') === language;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

function applyLanguage(language) {
  document.documentElement.lang = language;
  document.title = t('page.title', document.title);

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', t('page.description', description.getAttribute('content') || ''));

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', t('page.title', ogTitle.getAttribute('content') || ''));

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', t('page.description', ogDescription.getAttribute('content') || ''));

  document.querySelectorAll('[data-i18n]').forEach(function (element) {
    element.textContent = t(element.getAttribute('data-i18n'), element.textContent);
  });

  document.querySelectorAll('[data-i18n-html]').forEach(function (element) {
    element.innerHTML = t(element.getAttribute('data-i18n-html'), element.innerHTML);
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(function (element) {
    element.setAttribute('aria-label', t(element.getAttribute('data-i18n-aria-label'), element.getAttribute('aria-label') || ''));
  });
}

function t(key, fallback) {
  return (I18N[currentLanguage] && I18N[currentLanguage][key]) || I18N.en[key] || fallback || '';
}

function detectPlatform() {
  const ua = navigator.userAgent;

  // Android user agents usually also contain "Linux", so check Android first.
  if (/Android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Mac/i.test(ua) && navigator.maxTouchPoints > 1) return 'ios';
  if (/Win/i.test(ua)) return 'windows';
  if (/Mac/i.test(ua)) return 'macos';
  if (/Linux/i.test(ua)) return 'linux';

  return '';
}

function enhanceDownloadLinks() {
  document.querySelectorAll('.download-link').forEach(function (link) {
    const assetName = link.getAttribute('data-asset-name') || link.textContent.trim();
    const label = getAssetLabel(assetName);

    link.textContent = '';

    const title = document.createElement('span');
    title.className = 'download-title';
    title.textContent = label.title;

    const meta = document.createElement('span');
    meta.className = 'download-meta';
    meta.textContent = assetName;

    link.appendChild(title);
    link.appendChild(meta);
  });
}

function getAssetLabel(assetName) {
  const name = assetName.toLowerCase();

  if (name.includes('windows')) {
    return translateAssetLabel('asset.windows');
  }

  if (name.endsWith('.appimage')) {
    return translateAssetLabel('asset.appimage');
  }

  if (name.endsWith('.deb')) {
    return translateAssetLabel('asset.deb');
  }

  if (name.includes('suse') && name.endsWith('.rpm')) {
    return translateAssetLabel('asset.suse');
  }

  if (name.endsWith('.rpm')) {
    return translateAssetLabel('asset.rpm');
  }

  if (name.endsWith('.flatpak')) {
    return translateAssetLabel('asset.flatpak');
  }

  if ((name.includes('arm64-v8a') || name.includes('aarch64-signed')) && name.endsWith('.apk')) {
    return translateAssetLabel('asset.androidArm64');
  }

  if ((name.includes('armeabi-v7a') || name.includes('armv7-signed')) && name.endsWith('.apk')) {
    return translateAssetLabel('asset.androidArm32');
  }

  if ((name.includes('x86_64') || name.includes('x86_64-signed')) && name.endsWith('.apk')) {
    return translateAssetLabel('asset.androidX64');
  }

  if (name.includes('universal-signed') && name.endsWith('.apk')) {
    return translateAssetLabel('asset.androidArm64');
  }

  if ((name.includes('aarch64') || name.includes('arm64')) && name.endsWith('.dmg')) {
    return translateAssetLabel('asset.macosArm');
  }

  if (name.includes('x86_64') && name.endsWith('.dmg')) {
    return translateAssetLabel('asset.macosIntel');
  }

  return {
    title: assetName,
    description: ''
  };
}

function translateAssetLabel(prefix) {
  return {
    title: t(prefix + '.title', ''),
    description: t(prefix + '.description', '')
  };
}

function updateRecommendedDownload(platform) {
  const panel = document.getElementById('recommended-download');
  if (!panel || !platform) return;

  const title = document.getElementById('recommended-title');
  const description = document.getElementById('recommended-description');
  const link = document.getElementById('recommended-link');
  const card = document.querySelector('[data-platform="' + platform + '"]');

  if (!title || !description || !link) return;
  link.removeAttribute('download');

  if (platform === 'ios') {
    panel.hidden = false;
    title.textContent = t('recommended.iosTitle', 'No iOS build is provided here');
    description.textContent = t('recommended.iosDescription', 'Install RustDesk from the App Store and configure it using the QR code or configuration string in the Mobile Installation section below.');
    link.href = '#mobile';
    link.textContent = t('recommended.iosCta', 'View mobile installation');
    return;
  }

  if (!card) return;

  if (platform === 'macos') {
    panel.hidden = false;
    title.textContent = t('recommended.macosTitle', 'Choose the right macOS DMG file');
    description.textContent = t('recommended.macosDescription', 'Apple Silicon and Intel builds are available. These official upstream builds must be configured manually after installation.');
    link.href = '#downloads';
    link.textContent = t('recommended.macosCta', 'View macOS options');
    return;
  }

  const preferredSelectors = {
    linux: [
      '[data-asset-name$=".AppImage"]',
      '[data-asset-name$=".deb"]',
      '.download-link'
    ],
    windows: [
      '[data-asset-name*="windows"]',
      '.download-link'
    ],
    android: [
      '[data-asset-name*="aarch64-signed"]',
      '[data-asset-name*="universal-signed"]',
      '.download-link'
    ]
  };

  const selectors = preferredSelectors[platform] || ['.download-link'];
  let recommended = null;

  for (const selector of selectors) {
    recommended = card.querySelector(selector);
    if (recommended) break;
  }

  if (!recommended) return;

  const assetName = recommended.getAttribute('data-asset-name') || recommended.textContent.trim();
  const label = getAssetLabel(assetName);

  panel.hidden = false;
  title.textContent = label.title;
  description.textContent = label.description || t('recommended.defaultDescription', 'Recommended for your detected platform.');
  link.href = recommended.href;
  link.textContent = t('recommended.downloadCta', 'Download');
  link.setAttribute('download', '');
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise(function (resolve, reject) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      successful ? resolve() : reject(new Error('Copy command failed'));
    } catch (err) {
      document.body.removeChild(textarea);
      reject(err);
    }
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(function () {
    toast.classList.remove('show');
  }, 2000);
}
