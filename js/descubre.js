/* ══════════════════════════════════════════════════════
   DESCUBRE.JS — Feed social de CeliGO
   Publicaciones con foto + texto + me gusta
   ══════════════════════════════════════════════════════ */

let feedImageFile = null;   // archivo de imagen seleccionado para el post
let feedPosts     = [];     // posts cargados (caché local)
let myLikedIds    = new Set(); // IDs de posts que yo di like

/* ══ Inicializar feed cuando se entra a la sección DESCUBRE ══ */
function initDescubreFeed() {
  updateFeedCreateAvatar();
  loadFeed();
}

/* ══ Actualizar avatar en el formulario de creación ══ */
function updateFeedCreateAvatar() {
  const img      = document.getElementById('feedCreateAvatarImg');
  const initials = document.getElementById('feedCreateAvatarInitials');
  const profile  = (typeof currentProfile !== 'undefined' && currentProfile)
    ? currentProfile
    : (typeof loadProfile === 'function' ? loadProfile() : null);

  let url = profile?.avatar_url || null;
  if (!url) { try { url = localStorage.getItem('celigo_profile_photo'); } catch(e) {} }

  if (url && img) {
    img.src = url;
    img.style.display = 'block';
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
    if (preview) { preview.src = e.target.result; }
    if (wrap)    { wrap.style.display = ''; }
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

/* ══ Comprimir imagen para post (max 900px, calidad 0.8) ══ */
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
      canvas.toBlob(blob => {
        URL.revokeObjectURL(url);
        resolve(blob || file);
      }, 'image/jpeg', 0.80);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

/* ══ Publicar post ══ */
async function publishPost() {
  if (typeof sb === 'undefined' || !currentUser) return;

  const textEl = document.getElementById('feedPostText');
  const content = textEl?.value?.trim() || '';
  if (!content) {
    textEl?.focus();
    return;
  }

  const btn = document.getElementById('feedPublishBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Publicando…'; }

  try {
    let image_url = null;

    /* Subir imagen si hay una seleccionada */
    if (feedImageFile) {
      const blob     = await compressFeedImage(feedImageFile);
      const fileName = `${currentUser.id}/${Date.now()}.jpg`;
      const { data: uploadData, error: uploadErr } = await sb.storage
        .from('posts')
        .upload(fileName, blob, { contentType: 'image/jpeg', upsert: false });

      if (uploadErr) {
        console.error('[Descubre] Error subiendo imagen:', uploadErr);
      } else {
        const { data: urlData } = sb.storage.from('posts').getPublicUrl(fileName);
        image_url = urlData?.publicUrl || null;
      }
    }

    /* Insertar post en Supabase */
    const { data, error } = await sb.from('posts').insert([{
      user_id:   currentUser.id,
      content,
      image_url,
    }]).select().single();

    if (error) throw error;

    /* Limpiar formulario */
    if (textEl) { textEl.value = ''; textEl.style.height = 'auto'; }
    removeFeedImage();

    /* Agregar post al tope del feed sin recargar todo */
    const profile = (typeof currentProfile !== 'undefined' && currentProfile)
      ? currentProfile
      : (typeof loadProfile === 'function' ? loadProfile() : null);

    const newPost = {
      ...data,
      profiles: {
        nombre:     profile?.nombre     || currentUser.email?.split('@')[0] || 'Tú',
        avatar_url: profile?.avatar_url || null,
      },
      _likes: 0,
    };
    feedPosts.unshift(newPost);
    renderFeed();

  } catch (err) {
    console.error('[Descubre] Error al publicar:', err);
    alert('No se pudo publicar. Intenta nuevamente.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Publicar'; }
  }
}

/* ══ Cargar feed desde Supabase ══ */
async function loadFeed() {
  if (typeof sb === 'undefined' || !currentUser) return;

  const loadingEl = document.getElementById('feedLoading');
  const emptyEl   = document.getElementById('feedEmpty');
  if (loadingEl) loadingEl.style.display = '';
  if (emptyEl)   emptyEl.style.display   = 'none';

  /* Remover posts viejos del DOM (excepto los elementos de carga/vacío) */
  document.querySelectorAll('.feed-post-card').forEach(el => el.remove());

  try {
    /* Obtener posts con perfil del autor */
    const { data: posts, error } = await sb
      .from('posts')
      .select('*, profiles(nombre, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(60);

    if (error) throw error;

    /* Obtener todos los likes de los posts cargados */
    const postIds = (posts || []).map(p => p.id);
    let allLikes  = [];
    if (postIds.length > 0) {
      const { data: likes } = await sb
        .from('post_likes')
        .select('post_id, user_id')
        .in('post_id', postIds);
      allLikes = likes || [];
    }

    /* Likes del usuario actual */
    myLikedIds = new Set(allLikes.filter(l => l.user_id === currentUser.id).map(l => l.post_id));

    /* Calcular conteo de likes por post */
    const likeCount = {};
    allLikes.forEach(l => {
      likeCount[l.post_id] = (likeCount[l.post_id] || 0) + 1;
    });

    feedPosts = (posts || []).map(p => ({ ...p, _likes: likeCount[p.id] || 0 }));

    if (loadingEl) loadingEl.style.display = 'none';
    renderFeed();

  } catch (err) {
    console.error('[Descubre] Error cargando feed:', err);
    if (loadingEl) loadingEl.style.display = 'none';
    if (emptyEl) {
      emptyEl.style.display = '';
      emptyEl.innerHTML = '<p style="color:var(--text-muted)">Error al cargar. Intenta más tarde.</p>';
    }
  }
}

/* ══ Renderizar todos los posts ══ */
function renderFeed() {
  const emptyEl = document.getElementById('feedEmpty');
  /* Borrar posts anteriores del DOM */
  document.querySelectorAll('.feed-post-card').forEach(el => el.remove());

  if (!feedPosts || feedPosts.length === 0) {
    if (emptyEl) emptyEl.style.display = '';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';

  const feedList = document.getElementById('feedList');
  if (!feedList) return;

  feedPosts.forEach(post => {
    const card = buildPostCard(post);
    feedList.appendChild(card);
  });
}

/* ══ Construir tarjeta de un post ══ */
function buildPostCard(post) {
  const card = document.createElement('div');
  card.className = 'feed-post-card';
  card.id = `post-${post.id}`;

  const profile   = post.profiles || {};
  const nombre    = profile.nombre || 'Usuario';
  const avatarUrl = profile.avatar_url || null;
  const liked     = myLikedIds.has(post.id);
  const likes     = post._likes || 0;
  const isOwner   = currentUser && post.user_id === currentUser.id;

  /* Iniciales del autor */
  const parts    = nombre.trim().split(/\s+/);
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : nombre.slice(0, 2).toUpperCase() || '?';

  /* Fecha formateada */
  const date = new Date(post.created_at);
  const now  = new Date();
  let dateStr;
  const diffMin = Math.floor((now - date) / 60000);
  if (diffMin < 1)       dateStr = 'Hace un momento';
  else if (diffMin < 60) dateStr = `Hace ${diffMin} min`;
  else if (diffMin < 1440) {
    const h = Math.floor(diffMin / 60);
    dateStr = `Hace ${h} h`;
  } else {
    dateStr = date.toLocaleDateString('es-CL', { day:'numeric', month:'short' });
  }

  /* Avatar HTML */
  const avatarHtml = avatarUrl
    ? `<img src="${avatarUrl}" alt="${nombre}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
    : `<span style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:12px;color:var(--gold);">${initials}</span>`;

  /* Imagen del post */
  const imgHtml = post.image_url
    ? `<img src="${post.image_url}" alt="Imagen del post" class="feed-post-img" loading="lazy">`
    : '';

  /* Botón borrar (solo el autor) */
  const deleteBtn = isOwner
    ? `<button class="feed-delete-btn" onclick="deletePost('${post.id}')" title="Eliminar publicación">✕</button>`
    : '';

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
        <svg viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
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

  const already = myLikedIds.has(postId);
  const btn      = document.getElementById(`like-btn-${postId}`);
  const countEl  = document.getElementById(`like-count-${postId}`);

  /* Actualizar UI de inmediato (optimistic update) */
  const post = feedPosts.find(p => p.id === postId);
  if (!post) return;

  if (already) {
    myLikedIds.delete(postId);
    post._likes = Math.max(0, post._likes - 1);
    if (btn) btn.classList.remove('liked');
  } else {
    myLikedIds.add(postId);
    post._likes = post._likes + 1;
    if (btn) btn.classList.add('liked');
  }
  if (countEl) countEl.textContent = post._likes > 0 ? post._likes : '';

  try {
    if (already) {
      await sb.from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', currentUser.id);
    } else {
      await sb.from('post_likes')
        .insert([{ post_id: postId, user_id: currentUser.id }]);
    }
  } catch (err) {
    console.error('[Descubre] Error en like:', err);
    /* Revertir si falló */
    if (already) {
      myLikedIds.add(postId);
      post._likes++;
      if (btn) btn.classList.add('liked');
    } else {
      myLikedIds.delete(postId);
      post._likes = Math.max(0, post._likes - 1);
      if (btn) btn.classList.remove('liked');
    }
    if (countEl) countEl.textContent = post._likes > 0 ? post._likes : '';
  }
}

/* ══ Eliminar post propio ══ */
async function deletePost(postId) {
  if (!confirm('¿Eliminar esta publicación?')) return;
  if (typeof sb === 'undefined' || !currentUser) return;

  try {
    const post = feedPosts.find(p => p.id === postId);

    /* Borrar imagen del storage si existe */
    if (post?.image_url) {
      const url     = new URL(post.image_url);
      const parts   = url.pathname.split('/posts/');
      const filePath = parts[1];
      if (filePath) await sb.storage.from('posts').remove([filePath]);
    }

    await sb.from('posts').delete().eq('id', postId).eq('user_id', currentUser.id);

    /* Quitar del DOM y del caché */
    feedPosts = feedPosts.filter(p => p.id !== postId);
    const card = document.getElementById(`post-${postId}`);
    if (card) card.remove();

    if (feedPosts.length === 0) {
      const emptyEl = document.getElementById('feedEmpty');
      if (emptyEl) emptyEl.style.display = '';
    }
  } catch (err) {
    console.error('[Descubre] Error eliminando post:', err);
    alert('No se pudo eliminar. Intenta de nuevo.');
  }
}

/* ══ Escapar HTML para evitar XSS ══ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
