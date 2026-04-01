/* ══ EJEMPLOS RÁPIDOS ══ */
const examples = {
  pan:    "Harina de trigo, agua, gluten de trigo, sal, azúcar, levadura, aceite de girasol, leche descremada en polvo, emulsionante E-471",
  jamon:  "Carne de cerdo, agua, sal, dextrosa, proteínas de leche, fosfatos, nitritos de sodio (E-250), ascorbato de sodio, humo natural",
  avena:  "Copos de avena integral 100%. Puede contener trazas de gluten y frutos secos.",
  salsa:  "Agua, soja, sal, trigo, alcohol etílico, azúcar, ácido láctico.",
  galleta:"Harina de trigo, azúcar, mantequilla, huevo entero, almidón de maíz, sal, aroma de vainilla, lecitina de soja, conservante E-202"
};

function setEx(k) {
  document.getElementById('ingredientsInput').value = examples[k];
}

/* ══ IMAGEN ══ */
let imgB64 = null;

document.getElementById('fileInput').addEventListener('change', function (e) {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = ev => {
    imgB64 = ev.target.result;
    const p = document.getElementById('previewImg');
    p.src = imgB64;
    p.style.display = 'block';
    document.querySelector('.upload-zone h3').textContent = '✓ Imagen cargada';
    document.querySelector('.upload-zone p').textContent  = 'Toca para cambiar';
  };
  r.readAsDataURL(f);
});

/* ══ ESCANEAR ══ */
async function scan() {
  const txt = document.getElementById('ingredientsInput').value.trim();
  if (!txt && !imgB64) {
    alert('Escribe los ingredientes o sube una foto.');
    return;
  }

  document.getElementById('btnScan').disabled = true;
  document.getElementById('loadingBox').classList.add('show');
  document.getElementById('resultCard').classList.remove('show');

  /* Contexto completo del perfil del usuario */
  const userContext = typeof getUserContext === 'function' ? getUserContext() : '';

  const sys = `Eres experto en alergias alimentarias y celiaquía. 
${userContext ? `PERFIL DEL USUARIO: ${userContext}` : ''}
Analiza los ingredientes considerando el perfil del usuario y responde SOLO en JSON válido sin markdown ni backticks:
{"veredicto":"APTO"|"NO APTO"|"PRECAUCIÓN","resumen":"frase corta clara","analisis":"explicación 2-3 oraciones mencionando qué alérgenos se encontraron y cómo afectan específicamente a este usuario","ingredientes_detectados":[{"nombre":"string","estado":"peligroso"|"seguro"|"dudoso","alérgeno":"gluten"|"leche"|"huevo"|"frutos secos"|"mariscos"|"soja"|"preservante"|"otro"|null}],"recomendacion":"consejo práctico concreto adaptado al perfil del usuario"}
Considera nombres ocultos: leche (caseína, suero, lactosa, proteína láctea, mantequilla), gluten (almidón de trigo, malta, sémola, espelta), huevo (albumina, lecitina de huevo), soja (lecitina de soja, proteína vegetal), preservantes (nitritos, sulfitos, BHA, BHT, benzoatos). La avena es dudosa por contaminación cruzada. Si el usuario tiene sensibilidad alta, marca como PRECAUCIÓN cualquier producto con riesgo de contaminación cruzada.`;

  let content;
  if (imgB64) {
    const b64  = imgB64.split(',')[1];
    const mime = imgB64.split(';')[0].split(':')[1];
    content = [
      { type: "image", source: { type: "base64", media_type: mime, data: b64 } },
      { type: "text",  text: `Analiza esta etiqueta considerando el perfil del usuario.` }
    ];
  } else {
    content = `Analiza estos ingredientes: ${txt}`;
  }

  try {
    const res  = await fetch(WORKER_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        model:      "claude-sonnet-4-6",
        max_tokens: 1000,
        system:     sys,
        messages:   [{ role: "user", content }]
      })
    });
    const data = await res.json();
    const raw  = data.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim();
    showResult(JSON.parse(raw));
  } catch (e) {
    console.error(e);
    document.getElementById('loadingBox').classList.remove('show');
    document.getElementById('btnScan').disabled = false;
    alert('Error al analizar. Intenta de nuevo.');
  }
}

/* ══ MOSTRAR RESULTADO ══ */
function showResult(r) {
  document.getElementById('loadingBox').classList.remove('show');

  const box   = document.getElementById('verdictBox');
  const icon  = document.getElementById('vIcon');
  const label = document.getElementById('vLabel');
  box.className = 'verdict';

  if (r.veredicto === 'APTO') {
    box.classList.add('apto');
    icon.textContent  = '✓';
    label.textContent = 'APTO';
  } else if (r.veredicto === 'NO APTO') {
    box.classList.add('no-apto');
    icon.textContent  = '✕';
    label.textContent = 'NO APTO';
  } else {
    box.classList.add('precaucion');
    icon.textContent  = '!';
    label.textContent = 'PRECAUCIÓN';
  }

  document.getElementById('vSub').textContent      = r.resumen;
  document.getElementById('rAnalysis').textContent = r.analisis;
  document.getElementById('rRec').textContent      = r.recomendacion;

  const tags = document.getElementById('rTags');
  tags.innerHTML = '';
  (r.ingredientes_detectados || []).forEach(i => {
    const t = document.createElement('span');
    t.className   = 'itag ' + (i.estado === 'peligroso' ? 'danger' : i.estado === 'dudoso' ? 'warn' : 'ok');
    t.textContent = i.nombre;
    tags.appendChild(t);
  });

  const card = document.getElementById('resultCard');
  card.classList.add('show');
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('btnScan').disabled = false;
}

/* ══ RESET ══ */
function resetScan() {
  document.getElementById('ingredientsInput').value = '';
  document.getElementById('resultCard').classList.remove('show');
  document.getElementById('previewImg').style.display = 'none';
  document.querySelector('.upload-zone h3').textContent = 'Foto de la etiqueta';
  document.querySelector('.upload-zone p').textContent  = 'Toca para abrir la cámara o galería';
  imgB64 = null;
  document.getElementById('fileInput').value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
