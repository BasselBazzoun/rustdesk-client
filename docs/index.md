---
layout: default
title: Download
---

<script>
window.RUSTDESK_CONFIG = {
  encoded_string: "{{ site.data.config.encoded_string | escape }}",
  id_server: "{{ site.data.config.id_server | escape }}",
  relay_server: "{{ site.data.config.relay_server | escape }}",
  api_server: "{{ site.data.config.api_server | escape }}",
  key: "{{ site.data.config.key | escape }}"
};
</script>

<header class="site-header">
  <div class="container">
    <div class="header-top">
      <h1>{{ site.data.config.client_name | default: site.title }}</h1>
      <div class="lang-selector" aria-label="Language selection">
        <button class="lang-btn" data-lang="en" aria-pressed="false">EN</button>
        <button class="lang-btn" data-lang="de" aria-pressed="false">DE</button>
      </div>
    </div>
    <div class="hero-actions" aria-label="Primary actions" data-i18n-aria-label="hero.actionsLabel">
      <a class="btn btn-hero" href="#downloads" data-i18n="downloads.title">Downloads</a>
      <a class="btn btn-hero btn-secondary" href="#mobile" data-i18n="mobile.title">Mobile Installation</a>
      <a class="btn btn-hero btn-secondary" href="#config" data-i18n="config.title">Desktop Client Configuration</a>
    </div>
  </div>
</header>

<main class="container">

  <!-- Downloads -->
  <section class="section" id="downloads">
    <div class="recommended-download" id="recommended-download" hidden>
      <p class="eyebrow" data-i18n="recommended.eyebrow">Recommended for this device</p>
      <h3 id="recommended-title">Choose a download</h3>
      <p id="recommended-description"></p>
      <a class="btn" id="recommended-link" href="#downloads">View options</a>
    </div>

    <hr class="section-divider">
    <h2 class="section-title" data-i18n="downloads.title">Downloads</h2>

    <div class="download-grid">

      <!-- Linux -->
      <div class="card" data-platform="linux">
        <h3>
          <i class="ti ti-brand-ubuntu icon"></i>
          Linux
        </h3>
        <p class="detected-label" hidden data-i18n="platform.detected">Detected on this device</p>
        {% if site.data.release.assets.linux.size > 0 %}
        <ul>
          {% for asset in site.data.release.assets.linux %}
          <li><a class="download-link" href="{{ asset.url }}" download data-asset-name="{{ asset.name | escape }}">{{ asset.name }}</a></li>
          {% endfor %}
        </ul>
        {% else %}
        <p class="no-build" data-i18n="noBuild.linux">No Linux builds available yet.</p>
        {% endif %}
      </div>

      <!-- Windows + macOS column -->
      <div class="card-column">
        <!-- Windows -->
        <div class="card" data-platform="windows">
          <h3>
            <i class="ti ti-brand-windows icon"></i>
            Windows
          </h3>
          <p class="detected-label" hidden data-i18n="platform.detected">Detected on this device</p>
          {% if site.data.release.assets.windows.size > 0 %}
          <ul>
            {% for asset in site.data.release.assets.windows %}
            <li><a class="download-link" href="{{ asset.url }}" download data-asset-name="{{ asset.name | escape }}">{{ asset.name }}</a></li>
            {% endfor %}
          </ul>
          {% else %}
          <p class="no-build" data-i18n="noBuild.windows">No Windows builds available yet.</p>
          {% endif %}
        </div>

        <!-- macOS -->
        <div class="card" data-platform="macos">
          <h3>
            <i class="ti ti-brand-apple icon"></i>
            macOS
          </h3>
          <p class="detected-label" hidden data-i18n="platform.detected">Detected on this device</p>
          {% assign macos_x64 = site.data.release.upstream_macos.x64 %}
          {% assign macos_arm64 = site.data.release.upstream_macos.arm64 %}
          {% if macos_x64.url != "" or macos_arm64.url != "" %}
          <ul>
            {% if macos_x64.url != "" %}
            <li><a class="download-link" href="{{ macos_x64.url }}" download data-asset-name="{{ macos_x64.name | escape }}">{{ macos_x64.name }}</a></li>
            {% endif %}
            {% if macos_arm64.url != "" %}
            <li><a class="download-link" href="{{ macos_arm64.url }}" download data-asset-name="{{ macos_arm64.name | escape }}">{{ macos_arm64.name }}</a></li>
            {% endif %}
          </ul>
          <div class="note">
            <span data-i18n="macos.noteText">These are official upstream builds and do not include your self-hosted server configuration.</span>
            <a href="#config" data-i18n="macos.noteLink">See manual setup steps.</a>
          </div>
          {% else %}
          <p class="no-build" data-i18n="noBuild.macos">No macOS builds available yet.</p>
          {% endif %}
        </div>
      </div>

      <!-- Android -->
      <div class="card" data-platform="android">
        <h3>
          <i class="ti ti-brand-android icon"></i>
          Android
        </h3>
        <p class="detected-label" hidden data-i18n="platform.detected">Detected on this device</p>
        {% assign android_arm64 = site.data.release.upstream_android.arm64 %}
        {% assign android_arm32 = site.data.release.upstream_android.arm32 %}
        {% assign android_x64 = site.data.release.upstream_android.x64 %}
        {% assign android_universal = site.data.release.upstream_android.universal %}
        {% if android_arm64.url != "" or android_arm32.url != "" or android_x64.url != "" or android_universal.url != "" %}
        <ul>
          {% if android_arm64.url != "" %}
          <li><a class="download-link" href="{{ android_arm64.url }}" download data-asset-name="{{ android_arm64.name | escape }}">{{ android_arm64.name }}</a></li>
          {% endif %}
          {% if android_arm32.url != "" %}
          <li><a class="download-link" href="{{ android_arm32.url }}" download data-asset-name="{{ android_arm32.name | escape }}">{{ android_arm32.name }}</a></li>
          {% endif %}
          {% if android_x64.url != "" %}
          <li><a class="download-link" href="{{ android_x64.url }}" download data-asset-name="{{ android_x64.name | escape }}">{{ android_x64.name }}</a></li>
          {% endif %}
          {% if android_universal.url != "" %}
          <li><a class="download-link" href="{{ android_universal.url }}" download data-asset-name="{{ android_universal.name | escape }}">{{ android_universal.name }}</a></li>
          {% endif %}
        </ul>
        <div class="note">
          <span data-i18n="android.noteText">These are official upstream builds and do not include your self-hosted server configuration.</span>
          <a href="#config" data-i18n="android.noteLink">See manual setup steps.</a>
        </div>
        {% else %}
        <p class="no-build" data-i18n="noBuild.android">No Android builds available yet.</p>
        {% endif %}
      </div>

    </div>
  </section>

  <!-- Mobile Installation -->
  <section class="section" id="mobile">
    <h2 class="section-title" data-i18n="mobile.title">Mobile Installation</h2>

    <div class="config-section">
      <div class="qr-wrapper" role="group" aria-label="QR code for the RustDesk server configuration" data-i18n-aria-label="mobile.qrAria">
        {% include qr-config.svg %}
        <p class="qr-label" data-i18n="mobile.qrLabel">Scan this QR code in the RustDesk mobile app</p>
      </div>

      <div class="instructions">
        <h4><i class="ti ti-brand-android"></i> <span data-i18n="mobile.androidTitle">Android</span></h4>
        <ol>
          <li data-i18n-html="mobile.androidStep1">Download and install the official RustDesk APK for your device from the list above.</li>
          <li data-i18n-html="mobile.androidStep2">Open RustDesk, go to <strong>Settings</strong>, and tap the <i class="ti ti-qrcode"></i> (<strong>QR code icon</strong>) in the upper-right corner. Allow camera access and scan the QR code above.</li>
          <li data-i18n-html="mobile.androidStep3">Alternatively, go to <strong>Settings → ID/Relay Server</strong> and paste the configuration string from the <a href="#config">Desktop Client Configuration</a> section, or enter the server details manually.</li>
        </ol>
      </div>

      <div class="instructions mt-1">
        <h4><i class="ti ti-brand-apple"></i> <span data-i18n="mobile.iosTitle">iOS</span></h4>
        <ol>
          <li data-i18n-html="mobile.iosStep1">Install RustDesk from the <a href="https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015" target="_blank" rel="noopener">App Store</a>.</li>
          <li data-i18n-html="mobile.iosStep2">Open RustDesk, go to <strong>Settings</strong>, and tap the <i class="ti ti-qrcode"></i> (<strong>QR code icon</strong>) in the upper-right corner. Allow camera access and scan the QR code above.</li>
          <li data-i18n-html="mobile.iosStep3">Alternatively, go to <strong>Settings → ID/Relay Server</strong> and paste the configuration string from the <a href="#config">Desktop Client Configuration</a> section, or enter the server details manually.</li>
        </ol>
      </div>
    </div>
  </section>

  <!-- Server Configuration -->
  <section class="section" id="config">
    <h2 class="section-title" data-i18n="config.title">Desktop Client Configuration</h2>
    <div class="config-section">
      <div class="config-warning">
        <i class="ti ti-alert-triangle config-warning-icon"></i>
        <span data-i18n-html="config.note">The downloads on this page are <strong>preconfigured</strong>.<br>You only need this section when using the <strong>macOS</strong> upstream client or a standard RustDesk client.</span>
      </div>
      <div class="mt-2">
        <p class="config-help" data-i18n-html="config.copyHelp">Copy this configuration string and paste it into RustDesk via <strong>Settings → Network → ID/Relay Server → <i class="ti ti-clipboard"></i> (Import Server Config)</strong>:</p>
        <div class="config-string-row">
          <textarea class="config-string" id="config-string" aria-label="Encoded RustDesk server configuration" data-i18n-aria-label="config.textareaAria" readonly>{{ site.data.config.encoded_string }}</textarea>
          <button class="btn btn-copy-inline" data-copy="#config-string"><i class="ti ti-copy"></i> <span data-i18n="config.copyButton">Copy configuration</span></button>
        </div>
      </div>

      <div class="instructions mt-2">
        <h4><i class="ti ti-copy"></i> <span data-i18n="manual.quickImportTitle">Quick Import (recommended)</span></h4>
        <ol>
          <li data-i18n-html="manual.quickStep1">Open RustDesk and click the <strong>menu button</strong> (⋯) next to your ID.</li>
          <li data-i18n-html="manual.quickStep2">Select <strong>Network</strong> and unlock the settings with administrator privileges.</li>
          <li data-i18n-html="manual.quickStep3">Open <strong>ID/Relay Server</strong>, click <i class="ti ti-clipboard"></i> (<strong>Import Server Config</strong>), and paste the configuration string from the section above.</li>
        </ol>
      </div>

      <div class="instructions mt-1">
        <h4><i class="ti ti-keyboard"></i> <span data-i18n="manual.manualEntryTitle">Manual Entry</span></h4>
        <ol>
          <li data-i18n-html="manual.manualStep1">Open RustDesk → <strong>ID/Relay Server</strong> settings (see Quick Import).</li>
          <li class="config-item"><strong data-i18n="config.idServer">ID server</strong>:
            <span class="config-field"><input type="text" class="config-value" value="{{ site.data.config.id_server | default: '—' }}" readonly><button class="btn btn-copy" data-copy-prev="" type="button" aria-label="Copy ID server"><i class="ti ti-copy"></i></button></span>
          </li>
          {% if site.data.config.relay_server != "" %}
          <li class="config-item"><strong data-i18n="config.relayServer">Relay server</strong>:
            <span class="config-field"><input type="text" class="config-value" value="{{ site.data.config.relay_server }}" readonly><button class="btn btn-copy" data-copy-prev="" type="button" aria-label="Copy relay server"><i class="ti ti-copy"></i></button></span>
          </li>
          {% endif %}
          {% if site.data.config.api_server != "" %}
          <li class="config-item"><strong data-i18n="config.apiServer">API server</strong>:
            <span class="config-field"><input type="text" class="config-value" value="{{ site.data.config.api_server }}" readonly><button class="btn btn-copy" data-copy-prev="" type="button" aria-label="Copy API server"><i class="ti ti-copy"></i></button></span>
          </li>
          {% endif %}
          <li class="config-item"><strong data-i18n="config.key">Key</strong>:
            <span class="config-field"><input type="text" class="config-value" value="{{ site.data.config.key | default: '—' }}" readonly><button class="btn btn-copy" data-copy-prev="" type="button" aria-label="Copy key"><i class="ti ti-copy"></i></button></span>
          </li>
          <li data-i18n-html="manual.manualStepApply">Click <strong>Apply</strong> or <strong>OK</strong> to save.</li>
        </ol>
      </div>

      <div class="client-preview">
        <img src="assets/img/rustdesk_client.png" alt="RustDesk Client">
        {% if site.data.config.id_server != "" %}
        <span class="overlay overlay-id-server">{{ site.data.config.id_server }}</span>
        {% endif %}
        {% if site.data.config.relay_server != "" %}
        <span class="overlay overlay-relay-server">{{ site.data.config.relay_server }}</span>
        {% endif %}
        {% if site.data.config.api_server != "" %}
        <span class="overlay overlay-api-server">{{ site.data.config.api_server }}</span>
        {% endif %}
        {% if site.data.config.key != "" %}
        <span class="overlay overlay-key">{{ site.data.config.key }}</span>
        {% endif %}
      </div>
    </div>
  </section>

  <!-- Compatibility / Troubleshooting -->
  <section class="section" id="compatibility">
    <h2 class="section-title" data-i18n="compatibility.title">System Requirements</h2>

    <div class="config-section">
      <div class="instructions">
        <h4><i class="ti ti-info-circle"></i> <span data-i18n="compatibility.linuxTitle">Linux</span></h4>
        <p data-i18n-html="compatibility.linuxBody">
          The .deb, .rpm and AppImage packages are built on Ubuntu 20.04 and require a 64-bit distribution
          with glibc 2.31 or newer and libstdc++ GLIBCXX_3.4.28 or newer
          (e.g. Ubuntu 20.04, Debian 11, Linux Mint 20 or newer).
        </p>
      </div>

      <div class="instructions mt-1">
        <h4><i class="ti ti-package"></i> <span data-i18n="compatibility.flatpakTitle">Flatpak</span></h4>
        <p data-i18n-html="compatibility.flatpakBody">
          The Flatpak bundle requires the <code>org.freedesktop.Platform/x86_64/24.08</code> runtime.
          Install it first if it is not already on your system:
        </p>
        <pre class="config-string" style="white-space: pre-wrap;"><code>flatpak install flathub org.freedesktop.Platform/x86_64/24.08</code></pre>
      </div>

      <div class="instructions mt-1">
        <h4><i class="ti ti-alert-triangle"></i> <span data-i18n="compatibility.troubleTitle">Troubleshooting</span></h4>
        <ul>
          <li data-i18n-html="compatibility.glibcError">
            <strong>GLIBC_2.34 / GLIBCXX_3.4.29 not found:</strong>
            Your distribution is older than the build baseline. Use the AppImage or Flatpak, or upgrade your system.
          </li>
          <li data-i18n-html="compatibility.flatpakError">
            <strong>Flatpak runtime not found:</strong>
            Add the Flathub remote and install the runtime first with the command above.
          </li>
        </ul>
      </div>
    </div>
  </section>

  <noscript>
    <div class="page-note">
      Download links still work without JavaScript, but the recommended download panel, QR code, and copy buttons require it.
    </div>
  </noscript>

</main>

<footer class="site-footer">
  <div class="container">
    <p>{% if site.data.release.tag != "" %}
    <span data-i18n="footer.latestBuild">Latest build</span>: <a href="https://github.com/greensec/rustdesk-client/releases/tag/{{ site.data.release.tag }}" target="_blank" rel="noopener"><code>{{ site.data.release.tag }}</code></a>{% if site.data.release.prerelease %} <span data-i18n="footer.prerelease">(pre-release)</span>{% endif %} |
    {% endif %}
    {% if site.data.config.imprint_url != "" %}<a href="{{ site.data.config.imprint_url }}" target="_blank" data-i18n-html="footer.impress">Legal notice</a>{% endif %}
    </p>
  </div>
</footer>
