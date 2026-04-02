/* ══════════════════════════════════════
   RESTAURANTES Y TIENDAS REALES
   Verificados en fuentes públicas (2025)
   ══════════════════════════════════════ */

const restaurants = [
  {
    id: 'quimey',
    featured: true,
    name: "Quimey Fusion & Gluten Free",
    type: "RESTAURANTE · DELIVERY · 100% SIN GLUTEN",
    icon: "🍱",
    img: "img/fc-quimey.png",
    city: "viña",
    lat: -33.0354, lng: -71.5490,
    cert: true,
    rating: 4.8,
    reviews: 210,
    desc: "El primer restaurante 100% libre de gluten de Viña del Mar. Fundado por una celíaca, ofrece sushi, pizzas, pastas, hamburguesas, empanadas y pastelería. Todo sin contaminación cruzada.",
    tags: ["100% Sin gluten", "Delivery", "Vegano", "Sin lactosa", "Certificado Convivir"],
    address: "5 Norte 217, Viña del Mar",
    tel: "+56 9 3420 0177",
    web: "quimeysushi.cl",
    horario: "Lun–Jue 12–22h · Vie 12–00h · Sáb 12–22h · Dom cerrado"
  },
  {
    id: 'roofburger',
    featured: true,
    name: "Roof Burger",
    type: "HAMBURGUESAS GOURMET · PAN SIN GLUTEN",
    icon: "🍔",
    img: "img/fc-roofburger.png",
    city: "viña",
    lat: -33.0343, lng: -71.5530,
    cert: false,
    rating: 4.3,
    reviews: 89,
    desc: "Hamburguesas gourmet con pan sin gluten disponible. Ensaladas y papas rústicas. Avisar al pedir para preparación especial y evitar contaminación cruzada.",
    tags: ["Pan sin gluten", "Ensaladas", "Papas rústicas", "Consultar CC"],
    address: "6 Norte 309 esq. 4 Poniente, Viña del Mar",
    tel: "",
    web: "",
    horario: ""
  },
  {
    id: 'oops',
    featured: true,
    name: "Oops.sepuede",
    type: "PANADERÍA · REPOSTERÍA 100% SIN GLUTEN",
    icon: "🧁",
    img: "img/fc-oops.png",
    city: "viña",
    lat: -33.0411, lng: -71.5520,
    cert: true,
    rating: 4.7,
    reviews: 134,
    desc: "Panadería artesanal 100% sin gluten. Pizzas, galletas, cupcakes, brownies, marraquetas y postres. Todo libre de contaminación cruzada. Fundada por celíacos.",
    tags: ["100% Sin gluten", "Panadería", "Repostería", "Sin CC"],
    address: "1 Poniente 1008, Viña del Mar",
    tel: "",
    web: "",
    horario: ""
  },
  {
    name: "Petit Emporio Café",
    type: "CAFÉ · PASTELERÍA",
    icon: "☕",
    city: "viña",
    lat: -32.9820, lng: -71.5295,
    cert: false,
    rating: 4.4,
    reviews: 76,
    desc: "Café con menú sin gluten: tortas, galletas, sándwiches y postres. Ambiente tranquilo cerca de la playa en Reñaca.",
    tags: ["Sin gluten", "Pastelería", "Café"],
    address: "Av. Borgoño 14580, Viña del Mar",
    tel: "",
    web: "",
    horario: ""
  },
  {
    name: "IL Paparazzo Ristorante & Winebar",
    type: "RESTAURANTE ITALIANO · MEDITERRÁNEO",
    icon: "🍝",
    city: "valpo",
    lat: -33.0475, lng: -71.6250,
    cert: false,
    rating: 4.6,
    reviews: 926,
    desc: "El mejor restaurante de Valparaíso según TripAdvisor. Menú sin gluten con ceviche, pastas, salmón, atún y postres. El personal está capacitado para atender celíacos. Más de 30 cepas de vino.",
    tags: ["Opción sin gluten", "Menú GF marcado", "Vegano", "Pet Friendly"],
    address: "Papudo 424, Cerro Concepción, Valparaíso",
    tel: "+56 9 4897 8930",
    web: "ilpaparazzo.cl",
    horario: ""
  },
  {
    name: "Celina Gluten Free",
    type: "RESTAURANTE · PANADERÍA 100% SIN GLUTEN",
    icon: "🥖",
    city: "concon",
    lat: -32.9170, lng: -71.5408,
    cert: true,
    rating: 4.7,
    reviews: 112,
    desc: "Restaurante y panadería 100% libre de gluten y lactosa en Concón. Empanadas, hamburguesas, sándwiches, hot dogs, panes y postres. Todo libre de contaminación cruzada.",
    tags: ["100% Sin gluten", "Sin lactosa", "Sin CC", "Panadería"],
    address: "Av. Blanca Estela 2095, Concón",
    tel: "",
    web: "",
    horario: ""
  },
  {
    name: "Casa Kutral",
    type: "CAFÉ · RESTAURANTE VEGANO SIN GLUTEN",
    icon: "🌿",
    city: "concon",
    lat: -32.6485, lng: -71.4495,
    cert: true,
    rating: 4.5,
    reviews: 58,
    desc: "Restaurante, pastelería y café 100% vegano y sin gluten en Maitencillo. Todo apto para celíacos. Ambiente tranquilo frente al mar.",
    tags: ["100% Sin gluten", "Vegano", "Pastelería", "Frente al mar"],
    address: "Av. del Mar 2465, Maitencillo",
    tel: "",
    web: "",
    horario: "Mar–Sáb 10:30–17:30h"
  },
];

const stores = [
  {
    id: 'all-free',
    featured: true,
    name: "All Free",
    type: "TIENDA ONLINE · TODAS LAS INTOLERANCIAS",
    icon: "🌿",
    img: "img/fc-all-free.png",
    cat: "especializada",
    rating: 4.7,
    reviews: 312,
    desc: "Tienda online especializada en productos naturales para todas las alergias e intolerancias. Sin gluten, sin lactosa, vegano, keto, sin azúcar y más. Despacho a todo Chile.",
    tags: ["Sin gluten", "Sin lactosa", "Vegano", "Keto", "Despacho nacional"],
    address: "Apoquindo 7474, Las Condes · allfree.cl",
    tel: "+56 9 8230 7039"
  },
  {
    id: 'celina-online',
    featured: true,
    name: "Celina Tienda Online",
    type: "TIENDA ONLINE · 100% SIN GLUTEN",
    icon: "🛒",
    img: "img/fc-celina-online.png",
    cat: "online",
    rating: 4.7,
    reviews: 94,
    desc: "Panadería y pastelería artesanal 100% libre de gluten y lactosa con despacho a domicilio. Panes frescos, empanadas, hamburguesas y postres sin contaminación cruzada.",
    tags: ["100% Sin gluten", "Sin lactosa", "Despacho a domicilio", "Sin CC"],
    address: "Pedidos: Instagram @celina.gf",
    tel: ""
  },
  {
    id: 'jumbo',
    featured: true,
    name: "Jumbo Viña del Mar",
    type: "SUPERMERCADO · SECCIÓN SIN GLUTEN",
    icon: "🏬",
    img: "img/fc-jumbo.png",
    cat: "super",
    rating: 4.2,
    reviews: 534,
    desc: "Amplia sección de productos sin gluten en el área dietética. Marcas Schär, Proceli y productos nacionales certificados. Etiquetado de alérgenos claro en todos los productos.",
    tags: ["Schär", "Proceli", "Variedad", "Etiquetado claro"],
    address: "Av. Las Américas 600, Viña del Mar",
    tel: "600 600 5000"
  },
  {
    name: "Lider Viña del Mar",
    type: "SUPERMERCADO",
    icon: "🏪",
    cat: "super",
    rating: 4.1,
    reviews: 412,
    desc: "Sección de productos sin gluten y leches vegetales. Buena variedad de productos nacionales e importados con etiquetado de alérgenos.",
    tags: ["Sin gluten", "Leches vegetales", "Económico"],
    address: "Av. Libertad 1190, Viña del Mar",
    tel: "600 600 6000"
  },
  {
    name: "Walmart Viña del Mar",
    type: "SUPERMERCADO",
    icon: "🛍️",
    cat: "super",
    rating: 4.0,
    reviews: 678,
    desc: "Sección salud con productos sin gluten a buen precio. Alternativas a lácteos y leches vegetales disponibles.",
    tags: ["Sin gluten", "Sin lactosa", "Económico"],
    address: "Av. España 380, Viña del Mar",
    tel: "600 600 9000"
  },
];

/* ══════════════════════════════════════════════════════
   GEOLOCALIZACIÓN — detectar posición del usuario
   ══════════════════════════════════════════════════════ */

/* Estado global de ubicación:
   null      → aún no se solicitó
   'pending' → esperando respuesta del navegador
   'denied'  → permiso denegado o no disponible
   { lat, lng, city } → ubicación obtenida */
let userLocation = null;

/* Distancia en km entre dos coordenadas (Haversine) */
function haversineKm(lat1, lon1, lat2, lon2) {
  const R    = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a    = Math.sin(dLat / 2) ** 2 +
               Math.cos(lat1 * Math.PI / 180) *
               Math.cos(lat2 * Math.PI / 180) *
               Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* Formatear distancia legible */
function formatDist(km) {
  if (km < 1)  return Math.round(km * 1000) + ' m';
  if (km < 10) return km.toFixed(1) + ' km';
  return Math.round(km) + ' km';
}

/* Solicitar ubicación al navegador (silencioso, sin interrumpir UX) */
async function requestUserLocation() {
  if (!navigator.geolocation) return;
  if (userLocation && userLocation !== 'pending') return; // ya detectada o denegada

  userLocation = 'pending';
  updateLocationBanner();

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;

      /* Geocodificación inversa con OpenStreetMap Nominatim (gratuito, sin API key) */
      let city = '';
      try {
        const res  = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=es`,
          { headers: { 'Accept': 'application/json' } }
        );
        const data = await res.json();
        city = data?.address?.city
            || data?.address?.town
            || data?.address?.municipality
            || data?.address?.village
            || '';
      } catch (e) {
        console.warn('[CeliGO] Geocoding error:', e);
      }

      userLocation = { lat, lng, city };
      updateLocationBanner();

      /* Re-renderizar secciones que dependen de la ubicación */
      if (document.getElementById('page-restaurantes')?.classList.contains('active')) renderRest();
      if (document.getElementById('page-tiendas')?.classList.contains('active'))      renderStore();
      if (document.getElementById('page-asistente')?.classList.contains('active') && typeof renderClinicas === 'function') renderClinicas();
    },
    (err) => {
      /* err.code: 1 = PERMISSION_DENIED, 2 = UNAVAILABLE, 3 = TIMEOUT */
      userLocation = (err.code === 1) ? 'blocked' : 'denied';
      updateLocationBanner();
    },
    { timeout: 10000, maximumAge: 300000 /* 5 min */ }
  );
}

/* Actualizar el banner de ubicación en el DOM */
function updateLocationBanner() {
  const banner = document.getElementById('location-banner');
  if (!banner) return;

  if (!userLocation || userLocation === 'pending') {
    banner.className   = 'loc-banner loc-pending';
    banner.innerHTML   = `<span class="loc-dot"></span> Detectando tu ubicación…`;
    banner.style.display = '';

  } else if (userLocation === 'blocked') {
    /* Permiso bloqueado en el navegador — no se puede reintentar programáticamente */
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const hint  = isIOS
      ? 'Ve a <strong>Configuración → Safari → Ubicación</strong> y permite el acceso.'
      : 'Toca el 🔒 en la barra de dirección de tu navegador y activa la ubicación.';
    banner.className   = 'loc-banner loc-blocked';
    banner.innerHTML   = `<span>🔒</span> <span>Ubicación bloqueada. ${hint}</span>`;
    banner.style.display = '';

  } else if (userLocation === 'denied') {
    /* Error de timeout o señal — se puede reintentar */
    banner.className   = 'loc-banner loc-denied';
    banner.innerHTML   = `<span>📍</span> <span>No se pudo detectar la ubicación</span> <button class="loc-btn" onclick="retryLocation()">Reintentar →</button>`;
    banner.style.display = '';

  } else {
    const cityText     = userLocation.city
      ? `<strong>${userLocation.city}</strong>`
      : 'Tu ubicación';
    banner.className   = 'loc-banner loc-active';
    banner.innerHTML   = `<span>📍</span> ${cityText} · Ordenados por cercanía`;
    banner.style.display = '';
  }
}

/* Reintentar ubicación (desde el botón del banner) */
function retryLocation() {
  userLocation = null; // resetear estado para permitir nuevo intento
  requestUserLocation();
}

/* Intentar activar desde estado bloqueado
   (el usuario habilitó el permiso en config y vuelve a la app) */
function tryUnblock() {
  userLocation = null;
  requestUserLocation();
}

/* ══ FILTROS ══ */
let restFilter  = 'todos';
let storeFilter = 'todos';

function setFilter(btn, type, val) {
  btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (type === 'rest') { restFilter  = val; renderRest();   }
  else                 { storeFilter = val; renderStore(); }
}

/* ══ TARJETA DESTACADA ══ */
function renderFeaturedCard(r) {
  const full     = Math.round(r.rating);
  const stars    = '★'.repeat(full) + '☆'.repeat(5 - full);
  const distHtml = (r._dist != null && r._dist < 9000)
    ? `<div class="fc-dist">📍 ${formatDist(r._dist)}</div>`
    : '';
  const iconHtml = r.img
    ? `<div class="fc-img-wrap"><img src="${r.img}" alt="${r.name}" class="fc-img" onerror="this.parentElement.innerHTML='<span class=fc-emoji-fb>${r.icon}</span>'"></div>`
    : `<div class="fc-emoji">${r.icon}</div>`;
  return `
    <div class="fc-card" onclick="openRestaurant('${r.id}')">
      <div class="fc-top">
        ${iconHtml}
        <div class="fc-meta">
          <div class="fc-stars">${stars} ${r.rating}</div>
          <div class="fc-reviews">${r.reviews} opiniones</div>
          ${r.cert ? '<div class="fc-cert">✓ CERTIFICADO</div>' : ''}
          ${distHtml}
        </div>
      </div>
      <div class="fc-name">${r.name}</div>
      <div class="fc-type">${r.type}</div>
      <div class="fc-desc">${r.desc}</div>
      <div class="fc-tags">
        ${r.tags.map(t => `<span class="fc-tag">${t}</span>`).join('')}
      </div>
      <div class="fc-footer">
        <span class="fc-address">📍 ${r.address}</span>
        <span class="fc-cta">Ver menú →</span>
      </div>
    </div>
  `;
}

/* ══ TARJETA REGULAR ══ */
function renderPlaceCard(r) {
  const distBadge = (r._dist != null && r._dist < 9000)
    ? `<span class="place-dist">${formatDist(r._dist)}</span>`
    : '';
  return `
    <div class="place-card" ${r.id ? `onclick="openRestaurant('${r.id}')" style="cursor:pointer"` : ''}>
      <div class="place-head">
        <div style="display:flex;gap:10px;align-items:flex-start">
          <div class="place-icon" style="background:var(--coral-light)">${r.icon}</div>
          <div>
            <div class="place-name">${r.name} ${r.cert ? '<span class="badge-cert">✓ CERT.</span>' : ''} ${distBadge}</div>
            <div class="place-type">${r.type}</div>
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <span class="stars">★★★★${r.rating >= 4.8 ? '★' : '☆'}</span>
          <span class="rating-num">${r.rating}</span>
          <div style="font-size:10px;color:var(--text-hint);margin-top:2px">${r.reviews} opiniones</div>
        </div>
      </div>
      <div class="place-desc">${r.desc}</div>
      ${r.horario ? `<div style="font-size:11px;color:var(--text-hint);margin-bottom:8px;">🕐 ${r.horario}</div>` : ''}
      <div class="place-tags">
        ${r.tags.map(t => `<span class="ptag ${t.includes('Consultar') ? 'gray' : ''}">${t}</span>`).join('')}
      </div>
      <div class="place-foot">
        <span>📍 ${r.address}</span>
        ${r.tel ? `<a href="tel:${r.tel}">${r.tel}</a>` : (r.web ? `<a href="https://${r.web}" target="_blank">${r.web}</a>` : '')}
      </div>
    </div>
  `;
}

/* ══ RENDER RESTAURANTES ══ */
function renderRest() {
  const q   = document.getElementById('searchRest').value.toLowerCase().trim();
  const loc = (userLocation && userLocation !== 'pending' && userLocation !== 'denied')
              ? userLocation : null;

  /* Añadir distancia a cada restaurante si hay ubicación */
  const withDist = (r) => ({
    ...r,
    _dist: (loc && r.lat && r.lng)
      ? haversineKm(loc.lat, loc.lng, r.lat, r.lng)
      : null
  });

  /* Filtro por texto y categoría */
  const applyFilter = (arr) => arr
    .map(withDist)
    .filter(r => {
      const mq = !q || r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
      const mf = restFilter === 'todos'
        || (restFilter === 'certificado' && r.cert)
        || r.city === restFilter;
      return mq && mf;
    });

  let filteredFeatured = applyFilter(restaurants.filter(r => r.featured));
  let filteredRegular  = applyFilter(restaurants.filter(r => !r.featured));

  /* Ordenar por distancia si la ubicación está disponible */
  if (loc) {
    const byDist = (a, b) => (a._dist ?? 9999) - (b._dist ?? 9999);
    filteredFeatured.sort(byDist);
    filteredRegular.sort(byDist);
  }

  const el = document.getElementById('restList');

  if (!filteredFeatured.length && !filteredRegular.length) {
    el.innerHTML = '<div class="empty-state"><p>No se encontraron restaurantes.</p></div>';
    return;
  }

  let html = '';

  if (loc) {
    /* ── Con ubicación: sección "Cerca de ti" + "Más opciones" ── */
    const NEAR_KM = 50; // umbral de "cercano"

    /* Mezclar todo ordenado por distancia, conservando featured primero si distancia igual */
    const allRests = [
      ...filteredFeatured.map(r => ({ ...r, _isFeatured: true  })),
      ...filteredRegular.map(r  => ({ ...r, _isFeatured: false }))
    ].sort((a, b) => (a._dist ?? 9999) - (b._dist ?? 9999));

    const near = allRests.filter(r => r._dist != null && r._dist <= NEAR_KM);
    const far  = allRests.filter(r => r._dist == null || r._dist >  NEAR_KM);

    if (near.length > 0) {
      html += `<div class="featured-section-label">📍 Cerca de ti</div>`;
      html += near.map(r => r._isFeatured ? renderFeaturedCard(r) : renderPlaceCard(r)).join('');
    }

    if (far.length > 0) {
      html += `<div class="other-rest-label">${near.length > 0 ? 'Más restaurantes' : '⭐ Restaurantes'}</div>`;
      html += far.map(r => r._isFeatured ? renderFeaturedCard(r) : renderPlaceCard(r)).join('');
    }

  } else {
    /* ── Sin ubicación: comportamiento original ── */
    if (filteredFeatured.length > 0) {
      html += `<div class="featured-section-label">⭐ Restaurantes destacados</div>`;
      html += filteredFeatured.map(r => renderFeaturedCard(r)).join('');
    }
    if (filteredRegular.length > 0) {
      if (filteredFeatured.length > 0) html += `<div class="other-rest-label">Más restaurantes</div>`;
      html += filteredRegular.map(r => renderPlaceCard(r)).join('');
    }
  }

  el.innerHTML = html;
}

/* ══ TARJETA TIENDA DESTACADA ══ */
function renderStoreFeaturedCard(s) {
  const full     = Math.round(s.rating);
  const stars    = '★'.repeat(full) + '☆'.repeat(5 - full);
  const iconHtml = s.img
    ? `<div class="fc-img-wrap"><img src="${s.img}" alt="${s.name}" class="fc-img" onerror="this.parentElement.innerHTML='<span class=fc-emoji-fb>${s.icon}</span>'"></div>`
    : `<div class="fc-emoji">${s.icon}</div>`;
  return `
    <div class="fc-card" onclick="openStore('${s.id}')">
      <div class="fc-top">
        ${iconHtml}
        <div class="fc-meta">
          <div class="fc-stars">${stars} ${s.rating}</div>
          <div class="fc-reviews">${s.reviews} opiniones</div>
          ${s.featured && s.cat === 'especializada' ? '<div class="fc-cert">✓ ESPECIALIZADA</div>' : ''}
          ${s.featured && s.cat === 'online' ? '<div class="fc-cert">🚚 DELIVERY</div>' : ''}
        </div>
      </div>
      <div class="fc-name">${s.name}</div>
      <div class="fc-type">${s.type}</div>
      <div class="fc-desc">${s.desc}</div>
      <div class="fc-tags">
        ${s.tags.map(t => `<span class="fc-tag">${t}</span>`).join('')}
      </div>
      <div class="fc-footer">
        <span class="fc-address">📍 ${s.address}</span>
        <span class="fc-cta">Ver productos →</span>
      </div>
    </div>
  `;
}

/* ══ RENDER TIENDAS ══ */
function renderStore() {
  const q = document.getElementById('searchStore').value.toLowerCase().trim();

  const featured = stores.filter(s => s.featured);
  const regular  = stores.filter(s => !s.featured);

  const filteredFeatured = featured.filter(s => {
    const mq = !q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
    const mf = storeFilter === 'todos' || s.cat === storeFilter;
    return mq && mf;
  });

  const filteredRegular = regular.filter(s => {
    const mq = !q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
    const mf = storeFilter === 'todos' || s.cat === storeFilter;
    return mq && mf;
  });

  const el = document.getElementById('storeList');

  if (!filteredFeatured.length && !filteredRegular.length) {
    el.innerHTML = '<div class="empty-state"><p>No se encontraron tiendas.</p></div>';
    return;
  }

  let html = '';

  if (filteredFeatured.length > 0) {
    html += `<div class="featured-section-label">⭐ Tiendas destacadas</div>`;
    html += filteredFeatured.map(s => renderStoreFeaturedCard(s)).join('');
  }

  if (filteredRegular.length > 0) {
    if (filteredFeatured.length > 0) html += `<div class="other-rest-label">Más opciones</div>`;
    html += filteredRegular.map(s => `
      <div class="place-card">
        <div class="place-head">
          <div style="display:flex;gap:10px;align-items:flex-start">
            <div class="place-icon" style="background:var(--mint-light)">${s.icon}</div>
            <div>
              <div class="place-name">${s.name}</div>
              <div class="place-type">${s.type}</div>
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <span class="stars">★★★★${s.rating >= 4.8 ? '★' : '☆'}</span>
            <span class="rating-num">${s.rating}</span>
            <div style="font-size:10px;color:var(--text-hint);margin-top:2px">${s.reviews} opiniones</div>
          </div>
        </div>
        <div class="place-desc">${s.desc}</div>
        <div class="place-tags">
          ${s.tags.map(t => `<span class="ptag">${t}</span>`).join('')}
        </div>
        <div class="place-foot">
          <span>📍 ${s.address}</span>
          ${s.tel ? `<a href="tel:${s.tel}">${s.tel}</a>` : ''}
        </div>
      </div>
    `).join('');
  }

  el.innerHTML = html;
}

/* ══ ESTILOS TARJETAS DESTACADAS ══ */
(function injectFeaturedStyles() {
  if (document.getElementById('featured-styles')) return;
  const style = document.createElement('style');
  style.id = 'featured-styles';
  style.textContent = `

    /* ── Labels de sección ── */
    .featured-section-label,
    .other-rest-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-hint);
      letter-spacing: 0.10em;
      text-transform: uppercase;
      margin: 4px 0 12px;
    }
    .other-rest-label { margin-top: 22px; }

    /* ── Tarjeta Destacada ── */
    .fc-card {
      background: linear-gradient(145deg, #1A2D18, #3A5236);
      border-radius: 20px;
      padding: 22px 20px 18px;
      margin-bottom: 12px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      box-shadow: 0 6px 28px rgba(20,40,18,0.45);
      border: 1px solid rgba(255,255,255,0.06);
      transition: transform 0.18s ease, box-shadow 0.18s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .fc-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 36px rgba(20,40,18,0.55);
    }
    .fc-card:active {
      transform: scale(0.985);
    }

    /* Brillo decorativo en la esquina */
    .fc-card::before {
      content: '';
      position: absolute;
      top: -30px;
      right: -30px;
      width: 110px;
      height: 110px;
      background: radial-gradient(circle, rgba(232,168,32,0.14), transparent 70%);
      pointer-events: none;
    }

    /* ── Top row: emoji + meta ── */
    .fc-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 14px;
    }
    .fc-emoji {
      font-size: 44px;
      line-height: 1;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
    }
    .fc-img-wrap {
      width: 64px;
      height: 64px;
      border-radius: 14px;
      overflow: hidden;
      flex-shrink: 0;
      background: rgba(255,255,255,0.06);
    }
    .fc-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .fc-emoji-fb {
      font-size: 44px;
      line-height: 64px;
      display: block;
      text-align: center;
    }
    .fc-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;
    }
    .fc-stars {
      color: #E8A820;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.01em;
    }
    .fc-reviews {
      font-size: 10px;
      color: rgba(255,255,255,0.45);
    }
    .fc-cert {
      font-size: 10px;
      font-weight: 700;
      color: #E8A820;
      background: rgba(232,168,32,0.14);
      border: 1px solid rgba(232,168,32,0.35);
      border-radius: 100px;
      padding: 3px 10px;
    }

    /* ── Nombre y tipo ── */
    .fc-name {
      font-family: 'Funnel Display', sans-serif;
      font-weight: 800;
      font-size: 22px;
      color: #ffffff;
      line-height: 1.2;
      margin-bottom: 4px;
    }
    .fc-type {
      font-size: 10px;
      font-weight: 700;
      color: rgba(255,255,255,0.45);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    /* ── Descripción ── */
    .fc-desc {
      font-size: 12px;
      color: rgba(255,255,255,0.70);
      line-height: 1.6;
      margin-bottom: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* ── Tags ── */
    .fc-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 16px;
    }
    .fc-tag {
      font-size: 11px;
      font-weight: 600;
      color: #E8A820;
      background: rgba(232,168,32,0.10);
      border: 1px solid rgba(232,168,32,0.28);
      border-radius: 100px;
      padding: 4px 11px;
    }

    /* ── Footer ── */
    .fc-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255,255,255,0.08);
      padding-top: 14px;
      gap: 10px;
    }
    .fc-address {
      font-size: 11px;
      color: rgba(255,255,255,0.45);
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .fc-cta {
      font-family: 'Funnel Display', sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #E8A820;
      background: rgba(232,168,32,0.10);
      border: 1.5px solid rgba(232,168,32,0.35);
      border-radius: 100px;
      padding: 7px 16px;
      white-space: nowrap;
      flex-shrink: 0;
      transition: background 0.15s;
    }
    .fc-card:hover .fc-cta {
      background: rgba(232,168,32,0.22);
    }
  `;
  document.head.appendChild(style);
})();
