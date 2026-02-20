-- =============================================
-- Shahed Storee – Initial Database Migration
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PRODUCTS ──────────────────────────────
create table if not exists public.products (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  slug         text unique not null,
  category     text not null check (category in ('sofa', 'bed', 'dining')),
  material     text not null,
  description  text,
  price_sar    numeric not null default 0 check (price_sar >= 0),
  is_featured  boolean not null default false,
  created_at   timestamptz not null default now()
);

-- ─── PRODUCT VARIANTS ──────────────────────
create table if not exists public.product_variants (
  id             uuid primary key default uuid_generate_v4(),
  product_id     uuid not null references public.products(id) on delete cascade,
  variant_name   text not null,
  variant_value  text not null,
  price_delta    numeric not null default 0
);

-- ─── PRODUCT IMAGES ────────────────────────
create table if not exists public.product_images (
  id          uuid primary key default uuid_generate_v4(),
  product_id  uuid not null references public.products(id) on delete cascade,
  url         text not null,
  alt         text,
  sort_order  integer not null default 0
);

-- ─── INDEXES ───────────────────────────────
create index if not exists idx_products_category    on public.products(category);
create index if not exists idx_products_slug        on public.products(slug);
create index if not exists idx_products_is_featured on public.products(is_featured);
create index if not exists idx_variants_product_id  on public.product_variants(product_id);
create index if not exists idx_images_product_id    on public.product_images(product_id);

-- ─── ROW LEVEL SECURITY ────────────────────
alter table public.products         enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images   enable row level security;

-- Public read access (no login required for shoppers)
create policy "Public read products"
  on public.products for select using (true);

create policy "Public read variants"
  on public.product_variants for select using (true);

create policy "Public read images"
  on public.product_images for select using (true);

-- ─── STORAGE BUCKET ────────────────────────
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');
