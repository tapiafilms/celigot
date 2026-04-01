/* ══ ASISTENTE DE ALERGIAS ══ */

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
        model: "claude-sonnet-4-20250514",
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
    console.error('[Chat Error]:', e);
    loading.textContent = 'Error. Intenta de nuevo.';
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