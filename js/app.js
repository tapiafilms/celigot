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

/* ══ NAVEGACIÓN ══ */
function switchTab(name, el, fromNav = false) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  document.getElementById('page-' + name).classList.add('active');

  const order = ['restaurantes', 'asistente', 'scanner', 'tiendas', 'descubre'];
  const idx = order.indexOf(name);
  document.querySelectorAll('.tab')[idx]?.classList.add('active');
  document.querySelectorAll('.nav-btn')[idx]?.classList.add('active');

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
  localStorage.removeItem('celigo_profile_v1');
  if (typeof injectOnboardingStyles === 'function') injectOnboardingStyles();
  if (typeof showOnboarding === 'function') showOnboarding();
}

/* ══ GUARDAR PERFIL (alergias del editor) ══ */
function saveProfile() {
  updateAllergyBanner();
  updateProfileHero();
  renderDescubrePage();
  updateTopbarAvatar();

  const btn = document.querySelector('#page-alergias .btn-primary');
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

/* ══ FOTO DE PERFIL ══ */
function handleProfilePhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById('profilePhotoPreview');
    const placeholder = document.getElementById('profileHeroPlaceholder');
    img.src = e.target.result;
    img.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
    // Guardar en localStorage
    try { localStorage.setItem('celigo_profile_photo', e.target.result); } catch(err) {}
    updateTopbarAvatar();
  };
  reader.readAsDataURL(file);
}

function loadProfilePhoto() {
  try {
    const saved = localStorage.getItem('celigo_profile_photo');
    if (saved) {
      const img = document.getElementById('profilePhotoPreview');
      const placeholder = document.getElementById('profileHeroPlaceholder');
      if (img) { img.src = saved; img.style.display = 'block'; }
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

/* ══ SECCIÓN DESCUBRE ══ */
function renderDescubrePage() {
  const profile = typeof loadProfile === 'function' ? loadProfile() : null;
  const condMap = { celiaco:'Celíaco ⚕️', intolerante:'Intolerante al gluten ⚡', preferencia:'Sin gluten 🌱' };
  const sensMap = { alta:'Sensibilidad alta 🔴', media:'Sensibilidad media 🟡', baja:'Sensibilidad baja 🟢' };

  const emptyEl   = document.getElementById('descubreEmpty');
  const filledEl  = document.getElementById('descubreFilled');
  const statRowEl = document.getElementById('descubreStatRow');
  const restricEl = document.getElementById('descubreRestricciones');

  if (!profile || !profile.condicion) {
    if (emptyEl)  emptyEl.style.display  = '';
    if (filledEl) filledEl.style.display = 'none';
  } else {
    if (emptyEl)  emptyEl.style.display  = 'none';
    if (filledEl) filledEl.style.display = '';

    if (statRowEl) {
      const nombre = profile.nombre ? `<div class="descubre-hello">Hola, <strong>${profile.nombre}</strong> 👋</div>` : '';
      const cond = condMap[profile.condicion] || profile.condicion;
      const sens = profile.sensibilidad ? sensMap[profile.sensibilidad] || profile.sensibilidad : null;
      statRowEl.innerHTML = `
        ${nombre}
        <div class="descubre-tag-row">
          <span class="descubre-tag coral">${cond}</span>
          ${sens ? `<span class="descubre-tag amber">${sens}</span>` : ''}
        </div>
      `;
    }
  }

  /* Restricciones activas */
  if (restricEl) {
    const extraNames = typeof getAllergyNames === 'function' ? getAllergyNames() : [];
    const profileAlergias = profile?.alergias || [];
    const profilePrefs    = profile?.preferencias || [];
    const all = [...new Set([...profileAlergias, ...profilePrefs, ...extraNames])];

    if (all.length > 0) {
      restricEl.innerHTML = `
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
          ${all.map(a => `<span class="descubre-tag mint">${a}</span>`).join('')}
        </div>`;
    } else {
      restricEl.innerHTML = `<p style="font-size:13px;color:var(--text-muted);">Sin restricciones configuradas todavía.</p>`;
    }
  }
}

/* ══ AVATAR DEL TOPBAR ══ */
function updateTopbarAvatar() {
  const img        = document.getElementById('topbarAvatarImg');
  const initials   = document.getElementById('topbarAvatarInitials');
  const profile    = typeof loadProfile === 'function' ? loadProfile() : null;

  try {
    const saved = localStorage.getItem('celigo_profile_photo');
    if (saved && img) {
      img.src = saved;
      img.style.display = 'block';
      if (initials) initials.style.display = 'none';
      return;
    }
  } catch(e) {}

  /* Sin foto: mostrar iniciales del nombre o "CE" */
  if (img) img.style.display = 'none';
  if (initials) {
    const nombre = profile?.nombre || '';
    const parts  = nombre.trim().split(' ');
    initials.textContent = parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : nombre.length > 0 ? nombre[0].toUpperCase() + (nombre[1] || '').toUpperCase()
      : 'CE';
    initials.style.display = '';
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
});
