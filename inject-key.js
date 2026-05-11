/**
 * inject-key.js
 * Reemplaza el placeholder __GOOGLE_MAPS_KEY__ en index.html
 * con la variable de entorno GOOGLE_MAPS_API_KEY antes del deploy.
 * Se ejecuta automáticamente en el build de Vercel.
 */

const fs  = require('fs');
const path = require('path');

const key = process.env.GOOGLE_MAPS_API_KEY;

if (!key) {
  console.error('[inject-key] ERROR: La variable de entorno GOOGLE_MAPS_API_KEY no está definida.');
  console.error('[inject-key] Configurala en Vercel: Settings → Environment Variables');
  process.exit(1);
}

const filePath = path.join(__dirname, 'index.html');
const html     = fs.readFileSync(filePath, 'utf8');

if (!html.includes('__GOOGLE_MAPS_KEY__')) {
  console.warn('[inject-key] Advertencia: placeholder __GOOGLE_MAPS_KEY__ no encontrado en index.html');
  process.exit(0);
}

const result = html.replace('__GOOGLE_MAPS_KEY__', key);
fs.writeFileSync(filePath, result, 'utf8');

console.log('[inject-key] ✓ API Key inyectada correctamente en index.html');
