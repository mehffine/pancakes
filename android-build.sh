#!/bin/bash

# Quick build script for Android APK
# Usage: ./android-build.sh [debug|release]

BUILD_TYPE=${1:-debug}

echo "🚀 Building AuthenSec APK..."
echo "Build type: $BUILD_TYPE"

# Step 1: Build web app
echo "📦 Building web application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Web build failed!"
    exit 1
fi

# Step 2: Sync with Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync

if [ $? -ne 0 ]; then
    echo "❌ Capacitor sync failed!"
    exit 1
fi

# Step 3: Build Android APK
echo "🤖 Building Android APK..."
cd android

if [ "$BUILD_TYPE" = "release" ]; then
    ./gradlew assembleRelease
    APK_PATH="app/build/outputs/apk/release/app-release.apk"
else
    ./gradlew assembleDebug
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
fi

cd ..

if [ -f "android/$APK_PATH" ]; then
    echo "✅ APK built successfully!"
    echo "📍 Location: android/$APK_PATH"
    echo "📱 File size: $(du -h android/$APK_PATH | cut -f1)"
else
    echo "❌ APK build failed!"
    exit 1
fi

