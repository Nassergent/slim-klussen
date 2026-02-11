const fs = require('fs');
const sharp = require('sharp');

// Color palette matching original
const COLORS = {
  darkGreen: '#1e4d1a',
  medGreen: '#2d5a27',
  lightGreen: '#3a6b34',
  gold: '#c8922a',
  goldLight: '#daa830',
  goldDark: '#a87818',
  goldStroke: '#8a6a15',
};

function generateWreathLeaves(cx, cy, radius, numBranches) {
  let paths = '';
  const angleStep = (2 * Math.PI) / numBranches;

  for (let i = 0; i < numBranches; i++) {
    const angle = i * angleStep;
    const x = cx + radius * Math.sin(angle);
    const y = cy - radius * Math.cos(angle);

    // Branch stem direction (pointing outward from center)
    const nx = Math.sin(angle);
    const ny = -Math.cos(angle);

    // Perpendicular direction for leaves
    const px = Math.cos(angle);
    const py = Math.sin(angle);

    // Leaf pairs - pointed elliptical leaves
    const leafLen = 16;
    const leafWidth = 5;

    // Outer leaf pair
    for (const side of [-1, 1]) {
      const leafAngle = angle + side * 0.45;
      const lx = x + nx * 6;
      const ly = y + ny * 6;
      const tipX = lx + Math.sin(leafAngle) * leafLen;
      const tipY = ly - Math.cos(leafAngle) * leafLen;

      // Leaf as a pointed path (two quadratic beziers)
      const cpx1 = lx + side * px * leafWidth + nx * leafLen * 0.4;
      const cpy1 = ly + side * py * leafWidth + ny * leafLen * 0.4;
      const cpx2 = lx - side * px * leafWidth * 0.3 + nx * leafLen * 0.4;
      const cpy2 = ly - side * py * leafWidth * 0.3 + ny * leafLen * 0.4;

      paths += `<path d="M${lx.toFixed(1)},${ly.toFixed(1)} Q${cpx1.toFixed(1)},${cpy1.toFixed(1)} ${tipX.toFixed(1)},${tipY.toFixed(1)} Q${cpx2.toFixed(1)},${cpy2.toFixed(1)} ${lx.toFixed(1)},${ly.toFixed(1)}" fill="${COLORS.medGreen}"/>`;

      // Leaf vein
      paths += `<line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${tipX.toFixed(1)}" y2="${tipY.toFixed(1)}" stroke="${COLORS.darkGreen}" stroke-width="0.6" opacity="0.5"/>`;
    }

    // Inner leaf pair (smaller)
    for (const side of [-1, 1]) {
      const leafAngle = angle + side * 0.7;
      const lx = x - nx * 2;
      const ly = y - ny * 2;
      const smallLeafLen = 12;
      const tipX = lx + Math.sin(leafAngle) * smallLeafLen;
      const tipY = ly - Math.cos(leafAngle) * smallLeafLen;

      const cpx1 = lx + side * px * (leafWidth * 0.8) + nx * smallLeafLen * 0.4;
      const cpy1 = ly + side * py * (leafWidth * 0.8) + ny * smallLeafLen * 0.4;
      const cpx2 = lx - side * px * (leafWidth * 0.2) + nx * smallLeafLen * 0.4;
      const cpy2 = ly - side * py * (leafWidth * 0.2) + ny * smallLeafLen * 0.4;

      paths += `<path d="M${lx.toFixed(1)},${ly.toFixed(1)} Q${cpx1.toFixed(1)},${cpy1.toFixed(1)} ${tipX.toFixed(1)},${tipY.toFixed(1)} Q${cpx2.toFixed(1)},${cpy2.toFixed(1)} ${lx.toFixed(1)},${ly.toFixed(1)}" fill="${COLORS.medGreen}"/>`;
    }
  }
  return paths;
}

function generateCelticKnotwork(cx, startY, endY, width) {
  // Two strands interweaving down the handle
  let paths = '';
  const segments = 8;
  const segHeight = (endY - startY) / segments;

  for (let i = 0; i < segments; i++) {
    const y1 = startY + i * segHeight;
    const y2 = startY + (i + 1) * segHeight;
    const yMid = (y1 + y2) / 2;

    // Strand A: goes left at even segments, right at odd
    const leftX = cx - width / 2;
    const rightX = cx + width / 2;

    if (i % 2 === 0) {
      // Strand A crosses from left to right
      paths += `<path d="M${leftX},${y1} C${leftX},${yMid} ${rightX},${yMid} ${rightX},${y2}" stroke="${COLORS.goldStroke}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
      // Strand B crosses from right to left
      paths += `<path d="M${rightX},${y1} C${rightX},${yMid} ${leftX},${yMid} ${leftX},${y2}" stroke="${COLORS.goldStroke}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    } else {
      paths += `<path d="M${rightX},${y1} C${rightX},${yMid} ${leftX},${yMid} ${leftX},${y2}" stroke="${COLORS.goldStroke}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
      paths += `<path d="M${leftX},${y1} C${leftX},${yMid} ${rightX},${yMid} ${rightX},${y2}" stroke="${COLORS.goldStroke}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    }
  }

  return paths;
}

function generateVineCircle(cx, cy, radius, numPoints) {
  // Generate a flowing vine with small undulations
  let path = '';
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const wobble = Math.sin(angle * 12) * 1.5;
    const r = radius + wobble;
    points.push({
      x: cx + r * Math.sin(angle),
      y: cy - r * Math.cos(angle)
    });
  }

  // Create smooth path through points
  path = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L${points[i].x.toFixed(1)},${points[i].y.toFixed(1)}`;
  }

  return `<path d="${path}" fill="none" stroke="${COLORS.medGreen}" stroke-width="3"/>`;
}

function generateFullLogo(options = {}) {
  const { width = 600, height = 700, showText = true, bgColor = 'none' } = options;
  const cx = width / 2;
  const wreathCY = height * 0.414;

  const wreathRadius = 244;

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${COLORS.goldLight}"/>
      <stop offset="50%" stop-color="${COLORS.gold}"/>
      <stop offset="100%" stop-color="${COLORS.goldDark}"/>
    </linearGradient>
  </defs>`;

  if (bgColor !== 'none') {
    svg += `\n  <rect width="${width}" height="${height}" fill="${bgColor}"/>`;
  }

  // === WREATH ===
  svg += `\n  <!-- Wreath -->`;
  svg += `\n  <circle cx="${cx}" cy="${wreathCY}" r="260" fill="none" stroke="${COLORS.medGreen}" stroke-width="7"/>`;
  svg += `\n  <circle cx="${cx}" cy="${wreathCY}" r="228" fill="none" stroke="${COLORS.medGreen}" stroke-width="5"/>`;

  // Vine backbone
  svg += `\n  ${generateVineCircle(cx, wreathCY, 244, 200)}`;

  // Leaves
  svg += `\n  <!-- Leaves -->`;
  svg += `\n  ${generateWreathLeaves(cx, wreathCY, 244, 28)}`;

  // Small connecting vine tendrils between leaf clusters
  for (let i = 0; i < 28; i++) {
    const angle = (i / 28) * Math.PI * 2;
    const midAngle = angle + Math.PI / 28;
    const innerR = 232;
    const outerR = 256;
    const x1 = cx + innerR * Math.sin(midAngle);
    const y1 = wreathCY - innerR * Math.cos(midAngle);
    const x2 = cx + outerR * Math.sin(midAngle);
    const y2 = wreathCY - outerR * Math.cos(midAngle);
    svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${COLORS.lightGreen}" stroke-width="1" opacity="0.4"/>`;
  }

  // === HOUSE SHIELD ===
  const shieldCY = wreathCY - 10;
  svg += `\n  <!-- House Shield -->`;
  svg += `\n  <path d="M${cx},${shieldCY - 200} L${cx + 160},${shieldCY - 82} L${cx + 160},${shieldCY + 140} L${cx - 160},${shieldCY + 140} L${cx - 160},${shieldCY - 82} Z" fill="${COLORS.darkGreen}" stroke="${COLORS.medGreen}" stroke-width="5"/>`;
  svg += `\n  <path d="M${cx},${shieldCY - 178} L${cx + 142},${shieldCY - 72} L${cx + 142},${shieldCY + 122} L${cx - 142},${shieldCY + 122} L${cx - 142},${shieldCY - 72} Z" fill="none" stroke="${COLORS.medGreen}" stroke-width="2.5"/>`;

  // === MJOLNIR ===
  const hammerCY = wreathCY - 25;

  svg += `\n  <!-- Mjolnir -->`;
  svg += `\n  <g>`;

  // Handle top cap
  svg += `\n    <rect x="${cx - 22}" y="${hammerCY - 165}" width="44" height="26" rx="5" fill="url(#goldGrad)" stroke="${COLORS.goldStroke}" stroke-width="2.5"/>`;

  // Diamond on cap
  svg += `\n    <path d="M${cx},${hammerCY - 172} L${cx + 10},${hammerCY - 152} L${cx},${hammerCY - 145} L${cx - 10},${hammerCY - 152} Z" fill="${COLORS.goldLight}" stroke="${COLORS.goldStroke}" stroke-width="2"/>`;

  // Handle shaft
  svg += `\n    <rect x="${cx - 14}" y="${hammerCY - 140}" width="28" height="140" rx="4" fill="url(#goldGrad)" stroke="${COLORS.goldStroke}" stroke-width="2.5"/>`;

  // Celtic knotwork on handle
  svg += `\n    <!-- Celtic Knotwork -->`;
  svg += `\n    ${generateCelticKnotwork(cx, hammerCY - 130, hammerCY - 5, 16)}`;

  // Hammer head - T-shape
  svg += `\n    <path d="M${cx - 95},${hammerCY} L${cx + 95},${hammerCY} L${cx + 95},${hammerCY + 50} L${cx + 70},${hammerCY + 85} L${cx + 40},${hammerCY + 105} L${cx},${hammerCY + 118} L${cx - 40},${hammerCY + 105} L${cx - 70},${hammerCY + 85} L${cx - 95},${hammerCY + 50} Z" fill="url(#goldGrad)" stroke="${COLORS.goldStroke}" stroke-width="3" stroke-linejoin="round"/>`;

  // Inner border of hammer head
  svg += `\n    <path d="M${cx - 78},${hammerCY + 10} L${cx + 78},${hammerCY + 10} L${cx + 78},${hammerCY + 44} L${cx + 58},${hammerCY + 74} L${cx + 34},${hammerCY + 92} L${cx},${hammerCY + 103} L${cx - 34},${hammerCY + 92} L${cx - 58},${hammerCY + 74} L${cx - 78},${hammerCY + 44} Z" fill="none" stroke="${COLORS.goldStroke}" stroke-width="2"/>`;

  // Heart/V pattern on hammer head
  svg += `\n    <path d="M${cx - 40},${hammerCY + 18} C${cx - 40},${hammerCY + 18} ${cx - 30},${hammerCY + 50} ${cx},${hammerCY + 80} C${cx + 30},${hammerCY + 50} ${cx + 40},${hammerCY + 18} ${cx + 40},${hammerCY + 18}" fill="none" stroke="${COLORS.goldStroke}" stroke-width="2.5" stroke-linecap="round"/>`;
  svg += `\n    <path d="M${cx - 26},${hammerCY + 24} C${cx - 26},${hammerCY + 24} ${cx - 18},${hammerCY + 48} ${cx},${hammerCY + 66} C${cx + 18},${hammerCY + 48} ${cx + 26},${hammerCY + 24} ${cx + 26},${hammerCY + 24}" fill="none" stroke="${COLORS.goldStroke}" stroke-width="2.5" stroke-linecap="round"/>`;

  // Scroll curls on sides
  svg += `\n    <path d="M${cx - 60},${hammerCY + 14} C${cx - 68},${hammerCY + 30} ${cx - 55},${hammerCY + 38} ${cx - 42},${hammerCY + 28}" fill="none" stroke="${COLORS.goldStroke}" stroke-width="2.5" stroke-linecap="round"/>`;
  svg += `\n    <path d="M${cx + 60},${hammerCY + 14} C${cx + 68},${hammerCY + 30} ${cx + 55},${hammerCY + 38} ${cx + 42},${hammerCY + 28}" fill="none" stroke="${COLORS.goldStroke}" stroke-width="2.5" stroke-linecap="round"/>`;

  // Outer curls
  svg += `\n    <path d="M${cx - 75},${hammerCY + 14} C${cx - 82},${hammerCY + 26} ${cx - 72},${hammerCY + 34} ${cx - 62},${hammerCY + 26}" fill="none" stroke="${COLORS.goldStroke}" stroke-width="2" stroke-linecap="round"/>`;
  svg += `\n    <path d="M${cx + 75},${hammerCY + 14} C${cx + 82},${hammerCY + 26} ${cx + 72},${hammerCY + 34} ${cx + 62},${hammerCY + 26}" fill="none" stroke="${COLORS.goldStroke}" stroke-width="2" stroke-linecap="round"/>`;

  svg += `\n  </g>`;

  // === TEXT ===
  if (showText) {
    svg += `\n  <!-- SLIM Text -->`;
    svg += `\n  <text x="${cx}" y="${height - 52}" font-family="Georgia, 'Times New Roman', serif" font-size="92" font-weight="bold" fill="${COLORS.darkGreen}" text-anchor="middle" letter-spacing="16">SLIM</text>`;
  }

  svg += `\n</svg>`;
  return svg;
}

function generateIconOnly(size) {
  // Icon version: just the hammer + wreath circle, no text, square format
  const svg = generateFullLogo({ width: 600, height: 600, showText: false });
  return svg.replace('viewBox="0 0 600 600"', `viewBox="0 0 600 600"`);
}

function generateFavicon() {
  // Simplified favicon: just hammer silhouette in a circle
  const size = 64;
  const cx = size / 2;
  const cy = size / 2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <!-- Background circle -->
  <circle cx="${cx}" cy="${cy}" r="30" fill="${COLORS.darkGreen}" stroke="${COLORS.medGreen}" stroke-width="2"/>
  <!-- Simplified hammer -->
  <g transform="translate(${cx},${cy - 4})">
    <!-- Handle -->
    <rect x="-3" y="-18" width="6" height="22" rx="1" fill="${COLORS.goldLight}" stroke="${COLORS.goldStroke}" stroke-width="0.8"/>
    <!-- Cap -->
    <rect x="-5" y="-21" width="10" height="5" rx="1.5" fill="${COLORS.goldLight}" stroke="${COLORS.goldStroke}" stroke-width="0.8"/>
    <!-- Head -->
    <path d="M-14,4 L14,4 L14,12 L10,17 L5,20 L0,22 L-5,20 L-10,17 L-14,12 Z" fill="${COLORS.goldLight}" stroke="${COLORS.goldStroke}" stroke-width="0.8"/>
    <!-- Simple V on head -->
    <path d="M-6,7 L0,16 L6,7" fill="none" stroke="${COLORS.goldStroke}" stroke-width="1" stroke-linecap="round"/>
  </g>
</svg>`;
}

async function main() {
  const outputDir = 'C:/Users/info/Desktop/SLIM-logo';

  // 1. Full logo (transparent background)
  const fullLogo = generateFullLogo();
  fs.writeFileSync(`${outputDir}/slim-logo-full.svg`, fullLogo);
  console.log('Created: slim-logo-full.svg');

  // 2. Full logo on dark background
  const darkBg = generateFullLogo({ bgColor: '#111111' });
  fs.writeFileSync(`${outputDir}/slim-logo-dark-bg.svg`, darkBg);
  console.log('Created: slim-logo-dark-bg.svg');

  // 3. Full logo on white background
  const whiteBg = generateFullLogo({ bgColor: '#ffffff' });
  fs.writeFileSync(`${outputDir}/slim-logo-white-bg.svg`, whiteBg);
  console.log('Created: slim-logo-white-bg.svg');

  // 4. Icon only (no text, square format)
  const iconSvg = generateFullLogo({ width: 600, height: 600, showText: false });
  fs.writeFileSync(`${outputDir}/slim-icon.svg`, iconSvg);
  console.log('Created: slim-icon.svg');

  // 5. Favicon
  const faviconSvg = generateFavicon();
  fs.writeFileSync(`${outputDir}/favicon.svg`, faviconSvg);
  console.log('Created: favicon.svg');

  // Generate PNG variants
  const pngVariants = [
    { src: 'slim-logo-full.svg', out: 'slim-logo-1024.png', w: 1024, h: 1195 },
    { src: 'slim-logo-full.svg', out: 'slim-logo-512.png', w: 512, h: 597 },
    { src: 'slim-logo-dark-bg.svg', out: 'slim-logo-dark-1024.png', w: 1024, h: 1195 },
    { src: 'slim-logo-white-bg.svg', out: 'slim-logo-white-1024.png', w: 1024, h: 1195 },
    { src: 'slim-icon.svg', out: 'slim-icon-512.png', w: 512, h: 512 },
    { src: 'slim-icon.svg', out: 'slim-icon-192.png', w: 192, h: 192 },
    { src: 'favicon.svg', out: 'favicon-32.png', w: 32, h: 32 },
    { src: 'favicon.svg', out: 'favicon-16.png', w: 16, h: 16 },
    { src: 'favicon.svg', out: 'apple-touch-icon.png', w: 180, h: 180 },
  ];

  for (const v of pngVariants) {
    try {
      const svgBuf = fs.readFileSync(`${outputDir}/${v.src}`);
      await sharp(svgBuf).resize(v.w, v.h).png().toFile(`${outputDir}/${v.out}`);
      console.log(`Created: ${v.out}`);
    } catch (e) {
      console.error(`Failed: ${v.out} - ${e.message}`);
    }
  }

  // Preview for inspection
  const previewSvg = fs.readFileSync(`${outputDir}/slim-logo-full.svg`);
  await sharp(previewSvg).resize(800, 933).png().toFile(`${outputDir}/preview-final.png`);
  console.log('Created: preview-final.png');

  console.log('\nDone! All logo files generated.');
}

main().catch(console.error);
