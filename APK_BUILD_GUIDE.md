# How to Convert React App to APK

This guide will help you convert your React + Vite application to an Android APK using Capacitor.

## Prerequisites

1. **Node.js** (v16 or higher) - Already installed
2. **Java JDK 11 or higher** - Required for Android development
   - Download from: https://adoptium.net/
   - Set JAVA_HOME environment variable
3. **Android Studio** - Required for Android SDK
   - Download from: https://developer.android.com/studio
   - Install Android SDK (API level 33 or higher)
   - Set ANDROID_HOME environment variable

## Step-by-Step Instructions

### Step 1: Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
```

### Step 2: Initialize Capacitor

```bash
npx cap init
```

When prompted:
- App name: `AuthenSec`
- App ID: `com.authensec.app`
- Web directory: `dist`

### Step 3: Build Your Web App

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Step 4: Add Android Platform

```bash
npx cap add android
```

### Step 5: Sync Your Web App with Native Project

```bash
npx cap sync
```

This copies your web build to the Android project.

### Step 6: Open in Android Studio

```bash
npx cap open android
```

Or use the npm script:
```bash
npm run cap:android
```

### Step 7: Build APK in Android Studio

1. **Wait for Gradle Sync** - Android Studio will automatically sync dependencies
2. **Connect Device or Emulator**:
   - For physical device: Enable USB debugging and connect via USB
   - For emulator: Create a virtual device (AVD) from Tools > Device Manager
3. **Build APK**:
   - **Debug APK**: Click "Run" button (green play icon) or press `Shift + F10`
   - **Release APK**: 
     - Go to `Build > Generate Signed Bundle / APK`
     - Select "APK"
     - Create or use existing keystore
     - Follow the wizard to generate signed APK

### Step 8: Find Your APK

- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release.apk`

## Quick Commands Reference

```bash
# Build web app
npm run build

# Sync with native platforms
npm run cap:sync

# Open Android Studio
npm run cap:android

# Or use individual commands
npx cap sync
npx cap open android
```

## Environment Variables Setup

### Windows:
```cmd
set JAVA_HOME=C:\Program Files\Java\jdk-11
set ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
```

### macOS/Linux:
```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
```

Add these to your `~/.bashrc` or `~/.zshrc` for persistence.

## Troubleshooting

### Issue: "Command not found: cap"
**Solution**: Use `npx cap` instead of `cap`

### Issue: "Android SDK not found"
**Solution**: 
1. Open Android Studio
2. Go to Settings > Appearance & Behavior > System Settings > Android SDK
3. Note the SDK location
4. Set ANDROID_HOME to that path

### Issue: "Gradle sync failed"
**Solution**: 
1. In Android Studio, go to File > Invalidate Caches / Restart
2. Try syncing again

### Issue: Build fails with memory error
**Solution**: Increase Gradle memory in `android/gradle.properties`:
```
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m
```

## Building Release APK (For Distribution)

1. **Create Keystore** (first time only):
```bash
keytool -genkey -v -keystore authensec-release.keystore -alias authensec -keyalg RSA -keysize 2048 -validity 10000
```

2. **Update capacitor.config.ts** with keystore details (optional, can be done in Android Studio)

3. **Build in Android Studio**:
   - Build > Generate Signed Bundle / APK
   - Select APK
   - Choose your keystore
   - Select release build variant
   - Finish

## Alternative: Build APK via Command Line

```bash
cd android
./gradlew assembleRelease
```

APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Notes

- The first build may take 10-15 minutes as Gradle downloads dependencies
- Ensure you have at least 4GB free disk space
- Internet connection required for first build
- For production, always use signed release APKs

