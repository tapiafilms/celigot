/* ══ ASISTENTE DE ALERGIAS ══ */

const _CAL_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

/* ── Estado clínicas Google Places ── */
let nearbyClinicas = null; /* null | 'loading' | [] | [...] */

function fetchNearbyClinicas(lat, lng) {
  if (!googlePlacesService) return;
  if (nearbyClinicas === 'loading') return;
  nearbyClinicas = 'loading';
  if (document.getElementById('page-asistente')?.classList.contains('active')) renderClinicas();

  const location  = new google.maps.LatLng(lat, lng);
  const seen      = new Set();
  let   pending   = 2;
  const collected = [];

  function onDone(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK && results?.length) {
      for (const place of results) {
        if (place.place_id && !seen.has(place.place_id)) {
          seen.add(place.place_id);
          collected.push(_googleToClinica(place, lat, lng));
        }
      }
    } else {
      console.warn('[CeliGO] Google Places clinicas status:', status);
    }
    pending--;
    if (pending === 0) {
      nearbyClinicas = collected
        .filter(c => c.lat && c.lng)
        .sort((a, b) => (a._dist ?? 9999) - (b._dist ?? 9999))
        .slice(0, 8);
      if (document.getElementById('page-asistente')?.classList.contains('active')) renderClinicas();
    }
  }

  /* Búsqueda 1: médicos con keyword de alergia/celiaco */
  googlePlacesService.nearbySearch(
    { location, radius: 10000, keyword: 'alergia celiaco gluten inmunologia', type: 'doctor' },
    onDone
  );
  /* Búsqueda 2: hospitales y clínicas con keyword de alergia */
  googlePlacesService.nearbySearch(
    { location, radius: 10000, keyword: 'alergia inmunologia', type: 'hospital' },
    onDone
  );
}

function _googleToClinica(place, userLat, userLng) {
  const plLat   = place.geometry?.location?.lat();
  const plLng   = place.geometry?.location?.lng();
  const openNow = place.opening_hours?.isOpen?.();
  const mapsUrl = place.place_id
    ? `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`;
  return {
    name: place.name,
    dir: place.vicinity || '',
    rating: place.rating || null,
    reviews: place.user_ratings_total || null,
    openNow, mapsUrl,
    lat: plLat, lng: plLng,
    _dist: (plLat && plLng) ? haversineKm(userLat, userLng, plLat, plLng) : 9999
  };
}

function refreshClinicas() {
  if (!userLocation || typeof userLocation !== 'object') return;
  nearbyClinicas = null;
  fetchNearbyClinicas(userLocation.lat, userLocation.lng);
}

function renderClinicas() {
  const grid  = document.getElementById('clinicasGrid');
  const title = document.getElementById('clinicasTitle');
  if (!grid) return;

  const hasLocation = typeof userLocation === 'object' && userLocation !== null;

  if (title) {
    title.textContent = hasLocation
      ? '🏥 Médicos y clínicas cerca de ti'
      : '🏥 Clínicas de alergias en la región';
  }

  /* Sin ubicación */
  if (!hasLocation) {
    grid.innerHTML = `<p class="clinicas-sin-ubicacion">Activá tu ubicación para ver médicos y clínicas cercanas.</p>`;
    return;
  }

  /* Cargando */
  if (nearbyClinicas === 'loading' || nearbyClinicas === null) {
    grid.innerHTML = `
      <div class="osm-loading-row" style="margin:16px 0">
        <span class="osm-spinner"></span>
        <span>Buscando médicos y clínicas…</span>
      </div>`;
    return;
  }

  /* Sin resultados */
  if (!Array.isArray(nearbyClinicas) || nearbyClinicas.length === 0) {
    grid.innerHTML = `
      <p class="clinicas-sin-ubicacion">No se encontraron clínicas de alergias cerca de tu ubicación.</p>
      <button class="nearby-refresh-btn" onclick="refreshClinicas()">🔄 Actualizar</button>`;
    return;
  }

  const renderCard = (c) => {
    const distBadge  = c._dist < 9000 ? `<span class="place-dist">${formatDist(c._dist)}</span>` : '';
    const ratingHtml = c.rating
      ? `<span style="font-size:11px;color:var(--text-hint)">★ ${c.rating}${c.reviews ? ` (${c.reviews})` : ''}</span>`
      : '';
    const openHtml = c.openNow === true
      ? `<span style="font-size:10px;color:#4caf50;font-weight:600">Abierto</span>`
      : c.openNow === false
        ? `<span style="font-size:10px;color:var(--coral);font-weight:600">Cerrado</span>`
        : '';
    return `
      <div class="clinica-card">
        <div class="clinica-card-icon">🏥</div>
        <div class="clinica-card-name">${c.name} ${distBadge}</div>
        <div class="clinica-card-dir">${c.dir}</div>
        <div style="display:flex;gap:8px;align-items:center;margin:4px 0 8px">${ratingHtml}${ratingHtml && openHtml ? ' · ' : ''}${openHtml}</div>
        <a class="clinica-card-wsap" href="${c.mapsUrl}" target="_blank" rel="noopener">
          ${_CAL_SVG} Ver en Google Maps
        </a>
      </div>`;
  };

  let html = nearbyClinicas.map(renderCard).join('');
  html += `<button class="nearby-refresh-btn" onclick="refreshClinicas()">🔄 Actualizar resultados</button>`;
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