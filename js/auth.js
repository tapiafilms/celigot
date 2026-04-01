/* ══════════════════════════════════════════════════════
   AUTH — CeliGO
   Maneja autenticación Supabase, modal login/signup,
   panel de perfil lateral y subida de foto comprimida.
   ══════════════════════════════════════════════════════ */

/* ── Estado global ────────────────────────────────── */
let currentUser    = null;   // objeto User de Supabase
let currentProfile = null;   // fila de la tabla profiles

/* ════════════════════════════════════════════════════
   INIT — verificar sesión existente al cargar la app
   ════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  injectAuthStyles();
  injectProfilePanelStyles();

  /* Escuchar cambios de sesión (refresh de token, logout) */
  sb.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session && !currentUser) {
      currentUser = session.user;
    } else if (event === 'SIGNED_OUT') {
      currentUser    = null;
      currentProfile = null;
    } else if (event === 'TOKEN_REFRESHED' && session) {
      currentUser = session.user;
    }
  });

  /* Verificar sesión actual */
  const { data: { session } } = await sb.auth.getSession();
  if (session && session.user) {
    await onAuthSuccess(session.user);
  } else {
    showAuthModal();
  }
});

/* ════════════════════════════════════════════════════
   AFTER AUTH — cargar perfil o arrancar onboarding
   ════════════════════════════════════════════════════ */
async function onAuthSuccess(user) {
  currentUser = user;
  removeAuthModal();

  const profile = await sbGetProfile(user.id);

  if (profile && profile.condicion) {
    /* ── Usuario con perfil completo en Supabase ── */
    currentProfile = profile;
    _syncProfileToLocalStorage(profile);
    _refreshAllUI();

  } else {
    /* ── Perfil sin datos médicos: verificar si hay datos en localStorage para migrar ── */
    const localData = _getLocalProfileData();

    if (localData && localData.condicion) {
      /* Migrar datos del localStorage (sistema antiguo) → Supabase */
      console.log('[CeliGO] Migrando perfil local a Supabase...');
      const saved = await sbUpsertProfile(user.id, {
        email:        user.email          || '',
        nombre:       localData.nombre    || '',
        condicion:    localData.condicion || '',
        sensibilidad: localData.sensibilidad || '',
        alergias:     localData.alergias  || [],
        preferencias: localData.preferencias || [],
      });
      if (saved) {
        currentProfile = saved;
        _refreshAllUI();
        console.log('[CeliGO] Perfil migrado correctamente a Supabase.');
      }
    } else {
      /* Usuario nuevo sin datos — mostrar onboarding */
      if (typeof injectOnboardingStyles === 'function') injectOnboardingStyles();
      if (typeof showOnboarding         === 'function') showOnboarding();
    }
  }
}

/* Leer perfil desde localStorage de forma segura */
function _getLocalProfileData() {
  try {
    const raw = localStorage.getItem('celigo_profile_v1');
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

/* Sincronizar perfil de Supabase → localStorage (caché para funciones síncronas) */
function _syncProfileToLocalStorage(profile) {
  try {
    localStorage.setItem('celigo_profile_v1', JSON.stringify({
      nombre:       profile.nombre       || '',
      condicion:    profile.condicion    || '',
      sensibilidad: profile.sensibilidad || '',
      alergias:     profile.alergias     || [],
      preferencias: profile.preferencias || [],
    }));
    if (profile.avatar_url) {
      localStorage.setItem('celigo_profile_photo', profile.avatar_url);
    }
  } catch(e) {}
}

/* Refrescar todos los componentes de UI que dependen del perfil */
function _refreshAllUI() {
  if (typeof updateTopbarAvatar    === 'function') updateTopbarAvatar();
  if (typeof renderProfileSummary  === 'function') renderProfileSummary();
  if (typeof updateAllergyBanner   === 'function') updateAllergyBanner();
  if (typeof updateProfileHero     === 'function') updateProfileHero();
  if (typeof renderDescubrePage    === 'function') renderDescubrePage();
  if (typeof buildAllergyGrid      === 'function') buildAllergyGrid();
  /* Si el usuario ya está en la sección Descubre cuando auth termina, cargar el feed */
  if (typeof initDescubreFeed === 'function' && document.getElementById('page-descubre')?.classList.contains('active')) {
    initDescubreFeed();
  }
}

/* ════════════════════════════════════════════════════
   MODAL DE AUTENTICACIÓN
   ════════════════════════════════════════════════════ */
function showAuthModal() {
  if (document.getElementById('auth-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.innerHTML = `
    <div class="auth-container">

      <div class="auth-logo">
        <img src="img/logo-full.png" alt="CeliGO">
      </div>

      <h1 class="auth-title">BIENVENIDO/A</h1>
      <p class="auth-subtitle">Tu guía alimentaria sin gluten en Viña del Mar</p>

      <!-- Pestañas login / registro -->
      <div class="auth-tabs">
        <button class="auth-tab active" id="tab-login"  onclick="authShowTab('login')">Iniciar sesión</button>
        <button class="auth-tab"        id="tab-signup" onclick="authShowTab('signup')">Crear cuenta</button>
      </div>

      <!-- ─── FORMULARIO LOGIN ─── -->
      <div class="auth-form" id="form-login">
        <div class="auth-field">
          <input type="email"    id="login-email"    placeholder="Correo electrónico" autocomplete="email">
        </div>
        <div class="auth-field">
          <input type="password" id="login-password" placeholder="Contraseña"         autocomplete="current-password">
        </div>
        <div class="auth-error" id="login-error"></div>
        <button class="auth-btn-primary" onclick="handleLogin()">
          <span id="login-btn-text">Entrar →</span>
        </button>
      </div>

      <!-- ─── FORMULARIO REGISTRO ─── -->
      <div class="auth-form" id="form-signup" style="display:none">
        <div class="auth-field">
          <input type="text"     id="signup-nombre"   placeholder="Tu nombre (opcional)" autocomplete="name">
        </div>
        <div class="auth-field">
          <input type="email"    id="signup-email"    placeholder="Correo electrónico"   autocomplete="email">
        </div>
        <div class="auth-field">
          <input type="password" id="signup-password" placeholder="Contraseña (mín. 6 caracteres)" autocomplete="new-password">
        </div>
        <div class="auth-error" id="signup-error"></div>
        <button class="auth-btn-primary" onclick="handleSignup()">
          <span id="signup-btn-text">Crear cuenta →</span>
        </button>
      </div>

      <p class="auth-footer">🔒 Tus datos médicos son privados y están protegidos</p>
    </div>
  `;
  document.body.appendChild(overlay);
}

function removeAuthModal() {
  const el = document.getElementById('auth-overlay');
  if (el) {
    el.style.animation = 'authFadeOut 0.3s ease forwards';
    setTimeout(() => el?.remove(), 320);
  }
}

function authShowTab(tab) {
  document.getElementById('tab-login') .classList.toggle('active', tab === 'login');
  document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
  document.getElementById('form-login') .style.display = tab === 'login'  ? '' : 'none';
  document.getElementById('form-signup').style.display = tab === 'signup' ? '' : 'none';
  /* Limpiar errores al cambiar tab */
  document.getElementById('login-error') .textContent = '';
  document.getElementById('signup-error').textContent = '';
}

/* ── LOGIN ──────────────────────────────────────── */
async function handleLogin() {
  const email    = (document.getElementById('login-email')?.value    || '').trim();
  const password =  document.getElementById('login-password')?.value || '';
  const errEl    =  document.getElementById('login-error');
  const btnText  =  document.getElementById('login-btn-text');

  errEl.textContent = '';
  if (!email || !password) { errEl.textContent = 'Completa todos los campos.'; return; }

  btnText.textContent = 'Entrando…';

  const { data, error } = await sb.auth.signInWithPassword({ email, password });

  if (error) {
    errEl.textContent   = _translateAuthError(error.message);
    btnText.textContent = 'Entrar →';
    return;
  }

  await onAuthSuccess(data.user);
}

/* ── REGISTRO ───────────────────────────────────── */
async function handleSignup() {
  const nombre   = (document.getElementById('signup-nombre')?.value   || '').trim();
  const email    = (document.getElementById('signup-email')?.value    || '').trim();
  const password =  document.getElementById('signup-password')?.value || '';
  const errEl    =  document.getElementById('signup-error');
  const btnText  =  document.getElementById('signup-btn-text');

  errEl.textContent = '';
  if (!email)           { errEl.textContent = 'Ingresa tu correo electrónico.';            return; }
  if (password.length < 6) { errEl.textContent = 'La contraseña debe tener al menos 6 caracteres.'; return; }

  btnText.textContent = 'Creando cuenta…';

  const { data, error } = await sb.auth.signUp({ email, password });

  if (error) {
    errEl.textContent   = _translateAuthError(error.message);
    btnText.textContent = 'Crear cuenta →';
    return;
  }

  if (data.user) {
    /* Guardar nombre para pre-rellenar el onboarding */
    if (nombre) sessionStorage.setItem('celigo_pending_nombre', nombre);
    await onAuthSuccess(data.user);
  } else {
    /* Supabase requiere confirmación de email */
    errEl.style.color   = '#6FBF73';
    errEl.textContent   = '¡Cuenta creada! Revisa tu correo para confirmar.';
    btnText.textContent = 'Crear cuenta →';
  }
}

/* ── LOGOUT ─────────────────────────────────────── */
async function handleLogout() {
  closeProfilePanel();
  await sb.auth.signOut();

  /* Limpiar caché local */
  try {
    localStorage.removeItem('celigo_profile_v1');
    localStorage.removeItem('celigo_profile_photo');
  } catch(e) {}

  currentUser    = null;
  currentProfile = null;

  if (typeof updateTopbarAvatar === 'function') updateTopbarAvatar();
  showAuthModal();
}

function _translateAuthError(msg) {
  if (!msg) return 'Error desconocido. Intenta de nuevo.';
  if (msg.includes('Invalid login credentials'))  return 'Correo o contraseña incorrectos.';
  if (msg.includes('Email not confirmed'))         return 'Confirma tu correo antes de entrar.';
  if (msg.includes('User already registered'))     return 'Ya existe una cuenta con ese correo.';
  if (msg.includes('Password should be'))          return 'La contraseña debe tener al menos 6 caracteres.';
  if (msg.includes('Unable to validate'))          return 'Correo no válido. Verifica el formato.';
  if (msg.includes('rate limit'))                  return 'Demasiados intentos. Espera un momento.';
  return msg;
}

/* ════════════════════════════════════════════════════
   PANEL DE PERFIL — drawer lateral izquierdo
   ════════════════════════════════════════════════════ */
function openProfilePanel() {
  const panel = document.getElementById('profilePanel');
  if (!panel) return;
  renderProfilePanel();
  panel.classList.add('open');
}

function closeProfilePanel() {
  document.getElementById('profilePanel')?.classList.remove('open');
}

function renderProfilePanel() {
  /* Leer perfil: primero Supabase, luego localStorage como fallback */
  const profile = currentProfile ||
    (typeof loadProfile === 'function' ? loadProfile() : null);

  /* ── Avatar ── */
  const ppImg  = document.getElementById('ppAvatarImg');
  const ppInit = document.getElementById('ppAvatarInitials');

  const nombre     = profile?.nombre || currentUser?.email?.split('@')[0] || 'Usuario';
  const avatarUrl  = profile?.avatar_url || _getLocalAvatar();

  if (avatarUrl && ppImg) {
    ppImg.src = avatarUrl;
    ppImg.style.display = 'block';
    if (ppInit) ppInit.style.display = 'none';
  } else if (ppInit) {
    ppInit.textContent = _getInitials(nombre);
    ppInit.style.display = '';
    if (ppImg) ppImg.style.display = 'none';
  }

  /* ── Info ── */
  const infoEl = document.getElementById('ppProfileInfo');
  if (!infoEl) return;

  const condMap = { celiaco:'Celíaco ⚕️', intolerante:'Intolerante al gluten ⚡', preferencia:'Sin gluten 🌱' };
  const sensMap = { alta:'Sensibilidad alta 🔴', media:'Sensibilidad media 🟡', baja:'Sensibilidad baja 🟢' };

  const condicion    = profile?.condicion    ? condMap[profile.condicion]    || profile.condicion    : null;
  const sensibilidad = profile?.sensibilidad ? sensMap[profile.sensibilidad] || profile.sensibilidad : null;
  const alergias     = profile?.alergias     || [];
  const prefs        = profile?.preferencias || [];

  const sinDatos = !condicion && !alergias.length;

  infoEl.innerHTML = `
    <div class="pp-name">${_escHtml(nombre)}</div>
    ${currentUser?.email ? `<div class="pp-email">${_escHtml(currentUser.email)}</div>` : ''}
    <div class="pp-tags">
      ${condicion    ? `<span class="pp-tag coral">${condicion}</span>` : ''}
      ${sensibilidad ? `<span class="pp-tag amber">${sensibilidad}</span>` : ''}
      ${alergias.map(a => `<span class="pp-tag mint">${_escHtml(a)}</span>`).join('')}
      ${prefs.map(p    => `<span class="pp-tag violet">${_escHtml(p)}</span>`).join('')}
    </div>
    ${sinDatos ? '<p class="pp-no-profile">Completa el onboarding para recomendaciones personalizadas.</p>' : ''}
  `;
}

/* ── Foto de perfil (desde el panel) ────────────── */
function triggerPhotoUpload() {
  document.getElementById('ppPhotoInput')?.click();
}

/* handleProfilePhoto — llamado desde el panel de perfil Y desde la pestaña Mi Perfil */
async function handleProfilePhoto(input) {
  const file = input?.files?.[0];
  if (!file) return;

  /* Todos los elementos de imagen que deben actualizarse */
  const ppImg       = document.getElementById('ppAvatarImg');
  const ppInit      = document.getElementById('ppAvatarInitials');
  const tbImg       = document.getElementById('topbarAvatarImg');
  const tbInit      = document.getElementById('topbarAvatarInitials');
  const tabPreview  = document.getElementById('profilePhotoPreview');      /* pestaña Mi Perfil */
  const tabHolder   = document.getElementById('profileHeroPlaceholder');   /* pestaña Mi Perfil */

  /* Preview local inmediato en TODOS los elementos */
  const localObjectUrl = URL.createObjectURL(file);
  if (ppImg)      { ppImg.src = localObjectUrl; ppImg.style.display = 'block'; }
  if (ppInit)     ppInit.style.display = 'none';
  if (tabPreview) { tabPreview.src = localObjectUrl; tabPreview.style.display = 'block'; }
  if (tabHolder)  tabHolder.style.display = 'none';

  if (currentUser) {
    /* ── Subir a Supabase Storage (comprimida) ── */
    const publicUrl = await sbUploadAvatar(currentUser.id, file);
    if (publicUrl) {
      /* Actualizar topbar */
      if (tbImg)  { tbImg.src = publicUrl; tbImg.style.display = 'block'; }
      if (tbInit) tbInit.style.display = 'none';

      /* Actualizar preview del panel y pestaña con URL permanente */
      if (ppImg)      ppImg.src = publicUrl;
      if (tabPreview) tabPreview.src = publicUrl;

      /* Guardar URL en BD y en currentProfile */
      await sbUpsertProfile(currentUser.id, { avatar_url: publicUrl });
      if (currentProfile) currentProfile.avatar_url = publicUrl;

      /* Caché local */
      try { localStorage.setItem('celigo_profile_photo', publicUrl); } catch(e) {}
    }
  } else {
    /* ── Sin sesión: comprimir y guardar como base64 ── */
    try {
      const blob   = await compressImage(file, 420, 0.75);
      const reader = new FileReader();
      reader.onload = (e) => {
        const b64 = e.target.result;
        try { localStorage.setItem('celigo_profile_photo', b64); } catch(err) {}
        if (tbImg)      { tbImg.src = b64; tbImg.style.display = 'block'; }
        if (tbInit)     tbInit.style.display = 'none';
        if (tabPreview) { tabPreview.src = b64; tabPreview.style.display = 'block'; }
        if (tabHolder)  tabHolder.style.display = 'none';
      };
      reader.readAsDataURL(blob);
    } catch(e) { console.warn('[CeliGO] compressImage fallback:', e); }
  }

  /* Limpiar input para que onChange vuelva a disparar si sube la misma imagen */
  if (input) input.value = '';
}

/* ════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════ */
function _getLocalAvatar() {
  try { return localStorage.getItem('celigo_profile_photo') || null; } catch(e) { return null; }
}

function _getInitials(nombre) {
  const parts = (nombre || '').trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return nombre.slice(0, 2).toUpperCase() || 'CE';
}

function _escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ════════════════════════════════════════════════════
   ESTILOS — Modal de autenticación
   ════════════════════════════════════════════════════ */
function injectAuthStyles() {
  if (document.getElementById('celigo-auth-styles')) return;
  const s = document.createElement('style');
  s.id = 'celigo-auth-styles';
  s.textContent = `
    /* ─── Overlay ─── */
    #auth-overlay {
      position:fixed; inset:0; z-index:2000;
      background-image:url('img/bg-leaves.jpg');
      background-size:cover; background-position:center;
      display:flex; align-items:center; justify-content:center;
      padding:20px;
      animation:authFadeIn 0.4s ease;
    }
    @keyframes authFadeIn  { from{opacity:0} to{opacity:1} }
    @keyframes authFadeOut { from{opacity:1} to{opacity:0} }

    /* ─── Card ─── */
    .auth-container {
      width:100%; max-width:360px;
      background:rgba(28,52,26,0.82);
      border-radius:24px;
      padding:36px 26px 30px;
      backdrop-filter:blur(8px);
      -webkit-backdrop-filter:blur(8px);
      display:flex; flex-direction:column; gap:16px;
      animation:authFadeIn 0.3s ease;
    }

    /* ─── Logo ─── */
    .auth-logo { text-align:center; }
    .auth-logo img {
      width:210px; max-width:100%;
      filter:drop-shadow(0 2px 10px rgba(0,0,0,0.35));
    }

    /* ─── Textos ─── */
    .auth-title {
      font-family:'Funnel Display',sans-serif;
      font-size:13px; font-weight:700;
      letter-spacing:0.2em; color:#fff;
      text-align:center; text-transform:uppercase;
      margin-top:-4px;
    }
    .auth-subtitle {
      font-size:12px; color:rgba(255,255,255,0.58);
      text-align:center; line-height:1.55; margin-top:-8px;
    }

    /* ─── Pestañas ─── */
    .auth-tabs {
      display:flex;
      border:1.5px solid rgba(255,255,255,0.15);
      border-radius:10px; overflow:hidden;
    }
    .auth-tab {
      flex:1; padding:10px 8px;
      border:none; background:transparent;
      font-family:'Plus Jakarta Sans',sans-serif;
      font-size:13px; font-weight:600;
      color:rgba(255,255,255,0.5);
      cursor:pointer; transition:all 0.2s;
    }
    .auth-tab.active {
      background:rgba(78,107,74,0.75); color:#fff;
    }

    /* ─── Formulario ─── */
    .auth-form { display:flex; flex-direction:column; gap:10px; }
    .auth-field input {
      width:100%;
      border:1.5px solid rgba(255,255,255,0.18);
      border-radius:10px;
      padding:12px 14px;
      font-family:'Plus Jakarta Sans',sans-serif;
      font-size:13px; color:#fff;
      background:rgba(255,255,255,0.09);
      outline:none; transition:border 0.2s, background 0.2s;
    }
    .auth-field input::placeholder { color:rgba(255,255,255,0.38); }
    .auth-field input:focus {
      border-color:#E8A820;
      background:rgba(255,255,255,0.13);
    }
    .auth-error {
      font-size:12px; font-weight:500;
      color:#ff7b7b; min-height:16px;
      text-align:center;
    }

    /* ─── Botón principal ─── */
    .auth-btn-primary {
      background:rgba(78,107,74,0.9); color:#fff;
      border:none; border-radius:10px;
      padding:13px;
      font-family:'Plus Jakarta Sans',sans-serif;
      font-size:13px; font-weight:700;
      letter-spacing:0.08em; text-transform:uppercase;
      cursor:pointer; transition:all 0.2s;
      margin-top:4px;
    }
    .auth-btn-primary:hover { background:#3A5236; transform:translateY(-1px); }
    .auth-btn-primary:active { transform:translateY(0); }

    /* ─── Footer ─── */
    .auth-footer {
      font-size:11px; color:rgba(255,255,255,0.38);
      text-align:center; line-height:1.5;
    }
  `;
  document.head.appendChild(s);
}

/* ════════════════════════════════════════════════════
   ESTILOS — Panel de perfil lateral
   ════════════════════════════════════════════════════ */
function injectProfilePanelStyles() {
  if (document.getElementById('celigo-pp-styles')) return;
  const s = document.createElement('style');
  s.id = 'celigo-pp-styles';
  s.textContent = `
    /* ─── Contenedor del panel ─── */
    #profilePanel {
      position:fixed; inset:0; z-index:800;
      visibility:hidden; pointer-events:none;
    }
    #profilePanel.open {
      visibility:visible; pointer-events:all;
    }

    /* ─── Fondo oscuro ─── */
    .pp-overlay {
      position:absolute; inset:0;
      background:rgba(0,0,0,0.5);
      opacity:0;
      transition:opacity 0.3s ease;
    }
    #profilePanel.open .pp-overlay { opacity:1; }

    /* ─── Drawer ─── */
    .pp-drawer {
      position:absolute; left:0; top:0; bottom:0;
      width:min(300px, 86vw);
      background:#F5F0E8;
      transform:translateX(-100%);
      transition:transform 0.32s cubic-bezier(0.32,0,0.67,0);
      display:flex; flex-direction:column;
      overflow-y:auto; overflow-x:hidden;
      box-shadow:5px 0 30px rgba(0,0,0,0.22);
    }
    #profilePanel.open .pp-drawer {
      transform:translateX(0);
      transition-timing-function:cubic-bezier(0.33,1,0.68,1);
    }

    /* ─── Header con fondo de hojas ─── */
    .pp-header {
      background:#1C2419;
      background-image:url('img/bg-leaves.jpg');
      background-size:cover; background-position:center top;
      padding:24px 16px 28px;
      display:flex; flex-direction:column;
      align-items:center; gap:14px;
      position:relative; flex-shrink:0;
    }

    /* ─── Botón cerrar ─── */
    .pp-close {
      position:absolute; top:12px; right:12px;
      width:30px; height:30px;
      background:rgba(255,255,255,0.15);
      border:none; border-radius:50%;
      color:#fff; font-size:15px;
      cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      transition:background 0.15s;
      line-height:1;
    }
    .pp-close:hover { background:rgba(255,255,255,0.28); }

    /* ─── Avatar grande ─── */
    .pp-avatar-wrap { position:relative; cursor:pointer; }
    .pp-avatar-wrap:hover .pp-avatar { opacity:0.88; }

    .pp-avatar {
      width:82px; height:82px; border-radius:50%;
      background:var(--green, #4E6B4A);
      border:3px solid rgba(255,255,255,0.45);
      display:flex; align-items:center; justify-content:center;
      overflow:hidden;
      transition:opacity 0.15s;
    }
    .pp-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
    #ppAvatarInitials {
      font-family:'Funnel Display', sans-serif;
      font-size:27px; font-weight:700; color:#fff;
    }

    .pp-avatar-edit {
      position:absolute; bottom:1px; right:1px;
      width:26px; height:26px;
      background:#E8A820; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      font-size:13px;
      border:2.5px solid #F5F0E8;
      box-shadow:0 2px 6px rgba(0,0,0,0.2);
    }

    /* ─── Cuerpo del drawer ─── */
    .pp-body {
      padding:18px 16px;
      flex:1; display:flex; flex-direction:column; gap:10px;
    }

    .pp-name {
      font-family:'Funnel Display', sans-serif;
      font-size:21px; font-weight:700; color:#1C2419;
      text-align:center; line-height:1.2;
    }
    .pp-email {
      font-size:12px; color:#7A8B78;
      text-align:center; margin-top:-6px;
      overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
    }

    .pp-tags {
      display:flex; flex-wrap:wrap; gap:6px;
      justify-content:center; margin-top:4px;
    }
    .pp-tag {
      font-size:11px; font-weight:600;
      padding:4px 11px; border-radius:100px;
    }
    .pp-tag.coral  { background:#FDECEA; color:#B71C1C; }
    .pp-tag.amber  { background:#FBF0D4; color:#8B6914; }
    .pp-tag.mint   { background:#E8F5E9; color:#2E7D32; }
    .pp-tag.violet { background:#EDE9FF; color:#5B21B6; }

    .pp-no-profile {
      font-size:12px; color:#9DAB9A;
      text-align:center; line-height:1.55;
      margin-top:4px;
    }

    /* ─── Pie del drawer ─── */
    .pp-footer {
      padding:12px 16px 20px;
      border-top:1px solid rgba(0,0,0,0.08);
      display:flex; flex-direction:column; gap:8px;
      flex-shrink:0;
    }

    .pp-btn-edit {
      background:#4E6B4A; color:#fff;
      border:none; border-radius:10px;
      padding:13px;
      font-family:'Plus Jakarta Sans', sans-serif;
      font-size:13px; font-weight:700;
      cursor:pointer; transition:all 0.15s; text-align:center;
    }
    .pp-btn-edit:hover { background:#3A5236; }

    .pp-btn-logout {
      background:transparent; color:#C0392B;
      border:1.5px solid rgba(192,57,43,0.3);
      border-radius:10px; padding:12px;
      font-family:'Plus Jakarta Sans', sans-serif;
      font-size:13px; font-weight:600;
      cursor:pointer; transition:all 0.15s; text-align:center;
    }
    .pp-btn-logout:hover { background:#FDECEA; border-color:#C0392B; }
  `;
  document.head.appendChild(s);
}
