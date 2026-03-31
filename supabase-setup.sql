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


-- ═══════════════════════════════════════════════════════════════
-- ¡LISTO! La base de datos está configurada para CeliGO.
--
-- RESUMEN:
--  • Tabla 'profiles' con datos médicos del usuario
--  • RLS activado — cada usuario solo ve sus propios datos
--  • Trigger que crea el perfil automáticamente al registrarse
--  • Bucket 'avatars' público para fotos de perfil
-- ═══════════════════════════════════════════════════════════════
