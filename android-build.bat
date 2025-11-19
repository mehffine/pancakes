@echo off
REM Quick build script for Android APK (Windows)
REM Usage: android-build.bat [debug|release]

set BUILD_TYPE=%1
if "%BUILD_TYPE%"=="" set BUILD_TYPE=debug

echo 🚀 Building AuthenSec APK...
echo Build type: %BUILD_TYPE%

REM Step 1: Build web app
echo 📦 Building web application...
call npm run build

if errorlevel 1 (
    echo ❌ Web build failed!
    exit /b 1
)

REM Step 2: Sync with Capacitor
echo 🔄 Syncing with Capacitor...
call npx cap sync

if errorlevel 1 (
    echo ❌ Capacitor sync failed!
    exit /b 1
)

REM Step 3: Build Android APK
echo 🤖 Building Android APK...
cd android

if "%BUILD_TYPE%"=="release" (
    call gradlew.bat assembleRelease
    set APK_PATH=app\build\outputs\apk\release\app-release.apk
) else (
    call gradlew.bat assembleDebug
    set APK_PATH=app\build\outputs\apk\debug\app-debug.apk
)

cd ..

if exist "android\%APK_PATH%" (
    echo ✅ APK built successfully!
    echo 📍 Location: android\%APK_PATH%
) else (
    echo ❌ APK build failed!
    exit /b 1
)

pause

