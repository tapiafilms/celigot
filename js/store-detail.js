/* ══════════════════════════════════════
   DETALLE DE TIENDA
   Productos verificados sin gluten + IA
   ══════════════════════════════════════ */

const STORE_DETAILS = {

  /* ────────────────────────────────────
     QUIMEY DELIVERY
  ──────────────────────────────────── */
  'quimey-delivery': {
    id: 'quimey-delivery',
    name: 'Quimey Delivery',
    tagline: 'Toda la carta de Quimey en tu casa · 100% sin gluten',
    emoji: '📦',
    headerColor: '#2A4527',
    cert: true,
    certLabel: '100% Libre de gluten · Sin contaminación cruzada',
    rating: 4.8,
    reviews: 180,
    address: 'Pedidos en quimeysushi.cl',
    tel: '+56934200177',
    whatsapp: '56934200177',
    horario: 'Lun–Jue 12:00–21:00 · Vie 12:00–23:00 · Sáb 12:00–21:00',
    descripcion: 'Delivery oficial de Quimey Fusion & Gluten Free. Toda la carta disponible a domicilio en Viña del Mar y alrededores. Misma calidad, mismas garantías: 100% libre de gluten y contaminación cruzada.',
    instagram: 'quimeysushi',
    bannerSemana: 'img/banner-quimey-delivery.svg',

    productos: [
      {
        categoria: '🍣 Sushi & Rolls',
        items: [
          { id: 'qd1', nombre: 'Roll California Quimey', desc: 'Arroz de sushi, camarón tempura, palta, pepino, queso crema. Salsa de soya sin gluten incluida.', precio: '$8.500', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['mariscos', 'leche'] },
          { id: 'qd2', nombre: 'Gyoza de camarón', desc: 'Masa de arroz rellena de camarón y verduras. Salsa ponzu sin gluten. 6 unidades.', precio: '$7.200', etiquetas: ['Sin gluten', 'Sin lactosa'], alergenos: ['mariscos'] },
          { id: 'qd3', nombre: 'Ceviche Quimey', desc: 'Reineta marinada en limón, cilantro, cebolla morada y ají verde. Sin salsas con gluten.', precio: '$9.800', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['mariscos'] },
          { id: 'qd4', nombre: 'Combo Sushi 36 piezas', desc: 'Selección de rolls variados. Todo sin gluten. Incluye salsa de soya, jengibre y wasabi.', precio: '$24.900', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['mariscos', 'leche'] },
        ]
      },
      {
        categoria: '🍔 Hamburguesas',
        items: [
          { id: 'qd5', nombre: 'Hamburguesa Triple Quimey', desc: 'Pan artesanal sin gluten, 3 medallones Angus, queso, lechuga, tomate, cebolla caramelizada y salsa especial.', precio: '$12.500', etiquetas: ['Sin gluten'], alergenos: ['leche', 'huevo'] },
          { id: 'qd6', nombre: 'Burger Vegana', desc: 'Pan sin gluten, medallón de lentejas y quinoa, palta, tomate, lechuga y mayonesa vegana.', precio: '$10.900', etiquetas: ['Sin gluten', 'Vegano', 'Sin lactosa'], alergenos: [] },
        ]
      },
      {
        categoria: '🍕 Pizzas',
        items: [
          { id: 'qd7', nombre: 'Pizza Margherita (delivery)', desc: 'Base sin gluten, salsa de tomate artesanal, mozzarella, albahaca fresca. Llega en caja especial para mantener la textura.', precio: '$9.500', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche'] },
          { id: 'qd8', nombre: 'Pizza Fumate (delivery)', desc: 'Base sin gluten, jamón sin nitritos, champiñones, aceitunas negras y orégano.', precio: '$11.200', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche'] },
        ]
      },
      {
        categoria: '🧁 Pastelería para llevar',
        items: [
          { id: 'qd9', nombre: 'Torta de hojarasca con manjar', desc: 'Capas de hojarasca sin gluten con manjar casero. Porción o torta completa disponible.', precio: 'Desde $4.500', etiquetas: ['Sin gluten'], alergenos: ['leche', 'huevo'] },
          { id: 'qd10', nombre: 'Brownie vegano', desc: 'Brownie de chocolate negro sin gluten, sin lácteos y sin huevo. Servido con helado de coco (si aplica).', precio: '$3.800', etiquetas: ['Sin gluten', 'Vegano', 'Sin lactosa'], alergenos: [] },
          { id: 'qd11', nombre: 'Caja de pasteles surtidos', desc: 'Selección de 6 postres sin gluten de la pastelería de Quimey. Ideal para regalo.', precio: '$18.000', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche', 'huevo'] },
        ]
      },
    ]
  },

  /* ────────────────────────────────────
     CELINA TIENDA ONLINE
  ──────────────────────────────────── */
  'celina-online': {
    id: 'celina-online',
    name: 'Celina Tienda Online',
    tagline: 'Panadería y pastelería artesanal · 100% sin gluten y lactosa',
    emoji: '🛒',
    headerColor: '#1E3A35',
    cert: true,
    certLabel: '100% Libre de gluten y lactosa · Sin CC',
    rating: 4.7,
    reviews: 94,
    address: 'Pedidos por Instagram @celina.gf',
    tel: '',
    whatsapp: '',
    horario: 'Despachos Lun–Vie · Consultar disponibilidad',
    descripcion: 'Panadería artesanal de Concón que despacha a domicilio. Todo elaborado en ambiente 100% libre de gluten y lactosa, sin riesgo de contaminación cruzada. Fundada por y para celíacos.',
    instagram: 'celina.gf',
    bannerSemana: 'img/banner-celina-online.svg',

    productos: [
      {
        categoria: '🍞 Panes frescos',
        items: [
          { id: 'co1', nombre: 'Pan de molde (500g)', desc: 'Pan de molde artesanal, suave y esponjoso. Ideal para sándwiches y tostadas. 100% sin gluten y sin lactosa.', precio: '$3.200', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['huevo'] },
          { id: 'co2', nombre: 'Marraqueta sin gluten (x2)', desc: 'La marraqueta chilena clásica en versión sin gluten. Crujiente por fuera, suave por dentro.', precio: '$1.600', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['huevo'] },
          { id: 'co3', nombre: 'Hallulla sin gluten (x4)', desc: 'Hallullas esponjosas artesanales. Sin gluten, sin lactosa y sin contaminación cruzada.', precio: '$2.800', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['huevo'] },
          { id: 'co4', nombre: 'Pack panes de hamburguesa (x4)', desc: 'Molletes suaves y esponjosos sin gluten, perfectos para armar hamburguesas en casa.', precio: '$4.500', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['huevo'] },
          { id: 'co5', nombre: 'Baguette sin gluten', desc: 'Baguette crujiente por fuera y aireada por dentro. Sin gluten, sin lactosa.', precio: '$2.200', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['huevo'] },
        ]
      },
      {
        categoria: '🥟 Empanadas',
        items: [
          { id: 'co6', nombre: 'Empanada de pino (x6)', desc: 'Masa sin gluten rellena de pino tradicional (carne, cebolla, aceituna, huevo). Sin contaminación cruzada.', precio: '$9.600', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['huevo'] },
          { id: 'co7', nombre: 'Empanada de queso (x6)', desc: 'Masa sin gluten con queso derretido. Sin gluten, puede contener lactosa (queso).', precio: '$8.400', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche', 'huevo'] },
          { id: 'co8', nombre: 'Empanada de camarón (x6)', desc: 'Masa sin gluten rellena de camarón salteado con verduras y ají. Sin gluten y sin lactosa.', precio: '$10.800', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['mariscos', 'huevo'] },
          { id: 'co9', nombre: 'Empanada vegana (x6)', desc: 'Masa sin gluten rellena de verduras asadas, champiñones y especias. Sin gluten, sin lactosa, vegana.', precio: '$8.400', etiquetas: ['Sin gluten', 'Sin lactosa', 'Vegano', 'Sin CC'], alergenos: [] },
        ]
      },
      {
        categoria: '🍔 Preparados para el hogar',
        items: [
          { id: 'co10', nombre: 'Masa de pizza sin gluten (x2)', desc: 'Bases de pizza artesanales precocidas, listas para agregar ingredientes. Sin gluten, sin lactosa.', precio: '$5.800', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['huevo'] },
          { id: 'co11', nombre: 'Pan de hot dog sin gluten (x4)', desc: 'Marraquetas alargadas sin gluten para hot dogs y completos. Sin lactosa.', precio: '$3.600', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['huevo'] },
        ]
      },
      {
        categoria: '🍰 Dulces y postres',
        items: [
          { id: 'co12', nombre: 'Brownie de chocolate (x4)', desc: 'Brownies húmedos e intensos sin gluten y sin lactosa. Borde crujiente, centro fundente.', precio: '$5.600', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['huevo'] },
          { id: 'co13', nombre: 'Alfajor artesanal (x4)', desc: 'Tapas suaves sin gluten rellenas de manjar, bañadas en coco rallado. Sin lactosa disponible (consultar).', precio: '$6.400', etiquetas: ['Sin gluten', 'Sin CC'], alergenos: ['leche', 'huevo'] },
          { id: 'co14', nombre: 'Queque de chocolate', desc: 'Queque esponjoso de chocolate sin gluten y sin lactosa. Tamaño familiar (800g).', precio: '$7.500', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['huevo'] },
          { id: 'co15', nombre: 'Galletas de avena y chips (x12)', desc: 'Galletas crujientes con avena certificada sin gluten y chips de chocolate. Sin lactosa.', precio: '$4.800', etiquetas: ['Sin gluten', 'Sin lactosa', 'Sin CC'], alergenos: ['huevo'] },
        ]
      },
    ]
  },

  /* ────────────────────────────────────
     JUMBO VIÑA DEL MAR
  ──────────────────────────────────── */
  'jumbo': {
    id: 'jumbo',
    name: 'Jumbo Viña del Mar',
    tagline: 'Sección sin gluten · Marcas certificadas y productos nacionales',
    emoji: '🏬',
    headerColor: '#1A2A4A',
    cert: false,
    certLabel: null,
    rating: 4.2,
    reviews: 534,
    address: 'Av. Las Américas 600, Viña del Mar',
    tel: '600 600 5000',
    whatsapp: '',
    horario: 'Lun–Dom 08:30–22:00',
    descripcion: 'La sección dietética de Jumbo tiene una de las mejores selecciones sin gluten de la región. Encontrarás marcas importadas como Schär y Proceli, y productos nacionales certificados. Siempre revisar el etiquetado al comprar.',
    instagram: '',
    bannerSemana: 'img/banner-jumbo.svg',

    productos: [
      {
        categoria: '🍝 Pastas sin gluten',
        items: [
          { id: 'jb1', nombre: 'Barilla Gluten Free Penne', desc: 'Pasta de maíz y arroz certificada sin gluten. Textura similar a la pasta tradicional. Marca italiana de confianza.', precio: '$3.200–$4.500', etiquetas: ['Sin gluten', 'Certificado'], alergenos: [] },
          { id: 'jb2', nombre: 'Schär Fusilli', desc: 'Fusilli sin gluten de la marca líder europea. Certificado para celíacos. Cocción 8 minutos.', precio: '$3.800–$5.200', etiquetas: ['Sin gluten', 'Schär', 'Certificado'], alergenos: [] },
          { id: 'jb3', nombre: 'Schär Spaghetti', desc: 'Spaghetti sin gluten certificado. Ideal para todas las salsas. Sin gluten ni trazas de trigo.', precio: '$3.800–$5.200', etiquetas: ['Sin gluten', 'Schär', 'Certificado'], alergenos: [] },
        ]
      },
      {
        categoria: '🌾 Harinas y mezclas',
        items: [
          { id: 'jb4', nombre: 'Proceli Harina Universal', desc: 'Harina sin gluten multiuso española, ideal para pan, tortas y repostería. Certificada. 500g.', precio: '$4.500–$6.000', etiquetas: ['Sin gluten', 'Proceli', 'Certificado'], alergenos: [] },
          { id: 'jb5', nombre: 'Schär Mix Pan', desc: 'Mezcla lista para pan sin gluten. Resultado esponjoso y con buen sabor. 1kg.', precio: '$5.500–$7.000', etiquetas: ['Sin gluten', 'Schär', 'Certificado'], alergenos: ['huevo'] },
          { id: 'jb6', nombre: 'Harina de arroz nacional', desc: 'Harina de arroz 100% pura. Sin gluten por naturaleza. Verificar que sea de línea exclusiva GF para evitar CC.', precio: '$1.800–$2.800', etiquetas: ['Sin gluten (verificar CC)'], alergenos: [] },
        ]
      },
      {
        categoria: '🍪 Galletas y snacks',
        items: [
          { id: 'jb7', nombre: 'Schär Digestive', desc: 'Galletas digestivas sin gluten. Sabor similar a las tradicionales. Certificadas para celíacos.', precio: '$3.500–$4.800', etiquetas: ['Sin gluten', 'Schär', 'Certificado'], alergenos: ['leche'] },
          { id: 'jb8', nombre: 'Schär Crackers de arroz', desc: 'Crackers crujientes de arroz sin gluten. Sin lactosa. Ideales para acompañar queso o palta.', precio: '$2.800–$3.800', etiquetas: ['Sin gluten', 'Sin lactosa', 'Schär'], alergenos: [] },
          { id: 'jb9', nombre: 'Arroz inflado sin gluten', desc: 'Snack de arroz inflado, sin gluten por naturaleza. Verificar etiqueta para posibles trazas.', precio: '$1.500–$2.500', etiquetas: ['Sin gluten (verificar etiqueta)'], alergenos: [] },
          { id: 'jb10', nombre: 'Maíz tostado sin gluten', desc: 'Maíz tostado snack. Sin gluten por naturaleza. Revisar etiqueta para aditivos o CC.', precio: '$1.200–$2.000', etiquetas: ['Sin gluten (verificar etiqueta)'], alergenos: [] },
        ]
      },
      {
        categoria: '🥛 Lácteos y alternativas vegetales',
        items: [
          { id: 'jb11', nombre: 'Leche de almendras sin azúcar', desc: 'Leche vegetal de almendras. Sin gluten por naturaleza. Verificar que no tenga aditivos con gluten.', precio: '$2.500–$3.800', etiquetas: ['Sin gluten', 'Sin lactosa', 'Vegano'], alergenos: ['frutos secos'] },
          { id: 'jb12', nombre: 'Leche de avena (⚠️ revisar)', desc: '¡Atención! La avena puede tener contaminación cruzada con gluten. Buscar marcas con certificación GF explícita.', precio: '$2.500–$3.500', etiquetas: ['⚠️ Verificar CC con gluten'], alergenos: [] },
          { id: 'jb13', nombre: 'Yogur natural sin lactosa', desc: 'Yogur sin lactosa. Verificar que no tenga almidón de trigo como espesante (poco común pero existe).', precio: '$1.800–$3.200', etiquetas: ['Sin gluten (revisar etiqueta)', 'Sin lactosa'], alergenos: ['leche'] },
        ]
      },
      {
        categoria: '❄️ Congelados sin gluten',
        items: [
          { id: 'jb14', nombre: 'Pizza congelada GF (Schär)', desc: 'Pizza congelada sin gluten de Schär. Certificada. Seguir instrucciones de cocción. No mezclar con utensilios con gluten.', precio: '$5.500–$7.500', etiquetas: ['Sin gluten', 'Schär', 'Certificado'], alergenos: ['leche'] },
          { id: 'jb15', nombre: 'Pan de molde congelado GF', desc: 'Pan sin gluten congelado. Práctico para tener siempre disponible. Verificar marca y sello GF.', precio: '$3.500–$5.000', etiquetas: ['Sin gluten', 'Verificar marca'], alergenos: ['huevo'] },
        ]
      },
    ]
  }
};

/* ══ ABRIR PÁGINA DE TIENDA ══ */
function openStore(id) {
  const store = STORE_DETAILS[id];
  if (!store) return;

  const detailPage = document.getElementById('page-store-detail');
  if (!detailPage) return;

  detailPage.innerHTML = buildStoreHTML(store);
  injectStoreStyles();

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

function closeStore() {
  const detailPage = document.getElementById('page-store-detail');
  if (detailPage) {
    detailPage.classList.remove('active');
    detailPage.innerHTML = '';
  }
  switchTab('tiendas', document.querySelectorAll('.tab')[3]);
}

/* ══ CONSTRUIR HTML DE LA TIENDA ══ */
function buildStoreHTML(s) {

  const productosHTML = s.productos.map(cat => `
    <div class="rd-cat-title">${cat.categoria}</div>
    ${cat.items.map(p => `
      <div class="rd-plato" data-product-id="${p.id}" onclick="analyzeProduct('${s.id}','${p.id}',this)">
        <div class="rd-plato-top">
          <div class="rd-plato-nombre">${p.nombre}</div>
          <div class="rd-plato-precio">${p.precio}</div>
        </div>
        <div class="rd-plato-desc">${p.desc}</div>
        <div class="rd-plato-tags">
          ${p.etiquetas.map(t => `<span class="rd-tag ${t.includes('⚠️') || t.includes('CONTIENE') ? 'rd-tag-danger' : ''}">${t}</span>`).join('')}
        </div>
        <div class="rd-plato-cta">
          <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" style="flex-shrink:0">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          ¿Es para mí?
        </div>
      </div>
    `).join('')}
  `).join('');

  const contactoHTML = s.whatsapp
    ? `
      <div class="rd-section-title">💬 Hacer pedido</div>
      <a class="rd-whatsapp-btn"
         href="https://wa.me/${s.whatsapp}?text=Hola%2C%20te%20contacto%20desde%20CeliGO%20👋"
         target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Hacer pedido por WhatsApp
      </a>
    `
    : s.instagram
    ? `
      <div class="rd-section-title">📸 Hacer pedido</div>
      <a class="rd-instagram-btn"
         href="https://instagram.com/${s.instagram}"
         target="_blank">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
        Pedir por @${s.instagram}
      </a>
    `
    : s.tel
    ? `
      <div class="rd-section-title">📞 Contacto</div>
      <a class="rd-whatsapp-btn" href="tel:${s.tel}" style="background:#4E6B4A;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
        Llamar: ${s.tel}
      </a>
    `
    : '';

  return `
    <div class="rd-container">
      <div class="rd-header" style="background:${s.headerColor}">
        <button class="rd-back" onclick="closeStore()">← Volver</button>
        <div class="rd-header-emoji">${s.emoji}</div>
        <div class="rd-header-name">${s.name}</div>
        <div class="rd-header-tagline">${s.tagline}</div>
        <div class="rd-header-meta">
          <span class="rd-header-rating">★ ${s.rating} (${s.reviews} opiniones)</span>
          ${s.cert ? `<span class="rd-cert-badge">✓ ${s.certLabel}</span>` : ''}
        </div>
      </div>

      <div class="rd-content">
        <div class="rd-info-row">
          <span>📍 ${s.address}</span>
          <span>🕐 ${s.horario}</span>
          <span style="color:var(--text-muted);line-height:1.5;margin-top:2px;">${s.descripcion}</span>
        </div>

        <div class="rd-section-title">🏷️ Promoción de la semana</div>
        <div class="rd-banner-semana">
          <img src="${s.bannerSemana}" alt="Banner promoción de la semana - ${s.name}"
               class="rd-banner-img" onerror="this.style.display='none'"/>
        </div>

        <div class="rd-section-title">🛍️ Productos para celíacos</div>
        <p class="rd-menu-hint">Toca cualquier producto para que la IA lo evalúe según tu perfil</p>
        <div class="rd-menu">${productosHTML}</div>

        ${contactoHTML}
        <div style="height:30px;"></div>
      </div>
    </div>
  `;
}

/* ══ ANALIZAR PRODUCTO CON IA — resultado inline ══ */
async function analyzeProduct(storeId, productId, productEl) {
  const store   = STORE_DETAILS[storeId];
  const product = store.productos.flatMap(c => c.items).find(p => p.id === productId);
  if (!product) return;

  /* Toggle: cerrar si ya está abierto */
  const existing = productEl.nextElementSibling;
  if (existing && existing.classList.contains('rd-inline-result')) {
    existing.remove();
    productEl.classList.remove('rd-plato-active');
    return;
  }

  /* Cerrar cualquier otro resultado abierto */
  document.querySelectorAll('.rd-inline-result').forEach(el => el.remove());
  document.querySelectorAll('.rd-plato').forEach(el => el.classList.remove('rd-plato-active'));

  productEl.classList.add('rd-plato-active');

  const loadingEl = document.createElement('div');
  loadingEl.className = 'rd-inline-result rd-inline-loading';
  loadingEl.innerHTML = `<div class="rd-spinner"></div><span>Evaluando según tu perfil...</span>`;
  productEl.insertAdjacentElement('afterend', loadingEl);
  setTimeout(() => loadingEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);

  const userContext = typeof getUserContext === 'function' ? getUserContext() : '';

  const prompt = `El usuario está evaluando un producto de la tienda/delivery "${store.name}".

PRODUCTO: ${product.nombre}
DESCRIPCIÓN: ${product.desc}
PRECIO: ${product.precio}
ALÉRGENOS DECLARADOS: ${product.alergenos.length > 0 ? product.alergenos.join(', ') : 'ninguno declarado'}
ETIQUETAS: ${product.etiquetas.join(', ')}
ESTABLECIMIENTO: ${store.cert ? '100% especializado en productos sin gluten' : 'Sección sin gluten en supermercado (revisar etiquetas)'}

PERFIL DEL USUARIO: ${userContext || 'No configurado — evaluar para celíaco general'}

Evalúa si este producto es seguro para el usuario. Si es un supermercado, da consejos específicos sobre qué revisar en la etiqueta. Responde en JSON sin markdown:
{
  "veredicto": "APTO" | "NO APTO" | "PRECAUCIÓN",
  "resumen": "frase corta directa",
  "explicacion": "2-3 oraciones sobre si es apto para ESTE usuario específico y por qué",
  "consejo": "consejo práctico: qué revisar en la etiqueta, qué pedir al comprar, alternativas si no es apto"
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
    loadingEl.style.background   = c.bg;
    loadingEl.style.borderColor  = c.border;
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
    setTimeout(() => loadingEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);

  } catch (e) {
    console.error('[Store IA Error]:', e.message || e);
    loadingEl.innerHTML = '<p style="color:#C0392B;font-size:13px;padding:4px 0;">Servicio no disponible. Intenta en unos minutos.</p>';
  }
}

/* ══ ESTILOS DE TIENDA (reutiliza los de restaurant-detail) ══ */
function injectStoreStyles() {
  /* Los estilos .rd-* ya están inyectados por injectRestaurantStyles()
     Solo necesitamos asegurarnos de que estén disponibles */
  if (!document.getElementById('rd-styles')) {
    if (typeof injectRestaurantStyles === 'function') injectRestaurantStyles();
  }

  /* Quitar el padding de desktop que aplica .app-column .page */
  if (document.getElementById('store-detail-styles')) return;
  const style = document.createElement('style');
  style.id = 'store-detail-styles';
  style.textContent = `#page-store-detail { padding: 0 !important; background: var(--bg); }`;
  document.head.appendChild(style);
}
