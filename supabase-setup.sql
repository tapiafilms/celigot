-- ═══════════════════════════════════════════════════════════════
-- CELIGO — Configuración de Supabase
-- Ejecuta este script en: Supabase Dashboard → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────
-- 1. TABLA DE PERFILES DE USUARIO
-- ─────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid        primary key references auth.users(id) on delete cascade,
  email         text,
  nombre        text,
  condicion     text,        -- 'celiaco' | 'intolerante' | 'preferencia'
  sensibilidad  text,        -- 'alta' | 'media' | 'baja'
  alergias      text[]  default '{}',   -- ej: ['Leche de vaca', 'Huevo']
  preferencias  text[]  default '{}',   -- ej: ['Vegetariano', 'Sin lactosa']
  avatar_url    text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─────────────────────────────────────────
-- 2. ROW LEVEL SECURITY (RLS)
--    Cada usuario solo puede ver y editar su propio perfil
-- ─────────────────────────────────────────
alter table public.profiles enable row level security;

-- Política: SELECT (leer)
create policy "Perfil: lectura propia"
  on public.profiles for select
  using (auth.uid() = id);

-- Política: INSERT (crear)
create policy "Perfil: inserción propia"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Política: UPDATE (actualizar)
create policy "Perfil: actualización propia"
  on public.profiles for update
  using (auth.uid() = id);

-- Política: DELETE (borrar)
create policy "Perfil: borrado propio"
  on public.profiles for delete
  using (auth.uid() = id);


-- ─────────────────────────────────────────
-- 3. FUNCIÓN PARA AUTO-CREAR PERFIL EN SIGNUP
--    Se ejecuta automáticamente cuando un usuario se registra
-- ─────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, created_at, updated_at)
  values (
    new.id,
    new.email,
    now(),
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Trigger que llama a la función en cada nuevo usuario
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ─────────────────────────────────────────
-- 4. BUCKET DE STORAGE PARA AVATARES
--    Ejecuta esto también en: Storage → New Bucket
--    O usa el SQL a continuación:
-- ─────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Políticas de storage para el bucket avatars
create policy "Avatars: lectura pública"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Avatars: subida propia"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Avatars: actualización propia"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Avatars: borrado propio"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );


-- ─────────────────────────────────────────
-- 5. TABLA DE POSTS (DESCUBRE — feed social)
-- ─────────────────────────────────────────
create table if not exists public.posts (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references public.profiles(id) on delete cascade,
  content     text        not null,
  image_url   text,
  created_at  timestamptz default now()
);

alter table public.posts enable row level security;

-- Cualquier usuario autenticado puede leer posts
create policy "Posts: lectura autenticada"
  on public.posts for select
  using (auth.role() = 'authenticated');

-- Solo el autor puede crear su propio post
create policy "Posts: creación propia"
  on public.posts for insert
  with check (auth.uid() = user_id);

-- Solo el autor puede borrar su propio post
create policy "Posts: borrado propio"
  on public.posts for delete
  using (auth.uid() = user_id);


-- ─────────────────────────────────────────
-- 6. TABLA DE LIKES DE POSTS
-- ─────────────────────────────────────────
create table if not exists public.post_likes (
  post_id     uuid  not null references public.posts(id) on delete cascade,
  user_id     uuid  not null references auth.users(id) on delete cascade,
  created_at  timestamptz default now(),
  primary key (post_id, user_id)
);

alter table public.post_likes enable row level security;

create policy "Likes: lectura autenticada"
  on public.post_likes for select
  using (auth.role() = 'authenticated');

create policy "Likes: inserción propia"
  on public.post_likes for insert
  with check (auth.uid() = user_id);

create policy "Likes: borrado propio"
  on public.post_likes for delete
  using (auth.uid() = user_id);


-- ─────────────────────────────────────────
-- 7. BUCKET DE STORAGE PARA IMÁGENES DE POSTS
-- ─────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('posts', 'posts', true)
on conflict (id) do nothing;

create policy "Posts storage: lectura pública"
  on storage.objects for select
  using (bucket_id = 'posts');

create policy "Posts storage: subida propia"
  on storage.objects for insert
  with check (
    bucket_id = 'posts'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Posts storage: borrado propio"
  on storage.objects for delete
  using (
    bucket_id = 'posts'
    and auth.uid()::text = (storage.foldername(name))[1]
  );


-- ═══════════════════════════════════════════════════════════════
-- ¡LISTO! La base de datos está configurada para CeliGO.
--
-- RESUMEN:
--  • Tabla 'profiles' con datos médicos del usuario
--  • RLS activado — cada usuario solo ve sus propios datos
--  • Trigger que crea el perfil automáticamente al registrarse
--  • Bucket 'avatars' público para fotos de perfil
--  • Tabla 'posts' para el feed social de DESCUBRE
--  • Tabla 'post_likes' para los me gusta del feed
--  • Bucket 'posts' para imágenes de publicaciones
-- ═══════════════════════════════════════════════════════════════
