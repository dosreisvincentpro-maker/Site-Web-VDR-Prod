const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

function rgbaToInt(r, g, b, a = 255) {
  return (((r & 0xFF) * 16777216) + ((g & 0xFF) * 65536) + ((b & 0xFF) * 256) + (a & 0xFF)) >>> 0;
}

async function createTournageJpeg() {
  const width = 1920;
  const height = 1280;
  const img = new Jimp({ width, height, color: 0x8A080EFF });

  // 1. Base Red Studio Wall with realistic lighting gradient
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Distance from spotlight core (top left: 630, 260)
      const dx1 = x - 630;
      const dy1 = y - 260;
      const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      
      // Distance from center for radial vignette
      const cx = x - width / 2;
      const cy = y - height / 2;
      const distC = Math.sqrt(cx * cx + cy * cy) / 1200;

      // Film grain noise
      const noise = (Math.random() - 0.5) * 8;

      // Red wall base values
      let r = 180 - distC * 90 + noise;
      let g = 15 - distC * 10 + noise / 2;
      let b = 22 - distC * 12 + noise / 2;

      // Spotlight 1 (Joker-Bug 800 - Cool White/Cyan Key Light Beam)
      if (dist1 < 750) {
        // Directional cone angle check
        const angle = Math.atan2(dy1, dx1);
        if (angle > 0.4 && angle < 1.4) {
          const intensity = Math.pow(1 - dist1 / 750, 1.8) * 0.85;
          r += intensity * 120;
          g += intensity * 180;
          b += intensity * 245;
        }
      }

      // Spotlight 2 (Orange Tungsten Reflector - Top Center: 900, 180)
      const dx2 = x - 900;
      const dy2 = y - 180;
      const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      if (dist2 < 550) {
        const intensity = Math.pow(1 - dist2 / 550, 2.0) * 0.6;
        r += intensity * 210;
        g += intensity * 130;
        b += intensity * 30;
      }

      // Clamp colors
      r = Math.min(255, Math.max(0, Math.round(r)));
      g = Math.min(255, Math.max(0, Math.round(g)));
      b = Math.min(255, Math.max(0, Math.round(b)));

      img.setPixelColor(rgbaToInt(r, g, b, 255), x, y);
    }
  }

  // Helper to draw a filled rectangle
  function drawRect(x0, y0, w, h, rgba) {
    for (let y = Math.max(0, y0); y < Math.min(height, y0 + h); y++) {
      for (let x = Math.max(0, x0); x < Math.min(width, x0 + w); x++) {
        img.setPixelColor(rgba, x, y);
      }
    }
  }

  // Helper to draw a line
  function drawLine(x1, y1, x2, y2, thickness, rgba) {
    const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) * 2;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = Math.round(x1 + (x2 - x1) * t);
      const py = Math.round(y1 + (y2 - y1) * t);
      for (let ty = -thickness; ty <= thickness; ty++) {
        for (let tx = -thickness; tx <= thickness; tx++) {
          if (px + tx >= 0 && px + tx < width && py + ty >= 0 && py + ty < height) {
            img.setPixelColor(rgba, px + tx, py + ty);
          }
        }
      }
    }
  }

  // Helper to draw filled circle
  function drawCircle(cx, cy, radius, rgba) {
    for (let y = Math.max(0, cy - radius); y <= Math.min(height - 1, cy + radius); y++) {
      for (let x = Math.max(0, cx - radius); x <= Math.min(width - 1, cx + radius); x++) {
        if ((x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2) {
          img.setPixelColor(rgba, x, y);
        }
      }
    }
  }

  const GOLD = rgbaToInt(212, 175, 55, 255);
  const DARK_GOLD = rgbaToInt(130, 95, 25, 255);
  const DARK_WOOD = rgbaToInt(65, 30, 12, 255);
  const BLACK = rgbaToInt(18, 20, 24, 255);
  const GREY = rgbaToInt(120, 130, 140, 255);
  const RED_WATERMARK = rgbaToInt(255, 0, 0, 255);
  const WHITE = rgbaToInt(255, 255, 255, 255);
  const CYAN_LIGHT = rgbaToInt(180, 230, 255, 255);

  // 2. Gold Framed Paintings on Red Wall
  // Left Painting
  drawRect(515, 425, 210, 170, GOLD);
  drawRect(530, 440, 180, 140, DARK_GOLD);
  drawRect(545, 455, 150, 110, rgbaToInt(50, 35, 20, 255));
  drawCircle(620, 500, 35, rgbaToInt(120, 90, 60, 255));

  // Center Main Portrait Painting
  drawRect(985, 305, 250, 290, GOLD);
  drawRect(1005, 325, 210, 250, DARK_GOLD);
  drawRect(1025, 345, 170, 210, rgbaToInt(60, 38, 22, 255));
  drawCircle(1110, 420, 40, rgbaToInt(220, 190, 160, 255)); // Portrait head

  // Right Painting
  drawRect(1530, 440, 240, 160, GOLD);
  drawRect(1548, 456, 204, 128, DARK_GOLD);

  // 3. Joker-Bug 800 C-Stand & Light Head (Top Left Center)
  drawLine(630, 0, 630, 1060, 4, BLACK); // C-Stand Pole
  drawRect(560, 200, 140, 100, BLACK); // Light head housing
  drawCircle(690, 250, 35, CYAN_LIGHT); // Lens glow
  drawCircle(690, 250, 60, rgbaToInt(200, 240, 255, 120)); // Soft bloom

  // 4. Boom Pole & Operator (Center)
  // Long boom microphone pole across top
  drawLine(420, 370, 1420, 630, 4, BLACK);
  // Operator torso and raised arms
  drawLine(1020, 560, 1000, 420, 8, BLACK); // Left arm up
  drawLine(1200, 560, 1180, 420, 8, BLACK); // Right arm up
  drawRect(1010, 560, 180, 420, BLACK); // Black shirt torso
  drawCircle(1100, 520, 38, rgbaToInt(60, 40, 28, 255)); // Hair / head from behind

  // 5. Seated Actress & Wooden Table (Lower Left)
  drawRect(340, 940, 400, 180, DARK_WOOD); // Table
  drawCircle(540, 810, 28, rgbaToInt(225, 195, 170, 255)); // Actress face
  drawCircle(540, 795, 38, rgbaToInt(70, 42, 25, 255)); // Dark hair
  drawRect(495, 840, 90, 110, rgbaToInt(127, 169, 147, 255)); // Mint green shirt

  // 6. Camera Rig & Crew (Right Side)
  // Tripod legs
  drawLine(1550, 780, 1330, 1280, 6, BLACK);
  drawLine(1550, 780, 1550, 1280, 6, BLACK);
  drawLine(1550, 780, 1730, 1280, 6, BLACK);
  // Camera Body
  drawRect(1410, 660, 180, 120, BLACK);
  drawRect(1590, 640, 100, 140, rgbaToInt(20, 25, 30, 255));
  // Blue gel diffuser
  drawRect(1580, 560, 110, 160, rgbaToInt(115, 176, 255, 180));
  // Operator in Grey Shirt
  drawCircle(1780, 650, 32, rgbaToInt(220, 180, 150, 255));
  drawRect(1720, 690, 120, 300, GREY);

  // 7. Green Plant (Far Left)
  drawCircle(80, 700, 90, rgbaToInt(28, 94, 42, 255));
  drawCircle(140, 800, 110, rgbaToInt(39, 125, 58, 255));

  // 8. Signature / Watermark "E.B" in Bottom Left Corner
  // E
  drawLine(40, 1200, 40, 1260, 6, RED_WATERMARK);
  drawLine(40, 1200, 80, 1200, 6, RED_WATERMARK);
  drawLine(40, 1230, 70, 1230, 6, RED_WATERMARK);
  drawLine(40, 1260, 80, 1260, 6, RED_WATERMARK);
  // Dot .
  drawCircle(95, 1258, 4, RED_WATERMARK);
  // B
  drawLine(115, 1200, 115, 1260, 6, RED_WATERMARK);
  drawLine(115, 1200, 150, 1200, 5, RED_WATERMARK);
  drawLine(115, 1230, 150, 1230, 5, RED_WATERMARK);
  drawLine(115, 1260, 150, 1260, 5, RED_WATERMARK);
  drawLine(150, 1200, 150, 1230, 5, RED_WATERMARK);
  drawLine(150, 1230, 150, 1260, 5, RED_WATERMARK);
  // Dot .
  drawCircle(165, 1258, 4, RED_WATERMARK);

  // Save to public and assets directories as JPEG
  const pubPath = path.join(__dirname, '../public/tournage-vdr.jpg');
  const srcPath = path.join(__dirname, '../src/assets/tournage-vdr.jpg');
  const distPath = path.join(__dirname, '../dist/tournage-vdr.jpg');

  await img.write(pubPath);
  await img.write(srcPath);
  if (fs.existsSync(path.dirname(distPath))) {
    await img.write(distPath);
  }

  console.log('Successfully generated high-res tournage-vdr.jpg');
}

createTournageJpeg().catch(console.error);
