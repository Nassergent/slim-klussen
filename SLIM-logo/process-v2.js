const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT = 'C:/Users/info/Downloads/WhatsApp Image 2026-02-09 at 00.15.46.jpeg';
const OUT = 'C:/Users/info/Desktop/SLIM-logo';

async function removeBlackBackground(inputBuffer, width, height) {
  // More precise background removal:
  // - Pure black background: R≈G≈B and all < 20
  // - Dark green logo parts: G is notably higher than R and B
  // - Gold parts: R and G are high, B is lower
  // Strategy: only remove pixels where all channels are very low AND similar

  const pixels = width * height;
  const rgba = Buffer.alloc(pixels * 4);

  for (let i = 0; i < pixels; i++) {
    const r = inputBuffer[i * 3];
    const g = inputBuffer[i * 3 + 1];
    const b = inputBuffer[i * 3 + 2];

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const brightness = (r + g + b) / 3;
    const saturation = max > 0 ? (max - min) / max : 0;

    // Determine if pixel is background black
    // Background pixels: very dark AND low saturation (gray-ish)
    // Logo dark green: has greenish tint even when dark
    const isBackground = (
      brightness < 18 ||  // Very dark pixels
      (brightness < 35 && saturation < 0.15) // Dark and colorless (gray/black)
    );

    // Edge anti-aliasing zone
    const isEdge = !isBackground && (
      (brightness < 45 && saturation < 0.2)
    );

    if (isBackground) {
      rgba[i * 4] = 0;
      rgba[i * 4 + 1] = 0;
      rgba[i * 4 + 2] = 0;
      rgba[i * 4 + 3] = 0;
    } else if (isEdge) {
      // Smooth transition
      const alpha = Math.min(255, Math.round(((brightness - 18) / 27) * 255));
      rgba[i * 4] = r;
      rgba[i * 4 + 1] = g;
      rgba[i * 4 + 2] = b;
      rgba[i * 4 + 3] = Math.max(0, alpha);
    } else {
      rgba[i * 4] = r;
      rgba[i * 4 + 1] = g;
      rgba[i * 4 + 2] = b;
      rgba[i * 4 + 3] = 255;
    }
  }

  return rgba;
}

async function main() {
  console.log('Processing logo v2 - improved background removal...\n');

  // Process at high resolution
  const { data, info } = await sharp(INPUT)
    .resize(2048, 2048, { fit: 'contain', background: { r: 0, g: 0, b: 0 } })
    .sharpen({ sigma: 0.5 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Working at ${info.width}x${info.height}`);

  // Remove background
  const rgba = await removeBlackBackground(data, info.width, info.height);
  const rawOpts = { raw: { width: info.width, height: info.height, channels: 4 } };

  // === TRANSPARENT VERSIONS ===
  // High-res transparent
  await sharp(rgba, rawOpts).png().toFile(`${OUT}/slim-logo-transparent-2048.png`);
  console.log('Created: slim-logo-transparent-2048.png');

  // 1024px transparent
  await sharp(rgba, rawOpts).resize(1024).png().toFile(`${OUT}/slim-logo-transparent-1024.png`);
  console.log('Created: slim-logo-transparent-1024.png');

  // 512px transparent
  await sharp(rgba, rawOpts).resize(512).png().toFile(`${OUT}/slim-logo-transparent-512.png`);
  console.log('Created: slim-logo-transparent-512.png');

  // === BACKGROUND VERSIONS ===
  // White bg
  await sharp(rgba, rawOpts)
    .resize(1024)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(`${OUT}/slim-logo-white-bg.png`);
  console.log('Created: slim-logo-white-bg.png');

  // Dark bg
  await sharp(rgba, rawOpts)
    .resize(1024)
    .flatten({ background: { r: 17, g: 17, b: 17 } })
    .png()
    .toFile(`${OUT}/slim-logo-dark-bg.png`);
  console.log('Created: slim-logo-dark-bg.png');

  // Light gray bg
  await sharp(rgba, rawOpts)
    .resize(1024)
    .flatten({ background: { r: 245, g: 245, b: 245 } })
    .png()
    .toFile(`${OUT}/slim-logo-lightgray-bg.png`);
  console.log('Created: slim-logo-lightgray-bg.png');

  // === ENHANCED TRANSPARENT (brighter greens for light backgrounds) ===
  // Boost greens for light background usage
  const enhancedData = Buffer.from(rgba);
  for (let i = 0; i < info.width * info.height; i++) {
    const a = enhancedData[i * 4 + 3];
    if (a > 0) {
      let r = enhancedData[i * 4];
      let g = enhancedData[i * 4 + 1];
      let b = enhancedData[i * 4 + 2];

      // Boost saturation slightly for dark greens
      if (g > r && g > b && g < 120) {
        // It's a dark green - make it richer
        enhancedData[i * 4] = Math.max(0, Math.round(r * 0.85));
        enhancedData[i * 4 + 1] = Math.min(255, Math.round(g * 1.2));
        enhancedData[i * 4 + 2] = Math.max(0, Math.round(b * 0.85));
      }
    }
  }

  await sharp(enhancedData, rawOpts)
    .resize(1024)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(`${OUT}/slim-logo-enhanced-white.png`);
  console.log('Created: slim-logo-enhanced-white.png');

  // === FAVICON VERSIONS ===
  // Extract emblem (without "SLIM" text) - top ~80% of image
  const emblemCrop = Math.round(info.height * 0.80);
  const emblem = await sharp(rgba, rawOpts)
    .extract({ left: 0, top: 0, width: info.width, height: emblemCrop })
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(emblem).toFile(`${OUT}/favicon-512.png`);
  console.log('Created: favicon-512.png');

  const favSizes = [192, 180, 96, 48, 32, 16];
  for (const s of favSizes) {
    const name = s === 180 ? 'apple-touch-icon.png' : `favicon-${s}.png`;
    await sharp(emblem).resize(s, s).png().toFile(`${OUT}/${name}`);
    console.log(`Created: ${name}`);
  }

  // === WEBP VERSION ===
  await sharp(rgba, rawOpts).resize(1024).webp({ quality: 95, alphaQuality: 100 }).toFile(`${OUT}/slim-logo.webp`);
  console.log('Created: slim-logo.webp');

  console.log('\n=== DONE ===');

  // List final files
  const files = fs.readdirSync(OUT)
    .filter(f => (f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.svg')) && !f.startsWith('preview'))
    .sort();
  console.log(`\n${files.length} logo files:`);
  files.forEach(f => {
    const kb = (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0);
    console.log(`  ${f.padEnd(42)} ${kb} KB`);
  });
}

main().catch(console.error);
