/* ══════════════════════════════════════════════════════
   SUPABASE CLIENT — CeliGO
   Inicializa el cliente y expone helpers reutilizables.

   CLAVES:
   · publishable (sb_publishable_…) → segura para el cliente
   · secret      (sb_secret_…)      → solo para el servidor, NUNCA en el browser
   ══════════════════════════════════════════════════════ */

const SUPABASE_URL         = 'https://vfkbwoiwtplhulrefnzr.supabase.co';
const SUPABASE_PUBLISHABLE = 'sb_publishable_7Ti4j0FMQfdtpMy0iwlohQ_2okePrtB';

/* Inicializar — la librería se carga vía CDN como window.supabase */
let sb;
try {
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE);
} catch(e) {
  console.error('[CeliGO] No se pudo inicializar Supabase:', e);
}

/* ══ GET PERFIL ══════════════════════════════════════ */
async function sbGetProfile(userId) {
  try {
    const { data, error } = await sb
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error && error.code !== 'PGRST116') {
      console.warn('[CeliGO] getProfile:', error.message);
    }
    return data || null;
  } catch(e) {
    console.error('[CeliGO] sbGetProfile error:', e);
    return null;
  }
}

/* ══ UPSERT PERFIL ═══════════════════════════════════ */
async function sbUpsertProfile(userId, payload) {
  try {
    const { data, error } = await sb
      .from('profiles')
      .upsert(
        { id: userId, ...payload, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      )
      .select()
      .single();
    if (error) console.error('[CeliGO] upsertProfile:', error.message);
    return data || null;
  } catch(e) {
    console.error('[CeliGO] sbUpsertProfile error:', e);
    return null;
  }
}

/* ══ SUBIR AVATAR (comprimido) ═══════════════════════ */
async function sbUploadAvatar(userId, file) {
  try {
    const blob = await compressImage(file, 420, 0.75);
    const path = `${userId}/avatar.jpg`;

    const { error: upErr } = await sb.storage
      .from('avatars')
      .upload(path, blob, { upsert: true, contentType: 'image/jpeg' });

    if (upErr) {
      console.warn('[CeliGO] avatar upload:', upErr.message);
      return null;
    }

    const { data: { publicUrl } } = sb.storage
      .from('avatars')
      .getPublicUrl(path);

    /* Cache-busting para forzar recarga */
    return publicUrl + '?v=' + Date.now();
  } catch(e) {
    console.error('[CeliGO] sbUploadAvatar error:', e);
    return null;
  }
}

/* ══ COMPRIMIR IMAGEN CON CANVAS ════════════════════
   maxPx  : lado máximo en píxeles (default 420)
   quality: 0-1 JPEG quality  (default 0.75)
   ════════════════════════════════════════════════════ */
function compressImage(file, maxPx = 420, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let w = img.naturalWidth;
        let h = img.naturalHeight;

        /* Redimensionar manteniendo proporción */
        if (w > maxPx || h > maxPx) {
          if (w >= h) { h = Math.round(h * maxPx / w); w = maxPx; }
          else        { w = Math.round(w * maxPx / h); h = maxPx; }
        }

        const canvas = document.createElement('canvas');
        canvas.width  = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);

        canvas.toBlob(
          (blob) => blob ? resolve(blob) : reject(new Error('toBlob failed')),
          'image/jpeg',
          quality
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
