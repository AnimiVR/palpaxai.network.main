// Generate placeholder icons for Chrome extension
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'icons');

// Create icons directory
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG template for PayAI icon
const svgTemplate = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4D63F6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.5}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">PA</text>
</svg>
`.trim();

// Generate SVG files (Chrome can use SVG icons in newer versions)
const sizes = [16, 32, 48, 128];

console.log('Generating icon files...');

sizes.forEach(size => {
  const svg = svgTemplate(size);
  const svgPath = path.join(iconsDir, `icon${size}.svg`);
  fs.writeFileSync(svgPath, svg);
  console.log(`✓ Created icon${size}.svg`);
  
  // Also create a note about PNG conversion
  const readmePath = path.join(iconsDir, 'README.txt');
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, `Icon files generated!\n\nFor best compatibility, convert SVG to PNG:\n- icon16.svg -> icon16.png (16x16)\n- icon32.svg -> icon32.png (32x32)\n- icon48.svg -> icon48.png (48x48)\n- icon128.svg -> icon128.png (128x128)\n\nYou can use online converters like:\n- https://cloudconvert.com/svg-to-png\n- Or any image editor\n`);
  }
});

console.log('\n✓ Icon files generated successfully!');
console.log('\nNote: For Chrome extension, PNG files are preferred.');
console.log('You can convert SVG to PNG using online tools or image editors.');
console.log(`Icons saved in: ${iconsDir}`);



