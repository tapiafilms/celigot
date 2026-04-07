/* ══════════════════════════════════════
   SERVICE WORKER — CeliGO PWA
   Versión: 1.0.0
   ══════════════════════════════════════ */

const CACHE_NAME = 'celigo-v5';

/* Recursos que se cachean al instalar */
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/styles.css',
  '/js/places.js',
  '/js/onboarding.js',
  '/js/app.js',
  '/js/scanner.js',
  '/js/chat.js',
  '/js/restaurant-detail.js',
  '/js/parallax.js',
  '/img/logo-full.png',
  '/img/logo-icon.png',
  '/img/ce-logo.png',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/img/apple-touch-icon.png',
  '/img/quimey-plato.jpg',
  '/img/scanner.jpg',
  '/img/delivery.jpg',
  '/img/bg-leaves.jpg',
  '/img/bg-dark-leaves.jpg',
];

/* ── INSTALL: pre-cachear todos los assets estáticos ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      /* Fuerza activación inmediata sin esperar a que cierren otras tabs */
      return self.skipWaiting();
    })
  );
});

/* ── ACTIVATE: limpiar cachés viejos ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => {
      /* Tomar control de todas las páginas inmediatamente */
      return self.clients.claim();
    })
  );
});

/* ── FETCH: estrategia según tipo de recurso ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  /* ① Llamadas a la API (Cloudflare Worker) → siempre red, sin caché */
  if (url.hostname.includes('workers.dev') || url.hostname.includes('anthropic.com')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({
            error: true,
            mensaje: 'Sin conexión. El análisis de IA requiere internet.'
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  /* ② Fuentes de Google → network first, fallback a caché */
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME + '-fonts').then(cache => {
        return cache.match(request).then(cached => {
          const networkFetch = fetch(request).then(response => {
            cache.put(request, response.clone());
            return response;
          });
          return cached || networkFetch;
        });
      })
    );
    return;
  }

  /* ③ Assets locales → caché first, fallback a red */
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        /* Solo cachear respuestas válidas de nuestro propio origen */
        if (response.ok && url.origin === self.location.origin) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        /* Offline fallback: si es una navegación, devolver index.html */
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

/* ── MENSAJE: forzar actualización desde la app ── */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
