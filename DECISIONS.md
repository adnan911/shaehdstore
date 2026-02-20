# DECISIONS.md – Design Assumptions

## Architecture Decisions

### 1. No User Auth

Per spec: no login/account required. All ordering happens via WhatsApp. Supabase used as a read-only public database (RLS allows public SELECT).

### 2. Demo Fallback Mode

When `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are not set or Supabase returns empty results, the site automatically uses 15 hardcoded demo products. This way the site is always presentable without a backend.

### 3. WhatsApp-Only Orders

Contact form and product "order" CTA both open WhatsApp with pre-filled messages. No email backend or order management system is included as these are outside scope.

### 4. Placeholder Images

Since no real product photos were provided, the UI uses CSS gradient placeholders that are deterministically colored per product. The user can replace them by uploading to Supabase Storage and updating the `product_images` table.

### 5. Responsive Breakpoints

Following Tailwind defaults: sm (640px), md (768px), lg (1024px). Mobile-first layout throughout.

### 6. Marquee Animation

Implemented in pure CSS (`animation: marquee`). Paused automatically when `prefers-reduced-motion: reduce` is active via the `useReducedMotion` hook.

### 7. Policies Page

Single page with tab navigation sidebar. All policy text is editable in `siteContent.ts`. No separate routes per policy to keep navigation clean (anchors used instead).

### 8. SAR Formatting

`formatSARSimple()` used in most places for clean display (e.g., "8,500 SAR"). `formatSAR()` uses native Intl for full Arabic locale formatting.

### 9. TypeScript Strictness

`"strict": true` in tsconfig. The `@types/node` is only needed for the seed script (not included in main devDependencies to keep bundle lean).

### 10. Font Loading

Google Fonts loaded via `<link>` in `index.html` with `display=swap` for FOUT-free loading. Fonts: **Fraunces** (headings), **Manrope** (body/UI).
