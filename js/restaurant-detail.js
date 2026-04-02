/* ══════════════════════════════════════
   DETALLE DE RESTAURANTE
   Página completa con menú, IA y contacto
   ══════════════════════════════════════ */

const RESTAURANT_DETAILS = {

  /* ────────────────────────────────────
     QUIMEY FUSION & GLUTEN FREE
  ──────────────────────────────────── */
  quimey: {
    id: 'quimey',
    name: 'Quimey Fusion & Gluten Free',
    tagline: 'El primer restaurante 100% libre de gluten de Chile',
    emoji: '🍱',
    headerColor: '#2A4527',
    headerImg: 'img/header-quimey.png',
    cert: true,
    certLabel: 'Certificado Fundación Convivir',
    rating: 4.8,
    reviews: 210,
    address: '5 Norte 217, Viña del Mar',
    tel: '+56934200177',
    whatsapp: '56934200177',
    horario: 'Lun–Jue 12:00–22:00 · Vie 12:00–00:00 · Sáb 12:00–22:00',
    descripcion: 'Fundado en 2015 por Elizabeth, celíaca, Quimey es un oasis 100% libre de gluten y contaminación cruzada. Sushi, pizzas, pastas, hamburguesas, empanadas y pastelería. También opciones veganas y vegetarianas. Tienen su propia salsa de soya sin gluten.',
    instagram: 'quimeysushi',
    web: 'quimeysushi.cl',
    bannerSemana: 'img/banner-quimey.png',
    video: 'videos/video-quimey.mp4',

    promociones: [
      {
        id: 'p1',
        emoji: '🍣',
        titulo: 'Roll de la semana',
        desc: 'Roll California con camarón tempura y palta — 20% dcto solo en app',
        precio: '$7.900',
        precioAntes: '$9.900',
        valido: 'Válido hasta el 31 de marzo',
      },
      {
        id: 'p2',
        emoji: '🍔',
        titulo: '2x1 Hamburguesas',
        desc: 'Todos los martes: compra una hamburguesa y la segunda es gratis',
        precio: 'Desde $8.500',
        precioAntes: null,
        valido: 'Solo martes · No acumulable',
      },
    ],

    menu: [
      {
        categoria: '🍣 Sushi & Rolls',
        platos: [
          { id: 'm1', nombre: 'Roll California Quimey', desc: 'Arroz de sushi, camarón tempura, palta, pepino, queso crema. Salsa de soya sin gluten.', precio: '$8.500', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['mariscos', 'leche'], disponible: true },
          { id: 'm2', nombre: 'Gyoza de camarón', desc: 'Masa de arroz rellena de camarón y verduras. Servida con salsa ponzu sin gluten.', precio: '$7.200', etiquetas: ['Sin gluten', 'Sin lactosa'], alergenos: ['mariscos'], disponible: true },
          { id: 'm3', nombre: 'Ceviche Quimey', desc: 'Reineta marinada en limón, cilantro, cebolla morada y ají verde. Sin salsas con gluten.', precio: '$9.800', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['mariscos'], disponible: true },
        ]
      },
      {
        categoria: '🍔 Hamburguesas',
        platos: [
          { id: 'm4', nombre: 'Hamburguesa Triple Quimey', desc: 'Pan sin gluten artesanal, 3 medallones de carne, queso, lechuga, tomate, cebolla caramelizada y salsa especial.', precio: '$12.500', etiquetas: ['Sin gluten'], alergenos: ['leche', 'huevo'], disponible: true },
          { id: 'm5', nombre: 'Burger Vegana', desc: 'Pan sin gluten, medallón de lentejas y quinoa, palta, tomate, lechuga y mayonesa vegana.', precio: '$10.900', etiquetas: ['Sin gluten', 'Vegano', 'Sin lactosa'], alergenos: [], disponible: true },
        ]
      },
      {
        categoria: '🍕 Pizzas',
        platos: [
          { id: 'm6', nombre: 'Pizza Margherita', desc: 'Base sin gluten, salsa de tomate artesanal, mozzarella sin lactosa disponible, albahaca fresca.', precio: '$9.500', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche'], disponible: true },
          { id: 'm7', nombre: 'Pizza Fumate', desc: 'Base sin gluten, salsa de tomate, jamón sin nitritos, champiñones, aceitunas negras y orégano.', precio: '$11.200', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche'], disponible: true },
        ]
      },
      {
        categoria: '🧁 Pastelería',
        platos: [
          { id: 'm8', nombre: 'Torta de hojarasca con manjar', desc: 'Capas de hojarasca sin gluten con manjar casero. El postre estrella de Quimey.', precio: '$4.500', etiquetas: ['Sin gluten'], alergenos: ['leche', 'huevo'], disponible: true },
          { id: 'm9', nombre: 'Brownie vegano', desc: 'Brownie de chocolate negro sin gluten, sin lácteos, sin huevo. Servido con helado de coco.', precio: '$3.800', etiquetas: ['Sin gluten', 'Vegano', 'Sin lactosa'], alergenos: [], disponible: true },
        ]
      },
    ]
  },

  /* ────────────────────────────────────
     ROOF BURGER
  ──────────────────────────────────── */
  roofburger: {
    id: 'roofburger',
    name: 'Roof Burger',
    tagline: 'Hamburguesas gourmet con pan sin gluten',
    emoji: '🍔',
    headerColor: '#3D2010',
    headerImg: 'img/header-roofburger.png',
    cert: false,
    certLabel: null,
    rating: 4.3,
    reviews: 89,
    address: '6 Norte 309 esq. 4 Poniente, Viña del Mar',
    tel: '',
    whatsapp: '',
    horario: 'Consultar horario directamente',
    descripcion: 'Hamburguesas gourmet en Viña del Mar con opción de pan sin gluten. Ambiente casual y relajado. Siempre avisar al pedir para que preparen tu pedido de forma especial y eviten la contaminación cruzada.',
    instagram: 'roofburger',
    web: '',
    bannerSemana: 'img/banner-roofburger.png',
    video: 'videos/video-roofburger.mp4',

    promociones: [],

    menu: [
      {
        categoria: '🍔 Hamburguesas (pedir pan sin gluten)',
        platos: [
          { id: 'rb1', nombre: 'Roof Classic', desc: 'Pan sin gluten (pedir al mesero), medallón Angus 200g, lechuga, tomate, cebolla morada, pepinillo y salsa de la casa.', precio: '$8.900', etiquetas: ['Pan sin gluten'], alergenos: ['leche', 'huevo'], disponible: true },
          { id: 'rb2', nombre: 'Roof Double', desc: 'Doble medallón Angus, doble queso cheddar, bacon crujiente y salsa BBQ (verificar sin gluten). Pan sin gluten disponible.', precio: '$11.500', etiquetas: ['Pan sin gluten'], alergenos: ['leche', 'huevo'], disponible: true },
          { id: 'rb3', nombre: 'Roof Veggie', desc: 'Medallón de garbanzos y quinoa, palta, rúcula, tomate deshidratado y salsa de yogur natural. Pan sin gluten disponible.', precio: '$9.200', etiquetas: ['Sin gluten', 'Vegetariano'], alergenos: ['leche'], disponible: true },
          { id: 'rb4', nombre: 'Roof Pollo', desc: 'Pechuga de pollo grillada, palta, lechuga, tomate y salsa de limón. Pan sin gluten disponible. Bajo en calorías.', precio: '$9.800', etiquetas: ['Sin gluten', 'Light'], alergenos: [], disponible: true },
        ]
      },
      {
        categoria: '🥗 Ensaladas',
        platos: [
          { id: 'rb5', nombre: 'Ensalada César sin crutones', desc: 'Lechuga romana, pollo grillado, parmesano rallado y aderezo césar. Sin crutones para ser apta sin gluten.', precio: '$7.500', etiquetas: ['Sin gluten (pedir sin crutones)'], alergenos: ['leche', 'huevo'], disponible: true },
          { id: 'rb6', nombre: 'Bowl verde', desc: 'Mix de hojas verdes, palta, pepino, manzana verde, nueces tostadas y aderezo de limón y aceite de oliva.', precio: '$6.800', etiquetas: ['Sin gluten', 'Vegano'], alergenos: ['frutos secos'], disponible: true },
        ]
      },
      {
        categoria: '🍟 Acompañamientos',
        platos: [
          { id: 'rb7', nombre: 'Papas rústicas al horno', desc: 'Gajos de papa horneados con aceite de oliva, romero y sal marina gruesa. 100% sin gluten.', precio: '$3.200', etiquetas: ['Sin gluten', 'Vegano'], alergenos: [], disponible: true },
          { id: 'rb8', nombre: 'Papas fritas', desc: 'Papas fritas en aceite limpio. Sin gluten. Preguntar por la freidora compartida antes de pedir.', precio: '$2.800', etiquetas: ['Sin gluten (consultar CC)'], alergenos: [], disponible: true },
          { id: 'rb9', nombre: 'Anillos de cebolla', desc: 'Anillos de cebolla rebozados. Contienen harina — NO apto sin gluten.', precio: '$3.500', etiquetas: ['CONTIENE GLUTEN'], alergenos: ['gluten', 'huevo'], disponible: true },
        ]
      },
    ]
  },

  /* ────────────────────────────────────
     OOPS.SEPUEDE
  ──────────────────────────────────── */
  oops: {
    id: 'oops',
    name: 'Oops.sepuede',
    tagline: 'Panadería y repostería 100% sin gluten en Viña del Mar',
    emoji: '🧁',
    headerColor: '#3D1F52',
    headerImg: 'img/header-oops.png',
    cert: true,
    certLabel: 'Establecimiento 100% libre de gluten',
    rating: 4.7,
    reviews: 134,
    address: '1 Poniente 1008, Viña del Mar',
    tel: '',
    whatsapp: '',
    horario: 'Consultar horario por Instagram',
    descripcion: 'Panadería artesanal 100% sin gluten y sin contaminación cruzada. Fundada por celíacos, para celíacos. Pizzas, galletas, cupcakes, brownies, marraquetas, hallullas y alfajores. Todo elaborado en un ambiente libre de gluten.',
    instagram: 'oops.sepuede',
    web: '',
    bannerSemana: 'img/banner-oops.png',
    video: 'videos/video-oops.mp4',

    promociones: [
      {
        id: 'op1',
        emoji: '🍕',
        titulo: 'Pizza del día',
        desc: 'Una pizza diferente cada día — siempre 100% sin gluten y sin CC. Seguir en Instagram para ver cuál toca.',
        precio: 'Desde $6.500',
        precioAntes: null,
        valido: 'Lun–Sáb hasta agotar stock',
      }
    ],

    menu: [
      {
        categoria: '🍞 Panes del día',
        platos: [
          { id: 'op1', nombre: 'Pan de molde artesanal', desc: 'Pan de molde suave y esponjoso, ideal para sándwiches. 100% sin gluten, sin contaminación cruzada.', precio: '$3.200', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['huevo'], disponible: true },
          { id: 'op2', nombre: 'Marraqueta sin gluten', desc: 'La marraqueta chilena clásica, ahora sin gluten. Crujiente por fuera, suave por dentro. Perfecta tostada.', precio: '$900', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['huevo'], disponible: true },
          { id: 'op3', nombre: 'Hallulla sin gluten', desc: 'Hallulla esponjosa artesanal. Sin gluten, sin contaminación cruzada. Ideal con palta o mermelada.', precio: '$800', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['huevo', 'leche'], disponible: true },
          { id: 'op4', nombre: 'Pan de hamburguesa', desc: 'Mollete suave y esponjoso sin gluten, ideal para armar tus hamburguesas en casa. Paquete x4.', precio: '$4.500', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['huevo', 'leche'], disponible: true },
        ]
      },
      {
        categoria: '🍕 Pizzas',
        platos: [
          { id: 'op5', nombre: 'Pizza Napolitana', desc: 'Base sin gluten, salsa de tomate artesanal, mozzarella, jamón serrano y albahaca fresca. Sin CC.', precio: '$8.900', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche'], disponible: true },
          { id: 'op6', nombre: 'Pizza Vegana', desc: 'Base sin gluten, salsa de tomate, verduras asadas (pimentón, zucchini, cebolla), aceitunas y aceite de oliva. Sin queso, sin CC.', precio: '$8.200', etiquetas: ['Sin gluten', 'Vegano', 'Sin CC'], alergenos: [], disponible: true },
          { id: 'op7', nombre: 'Pizza del día', desc: 'Creación especial del día — varía cada jornada. Siempre 100% sin gluten y sin contaminación cruzada.', precio: 'Desde $6.500', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche'], disponible: true },
        ]
      },
      {
        categoria: '🧁 Repostería & Postres',
        platos: [
          { id: 'op8', nombre: 'Cupcake de vainilla', desc: 'Cupcake esponjoso sin gluten con frosting de mantequilla de vainilla. Sin contaminación cruzada.', precio: '$2.800', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche', 'huevo'], disponible: true },
          { id: 'op9', nombre: 'Brownie de chocolate', desc: 'Brownie húmedo e intenso, sin gluten. Borde crujiente, centro fundente. Puede hacerse vegano (consultar).', precio: '$2.500', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche', 'huevo'], disponible: true },
          { id: 'op10', nombre: 'Galletas de avena y pasas', desc: 'Galletas crujientes con avena certificada sin gluten y pasas. Sin contaminación cruzada.', precio: '$1.500', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['huevo'], disponible: true },
          { id: 'op11', nombre: 'Alfajor artesanal', desc: 'Dos tapas suaves sin gluten, rellenas de manjar y bañadas en coco rallado. El clásico chileno, ahora para celíacos.', precio: '$2.200', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche', 'huevo'], disponible: true },
        ]
      },
    ]
  }
};

/* ══ ABRIR PÁGINA DE RESTAURANTE ══ */
function openRestaurant(id) {
  const rest = RESTAURANT_DETAILS[id];
  if (!rest) return;

  const detailPage = document.getElementById('page-detail');
  if (!detailPage) return;

  detailPage.innerHTML = buildRestaurantHTML(rest);
  injectRestaurantStyles();

  /* ── Autoplay/pausa según visibilidad ── */
  const videos = detailPage.querySelectorAll('.rd-autoplay-video');
  if (videos.length && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play().catch(() => {});
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.4 }); /* se activa cuando el 40% del video es visible */
    videos.forEach(v => videoObserver.observe(v));
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  detailPage.classList.add('active');

  const appPages = document.querySelector('.app-pages');
  if (appPages && window.innerWidth >= 900) {
    appPages.scrollTop = 0;
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

function closeRestaurant() {
  const detailPage = document.getElementById('page-detail');
  if (detailPage) {
    detailPage.classList.remove('active');
    detailPage.innerHTML = '';
  }
  switchTab('restaurantes', document.querySelectorAll('.tab')[0]);
}

/* ══ CONSTRUIR HTML DEL DETALLE ══ */
function buildRestaurantHTML(r) {
  const menuHTML = r.menu.map(cat => `
    <div class="rd-cat-title">${cat.categoria}</div>
    ${cat.platos.map(p => `
      <div class="rd-plato" data-plato-id="${p.id}" onclick="analyzeDishe('${r.id}','${p.id}',this)">
        <div class="rd-plato-top">
          <div class="rd-plato-nombre">${p.nombre}</div>
          <div class="rd-plato-precio">${p.precio}</div>
        </div>
        <div class="rd-plato-desc">${p.desc}</div>
        <div class="rd-plato-tags">
          ${p.etiquetas.map(t => `<span class="rd-tag ${t.includes('CONTIENE') ? 'rd-tag-danger' : ''}">${t}</span>`).join('')}
        </div>
        <div class="rd-plato-cta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          ¿Es para mí?
        </div>
      </div>
    `).join('')}
  `).join('');

  const videoHTML = r.video
    ? `<div class="rd-video-wrap">
        <video class="rd-video rd-autoplay-video" controls playsinline loop muted preload="none">
          <source src="${r.video}" type="video/mp4">
        </video>
      </div>`
    : '';

  /* Sección de contacto: WhatsApp o Instagram */
  const contactoHTML = r.whatsapp
    ? `
      <div class="rd-section-title">💬 Contactar restaurante</div>
      <a class="rd-whatsapp-btn"
         href="https://wa.me/${r.whatsapp}?text=Hola%2C%20te%20contacto%20desde%20CeliGOT%20👋"
         target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Escribir por WhatsApp
      </a>
    `
    : r.instagram
    ? `
      <div class="rd-section-title">📸 Seguir en Instagram</div>
      <a class="rd-instagram-btn"
         href="https://instagram.com/${r.instagram}"
         target="_blank">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
        @${r.instagram}
      </a>
    `
    : '';

  return `
    <div class="rd-container">

      <!-- HEADER -->
      <div class="rd-header" style="background-color:${r.headerColor}; ${r.headerImg ? `background-image: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url('${r.headerImg}');` : ''}">
        <button class="rd-back" onclick="closeRestaurant()">← Volver</button>
        <div class="rd-header-emoji">${r.emoji}</div>
        <div class="rd-header-name">${r.name}</div>
        <div class="rd-header-tagline">${r.tagline}</div>
        <div class="rd-header-meta">
          <span class="rd-header-rating">★ ${r.rating} (${r.reviews} opiniones)</span>
          ${r.cert ? `<span class="rd-cert-badge">✓ ${r.certLabel}</span>` : ''}
        </div>
      </div>

      <!-- CONTENIDO -->
      <div class="rd-content">

        <!-- INFO BÁSICA -->
        <div class="rd-info-row">
          <span>📍 ${r.address}</span>
          <span>🕐 ${r.horario}</span>
          ${r.descripcion ? `<span style="color:var(--text-muted);line-height:1.5;margin-top:2px;">${r.descripcion}</span>` : ''}
        </div>

        <!-- PROMOCIÓN DE LA SEMANA -->
        <div class="rd-section-title">🏷️ Promoción de la semana</div>
        <div class="rd-banner-semana">
          <img src="${r.bannerSemana}" alt="Banner promoción de la semana - ${r.name}"
               class="rd-banner-img" onerror="this.style.display='none'"/>
        </div>
        ${videoHTML}

        <!-- MENÚ -->
        <div class="rd-section-title">🍽️ Menú celíaco</div>
        <p class="rd-menu-hint">Toca cualquier plato para que la IA lo analice según tu perfil</p>
        <div class="rd-menu" id="rd-menu-${r.id}">${menuHTML}</div>

        <!-- CONTACTO -->
        ${contactoHTML}

        <div style="height:30px;"></div>
      </div>
    </div>
  `;
}

/* ══ ANALIZAR PLATO CON IA — resultado inline ══ */
async function analyzeDishe(restId, platoId, platoEl) {
  const rest  = RESTAURANT_DETAILS[restId];
  const plato = rest.menu.flatMap(c => c.platos).find(p => p.id === platoId);
  if (!plato) return;

  /* Si ya hay un resultado abierto para este mismo plato → cerrarlo (toggle) */
  const existing = platoEl.nextElementSibling;
  if (existing && existing.classList.contains('rd-inline-result')) {
    existing.remove();
    platoEl.classList.remove('rd-plato-active');
    return;
  }

  /* Cerrar cualquier otro resultado abierto */
  document.querySelectorAll('.rd-inline-result').forEach(el => el.remove());
  document.querySelectorAll('.rd-plato').forEach(el => el.classList.remove('rd-plato-active'));

  /* Marcar el plato activo */
  platoEl.classList.add('rd-plato-active');

  /* Insertar loading inline justo debajo del plato */
  const loadingEl = document.createElement('div');
  loadingEl.className = 'rd-inline-result rd-inline-loading';
  loadingEl.innerHTML = `
    <div class="rd-spinner"></div>
    <span>Analizando según tu perfil...</span>
  `;
  platoEl.insertAdjacentElement('afterend', loadingEl);

  /* Scroll suave para que el loading quede visible */
  setTimeout(() => loadingEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);

  const userContext = typeof getUserContext === 'function' ? getUserContext() : '';

  const prompt = `El usuario está en el restaurante "${rest.name}".
Quiere saber si este plato es apto para él:

PLATO: ${plato.nombre}
DESCRIPCIÓN: ${plato.desc}
ALÉRGENOS DECLARADOS: ${plato.alergenos.length > 0 ? plato.alergenos.join(', ') : 'ninguno adicional'}
ETIQUETAS: ${plato.etiquetas.join(', ')}
RESTAURANTE CERTIFICADO SIN GLUTEN: ${rest.cert ? 'Sí' : 'No — avisar al mesero'}

PERFIL DEL USUARIO: ${userContext || 'No configurado — analizar para celíaco general'}

Responde en JSON sin markdown:
{
  "veredicto": "APTO" | "NO APTO" | "PRECAUCIÓN",
  "resumen": "frase corta directa",
  "explicacion": "2-3 oraciones explicando por qué es o no apto para ESTE usuario específico",
  "consejo": "consejo práctico concreto (ej: pedir sin queso, preguntar por el aceite, etc.)"
}`;

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data   = await res.json();
    const raw    = data.content.map(i => i.text || '').join('').replace(/```json|```/g, '').trim();
    const result = JSON.parse(raw);

    const colorMap = {
      'APTO':       { bg: '#E8F0E7', border: '#C2D9BE', color: '#2A5226', icon: '✓', iconBg: '#3A5236' },
      'NO APTO':    { bg: '#FDECEA', border: '#F5C6C2', color: '#C0392B', icon: '✕', iconBg: '#C0392B' },
      'PRECAUCIÓN': { bg: '#FBF0D4', border: '#F0D98A', color: '#9A6F00', icon: '!', iconBg: '#C48E10' },
    };
    const c = colorMap[result.veredicto] || colorMap['PRECAUCIÓN'];

    loadingEl.className = 'rd-inline-result';
    loadingEl.style.background = c.bg;
    loadingEl.style.borderColor = c.border;
    loadingEl.innerHTML = `
      <div class="rd-ir-header">
        <div class="rd-ir-icon" style="background:${c.iconBg}">${c.icon}</div>
        <div>
          <div class="rd-ir-veredicto" style="color:${c.color}">${result.veredicto}</div>
          <div class="rd-ir-resumen" style="color:${c.color}">${result.resumen}</div>
        </div>
      </div>
      <div class="rd-ir-explicacion">${result.explicacion}</div>
      <div class="rd-ir-consejo">💡 ${result.consejo}</div>
      <button class="rd-ir-cerrar" onclick="this.closest('.rd-inline-result').previousElementSibling.classList.remove('rd-plato-active');this.closest('.rd-inline-result').remove()">Cerrar ×</button>
    `;

    /* Scroll para mostrar el resultado completo */
    setTimeout(() => loadingEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);

  } catch (e) {
    console.error('[Restaurant IA Error]:', e.message || e);
    loadingEl.innerHTML = '<p style="color:#C0392B;font-size:13px;padding:4px 0;">Servicio no disponible. Intenta en unos minutos.</p>';
  }
}

/* ══ ESTILOS DEL DETALLE ══ */
function injectRestaurantStyles() {
  if (document.getElementById('rd-styles')) return;
  const style = document.createElement('style');
  style.id = 'rd-styles';
  style.textContent = `
    #page-detail { padding: 0 !important; background: var(--bg); }

    .rd-container { max-width:480px; margin:0 auto; padding-bottom:40px; }

    .rd-header {
      padding:50px 20px 28px;
      display:flex; flex-direction:column; align-items:center;
      gap:8px; text-align:center; position:relative;
      background-size:cover; background-position:center;
      background-repeat:no-repeat;
    }
    .rd-back {
      position:absolute; top:16px; left:16px;
      background:rgba(255,255,255,0.15); color:white;
      border:1px solid rgba(255,255,255,0.2);
      border-radius:20px; padding:6px 14px;
      font-size:13px; font-weight:600; cursor:pointer;
      font-family:'Plus Jakarta Sans',sans-serif;
      transition:background 0.15s;
    }
    .rd-back:hover { background:rgba(255,255,255,0.25); }
    .rd-header-emoji { font-size:52px; }
    .rd-header-name { font-family:'Funnel Display',sans-serif; font-weight:900; font-size:24px; color:white; line-height:1.2; }
    .rd-header-tagline { font-size:13px; color:rgba(255,255,255,0.70); max-width:280px; line-height:1.4; }
    .rd-header-meta { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:6px; }
    .rd-header-rating { font-size:12px; color:#E8A820; font-weight:700; background:rgba(255,255,255,0.10); padding:4px 10px; border-radius:20px; }
    .rd-cert-badge { font-size:11px; color:white; font-weight:700; background:rgba(232,168,32,0.28); border:1px solid rgba(232,168,32,0.5); padding:4px 10px; border-radius:20px; }

    .rd-content { padding:16px 16px 0; }

    .rd-info-row { display:flex; flex-direction:column; gap:5px; font-size:12px; color:var(--text-muted); margin-bottom:18px; padding:14px; background:var(--surface); border-radius:12px; border:1px solid var(--border); }

    .rd-section-title { font-family:'Funnel Display',sans-serif; font-weight:700; font-size:17px; color:var(--text); margin:18px 0 10px; }

    .rd-banner-semana { margin-bottom:12px; }
    .rd-banner-img {
      width:100%; border-radius:14px; display:block;
      object-fit:cover; max-height:180px;
      border:1.5px solid var(--border);
      box-shadow:0 4px 16px rgba(0,0,0,0.10);
    }
    .rd-video-wrap { margin-bottom:16px; }
    .rd-video {
      width:100%; height:360px; border-radius:14px; display:block;
      object-fit:cover; background:#000;
      border:1.5px solid var(--border);
      box-shadow:0 4px 16px rgba(0,0,0,0.18);
    }

    .rd-promos { display:flex; flex-direction:column; gap:10px; margin-bottom:4px; }
    .rd-promo { background:var(--surface); border:1.5px solid var(--border); border-radius:14px; padding:14px; display:flex; gap:12px; }
    .rd-promo-emoji { font-size:28px; flex-shrink:0; }
    .rd-promo-body { flex:1; min-width:0; }
    .rd-promo-titulo { font-family:'Funnel Display',sans-serif; font-weight:700; font-size:14px; margin-bottom:3px; }
    .rd-promo-desc { font-size:12px; color:var(--text-muted); line-height:1.4; margin-bottom:6px; }
    .rd-promo-footer { display:flex; flex-wrap:wrap; align-items:center; gap:6px; }
    .rd-promo-precio { font-size:13px; font-weight:700; color:var(--green); }
    .rd-promo-antes { font-size:11px; color:var(--text-hint); text-decoration:line-through; }
    .rd-promo-valido { font-size:10px; color:var(--text-hint); background:var(--bg); padding:2px 8px; border-radius:20px; }

    .rd-menu-hint { font-size:12px; color:var(--text-hint); margin-bottom:12px; }
    .rd-cat-title { font-size:11px; font-weight:700; color:var(--green); letter-spacing:0.06em; margin:16px 0 8px; text-transform:uppercase; }

    .rd-plato { background:var(--surface); border:1.5px solid var(--border); border-radius:14px; padding:14px; margin-bottom:0; display:flex; flex-direction:column; gap:0; cursor:pointer; transition:border-color 0.2s, box-shadow 0.2s; }
    .rd-plato + .rd-plato { margin-top:8px; }
    .rd-plato:hover { border-color:rgba(232,168,32,0.5); box-shadow:0 4px 16px rgba(232,168,32,0.1); }
    .rd-plato.rd-plato-active { border-color:#E8A820; border-bottom-left-radius:0; border-bottom-right-radius:0; border-bottom-color:transparent; }
    .rd-plato-top { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:4px; }
    .rd-plato-nombre { font-family:'Funnel Display',sans-serif; font-weight:700; font-size:15px; flex:1; }
    .rd-plato-precio { font-size:14px; font-weight:700; color:var(--text); white-space:nowrap; flex-shrink:0; }
    .rd-plato-desc { font-size:12px; color:var(--text-muted); line-height:1.5; margin-bottom:8px; }
    .rd-plato-tags { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:12px; }
    .rd-tag { font-size:10px; font-weight:600; padding:2px 8px; border-radius:20px; background:var(--green-light); color:var(--green-dark); }
    .rd-tag-danger { background:#FDECEA; color:#C0392B; }
    .rd-plato-cta {
      display:flex; align-items:center; justify-content:center; gap:7px;
      background:linear-gradient(135deg, #E8A820, #C98D0A);
      color:#1C2419;
      border-radius:10px;
      padding:11px 16px;
      font-family:'Funnel Display',sans-serif;
      font-weight:800;
      font-size:14px;
      letter-spacing:0.01em;
      transition:opacity 0.15s, transform 0.15s;
      box-shadow:0 3px 10px rgba(232,168,32,0.35);
    }
    .rd-plato:hover .rd-plato-cta { opacity:0.88; transform:translateY(-1px); }
    .rd-plato:active .rd-plato-cta { transform:scale(0.98); }

    /* ── Resultado inline ── */
    .rd-inline-result {
      border:1.5px solid var(--border);
      border-top:none;
      border-radius:0 0 14px 14px;
      padding:14px;
      margin-bottom:8px;
      animation:rdResultIn 0.25s ease;
    }
    @keyframes rdResultIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
    .rd-inline-loading {
      display:flex; align-items:center; gap:10px;
      background:var(--surface);
      font-size:13px; color:var(--text-muted);
    }
    .rd-ir-header { display:flex; align-items:center; gap:12px; margin-bottom:10px; }
    .rd-ir-icon { width:36px; height:36px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:900; color:white; flex-shrink:0; }
    .rd-ir-veredicto { font-family:'Funnel Display',sans-serif; font-weight:900; font-size:17px; line-height:1.1; }
    .rd-ir-resumen { font-size:11px; opacity:0.8; margin-top:1px; }
    .rd-ir-explicacion { font-size:12px; color:var(--text-muted); line-height:1.6; margin-bottom:10px; }
    .rd-ir-consejo { background:rgba(0,0,0,0.04); border-radius:9px; padding:10px 12px; font-size:12px; color:var(--text-muted); font-weight:500; margin-bottom:10px; }
    .rd-ir-cerrar { background:none; border:1px solid var(--border); border-radius:20px; padding:5px 14px; font-size:11px; color:var(--text-hint); cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; transition:all 0.15s; }
    .rd-ir-cerrar:hover { border-color:var(--text-muted); color:var(--text-muted); }

    .rd-whatsapp-btn {
      display:flex; align-items:center; justify-content:center; gap:10px;
      background:#25D366; color:white;
      border-radius:14px; padding:16px;
      font-family:'Funnel Display',sans-serif; font-weight:700; font-size:16px;
      text-decoration:none; margin-top:6px;
      box-shadow:0 4px 16px rgba(37,211,102,0.3);
      transition:all 0.2s;
    }
    .rd-whatsapp-btn:hover { background:#1ebe5b; transform:translateY(-1px); }

    .rd-instagram-btn {
      display:flex; align-items:center; justify-content:center; gap:10px;
      background:linear-gradient(135deg, #833AB4, #FD1D1D, #F77737);
      color:white;
      border-radius:14px; padding:16px;
      font-family:'Funnel Display',sans-serif; font-weight:700; font-size:16px;
      text-decoration:none; margin-top:6px;
      box-shadow:0 4px 16px rgba(131,58,180,0.3);
      transition:all 0.2s;
    }
    .rd-instagram-btn:hover { opacity:0.92; transform:translateY(-1px); }

    .rd-spinner { width:22px; height:22px; border:3px solid var(--green-light); border-top-color:var(--green); border-radius:50%; animation:spin 0.75s linear infinite; flex-shrink:0; }
  `;
  document.head.appendChild(style);
}
