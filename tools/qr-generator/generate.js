import dotenv from 'dotenv';
dotenv.config({ path: '.env.prod' });

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import QRCode from 'qrcode';

const BASE_URL = 'https://scandi-production.up.railway.app';
const CREATE_CHARM_ENDPOINT = `${BASE_URL}/api/charm`;
const OUTPUT_DIR = './tools/qr-generator/output';
const TOKEN = `Bearer ${process.env.NEXT_PRIVATE_ADMIN_TOKEN}`;
const NUM_CODES = 200; // Adjust number of codes to generate

async function createCharm() {
  const res = await fetch(CREATE_CHARM_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: TOKEN,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to create charm: ${res.statusText}`);
  }

  const data = await res.json();
  return data.charmId;
}

async function generateQRCode(link, filename) {
  const filepath = path.join(OUTPUT_DIR, `${filename}.png`);
  await QRCode.toFile(filepath, link, {
    errorCorrectionLevel: 'L',
    version: 3,
    margin: 0,
    // 0.6-inch target: 29 modules * 5px = 145px → ~0.48" at 300 DPI, close to goal
    scale: 5, // ~0.48" at 300 DPI, suitable for 0.6" acrylic printing
});
  console.log(`Generated QR for ${link} → ${filepath}`);
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (let i = 0; i < NUM_CODES; i++) {
    try {
      const charmId = await createCharm();
      const link = `https://charmski.com/charm/${charmId}`;
      await generateQRCode(link, charmId);
    } catch (err) {
      console.error('Error generating QR:', err);
    }
  }
}

main();