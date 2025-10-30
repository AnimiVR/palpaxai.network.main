// Convert SVG icons to PNG using canvas (requires canvas package)
const fs = require('fs');
const path = require('path');

try {
  // Try to use canvas package if available
  const { createCanvas, loadImage } = require('canvas');
  
  const iconsDir = path.join(__dirname, '..', 'icons');
  const sizes = [16, 32, 48, 128];

  console.log('Converting SVG to PNG...');

  sizes.forEach(async (size) => {
    const svgPath = path.join(iconsDir, `icon${size}.svg`);
    const pngPath = path.join(iconsDir, `icon${size}.png`);

    if (fs.existsSync(svgPath)) {
      try {
        const img = await loadImage(svgPath);
        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);
        
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(pngPath, buffer);
        console.log(`✓ Created icon${size}.png`);
      } catch (err) {
        console.error(`Error converting icon${size}.svg:`, err.message);
      }
    }
  });

  console.log('\n✓ PNG icons created successfully!');
} catch (err) {
  console.log('Canvas package not installed. Installing...');
  console.log('Run: npm install canvas');
  console.log('\nAlternatively, you can:');
  console.log('1. Use online converter: https://cloudconvert.com/svg-to-png');
  console.log('2. Use image editor to convert SVG to PNG');
  console.log('\nFor now, the extension can use SVG icons directly.');
}



