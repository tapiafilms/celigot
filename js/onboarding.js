/* ══════════════════════════════════════
   ONBOARDING — se muestra solo la primera
   vez que el usuario abre la app
   ══════════════════════════════════════ */

const ONBOARDING_KEY = 'celigo_profile_v1';

/* Lee el perfil guardado */
function loadProfile() {
  try {
    const raw = localStorage.getItem(ONBOARDING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

/* Guarda el perfil */
function saveProfileData(data) {
  localStorage.setItem(ONBOARDING_KEY, JSON.stringify(data));
}

/* Construye el string de contexto que se inyecta en cada llamada a la IA */
function buildAIContext() {
  const p = loadProfile();
  if (!p) return '';

  const lines = [];

  if (p.condicion) {
    const condMap = {
      celiaco:      'El usuario ES CELÍACO (enfermedad celiaca diagnosticada). El gluten le causa daño intestinal real.',
      intolerante:  'El usuario es INTOLERANTE AL GLUTEN (sensibilidad no celíaca). Debe evitarlo aunque no tiene daño intestinal.',
      preferencia:  'El usuario PREFIERE EVITAR el gluten por elección personal, no por diagnóstico médico.',
    };
    if (condMap[p.condicion]) lines.push(condMap[p.condicion]);
  }

  if (p.sensibilidad) {
    const sensMap = {
      alta:   'Su nivel de sensibilidad es ALTO — reacciona incluso a trazas mínimas y contaminación cruzada.',
      media:  'Su nivel de sensibilidad es MEDIO — tolera pequeñas trazas pero evita productos con gluten.',
      baja:   'Su nivel de sensibilidad es BAJO — tolera trazas, principalmente evita productos con gluten explícito.',
    };
    if (sensMap[p.sensibilidad]) lines.push(sensMap[p.sensibilidad]);
  }

  if (p.alergias && p.alergias.length > 0) {
    lines.push(`Además tiene estas alergias/intolerancias: ${p.alergias.join(', ')}.`);
  }

  if (p.preferencias && p.preferencias.length > 0) {
    lines.push(`Sus preferencias alimentarias: ${p.preferencias.join(', ')}.`);
  }

  if (p.nombre) {
    lines.push(`El usuario se llama ${p.nombre}.`);
  }

  return lines.join(' ');
}

/* ── PANTALLA DE ONBOARDING ── */
function showOnboarding() {
  if (document.getElementById('onboarding-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'onboarding-overlay';
  overlay.innerHTML = `
    <div class="ob-container">

      <!-- PASO 1: Bienvenida -->
      <div class="ob-step active" id="ob-step-1">
        <div class="ob-logo"><img src="img/logo-full.png" alt="CeliGOT"></div>
        <h1 class="ob-title">BIENVENIDOS A CELIGOT</h1>
        <p class="ob-desc">Tu guía alimentaria personalizada en Viña del Mar. Cuéntanos sobre ti para darte una mejor experiencia.</p>
        <div class="ob-field">
          <input type="text" id="ob-nombre" placeholder="Tu nombre...">
        </div>
        <button class="ob-btn-primary" onclick="obNext(1)">EMPEZAR</button>
      </div>

      <!-- PASO 2: Condición -->
      <div class="ob-step" id="ob-step-2">
        <div class="ob-progress"><div class="ob-bar" style="width:25%"></div></div>
        <h2 class="ob-title">¿Cuál es tu relación con el gluten?</h2>
        <p class="ob-desc">Esto determina cómo la IA analiza cada producto para ti.</p>
        <div class="ob-options" id="ob-condicion">
          <div class="ob-option" onclick="obSelect('condicion','celiaco',this)">
            <span class="ob-opt-icon">⚕️</span>
            <div>
              <div class="ob-opt-title">Soy celíaco</div>
              <div class="ob-opt-sub">Diagnóstico médico confirmado</div>
            </div>
          </div>
          <div class="ob-option" onclick="obSelect('condicion','intolerante',this)">
            <span class="ob-opt-icon">⚡</span>
            <div>
              <div class="ob-opt-title">Soy intolerante</div>
              <div class="ob-opt-sub">Sensibilidad sin diagnóstico formal</div>
            </div>
          </div>
          <div class="ob-option" onclick="obSelect('condicion','preferencia',this)">
            <span class="ob-opt-icon">🌱</span>
            <div>
              <div class="ob-opt-title">Por preferencia</div>
              <div class="ob-opt-sub">Elijo evitarlo, no es médico</div>
            </div>
          </div>
        </div>
        <div class="ob-nav">
          <button class="ob-btn-ghost" onclick="obBack(2)">← Atrás</button>
          <button class="ob-btn-primary" onclick="obNext(2)">Continuar →</button>
        </div>
      </div>

      <!-- PASO 3: Sensibilidad -->
      <div class="ob-step" id="ob-step-3">
        <div class="ob-progress"><div class="ob-bar" style="width:50%"></div></div>
        <h2 class="ob-title">¿Qué tan sensible eres?</h2>
        <p class="ob-desc">Nos ayuda a advertirte sobre contaminación cruzada y trazas.</p>
        <div class="ob-options" id="ob-sensibilidad">
          <div class="ob-option" onclick="obSelect('sensibilidad','alta',this)">
            <span class="ob-opt-icon">🔴</span>
            <div>
              <div class="ob-opt-title">Sensibilidad alta</div>
              <div class="ob-opt-sub">Reacciono a trazas mínimas y contaminación cruzada</div>
            </div>
          </div>
          <div class="ob-option" onclick="obSelect('sensibilidad','media',this)">
            <span class="ob-opt-icon">🟡</span>
            <div>
              <div class="ob-opt-title">Sensibilidad media</div>
              <div class="ob-opt-sub">Evito el gluten pero tolero pequeñas trazas</div>
            </div>
          </div>
          <div class="ob-option" onclick="obSelect('sensibilidad','baja',this)">
            <span class="ob-opt-icon">🟢</span>
            <div>
              <div class="ob-opt-title">Sensibilidad baja</div>
              <div class="ob-opt-sub">Solo evito productos con gluten explícito</div>
            </div>
          </div>
        </div>
        <div class="ob-nav">
          <button class="ob-btn-ghost" onclick="obBack(3)">← Atrás</button>
          <button class="ob-btn-primary" onclick="obNext(3)">Continuar →</button>
        </div>
      </div>

      <!-- PASO 4: Alergias adicionales -->
      <div class="ob-step" id="ob-step-4">
        <div class="ob-progress"><div class="ob-bar" style="width:75%"></div></div>
        <h2 class="ob-title">¿Tienes otras alergias?</h2>
        <p class="ob-desc">Selecciona todas las que correspondan. Puedes editarlas después.</p>
        <div class="ob-grid" id="ob-alergias">
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Leche de vaca">🥛 Leche</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Huevo">🥚 Huevo</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Frutos secos">🥜 Frutos secos</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Mariscos">🦐 Mariscos</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Soja">🫘 Soja</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Mostaza">🌿 Mostaza</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Preservantes artificiales">🧪 Preservantes</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Colorantes artificiales">🎨 Colorantes</div>
        </div>
        <div class="ob-nav">
          <button class="ob-btn-ghost" onclick="obBack(4)">← Atrás</button>
          <button class="ob-btn-primary" onclick="obNext(4)">Continuar →</button>
        </div>
      </div>

      <!-- PASO 5: Preferencias -->
      <div class="ob-step" id="ob-step-5">
        <div class="ob-progress"><div class="ob-bar" style="width:90%"></div></div>
        <h2 class="ob-title">¿Tienes preferencias alimentarias?</h2>
        <p class="ob-desc">La IA las tendrá en cuenta al recomendarte productos y restaurantes.</p>
        <div class="ob-grid" id="ob-preferencias">
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Vegetariano">🥦 Vegetariano</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Vegano">🌱 Vegano</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Sin lactosa">🥛 Sin lactosa</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Sin azúcar añadida">🍬 Sin azúcar</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Bajo en sodio">🧂 Bajo en sodio</div>
          <div class="ob-chip" onclick="obToggleChip(this)" data-val="Orgánico preferido">🌿 Orgánico</div>
        </div>
        <div class="ob-nav">
          <button class="ob-btn-ghost" onclick="obBack(5)">← Atrás</button>
          <button class="ob-btn-primary" onclick="obFinish()">Guardar perfil ✓</button>
        </div>
      </div>

      <!-- PASO 6: Confirmación -->
      <div class="ob-step" id="ob-step-6">
        <div class="ob-progress"><div class="ob-bar" style="width:100%"></div></div>
        <div class="ob-icon">✅</div>
        <h2 class="ob-title" id="ob-welcome-name">¡Todo listo!</h2>
        <p class="ob-desc">Tu perfil está guardado. La IA usará esta información en cada análisis y conversación.</p>
        <div class="ob-summary" id="ob-summary"></div>
        <button class="ob-btn-primary" onclick="obClose()" style="margin-top:24px;">Ver restaurantes cerca →</button>
      </div>

    </div>
  `;
  document.body.appendChild(overlay);

  /* Pre-rellenar nombre si viene del signup */
  const pendingNombre = sessionStorage.getItem('celigo_pending_nombre');
  if (pendingNombre) {
    setTimeout(() => {
      const el = document.getElementById('ob-nombre');
      if (el) { el.value = pendingNombre; }
      sessionStorage.removeItem('celigo_pending_nombre');
    }, 60);
  }
}

/* ── ESTADO TEMPORAL DEL ONBOARDING ── */
const obData = { nombre:'', condicion:'', sensibilidad:'', alergias:[], preferencias:[] };

function obNext(step) {
  if (step === 1) {
    obData.nombre = document.getElementById('ob-nombre').value.trim();
  }
  if (step === 2 && !obData.condicion) {
    obShake('ob-condicion'); return;
  }
  if (step === 3 && !obData.sensibilidad) {
    obShake('ob-sensibilidad'); return;
  }
  if (step === 4) {
    obData.alergias = [...document.querySelectorAll('#ob-alergias .ob-chip.selected')]
      .map(c => c.dataset.val);
  }
  document.getElementById('ob-step-' + step).classList.remove('active');
  document.getElementById('ob-step-' + (step + 1)).classList.add('active');
}

function obBack(step) {
  document.getElementById('ob-step-' + step).classList.remove('active');
  document.getElementById('ob-step-' + (step - 1)).classList.add('active');
}

function obSelect(field, val, el) {
  document.querySelectorAll(`#ob-${field} .ob-option`).forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  obData[field] = val;
}

function obToggleChip(el) {
  el.classList.toggle('selected');
}

function obShake(id) {
  const el = document.getElementById(id);
  el.style.animation = 'obShake 0.4s ease';
  setTimeout(() => el.style.animation = '', 400);
}

function obFinish() {
  obData.preferencias = [...document.querySelectorAll('#ob-preferencias .ob-chip.selected')]
    .map(c => c.dataset.val);

  /* Guardar en localStorage (caché sincrónico para la IA) */
  saveProfileData(obData);

  /* ── Guardar en Supabase (si hay sesión) ── */
  (async () => {
    if (typeof sb !== 'undefined' && typeof currentUser !== 'undefined' && currentUser) {
      const saved = await sbUpsertProfile(currentUser.id, {
        email:        currentUser.email || '',
        nombre:       obData.nombre       || '',
        condicion:    obData.condicion    || '',
        sensibilidad: obData.sensibilidad || '',
        alergias:     obData.alergias     || [],
        preferencias: obData.preferencias || [],
      });
      if (saved) {
        currentProfile = saved;
      }
    }
  })();

  // Mostrar resumen
  if (obData.nombre) {
    document.getElementById('ob-welcome-name').textContent = `¡Listo, ${obData.nombre}!`;
  }

  const condMap = { celiaco:'Celíaco', intolerante:'Intolerante al gluten', preferencia:'Evita el gluten por preferencia' };
  const sensMap = { alta:'Sensibilidad alta', media:'Sensibilidad media', baja:'Sensibilidad baja' };
  const items = [
    condMap[obData.condicion],
    sensMap[obData.sensibilidad],
    ...obData.alergias,
    ...obData.preferencias,
  ].filter(Boolean);

  document.getElementById('ob-summary').innerHTML = items.map(i =>
    `<span class="ob-summary-tag">${i}</span>`
  ).join('');

  document.getElementById('ob-step-5').classList.remove('active');
  document.getElementById('ob-step-6').classList.add('active');
}

function obClose() {
  const overlay = document.getElementById('onboarding-overlay');
  if (!overlay) return;
  overlay.style.animation = 'obFadeOut 0.3s ease forwards';
  setTimeout(() => {
    overlay.remove();
    /* Actualizar UI con el perfil recién guardado */
    if (typeof _refreshAllUI   === 'function') _refreshAllUI();
    if (typeof updateTopbarAvatar === 'function') updateTopbarAvatar();
    switchTab('restaurantes', document.querySelectorAll('.tab')[0]);
  }, 300);
}

/* ── CSS DEL ONBOARDING (inyectado dinámicamente) ── */
function injectOnboardingStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #onboarding-overlay {
      position:fixed; inset:0; z-index:1000;
      background-image: url('img/bg-leaves.jpg');
      background-size:cover; background-position:center;
      display:flex; align-items:center; justify-content:center;
      padding:24px;
      animation:obFadeIn 0.4s ease;
    }
    @keyframes obFadeIn { from{opacity:0} to{opacity:1} }
    @keyframes obFadeOut { from{opacity:1} to{opacity:0} }
    @keyframes obShake {
      0%,100%{transform:translateX(0)}
      25%{transform:translateX(-8px)}
      75%{transform:translateX(8px)}
    }

    .ob-container {
      width:100%; max-width:400px;
      max-height:92vh;
      overflow-y:auto;
      scrollbar-width:none;
    }
    .ob-container::-webkit-scrollbar { display:none; }

    /* Card verde oscuro para todos los pasos */
    .ob-step {
      display:none; flex-direction:column; gap:18px;
      background:rgb(30 52 28 / 71%);
      border-radius:20px;
      padding:36px 28px 32px;
      backdrop-filter:blur(4px);
    }
    .ob-step.active { display:flex; animation:obFadeIn 0.3s ease; }

    /* Paso 1: card más compacta y centrada */
    #ob-step-1 { align-items:center; text-align:center; gap:16px; }

    .ob-logo { text-align:center; }
    .ob-logo img { width:260px; max-width:100%; filter:drop-shadow(0 2px 12px rgba(0,0,0,0.3)); }

    .ob-icon { font-size:52px; text-align:center; }

    /* Paso 1 título: caps espaciado blanco */
    #ob-step-1 .ob-title {
      font-family:'Funnel Display', sans-serif;
      font-weight:700; font-size:15px;
      letter-spacing:0.15em;
      color:#ffffff;
      text-transform:uppercase;
      text-align:center;
    }

    /* Títulos pasos 2-6 */
    .ob-title {
      font-family:'Funnel Display', sans-serif;
      font-weight:700; font-size:20px;
      line-height:1.25; color:#ffffff;
      text-align:center;
    }

    .ob-desc {
      font-size:13px; color:rgba(255,255,255,0.72);
      line-height:1.65; text-align:center;
    }

    .ob-progress {
      height:3px; background:rgba(255,255,255,0.15);
      border-radius:4px; overflow:hidden;
    }
    .ob-bar {
      height:100%; background:#E8A820;
      border-radius:4px;
      transition:width 0.4s ease;
    }

    .ob-field { display:flex; flex-direction:column; gap:8px; width:100%; }
    .ob-optional { font-weight:400; color:rgba(255,255,255,0.4); }
    .ob-field input {
      border:1.5px solid rgba(255,255,255,0.25);
      border-radius:10px;
      padding:13px 16px;
      font-family:'Plus Jakarta Sans', sans-serif;
      font-size:14px; color:#fff;
      outline:none;
      background:rgba(255,255,255,0.1);
      width:100%;
    }
    .ob-field input::placeholder { color:rgba(255,255,255,0.45); }
    .ob-field input:focus { border-color:#E8A820; background:rgba(255,255,255,0.14); }

    .ob-options { display:flex; flex-direction:column; gap:10px; }
    .ob-option {
      display:flex; align-items:center; gap:14px;
      background:rgba(255,255,255,0.08);
      border:1.5px solid rgba(255,255,255,0.15);
      border-radius:14px;
      padding:14px 16px;
      cursor:pointer;
      transition:all 0.2s;
    }
    .ob-option:hover { border-color:rgba(232,168,32,0.6); background:rgba(255,255,255,0.12); }
    .ob-option.selected { border-color:#E8A820; background:rgba(232,168,32,0.15); }
    .ob-opt-icon { font-size:22px; flex-shrink:0; }
    .ob-opt-title { font-size:14px; font-weight:600; color:#fff; }
    .ob-opt-sub { font-size:12px; color:rgba(255,255,255,0.6); margin-top:2px; }

    .ob-grid { display:flex; flex-wrap:wrap; gap:8px; }
    .ob-chip {
      background:rgba(255,255,255,0.08);
      border:1.5px solid rgba(255,255,255,0.18);
      border-radius:100px;
      padding:8px 16px;
      font-size:13px; font-weight:500;
      color:rgba(255,255,255,0.75);
      cursor:pointer;
      transition:all 0.15s;
    }
    .ob-chip:hover { border-color:#E8A820; color:#E8A820; }
    .ob-chip.selected { background:#E8A820; color:#1C2419; border-color:#E8A820; font-weight:700; }

    .ob-nav { display:flex; gap:10px; margin-top:4px; }

    .ob-btn-primary {
      flex:1; width:100%;
      background:rgba(78,107,74,0.85);
      color:white;
      border:none; border-radius:10px;
      padding:14px;
      font-family:'Plus Jakarta Sans', sans-serif;
      font-weight:700; font-size:13px;
      letter-spacing:0.1em;
      text-transform:uppercase;
      cursor:pointer; transition:all 0.2s;
    }
    .ob-btn-primary:hover { background:#3A5236; transform:translateY(-1px); }

    .ob-btn-ghost {
      background:transparent;
      border:1.5px solid rgba(255,255,255,0.2);
      border-radius:10px;
      padding:14px 20px;
      font-family:'Plus Jakarta Sans', sans-serif;
      font-size:13px; color:rgba(255,255,255,0.65);
      cursor:pointer; transition:all 0.15s;
    }
    .ob-btn-ghost:hover { border-color:#E8A820; color:#E8A820; }

    .ob-summary {
      display:flex; flex-wrap:wrap; gap:8px;
      justify-content:center; margin-top:8px;
    }
    .ob-summary-tag {
      background:rgba(232,168,32,0.2); color:#E8A820;
      font-size:12px; font-weight:600;
      padding:5px 12px; border-radius:100px;
      border:1px solid rgba(232,168,32,0.3);
    }
  `;
  document.head.appendChild(style);
}

/* ── INIT: el flujo de autenticación lo maneja auth.js ──
   El onboarding solo se muestra cuando auth.js lo llame
   explícitamente después de verificar la sesión Supabase.
   ──────────────────────────────────────────────────── */
