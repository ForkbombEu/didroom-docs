---
title: Customizing the Whitelabel wallet
order: 30
---

# DIDroom Wallet White-Labeling Tutorial (Android)

This tutorial shows developers how to rebrand (white-label) the DIDroom mobile wallet by customizing colors, logos, splash screens, and app icons, then building the Android app (and the web variant). DIDroom’s UI is powered by a components library; you’ll tweak theme variables and assets there.  
Component variants and tokens are documented in Storybook → https://forkbombeu.github.io/didroom-components/?path=/docs/colors--docs

---

## Prerequisites

- OS: Linux or macOS (bash/zsh)
- Node.js: v18+ (LTS recommended)
- PNPM: v8+

  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```

- Git + GitHub account (access to Forkbomb repos)
- Android tooling:
  - Android Studio (latest), Android SDK, at least one emulator (API 30+)
  - Java 17+ (e.g., Temurin/OpenJDK 17)
- Capacitor/Ionic CLIs are invoked via package scripts (no global install needed)

> Quick check:

> ```bash
> node -v
> pnpm -v
> java -version
> adb version
> ```

---

## Repositories

- Components: https://github.com/ForkbombEu/didroom-components
- Wallet: https://github.com/ForkbombEu/wallet

You can fork these into your own org to keep your branding isolated, or work directly with clones if you have push rights.

---

## 1) Clone & (Optionally) Fork the Repos

Create a working directory, and navigate into it.

```bash
mkdir -p ~/work/didroom && cd ~/work/didroom
```

Clone the two repositories needed for this exercise.

```bash
# Components
git clone https://github.com/ForkbombEu/didroom-components.git

# Wallet
git clone https://github.com/ForkbombEu/wallet.git
```

---

## 2) Install Dependencies

Install dependencies in components.

```bash
cd ~/work/didroom/didroom-components
pnpm install
```

Install dependencies in wallet.

```bash
cd ~/work/didroom/wallet
pnpm install
```

---

## 3) Configure Submodules & Environment (wallet)

Navigate into the wallet repository and initialize/update the submodules.

```bash
cd ~/work/didroom/wallet

# initialize and update submodules
git submodule update --init --recursive
```

Copy the environment example file and edit it to your likings

```bash
# environment (often staging values work out of the box)
# edit if you need to point to a custom backend, etc.
cp .env.example .env
```

The following files are relevant to the theming of the wallet (consumes variables from components):

- src/theme/variables.css
- src/theme/custom.css

---

## 4) Customize Theme Colors & Logo (components)

All brand colors and CSS variables live in the components repository:

- Global theme variables:  
  📁 didroom-components/src/global/global.css  
  (defines --surface, --primary, --accent, --on, --on-alt, --stroke, etc.)
- The logo web component:  
  📁 didroom-components/src/components/logo/d-logo.tsx  
  (inline SVG you can replace or restyle; related CSS at d-logo.css)

> Use Storybook to preview color tokens and ensure contrast is acceptable:  
> https://forkbombeu.github.io/didroom-components/?path=/docs/colors--docs

### 4.1 Edit brand variables

```bash
cd ~/work/didroom/didroom-components
$EDITOR src/global/global.css

# Example change:
# :root {
#   --surface: #F7FAF7;
#   --primary: #78C24A;  /* brand primary */
#   --accent:  #0B6623;  /* brand accent */
#   --on:      #1F2937;
#   --on-alt:  #4B5563;
#   --stroke:  #D1D5DB;
#   --highlight: #E5F6E8;
#   ...
# }
```

### 4.2 Replace inline logo (optional)

The logo is in SVG format, but resides in a .tsx file. To swap the logo, open the .tsx file and replace its content with the content of your logo's SVG file. The SVG is currently stored inline in the .tsx file - modify this as you see fit.

```bash
$EDITOR src/components/logo/d-logo.tsx
# Swap the <svg> with your brand’s SVG (keep size reasonable; optimize with svgo if needed)
```

Rebuild the components library after your changes:

```bash
pnpm build
```

---

## 5) Link your components build into the wallet

### Option A — Simple, reproducible: file dependency

Point the wallet to your local components build output and edit the package.json file:

```bash
cd ~/work/didroom/wallet
$EDITOR package.json
```

In "dependencies" set your new components build as a dependency:

```bash
"@didroom/components": "file:../didroom-components/dist"
```

Make sure the new dependencies are installed.

```bash
pnpm install
```

### Option B — pnpm link (works too)

Navigate into the didroom-components repository. Then build and link globally. Do this in the components and the wallet repository.

```bash
# From components
cd ~/work/didroom/didroom-components
pnpm build
pnpm link --global

# In wallet
cd ~/work/didroom/wallet
pnpm link --global @didroom/components
pnpm install
```

> The wallet's postinstall automations may copy dist artifacts into static/components when @didroom/components is present in node_modules; with the file: approach this works seamlessly.

---

## Run the Wallet as Web version (fast iteration)

Run as a web app during development to iterate faster:

```bash
cd ~/work/didroom/wallet
pnpm dev   # or: pnpm web (ionic serve)
```

Production build:

```bash
pnpm build
```

You will find the output in dist/

> QR/Link handling: mobile supports deeplinks; on web you’ll typically use Scan QR to paste a verification link or use camera if supported.

---

## 6) Prepare Native Assets (Wallet)

Native icons and splash files live in the wallet repository:

```bash
wallet/resources/
├── icon.png              # source icon (square, e.g., 1024x1024)
├── splash.png            # source splash (e.g., 2732x2732)
├── splash-dark.png       # optional dark splash
└── android/
    ├── icon-foreground.png
    └── icon-background.png
```

> Replace resources/icon.png and resources/splash.png with your own sources (recommended sizes above).

Generate the full Android asset matrix using the wallet’s script:

```bash
cd ~/work/didroom/wallet
pnpm icons
# (runs: npx capacitor-assets generate --ios --android)
```

---

## 7) Build & Run on Android (Capacitor/Ionic)

Make sure you have an emulator running (or a device attached via USB debugging).

```bash
cd ~/work/didroom/wallet

# build web bundle (wallet uses Vite)
pnpm build

# sync web & assets to native projects and run on Android
pnpm android
# (runs: ionic cap run android -l --external)
```

> On first run, Android Studio/Gradle will fetch dependencies. Be patient.

---

## 8) Build an APK locally

Three ways:

### A) Wallet script (assemble + install debug)

Navigate into the wallet repository, then use pnpm to assemble and install.

```bash
cd ~/work/didroom/wallet
pnpm apk
# does: ionic capacitor copy android && cd android && ./gradlew assembleDebug && ./gradlew installDebug
```

### B) Gradle command line

Navigate into the wallet repository's android folder, then run the gradle script manually.

```bash
cd ~/work/didroom/wallet/android
./gradlew assembleDebug
```

You will find the APK under: `app/build/outputs/apk/debug/app-debug.apk`

Then side-load onto a device:

```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

### C) Android Studio (Visual)

Build the APK using Android Studio's graphical interface:

1. **Open the project in Android Studio:**

   ```bash
   cd ~/work/didroom/wallet
   pnpm cap open android
   ```

2. **Wait for Gradle sync** to complete (check the bottom status bar for progress).

3. **Build the APK:**
   - In the menu bar, go to: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - Android Studio will compile the project
   - When finished, a notification will appear in the bottom-right corner

4. **Locate the APK:**
   - Click **locate** in the notification bubble, or
   - Manually navigate to: `android/app/build/outputs/apk/debug/app-debug.apk`

5. **Install on device/emulator:**
   - **Option 1:** Drag and drop the APK file onto a running emulator window
   - **Option 2:** Connect a device via USB (with USB debugging enabled) and run:
     ```bash
     adb install -r app/build/outputs/apk/debug/app-debug.apk
     ```
   - **Option 3:** In Android Studio, with a device/emulator running, go to **Run** → **Run 'app'**

> **For release builds:** Use **Build** → **Generate Signed Bundle / APK**, select **APK**, and follow the wizard to sign with your keystore.

## Troubleshooting & Tips

- Theme changes not visible:  
  Rebuild components (pnpm -C ../didroom-components build), then in wallet pnpm install && pnpm build && pnpm android.
- Assets not updating:  
  Replace files in resources/, run pnpm icons, then pnpm android.
- Submodules missing:  
  git submodule update --init --recursive in wallet directory.
- Heavy inline SVG logos:  
  Optimize with svgo or simplify paths to keep editors fast.

---

## Appendix — Quick Command Reference

```
# Components
cd didroom-components
pnpm install
# edit:
#   src/global/global.css            (brand variables)
#   src/components/logo/d-logo.tsx   (inline brand logo)
pnpm build

# Wallet
cd ../wallet
pnpm install
git submodule update --init --recursive
cp .env.example .env

# link local components (package.json -> "@didroom/components": "file:../didroom-components/dist")
pnpm install

# assets
cp ~/logos/icon.png resources/icon.png
cp ~/logos/splash.png resources/splash.png
pnpm icons

# run
pnpm build
pnpm android

# APK (debug)
pnpm apk
# or:
cd android && ./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```
