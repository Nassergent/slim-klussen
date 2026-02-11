const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT = 'C:/Users/info/Downloads/WhatsApp Image 2026-02-09 at 00.15.46.jpeg';
const OUT = 'C:/Users/info/Desktop/SLIM-logo';

async function main() {
  console.log('Processing original logo...');

  // Read original image info
  const meta = await sharp(INPUT).metadata();
  console.log(`Original: ${meta.width}x${meta.height}, format: ${meta.format}`);

  // Step 1: Remove black background -> transparent PNG
  // The logo has dark green + gold on black background
  // We'll use a threshold approach: pixels close to pure black become transparent
  console.log('\n1. Removing black background...');

  const { data, info } = await sharp(INPUT)
    .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0 } })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = info.width * info.height;
  const rgba = Buffer.alloc(pixels * 4);

  for (let i = 0; i < pixels; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];

    // Calculate brightness
    const brightness = (r + g + b) / 3;

    // Black background detection - if very dark, make transparent
    // Use threshold of ~30 to catch near-black pixels
    // Also detect the dark shadow areas around the logo
    if (brightness < 28) {
      rgba[i * 4] = 0;
      rgba[i * 4 + 1] = 0;
      rgba[i * 4 + 2] = 0;
      rgba[i * 4 + 3] = 0; // fully transparent
    } else if (brightness < 50) {
      // Semi-transparent edge zone for smooth anti-aliasing
      const alpha = Math.min(255, Math.round((brightness - 28) / 22 * 255));
      rgba[i * 4] = r;
      rgba[i * 4 + 1] = g;
      rgba[i * 4 + 2] = b;
      rgba[i * 4 + 3] = alpha;
    } else {
      rgba[i * 4] = r;
      rgba[i * 4 + 1] = g;
      rgba[i * 4 + 2] = b;
      rgba[i * 4 + 3] = 255; // fully opaque
    }
  }

  // Write the transparent version at full size
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(`${OUT}/slim-logo-transparent-1024.png`);
  console.log('  Created: slim-logo-transparent-1024.png');

  // Step 2: Create white background version
  console.log('\n2. Creating white background version...');
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(`${OUT}/slim-logo-white-bg.png`);
  console.log('  Created: slim-logo-white-bg.png');

  // Step 3: Create dark background version
  console.log('\n3. Creating dark background version...');
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .flatten({ background: { r: 17, g: 17, b: 17 } })
    .png()
    .toFile(`${OUT}/slim-logo-dark-bg.png`);
  console.log('  Created: slim-logo-dark-bg.png');

  // Step 4: Generate size variants
  console.log('\n4. Generating size variants...');
  const sizes = [
    { name: 'slim-logo-512.png', w: 512 },
    { name: 'slim-logo-256.png', w: 256 },
    { name: 'slim-logo-192.png', w: 192 },
    { name: 'slim-logo-128.png', w: 128 },
  ];

  for (const s of sizes) {
    await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
      .resize(s.w, s.w, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(`${OUT}/${s.name}`);
    console.log(`  Created: ${s.name}`);
  }

  // Step 5: Favicon versions (crop to just the emblem, no text)
  // The emblem is roughly the top 80% of the image
  console.log('\n5. Creating favicon versions (emblem only)...');

  // First create a cropped version - just the circular emblem without "SLIM" text
  // The text starts at roughly 85% down the image
  const emblemHeight = Math.round(info.height * 0.82);
  const emblemData = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: 0, top: 0, width: info.width, height: emblemHeight })
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(emblemData).toFile(`${OUT}/favicon-512.png`);
  console.log('  Created: favicon-512.png');

  // Apple touch icon (180x180)
  await sharp(emblemData)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(`${OUT}/apple-touch-icon-180.png`);
  console.log('  Created: apple-touch-icon-180.png');

  // Favicon sizes
  const faviconSizes = [
    { name: 'favicon-192.png', w: 192 },
    { name: 'favicon-96.png', w: 96 },
    { name: 'favicon-48.png', w: 48 },
    { name: 'favicon-32.png', w: 32 },
    { name: 'favicon-16.png', w: 16 },
  ];

  for (const s of faviconSizes) {
    await sharp(emblemData)
      .resize(s.w, s.w, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(`${OUT}/${s.name}`);
    console.log(`  Created: ${s.name}`);
  }

  // Step 6: Create a high quality version with enhanced colors
  console.log('\n6. Creating enhanced color version...');
  await sharp(INPUT)
    .resize(2048, 2048, { fit: 'contain', background: { r: 0, g: 0, b: 0 } })
    .modulate({
      brightness: 1.05,
      saturation: 1.15,
    })
    .sharpen({ sigma: 1 })
    .toBuffer()
    .then(async (enhanced) => {
      // Now remove background from enhanced version
      const { data: eData, info: eInfo } = await sharp(enhanced).raw().toBuffer({ resolveWithObject: true });
      const eRgba = Buffer.alloc(eInfo.width * eInfo.height * 4);

      for (let i = 0; i < eInfo.width * eInfo.height; i++) {
        const r = eData[i * 3];
        const g = eData[i * 3 + 1];
        const b = eData[i * 3 + 2];
        const brightness = (r + g + b) / 3;

        if (brightness < 30) {
          eRgba[i * 4] = 0;
          eRgba[i * 4 + 1] = 0;
          eRgba[i * 4 + 2] = 0;
          eRgba[i * 4 + 3] = 0;
        } else if (brightness < 55) {
          const alpha = Math.min(255, Math.round((brightness - 30) / 25 * 255));
          eRgba[i * 4] = r;
          eRgba[i * 4 + 1] = g;
          eRgba[i * 4 + 2] = b;
          eRgba[i * 4 + 3] = alpha;
        } else {
          eRgba[i * 4] = r;
          eRgba[i * 4 + 1] = g;
          eRgba[i * 4 + 2] = b;
          eRgba[i * 4 + 3] = 255;
        }
      }

      await sharp(eRgba, { raw: { width: eInfo.width, height: eInfo.height, channels: 4 } })
        .png()
        .toFile(`${OUT}/slim-logo-enhanced-2048.png`);
      console.log('  Created: slim-logo-enhanced-2048.png');
    });

  // Step 7: Light background versions with subtle shadow
  console.log('\n7. Creating light background variant with shadow...');
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .flatten({ background: { r: 245, g: 245, b: 245 } })
    .png()
    .toFile(`${OUT}/slim-logo-lightgray-bg.png`);
  console.log('  Created: slim-logo-lightgray-bg.png');

  // Step 8: WebP versions for modern browsers
  console.log('\n8. Creating WebP versions...');
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 95, alphaQuality: 100 })
    .toFile(`${OUT}/slim-logo.webp`);
  console.log('  Created: slim-logo.webp');

  console.log('\n=== ALL FILES GENERATED ===');
  console.log('\nFiles in output directory:');
  const files = fs.readdirSync(OUT).filter(f => !f.endsWith('.js') && !f.endsWith('.json') && f !== 'node_modules');
  files.sort();
  files.forEach(f => {
    const stat = fs.statSync(path.join(OUT, f));
    const kb = (stat.size / 1024).toFixed(1);
    console.log(`  ${f.padEnd(40)} ${kb} KB`);
  });
}

main().catch(console.error);
