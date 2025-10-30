# Usage:
#   powershell -ExecutionPolicy Bypass -File .\make-icons.ps1 -Source .\logo-400.png
# The script will write icons to .\icons\icon16.png, icon32.png, icon48.png, icon128.png

param(
  [Parameter(Mandatory=$true)]
  [string]$Source
)

$ErrorActionPreference = 'Stop'

$targetDir = Join-Path $PSScriptRoot 'icons'
if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir | Out-Null }

Add-Type -AssemblyName System.Drawing

function Resize-Image([string]$inputPath, [string]$outputPath, [int]$size) {
  $bmp = New-Object System.Drawing.Bitmap($inputPath)
  $dest = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($dest)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

  # Center-crop to square if needed
  $cropSize = [Math]::Min($bmp.Width, $bmp.Height)
  $x = [Math]::Max(0, ($bmp.Width - $cropSize) / 2)
  $y = [Math]::Max(0, ($bmp.Height - $cropSize) / 2)
  $srcRect = New-Object System.Drawing.Rectangle([int]$x, [int]$y, [int]$cropSize, [int]$cropSize)
  $dstRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)

  $g.DrawImage($bmp, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()

  $dest.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $dest.Dispose()
  $bmp.Dispose()
}

$Sizes = @(16,32,48,128)
foreach ($s in $Sizes) {
  $outPath = Join-Path $targetDir ("icon$($s).png")
  Resize-Image -inputPath $Source -outputPath $outPath -size $s
  Write-Host ("Created {0}" -f $outPath) -ForegroundColor Green
}

Write-Host ("All icons created in {0}" -f $targetDir) -ForegroundColor Cyan
