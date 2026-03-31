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
    city: "viña",
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
    city: "viña",
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
    city: "viña",
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
    id: 'quimey-delivery',
    featured: true,
    name: "Quimey Delivery",
    type: "DELIVERY 100% SIN GLUTEN",
    icon: "📦",
    cat: "especializada",
    rating: 4.8,
    reviews: 180,
    desc: "Delivery de Quimey Fusion & Gluten Free con toda la carta disponible. Sushi, pizzas, pastas, hamburguesas y pastelería. 100% sin gluten, sin contaminación cruzada.",
    tags: ["100% Sin gluten", "Delivery", "Sushi", "Pastelería", "Vegano"],
    address: "Pedidos: quimeysushi.cl",
    tel: "+56 9 3420 0177"
  },
  {
    id: 'celina-online',
    featured: true,
    name: "Celina Tienda Online",
    type: "TIENDA ONLINE · 100% SIN GLUTEN",
    icon: "🛒",
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
  const full  = Math.round(r.rating);
  const stars = '★'.repeat(full) + '☆'.repeat(5 - full);
  return `
    <div class="fc-card" onclick="openRestaurant('${r.id}')">
      <div class="fc-top">
        <div class="fc-emoji">${r.icon}</div>
        <div class="fc-meta">
          <div class="fc-stars">${stars} ${r.rating}</div>
          <div class="fc-reviews">${r.reviews} opiniones</div>
          ${r.cert ? '<div class="fc-cert">✓ CERTIFICADO</div>' : ''}
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
  return `
    <div class="place-card" ${r.id ? `onclick="openRestaurant('${r.id}')" style="cursor:pointer"` : ''}>
      <div class="place-head">
        <div style="display:flex;gap:10px;align-items:flex-start">
          <div class="place-icon" style="background:var(--coral-light)">${r.icon}</div>
          <div>
            <div class="place-name">${r.name} ${r.cert ? '<span class="badge-cert">✓ CERT.</span>' : ''}</div>
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
  const q = document.getElementById('searchRest').value.toLowerCase().trim();

  const featured = restaurants.filter(r => r.featured);
  const regular  = restaurants.filter(r => !r.featured);

  /* Featured: siempre visibles (filtradas por ciudad/cert), o buscadas si hay query */
  const filteredFeatured = featured.filter(r => {
    const mq = !q || r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
    const mf = restFilter === 'todos'
      || (restFilter === 'certificado' && r.cert)
      || r.city === restFilter;
    return mq && mf;
  });

  /* Regular: filtradas por query y categoría */
  const filteredRegular = regular.filter(r => {
    const mq = !q || r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
    const mf = restFilter === 'todos'
      || (restFilter === 'certificado' && r.cert)
      || r.city === restFilter;
    return mq && mf;
  });

  const el = document.getElementById('restList');

  if (!filteredFeatured.length && !filteredRegular.length) {
    el.innerHTML = '<div class="empty-state"><p>No se encontraron restaurantes.</p></div>';
    return;
  }

  let html = '';

  if (filteredFeatured.length > 0) {
    html += `<div class="featured-section-label">⭐ Restaurantes destacados</div>`;
    html += filteredFeatured.map(r => renderFeaturedCard(r)).join('');
  }

  if (filteredRegular.length > 0) {
    if (filteredFeatured.length > 0) {
      html += `<div class="other-rest-label">Más restaurantes</div>`;
    }
    html += filteredRegular.map(r => renderPlaceCard(r)).join('');
  }

  el.innerHTML = html;
}

/* ══ TARJETA TIENDA DESTACADA ══ */
function renderStoreFeaturedCard(s) {
  const full  = Math.round(s.rating);
  const stars = '★'.repeat(full) + '☆'.repeat(5 - full);
  return `
    <div class="fc-card" onclick="openStore('${s.id}')">
      <div class="fc-top">
        <div class="fc-emoji">${s.icon}</div>
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
