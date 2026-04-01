/* ══════════════════════════════════════════════════════
   DESCUBRE.JS — Feed social de CeliGO
   Publicaciones con foto + texto + me gusta
   ══════════════════════════════════════════════════════ */

let feedImageFile = null;
let feedPosts     = [];
let myLikedIds    = new Set();

/* ══ Inicializar feed al entrar a DESCUBRE ══ */
function initDescubreFeed() {
  updateFeedCreateAvatar();
  loadFeed();
}

/* ══ Actualizar avatar en el formulario de creación ══ */
function updateFeedCreateAvatar() {
  const img      = document.getElementById('feedCreateAvatarImg');
  const initials = document.getElementById('feedCreateAvatarInitials');
  /* Usar SOLO currentProfile (Supabase) — nunca localStorage, que puede pertenecer a otro usuario */
  const profile  = (typeof currentProfile !== 'undefined' && currentProfile) ? currentProfile : null;

  let url = profile?.avatar_url || null;

  if (url && img) {
    img.src = url; img.style.display = 'block';
    if (initials) initials.style.display = 'none';
  } else {
    if (img) img.style.display = 'none';
    if (initials) {
      const nombre = profile?.nombre || (typeof currentUser !== 'undefined' ? currentUser?.email?.split('@')[0] : '') || '';
      const parts  = nombre.trim().split(/\s+/);
      initials.textContent = parts.length >= 2
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : nombre.slice(0, 2).toUpperCase() || 'CE';
      initials.style.display = '';
    }
  }
}

/* ══ Auto-crecer textarea ══ */
function feedTextareaGrow(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

/* ══ Manejar selección de foto para el post ══ */
function handleFeedPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  feedImageFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    const wrap    = document.getElementById('feedImgPreviewWrap');
    const preview = document.getElementById('feedImgPreview');
    if (preview) preview.src = e.target.result;
    if (wrap)    wrap.style.display = '';
  };
  reader.readAsDataURL(file);
}

/* ══ Quitar imagen seleccionada ══ */
function removeFeedImage() {
  feedImageFile = null;
  const wrap    = document.getElementById('feedImgPreviewWrap');
  const preview = document.getElementById('feedImgPreview');
  const input   = document.getElementById('feedPhotoInput');
  if (wrap)    wrap.style.display = 'none';
  if (preview) preview.src = '';
  if (input)   input.value = '';
}

/* ══ Comprimir imagen (max 900px, calidad 0.80) ══ */
function compressFeedImage(file) {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX = 900;
      let w = img.width, h = img.height;
      if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
      if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      canvas.toBlob(blob => { URL.revokeObjectURL(url); resolve(blob || file); }, 'image/jpeg', 0.80);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

/* ══ Publicar post ══ */
async function publishPost() {
  if (typeof sb === 'undefined') { alert('Error de conexión. Recarga la app.'); return; }

  /* ── Verificar sesión activa en Supabase ── */
  let activeUser = currentUser;
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (!session || !session.user) {
      alert('Tu sesión expiró. Recarga la página e inicia sesión de nuevo.');
      return;
    }
    activeUser = session.user;
    if (!currentUser) currentUser = activeUser;
  } catch (e) {
    if (!activeUser) { alert('No se pudo verificar la sesión. Recarga la app.'); return; }
  }

  const textEl  = document.getElementById('feedPostText');
  const content = textEl?.value?.trim() || '';
  if (!content) { textEl?.focus(); return; }

  const btn = document.getElementById('feedPublishBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Publicando…'; }

  try {
    /* ── Garantizar que el perfil existe (resuelve FK constraint) ── */
    await sb.from('profiles').upsert(
      {
        id:         activeUser.id,
        email:      activeUser.email || '',
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

    /* ── Subir imagen si fue adjuntada ── */
    let image_url = null;

    if (feedImageFile) {
      const blob     = await compressFeedImage(feedImageFile);
      const fileName = `${activeUser.id}/${Date.now()}.jpg`;
      const { error: uploadErr } = await sb.storage
        .from('posts')
        .upload(fileName, blob, { contentType: 'image/jpeg', upsert: false });

      if (!uploadErr) {
        const { data: urlData } = sb.storage.from('posts').getPublicUrl(fileName);
        image_url = urlData?.publicUrl || null;
      } else {
        console.warn('[Descubre] Imagen no subida:', uploadErr.message);
        /* Continuamos sin imagen — no bloqueamos la publicación */
      }
    }

    /* ── Insertar el post ── */
    const { data, error } = await sb.from('posts')
      .insert([{ user_id: activeUser.id, content, image_url }])
      .select()
      .single();

    if (error) throw error;

    /* ── Limpiar formulario ── */
    if (textEl) { textEl.value = ''; textEl.style.height = 'auto'; }
    removeFeedImage();

    /* ── Agregar el nuevo post al feed local sin recargar ── */
    /* Solo usar currentProfile (Supabase) — nunca localStorage (puede ser de otro usuario) */
    const profile = (typeof currentProfile !== 'undefined' && currentProfile) ? currentProfile : null;

    feedPosts.unshift({
      ...data,
      _nombre:     profile?.nombre     || activeUser.email?.split('@')[0] || 'Tú',
      _avatar_url: profile?.avatar_url || null,
      _likes: 0,
    });
    renderFeed();

  } catch (err) {
    console.error('[Descubre] Error al publicar:', err);
    /* Mensajes de error más claros según el tipo de fallo */
    let msg = err.message || 'error desconocido';
    if (msg.includes('violates foreign key'))  msg = 'Error de perfil. Cierra sesión, vuelve a entrar e intenta de nuevo.';
    if (msg.includes('JWT') || msg.includes('token')) msg = 'Tu sesión expiró. Recarga la página e inicia sesión.';
    if (msg.includes('row-level security'))    msg = 'Sin permiso para publicar. Verifica que tu sesión esté activa.';
    if (msg.includes('network') || msg.includes('fetch')) msg = 'Error de red. Verifica tu conexión a internet.';
    alert('No se pudo publicar: ' + msg);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Publicar'; }
  }
}

/* ══ Cargar feed desde Supabase ══ */
async function loadFeed() {
  /* — Obtener referencias al DOM primero — */
  const loadingEl = document.getElementById('feedLoading');
  const emptyEl   = document.getElementById('feedEmpty');

  /* — Si no hay sesión aún, reintentar en 1 segundo — */
  if (typeof sb === 'undefined' || !currentUser) {
    if (loadingEl) loadingEl.style.display = '';
    if (emptyEl)   emptyEl.style.display   = 'none';
    setTimeout(() => {
      if (typeof currentUser !== 'undefined' && currentUser) {
        loadFeed();
      } else {
        if (loadingEl) loadingEl.style.display = 'none';
        if (emptyEl)   emptyEl.style.display   = '';
      }
    }, 1200);
    return;
  }

  if (loadingEl) loadingEl.style.display = '';
  if (emptyEl)   emptyEl.style.display   = 'none';
  document.querySelectorAll('.feed-post-card').forEach(el => el.remove());

  try {
    /* 1. Obtener posts */
    const { data: posts, error: postsErr } = await sb
      .from('posts')
      .select('id, user_id, content, image_url, created_at')
      .order('created_at', { ascending: false })
      .limit(60);

    if (postsErr) throw postsErr;
    if (!posts || posts.length === 0) {
      if (loadingEl) loadingEl.style.display = 'none';
      if (emptyEl)   emptyEl.style.display   = '';
      feedPosts = [];
      return;
    }

    /* 2. Obtener perfiles de los autores (query separada para evitar necesidad de FK)
          Puede fallar silenciosamente si la política RLS de profiles aún no fue
          actualizada en Supabase — en ese caso se usan nombres de fallback. */
    const authorIds = [...new Set(posts.map(p => p.user_id))];
    const { data: profiles, error: profErr } = await sb
      .from('profiles')
      .select('id, nombre, avatar_url')
      .in('id', authorIds);

    if (profErr) {
      console.warn('[Descubre] No se pudieron cargar perfiles de autores:', profErr.message,
        '— Ejecuta el parche de políticas RLS en Supabase (ver supabase-setup.sql).');
    }

    const profileMap = {};
    (profiles || []).forEach(p => { profileMap[p.id] = p; });

    /* 3. Obtener todos los likes de los posts cargados */
    const postIds = posts.map(p => p.id);
    const { data: likes } = await sb
      .from('post_likes')
      .select('post_id, user_id')
      .in('post_id', postIds);

    myLikedIds = new Set((likes || []).filter(l => l.user_id === currentUser.id).map(l => l.post_id));

    const likeCount = {};
    (likes || []).forEach(l => { likeCount[l.post_id] = (likeCount[l.post_id] || 0) + 1; });

    feedPosts = posts.map(p => ({
      ...p,
      _nombre:     profileMap[p.user_id]?.nombre     || 'Usuario',
      _avatar_url: profileMap[p.user_id]?.avatar_url || null,
      _likes:      likeCount[p.id] || 0,
    }));

    if (loadingEl) loadingEl.style.display = 'none';
    renderFeed();

  } catch (err) {
    console.error('[Descubre] Error cargando feed:', err);
    if (loadingEl) loadingEl.style.display = 'none';
    if (emptyEl) {
      emptyEl.style.display = '';
      emptyEl.innerHTML = `<div style="font-size:32px;margin-bottom:8px;">⚠️</div>
        <p style="color:var(--text-muted)">Error al cargar las publicaciones.</p>
        <button onclick="loadFeed()" style="margin-top:12px;background:var(--green);color:#fff;border:none;padding:8px 20px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;cursor:pointer;">Reintentar</button>`;
    }
  }
}

/* ══ Renderizar todos los posts en el DOM ══ */
function renderFeed() {
  const feedList = document.getElementById('feedList');
  const emptyEl  = document.getElementById('feedEmpty');
  const loadEl   = document.getElementById('feedLoading');

  /* Eliminar tarjetas existentes */
  document.querySelectorAll('.feed-post-card').forEach(el => el.remove());

  if (!feedPosts || feedPosts.length === 0) {
    if (emptyEl) emptyEl.style.display = '';
    return;
  }

  if (emptyEl)  emptyEl.style.display  = 'none';
  if (loadEl)   loadEl.style.display   = 'none';
  if (!feedList) return;

  /* Insertar tarjetas ANTES del spinner/vacío para mantener orden correcto */
  feedPosts.forEach(post => {
    const card = buildPostCard(post);
    /* Insertar al principio, antes del primer elemento fijo (loading o empty) */
    const firstFixed = feedList.querySelector('#feedLoading, #feedEmpty');
    if (firstFixed) {
      feedList.insertBefore(card, firstFixed);
    } else {
      feedList.appendChild(card);
    }
  });
}

/* ══ Construir tarjeta de un post ══ */
function buildPostCard(post) {
  const card = document.createElement('div');
  card.className = 'feed-post-card';
  card.id = `post-${post.id}`;

  const nombre    = post._nombre    || 'Usuario';
  const avatarUrl = post._avatar_url || null;
  const liked     = myLikedIds.has(post.id);
  const likes     = post._likes || 0;
  const isOwner   = currentUser && post.user_id === currentUser.id;

  const parts    = nombre.trim().split(/\s+/);
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : nombre.slice(0, 2).toUpperCase() || '?';

  /* Fecha relativa */
  const date    = new Date(post.created_at);
  const now     = new Date();
  const diffMin = Math.floor((now - date) / 60000);
  let dateStr;
  if      (diffMin < 1)    dateStr = 'Hace un momento';
  else if (diffMin < 60)   dateStr = `Hace ${diffMin} min`;
  else if (diffMin < 1440) dateStr = `Hace ${Math.floor(diffMin / 60)} h`;
  else                     dateStr = date.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' });

  const avatarHtml = avatarUrl
    ? `<img src="${avatarUrl}" alt="${nombre}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
    : `<span style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:12px;color:var(--gold);">${initials}</span>`;

  const imgHtml    = post.image_url ? `<img src="${post.image_url}" alt="" class="feed-post-img" loading="lazy">` : '';
  const deleteBtn  = isOwner ? `<button class="feed-delete-btn" onclick="deletePost('${post.id}')" title="Eliminar">✕</button>` : '';

  card.innerHTML = `
    <div class="feed-post-header">
      <div class="feed-post-avatar">${avatarHtml}</div>
      <div class="feed-post-meta">
        <div class="feed-post-name">${escapeHtml(nombre)}</div>
        <div class="feed-post-date">${dateStr}</div>
      </div>
      ${deleteBtn}
    </div>
    <p class="feed-post-text">${escapeHtml(post.content)}</p>
    ${imgHtml}
    <div class="feed-post-actions">
      <button class="feed-like-btn ${liked ? 'liked' : ''}" id="like-btn-${post.id}" onclick="toggleLike('${post.id}')">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        <span id="like-count-${post.id}">${likes > 0 ? likes : ''}</span>
        Me gusta
      </button>
    </div>
  `;
  return card;
}

/* ══ Dar / quitar me gusta ══ */
async function toggleLike(postId) {
  if (typeof sb === 'undefined' || !currentUser) return;

  const already  = myLikedIds.has(postId);
  const btn      = document.getElementById(`like-btn-${postId}`);
  const countEl  = document.getElementById(`like-count-${postId}`);
  const post     = feedPosts.find(p => p.id === postId);
  if (!post) return;

  /* Optimistic update */
  if (already) {
    myLikedIds.delete(postId);
    post._likes = Math.max(0, post._likes - 1);
    if (btn) btn.classList.remove('liked');
  } else {
    myLikedIds.add(postId);
    post._likes++;
    if (btn) btn.classList.add('liked');
  }
  if (countEl) countEl.textContent = post._likes > 0 ? post._likes : '';

  try {
    if (already) {
      await sb.from('post_likes').delete().eq('post_id', postId).eq('user_id', currentUser.id);
    } else {
      await sb.from('post_likes').insert([{ post_id: postId, user_id: currentUser.id }]);
    }
  } catch (err) {
    /* Revertir si falló */
    console.error('[Descubre] Error en like:', err);
    if (already) { myLikedIds.add(postId); post._likes++; if (btn) btn.classList.add('liked'); }
    else { myLikedIds.delete(postId); post._likes = Math.max(0, post._likes - 1); if (btn) btn.classList.remove('liked'); }
    if (countEl) countEl.textContent = post._likes > 0 ? post._likes : '';
  }
}

/* ══ Eliminar post propio ══ */
async function deletePost(postId) {
  if (!confirm('¿Eliminar esta publicación?')) return;
  if (typeof sb === 'undefined' || !currentUser) return;

  try {
    const post = feedPosts.find(p => p.id === postId);
    if (post?.image_url) {
      try {
        const url      = new URL(post.image_url);
        const segments = url.pathname.split('/posts/');
        if (segments[1]) await sb.storage.from('posts').remove([segments[1]]);
      } catch(e) {}
    }

    await sb.from('posts').delete().eq('id', postId).eq('user_id', currentUser.id);
    feedPosts = feedPosts.filter(p => p.id !== postId);
    document.getElementById(`post-${postId}`)?.remove();

    if (feedPosts.length === 0) {
      const emptyEl = document.getElementById('feedEmpty');
      if (emptyEl) {
        emptyEl.style.display = '';
        emptyEl.innerHTML = '<div style="font-size:40px;margin-bottom:8px;">🌾</div><p>Aún no hay publicaciones.</p><p style="font-size:12px;color:var(--text-hint);margin-top:4px;">¡Sé el primero en compartir algo!</p>';
      }
    }
  } catch (err) {
    console.error('[Descubre] Error eliminando post:', err);
    alert('No se pudo eliminar. Intenta de nuevo.');
  }
}

/* ══ Escapar HTML ══ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
