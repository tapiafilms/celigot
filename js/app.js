/* ══════════════════════════════════════
   CONFIG — URL del Cloudflare Worker
   ══════════════════════════════════════ */
const WORKER_URL = "https://divine-waterfall-d1dfsin-gluten-life.pablo77tapia.workers.dev";

/* ══ ALERGIAS PRESET (para el editor en MI PERFIL) ══ */
const PRESET_ALLERGIES = [
  { id:'gluten',       emoji:'🌾', name:'Gluten',             sub:'Trigo, cebada, centeno' },
  { id:'leche',        emoji:'🥛', name:'Leche de vaca',      sub:'Lácteos, caseína, suero' },
  { id:'huevo',        emoji:'🥚', name:'Huevo',              sub:'Clara y yema' },
  { id:'frutos_secos', emoji:'🥜', name:'Frutos secos',       sub:'Maní, nueces, almendras' },
  { id:'mariscos',     emoji:'🦐', name:'Mariscos y pescado', sub:'Crustáceos, moluscos' },
  { id:'soja',         emoji:'🫘', name:'Soja',               sub:'Lecitina, proteína de soja' },
  { id:'preservantes', emoji:'🧪', name:'Preservantes',       sub:'BHA, BHT, nitratos, sulfitos' },
  { id:'mostaza',      emoji:'🌿', name:'Mostaza',            sub:'Semilla y derivados' },
];

let selectedAllergies = new Set();
let customAllergies   = [];

/* ══ HOME — navegar al home post-login ══ */
function goToHome() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const pageEl = document.getElementById('page-home');
  if (pageEl) pageEl.classList.add('active');

  /* Actualizar saludo y strip de alergias */
  _refreshHomeUI();

  const appPages = document.querySelector('.app-pages');
  if (appPages && window.innerWidth >= 900) {
    appPages.scrollTop = 0;
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

/* Actualizar contenido dinámico del Home */
function _refreshHomeUI() {
  /* Saludo personalizado */
  const greetingEl = document.getElementById('homeGreeting');
  if (greetingEl) {
    let nombre = '';
    try {
      const p = currentProfile || JSON.parse(localStorage.getItem('celigo_profile_v1') || '{}');
      nombre = p.nombre || '';
    } catch(e) {}
    const hora = new Date().getHours();
    const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';
    greetingEl.textContent = nombre ? `${saludo}, ${nombre} 👋` : `${saludo} 👋`;
  }

  /* Strip de alergias activas */
  const strip  = document.getElementById('homeAllergyStrip');
  const stripT = document.getElementById('homeAllergyText');
  if (strip && stripT) {
    try {
      const p = currentProfile || JSON.parse(localStorage.getItem('celigo_profile_v1') || '{}');
      const alergias = Array.isArray(p.alergias) ? p.alergias : [];
      const condicion = p.condicion || '';
      if (condicion || alergias.length > 0) {
        const parts = [];
        if (condicion) parts.push(condicion);
        if (alergias.length > 0) parts.push(`${alergias.length} alergia${alergias.length > 1 ? 's' : ''} activa${alergias.length > 1 ? 's' : ''}`);
        stripT.textContent = parts.join(' · ');
        strip.style.display = 'flex';
      } else {
        strip.style.display = 'none';
      }
    } catch(e) {
      strip.style.display = 'none';
    }
  }
}

/* ══ NAVEGACIÓN ══ */
function switchTab(name, el, fromNav = false) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const pageEl = document.getElementById('page-' + name);
  if (!pageEl) return;
  pageEl.classList.add('active');

  const order = ['restaurantes', 'asistente', 'scanner', 'tiendas', 'descubre'];
  const idx = order.indexOf(name);
  if (idx >= 0) {
    document.querySelectorAll('.tab')[idx]?.classList.add('active');
    document.querySelectorAll('.nav-btn')[idx]?.classList.add('active');
  }

  /* Inicializar feed al entrar a DESCUBRE */
  if (name === 'descubre' && typeof initDescubreFeed === 'function') {
    initDescubreFeed();
  }

  /* Al entrar a RESTAURANTES: actualizar banner de ubicación */
  if (name === 'restaurantes') {
    if (typeof updateLocationBanner === 'function') updateLocationBanner();
    /* Si la ubicación aún no se solicitó, pedirla ahora */
    if (typeof requestUserLocation === 'function') requestUserLocation();
  }

  const appPages = document.querySelector('.app-pages');
  if (appPages && window.innerWidth >= 900) {
    appPages.scrollTop = 0;
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

/* ══ NAVEGAR AL PERFIL (via avatar fijo) ══ */
function goToProfile() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const pageEl = document.getElementById('page-perfil');
  if (pageEl) pageEl.classList.add('active');

  /* Refrescar datos del perfil */
  loadProfilePhoto();
  updateProfileHero();
  renderProfileSummary();
  buildAllergyGrid();

  const appPages = document.querySelector('.app-pages');
  if (appPages && window.innerWidth >= 900) {
    appPages.scrollTop = 0;
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

/* ══ OBTENER CONTEXTO COMPLETO DEL PERFIL PARA LA IA ══ */
function getUserContext() {
  /* Contexto del onboarding (condición, sensibilidad, preferencias) */
  const aiCtx = typeof buildAIContext === 'function' ? buildAIContext() : '';

  /* Alergias adicionales seleccionadas en MI PERFIL */
  const extraAllergies = getAllergyNames();
  const extraCtx = extraAllergies.length > 0
    ? `Alergias adicionales configuradas: ${extraAllergies.join(', ')}.`
    : '';

  return [aiCtx, extraCtx].filter(Boolean).join(' ');
}

/* ══ ALERGIAS (editor en MI PERFIL) ══ */
function buildAllergyGrid() {
  const grid = document.getElementById('allergyGrid');
  if (!grid) return;
  grid.innerHTML = PRESET_ALLERGIES.map(a => `
    <div class="allergy-toggle ${selectedAllergies.has(a.id) ? 'selected' : ''}"
         id="at-${a.id}" onclick="toggleAllergy('${a.id}')">
      <span class="at-emoji">${a.emoji}</span>
      <div class="at-info">
        <div class="at-name">${a.name}</div>
        <div class="at-sub">${a.sub}</div>
      </div>
      <div class="at-check">${selectedAllergies.has(a.id) ? '✓' : ''}</div>
    </div>
  `).join('');
}

function toggleAllergy(id) {
  if (selectedAllergies.has(id)) selectedAllergies.delete(id);
  else selectedAllergies.add(id);
  buildAllergyGrid();
}

function addCustomAllergy() {
  const inp = document.getElementById('customAllergyInput');
  const val = inp.value.trim();
  if (!val) return;
  if (!customAllergies.includes(val)) {
    customAllergies.push(val);
    renderCustomTags();
  }
  inp.value = '';
}

function removeCustom(val) {
  customAllergies = customAllergies.filter(a => a !== val);
  renderCustomTags();
}

function renderCustomTags() {
  const el = document.getElementById('customTags');
  if (!el) return;
  el.innerHTML = customAllergies.map(a => `
    <span class="custom-tag">${a}
      <button onclick="removeCustom('${a}')">×</button>
    </span>
  `).join('');
}

function getAllergyNames() {
  const presets = PRESET_ALLERGIES
    .filter(a => selectedAllergies.has(a.id))
    .map(a => a.name);
  return [...presets, ...customAllergies];
}

function updateAllergyBanner() {
  const profile = typeof loadProfile === 'function' ? loadProfile() : null;
  const extraNames = getAllergyNames();
  const banner = document.getElementById('allergyBanner');
  if (!banner) return;

  const allNames = [];
  if (profile?.condicion) {
    const map = { celiaco:'Celíaco', intolerante:'Intolerante', preferencia:'Sin gluten' };
    if (map[profile.condicion]) allNames.push(map[profile.condicion]);
  }
  allNames.push(...extraNames);

  if (allNames.length > 0) {
    banner.classList.add('show');
    document.getElementById('allergyBannerText').textContent =
      `Perfil activo: ${allNames.slice(0, 3).join(', ')}${allNames.length > 3 ? ' y más' : ''}`;
  } else {
    banner.classList.remove('show');
  }
}

/* ══ MI PERFIL — mostrar datos del onboarding ══ */
function renderProfileSummary() {
  const profile = typeof loadProfile === 'function' ? loadProfile() : null;
  const container = document.getElementById('profileSummaryCard');
  if (!container || !profile) return;

  const condMap = { celiaco:'Celíaco ⚕️', intolerante:'Intolerante al gluten ⚡', preferencia:'Evita el gluten 🌱' };
  const sensMap = { alta:'Sensibilidad alta 🔴', media:'Sensibilidad media 🟡', baja:'Sensibilidad baja 🟢' };

  const nombre   = profile.nombre ? `<div class="ps-name">Hola, <strong>${profile.nombre}</strong></div>` : '';
  const condTag  = profile.condicion  ? `<span class="ps-tag coral">${condMap[profile.condicion] || profile.condicion}</span>` : '';
  const sensTag  = profile.sensibilidad ? `<span class="ps-tag amber">${sensMap[profile.sensibilidad] || profile.sensibilidad}</span>` : '';
  const alerTags = (profile.alergias || []).map(a => `<span class="ps-tag mint">${a}</span>`).join('');
  const prefTags = (profile.preferencias || []).map(p => `<span class="ps-tag violet">${p}</span>`).join('');

  container.innerHTML = `
    <div class="ps-inner">
      ${nombre}
      <div class="ps-tags">${condTag}${sensTag}${alerTags}${prefTags}</div>
      <button class="ps-edit-btn" onclick="resetOnboarding()">Editar perfil</button>
    </div>
  `;
  container.style.display = 'block';
}

function resetOnboarding() {
  /* Limpiar caché local del perfil (se volverá a llenar tras el onboarding) */
  try { localStorage.removeItem('celigo_profile_v1'); } catch(e) {}

  /* Resetear el estado en memoria para que el UI no muestre datos viejos */
  if (typeof currentProfile !== 'undefined') currentProfile = null;

  if (typeof injectOnboardingStyles === 'function') injectOnboardingStyles();
  if (typeof showOnboarding         === 'function') showOnboarding();
}

/* ══ GUARDAR PERFIL (alergias del editor en la pestaña MI PERFIL) ══ */
function saveProfile() {
  updateAllergyBanner();
  updateProfileHero();
  renderDescubrePage();
  updateTopbarAvatar();

  /* Sincronizar alergias adicionales con Supabase si hay sesión */
  (async () => {
    if (typeof sb !== 'undefined' && typeof currentUser !== 'undefined' && currentUser) {
      const extraAllergies = typeof getAllergyNames === 'function' ? getAllergyNames() : [];
      const current = typeof loadProfile === 'function' ? loadProfile() : {};
      /* Mezclar alergias del onboarding con las del editor */
      const merged = [...new Set([...(current?.alergias || []), ...extraAllergies])];
      await sbUpsertProfile(currentUser.id, { alergias: merged });
      if (typeof currentProfile !== 'undefined' && currentProfile) {
        currentProfile.alergias = merged;
      }
    }
  })();

  const btn = document.querySelector('#page-perfil .btn-primary');
  if (!btn) return;
  btn.textContent = '✓ Perfil guardado';
  btn.style.background = 'var(--mint)';
  setTimeout(() => {
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round">
        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
        <polyline points="17 21 17 13 7 13 7 21"/>
        <polyline points="7 3 7 8 15 8"/>
      </svg> Guardar cambios`;
    btn.style.background = '';
  }, 2000);
}

/* ══ ESTILOS EXTRA PARA MI PERFIL ══ */
function injectProfileStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #profileSummaryCard {
      background:linear-gradient(135deg, var(--coral-pale), var(--mint-pale));
      border:1.5px solid rgba(255,107,107,0.2);
      border-radius:var(--r);
      padding:18px;
      margin-bottom:14px;
      display:none;
    }
    .ps-inner { display:flex; flex-direction:column; gap:10px; }
    .ps-name { font-size:15px; color:var(--text); }
    .ps-name strong { font-family:'Funnel Display', sans-serif; font-size:18px; }
    .ps-tags { display:flex; flex-wrap:wrap; gap:6px; }
    .ps-tag { font-size:11px; font-weight:600; padding:4px 11px; border-radius:var(--r-pill); }
    .ps-tag.coral  { background:var(--coral-light); color:var(--coral-dark); }
    .ps-tag.amber  { background:var(--amber-light); color:#B8860B; }
    .ps-tag.mint   { background:var(--mint-light); color:var(--mint-dark); }
    .ps-tag.violet { background:var(--violet-light); color:var(--violet); }
    .ps-edit-btn {
      background:none; border:1.5px solid var(--border-md);
      border-radius:var(--r-xs); padding:8px 14px;
      font-size:12px; font-weight:600; color:var(--text-muted);
      cursor:pointer; font-family:'Plus Jakarta Sans', sans-serif;
      align-self:flex-start; transition:all 0.15s;
    }
    .ps-edit-btn:hover { border-color:var(--coral); color:var(--coral); }
  `;
  document.head.appendChild(style);
}

/* ══ FOTO DE PERFIL ══
   handleProfilePhoto está definida en auth.js
   (con compresión + upload a Supabase Storage).
   loadProfilePhoto lee desde localStorage/Supabase.  ══ */
function loadProfilePhoto() {
  try {
    /* Primero intentar URL de Supabase desde el perfil en memoria */
    const avatarUrl = (typeof currentProfile !== 'undefined' && currentProfile?.avatar_url)
      ? currentProfile.avatar_url
      : localStorage.getItem('celigo_profile_photo');

    if (avatarUrl) {
      const img         = document.getElementById('profilePhotoPreview');
      const placeholder = document.getElementById('profileHeroPlaceholder');
      if (img) { img.src = avatarUrl; img.style.display = 'block'; }
      if (placeholder) placeholder.style.display = 'none';
    }
  } catch(err) {}
}

function updateProfileHero() {
  const profile = typeof loadProfile === 'function' ? loadProfile() : null;
  const nameEl  = document.getElementById('profileHeroName');
  const badgeEl = document.getElementById('profileHeroBadge');
  if (!nameEl || !badgeEl) return;

  if (profile?.nombre) {
    nameEl.textContent = profile.nombre;
  } else {
    nameEl.textContent = 'Mi perfil';
  }

  const tags = [];
  const condMap = { celiaco:'Celíaco ⚕️', intolerante:'Intolerante al gluten ⚡', preferencia:'Sin gluten 🌱' };
  const sensMap = { alta:'Sensibilidad alta 🔴', media:'Sensibilidad media 🟡', baja:'Sensibilidad baja 🟢' };
  if (profile?.condicion)   tags.push({ text: condMap[profile.condicion]  || profile.condicion,   cls: 'coral' });
  if (profile?.sensibilidad) tags.push({ text: sensMap[profile.sensibilidad] || profile.sensibilidad, cls: 'amber' });

  badgeEl.innerHTML = tags.map(t => `<span class="ps-tag ${t.cls}">${t.text}</span>`).join('');
}

/* ══ SECCIÓN DESCUBRE — ahora es el feed social ══
   El feed se inicializa en initDescubreFeed() de descubre.js
   Esta función se mantiene por compatibilidad con llamadas existentes.  */
function renderDescubrePage() {
  /* Actualizar avatar del formulario de creación si ya está cargado */
  if (typeof updateFeedCreateAvatar === 'function') {
    updateFeedCreateAvatar();
  }
}

/* ══ AVATAR DEL TOPBAR + AVATAR FIJO ══ */
function updateTopbarAvatar() {
  const profile  = (typeof currentProfile !== 'undefined' && currentProfile)
    ? currentProfile
    : (typeof loadProfile === 'function' ? loadProfile() : null);

  /* Intentar URL de avatar */
  let avatarUrl = null;
  if (profile?.avatar_url) {
    avatarUrl = profile.avatar_url;
  } else {
    try { avatarUrl = localStorage.getItem('celigo_profile_photo'); } catch(e) {}
  }

  /* Iniciales */
  const nombre  = profile?.nombre || (typeof currentUser !== 'undefined' ? currentUser?.email?.split('@')[0] : '') || '';
  const parts   = nombre.trim().split(/\s+/);
  const initStr = parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : nombre.slice(0, 2).toUpperCase() || 'CE';

  /* Actualizar topbar interno */
  const img      = document.getElementById('topbarAvatarImg');
  const initials = document.getElementById('topbarAvatarInitials');
  if (avatarUrl && img) {
    img.src = avatarUrl; img.style.display = 'block';
    if (initials) initials.style.display = 'none';
  } else {
    if (img) img.style.display = 'none';
    if (initials) { initials.textContent = initStr; initials.style.display = ''; }
  }

  /* Actualizar avatar fijo (esquina superior izquierda) */
  const fixedImg      = document.getElementById('fixedAvatarImg');
  const fixedInitials = document.getElementById('fixedAvatarInitials');
  if (avatarUrl && fixedImg) {
    fixedImg.src = avatarUrl; fixedImg.style.display = 'block';
    if (fixedInitials) fixedInitials.style.display = 'none';
  } else {
    if (fixedImg) fixedImg.style.display = 'none';
    if (fixedInitials) { fixedInitials.textContent = initStr; fixedInitials.style.display = ''; }
  }

  /* Actualizar también el avatar del feed de descubre si está cargado */
  if (typeof updateFeedCreateAvatar === 'function') {
    updateFeedCreateAvatar();
  }
}

/* ══ INIT ══ */
document.addEventListener('DOMContentLoaded', () => {
  injectProfileStyles();
  buildAllergyGrid();
  renderRest();
  renderStore();
  updateAllergyBanner();
  renderProfileSummary();
  loadProfilePhoto();
  updateProfileHero();
  renderDescubrePage();
  updateTopbarAvatar();
  lockPortrait();
});

/* ══ Bloqueo de orientación vertical ══
   1. Screen Orientation API  → Chrome/Android (PWA y navegador)
   2. Overlay CSS             → fallback para iOS/Safari              */
function lockPortrait() {
  /* Intento con la API (requiere que la página esté en primer plano) */
  if (screen?.orientation?.lock) {
    screen.orientation.lock('portrait').catch(() => {
      /* Silencioso: el navegador puede rechazarlo fuera de PWA instalada */
    });
  }
  /* El overlay CSS ya se activa automáticamente por @media (orientation: landscape) */
}
