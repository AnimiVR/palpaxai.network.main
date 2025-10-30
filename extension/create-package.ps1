# PowerShell script to create Chrome Web Store package
# This creates a ZIP file with only necessary files for publishing

Write-Host "Creating Chrome Web Store package..." -ForegroundColor Green

# Remove old package if exists
if (Test-Path "payai-extension-store.zip") {
    Remove-Item "payai-extension-store.zip" -Force
    Write-Host "Removed old package" -ForegroundColor Yellow
}

# Create temporary directory
$tempDir = "store-package"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null
New-Item -ItemType Directory -Path "$tempDir/dist" | Out-Null
New-Item -ItemType Directory -Path "$tempDir/icons" | Out-Null

Write-Host "Copying files..." -ForegroundColor Cyan

# Copy manifest.json
Copy-Item "manifest.json" -Destination "$tempDir/manifest.json"

# Copy popup.html
Copy-Item "popup.html" -Destination "$tempDir/popup.html"

# Copy dist files
Copy-Item "dist/background.js" -Destination "$tempDir/dist/background.js"
Copy-Item "dist/content.js" -Destination "$tempDir/dist/content.js"
Copy-Item "dist/popup.js" -Destination "$tempDir/dist/popup.js"

# Copy icons
Copy-Item "icons/*.png" -Destination "$tempDir/icons/"

# Verify files exist
$requiredFiles = @(
    "$tempDir/manifest.json",
    "$tempDir/popup.html",
    "$tempDir/dist/background.js",
    "$tempDir/dist/content.js",
    "$tempDir/dist/popup.js",
    "$tempDir/icons/icon16.png",
    "$tempDir/icons/icon48.png",
    "$tempDir/icons/icon128.png"
)

foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "ERROR: Required file missing: $file" -ForegroundColor Red
        Remove-Item $tempDir -Recurse -Force
        exit 1
    }
}

# Create ZIP file
Write-Host "Creating ZIP package..." -ForegroundColor Cyan
Compress-Archive -Path "$tempDir/*" -DestinationPath "payai-extension-store.zip" -Force

# Cleanup
Remove-Item $tempDir -Recurse -Force

Write-Host ""
Write-Host "✅ Package created successfully: payai-extension-store.zip" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://chrome.google.com/webstore/devconsole"
Write-Host "2. Upload payai-extension-store.zip"
Write-Host "3. Fill in store listing information"
Write-Host "4. Submit for review"
Write-Host ""

