/* ══ ASISTENTE DE ALERGIAS ══ */

/* ── Datos de clínicas ── */
const CLINICAS = [
  {
    icon: '🏨', ciudad: 'Viña del Mar', cityKey: 'viña',
    name: 'Clínica Ciudad del Mar',
    dir: 'Centro de Alergias e Inmunología · 13 Norte 635',
    ctaLabel: 'WhatsApp', ctaType: 'whatsapp',
    ctaUrl: 'https://wa.me/56322451000?text=Hola%2C%20quiero%20agendar%20una%20consulta%20en%20el%20Centro%20de%20Alergias'
  },
  {
    icon: '🌿', ciudad: 'Viña del Mar', cityKey: 'viña',
    name: 'AllerVita',
    dir: 'Centro Médico Inmunología y Alergias · @allervita',
    ctaLabel: 'Agendar hora', ctaType: 'calendar',
    ctaUrl: 'https://allervita.site.agendapro.com/cl/sucursal/345255'
  },
  {
    icon: '🔬', ciudad: 'Concón', cityKey: 'concon',
    name: 'Kinelite',
    dir: 'Alergias y Prick Test · Edmundo Eluchans 3047 of.103',
    ctaLabel: 'Agendar hora', ctaType: 'calendar',
    ctaUrl: 'https://kinelite.cl/prick-test/'
  },
  {
    icon: '💊', ciudad: 'Valparaíso', cityKey: 'valpo',
    name: 'InmunoMédica',
    dir: 'Especialistas en Alergias e Inmunología · Región de Valparaíso',
    ctaLabel: 'Ver más', ctaType: 'calendar',
    ctaUrl: 'https://inmunomedica.cl/case-study/vina-del-mar/'
  }
];

const _WA_SVG  = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
const _CAL_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

/* Convierte la ciudad Nominatim al cityKey interno */
function _clinicaCityKey(loc) {
  if (!loc || typeof loc !== 'object') return null;
  const c = (loc.city || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (c.includes('vina') || c.includes('viña'))  return 'viña';
  if (c.includes('valparaiso'))                   return 'valpo';
  if (c.includes('concon'))                       return 'concon';
  return null;
}

function renderClinicas() {
  const grid  = document.getElementById('clinicasGrid');
  const title = document.getElementById('clinicasTitle');
  if (!grid) return;

  const loc     = (typeof userLocation === 'object' && userLocation !== null) ? userLocation : null;
  const cityKey = _clinicaCityKey(loc);

  const near = cityKey ? CLINICAS.filter(c => c.cityKey === cityKey) : CLINICAS;
  const far  = cityKey ? CLINICAS.filter(c => c.cityKey !== cityKey) : [];

  if (title) {
    title.textContent = cityKey
      ? '🏥 Clínicas de alergias cerca de ti'
      : '🏥 Clínicas de alergias en la región';
  }

  const renderCard = (c) => `
    <div class="clinica-card">
      <div class="clinica-card-icon">${c.icon}</div>
      <span class="clinica-card-ciudad">${c.ciudad}</span>
      <div class="clinica-card-name">${c.name}</div>
      <div class="clinica-card-dir">${c.dir}</div>
      <a class="clinica-card-wsap" href="${c.ctaUrl}" target="_blank">
        ${c.ctaType === 'whatsapp' ? _WA_SVG : _CAL_SVG}
        ${c.ctaLabel}
      </a>
    </div>`;

  let html = near.map(renderCard).join('');
  if (far.length > 0) {
    html += `<div class="clinicas-otras-label">Otras ciudades</div>`;
    html += far.map(renderCard).join('');
  }

  grid.innerHTML = html;
}

async function sendChat() {
  const inp = document.getElementById('chatInput');
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';

  addMsg(msg, 'user');
  document.getElementById('btnSend').disabled = true;
  const loading = addMsg('Escribiendo...', 'loading-msg');

  /* Contexto completo del perfil */
  const userContext = typeof getUserContext === 'function' ? getUserContext() : '';

  const sys = `Eres un asistente especializado en alergias alimentarias y celiaquía. Responde en español de forma clara, breve y práctica.
${userContext ? `PERFIL DEL USUARIO: ${userContext}` : ''}
Usa el perfil del usuario para personalizar cada respuesta. Si es celíaco con sensibilidad alta, sé más estricto en tus advertencias. Menciona nombres ocultos de alérgenos cuando sea relevante. Sé empático y directo.`;

  try {
    // 🔐 Obtener sesión de Supabase
    const { data: { session } } = await sb.auth.getSession();

    if (!session) {
      loading.textContent = 'Debes iniciar sesión.';
      document.getElementById('btnSend').disabled = false;
      return;
    }

    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system: sys,
        messages: [{ role: "user", content: msg }]
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    const text = data?.content?.map(i => i.text || "").join("") || "Sin respuesta";

    loading.remove();
    addMsg(text, 'bot');

  } catch (e) {
    console.error('[Chat Error]:', e.message || e);
    loading.textContent = 'Servicio no disponible. Intenta en unos minutos.';
  }

  document.getElementById('btnSend').disabled = false;
}

function addMsg(text, type) {
  const wrap = document.getElementById('chatMessages');
  const div  = document.createElement('div');
  div.className   = 'msg ' + type;
  div.textContent = text;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
  return div;
}