# Convert SVG Icons to PNG

Chrome extensions require PNG icon files. Here are quick ways to convert:

## Option 1: Online Converter (Easiest)
1. Go to https://cloudconvert.com/svg-to-png
2. Upload each SVG file (`icon16.svg`, `icon32.svg`, etc.)
3. Set output size (16x16, 32x32, 48x48, 128x128)
4. Download and save as PNG in `icons/` folder

## Option 2: Use HTML Converter (Local)
1. Open `scripts/create-png-icons.html` in your browser
2. Click "Download All PNG Icons"
3. Save files to `extension/icons/` folder

## Option 3: Image Editor
- Use Photoshop, GIMP, or any image editor
- Open SVG file
- Export as PNG with correct dimensions

## Quick Command (if you have ImageMagick)
```bash
for size in 16 32 48 128; do
  convert icons/icon${size}.svg -resize ${size}x${size} icons/icon${size}.png
done
```

## After Conversion
Make sure you have these files in `extension/icons/`:
- ✅ icon16.png (16x16)
- ✅ icon32.png (32x32)
- ✅ icon48.png (48x48)
- ✅ icon128.png (128x128)

Then the extension will load properly in Chrome!



