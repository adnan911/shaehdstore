You are a senior product designer + senior full-stack engineer.

GOAL
Build a premium, modern furniture brand website for:
Brand name: "Shahed Storee"
Market: Saudi Arabia
Currency: SAR
Site type: Marketing + Shop + Product details (NO login/account)
Clone the given reference layout style and section structure (hero, featured collection, tabs collections, marquee strip, about+stats, eco/quality section, FAQ, big CTA footer), but not exact assets.
Theme: Luxury champagne-gold on ivory/cream background.
Must feel high-end: clean spacing, elegant typography, subtle micro-interactions, responsive.

STACK (MUST FOLLOW)

- Vite + React + TypeScript
- TailwindCSS
- React Router (for multi-page routing)
- Supabase (database + storage; auth not used for users; use service role only in serverless if needed)
- Deployed on Vercel
- WhatsApp integration (click-to-chat button + CTA in footer/contact)

IMPORTANT CONSTRAINTS

- No fabricated external assets: use local placeholder images (simple gradients / generated placeholders).
- Create clean structure so the user can replace content later easily.
- Implement all states: loading / empty / error for Shop and Product pages.
- Accessibility: keyboard nav, focus rings, semantic HTML, aria for modals/accordions, reduced motion support.

INFORMATION ARCHITECTURE (ROUTES)

- / Home
- /shop Shop (listing + filters)
- /product/:slug Product Details
- /about About
- /contact Contact (WhatsApp CTA + form UI only)
- /faq FAQ
- /policies Policies (Shipping, Return, Privacy, Terms)

DATA MODEL
We have ~30 products, categories: Sofa, Bed, Dining.
Products have variants: size, color, material option. For now show variant selectors but minimal fields requested:

- Product required fields: name, material
  Also support: category, description, price_sar, images, slug, area_delivery_rules.

DATABASE (SUPABASE)
Create SQL migrations (in /supabase/migrations) and a setup guide.
Tables:

1. products
   - id uuid pk
   - name text not null
   - slug text unique not null
   - category text not null (enum-like: sofa/bed/dining)
   - material text not null
   - description text
   - price_sar numeric not null default 0
   - is_featured boolean default false
   - created_at timestamp default now()
2. product_variants
   - id uuid pk
   - product_id uuid fk -> products.id on delete cascade
   - variant_name text (e.g., "Size")
   - variant_value text (e.g., "3-Seater")
   - price_delta numeric default 0
3. product_images
   - id uuid pk
   - product_id uuid fk
   - url text not null
   - alt text

SUPABASE STORAGE
Bucket: product-images
But since user has no images now, provide placeholder generation in UI + later upload instructions.

SEEDING
Provide a seed script (node/ts) to insert 30 placeholder products with realistic luxury names and materials, prices in SAR, plus variants and placeholder image URLs.
All copy should be editable from a single file: /src/content/siteContent.ts

DESIGN SYSTEM (MANDATORY)
Create a premium token system:

- Spacing scale: 8, 12, 16, 24, 32, 48, 64, 96
- Container: max-w-[1200px], responsive paddings (mobile 16–20)
- Typography:
  - Display serif for headings, clean sans for UI/body.
  - Use Google fonts via CSS import:
    - Headings: "Fraunces" (or "Playfair Display" if preferred)
    - Body/UI: "Manrope"
- Colors (Champagne Gold on Ivory):
  - background: ivory (#FAF7F0-like)
  - text: near-black / charcoal
  - primary accent: champagne gold (soft)
  - secondary: muted olive/stone for subtle sections
  - borders: warm gray
    Define as CSS variables and Tailwind theme extension:
- /src/styles/tokens.css
- tailwind.config.ts extends colors + fontFamily
  Use consistent radii: 16–24px for cards
  Shadows: soft, minimal
  Buttons: primary gold, secondary outline, ghost

LAYOUT + SECTION REQUIREMENTS (HOME)
Implement sections matching reference structure:

1. Top navigation (desktop):
   - left: Logo (text for now) "Shahed Storee"
   - center links: Home, Shop, Our Mission/About, FAQ
   - right: WhatsApp icon/button + "Get Started" style CTA
     Mobile: hamburger to slide-in drawer.
2. Hero:
   - Big headline (luxury tone): e.g., "Timeless Furniture, Crafted for Modern Living"
   - Subheadline: premium short copy
   - Primary CTA: "Explore Collection" -> /shop
   - Secondary: "Contact Us" -> /contact
   - Large hero image placeholder (rounded corners) + subtle floating “info cards” (like the reference)
3. Featured collection:
   - heading: “Our most popular pieces…” + two feature images in a split layout
4. Signature collections:
   - Tabs: Sofa, Bed, Dining
   - Tab content: product carousel/grid (featured items)
5. Marquee strip:
   - Big scrolling or static typographic band: “FURNITURE • INTERIOR • DESIGN”
6. About + Stats block:
   - short brand story
   - 2–3 stat cards (e.g., "30+ Curated Pieces", "Fast Delivery Coverage", "Premium Materials")
7. Eco/Quality section:
   - “Eco-Friendly Designs, Timeless Quality” style block + image grid
8. FAQ preview:
   - 4 questions accordion + link to /faq
9. CTA footer section:
   - Big rounded panel with “Let’s Work Together…” + WhatsApp CTA
10. Footer:

- Contact, address (Saudi placeholder), social links placeholders

SHOP PAGE REQUIREMENTS

- Header with title + breadcrumb
- Filters: category tabs, material filter (simple select), price sort
- Product grid (cards):
  - image placeholder, name, material, price SAR
  - hover micro-interactions
- States:
  - Loading skeleton grid
  - Empty state with CTA to reset filters
  - Error state with retry

PRODUCT DETAILS REQUIREMENTS

- Gallery (placeholder images), name, material, price
- Variant selectors (size/color) from product_variants (grouped)
- Delivery info: "Delivery varies by area" + area selector placeholder
- CTA: "Chat on WhatsApp to Order" (prefill message with product name + selected variants)
- Related products section (same category)
- States: loading skeleton, error state, not found

ABOUT / CONTACT / FAQ / POLICIES

- About: brand story + values + stats reused
- Contact: form UI (name, phone, message) but submission can just open WhatsApp with message (no email integration).
- FAQ: full list accordion (8 items)
- Policies: Shipping (by area), Returns, Privacy, Terms (basic placeholders)

WHATSAPP INTEGRATION (MANDATORY)

- Floating WhatsApp button bottom-right across site
- Footer WhatsApp CTA
- Product page WhatsApp message format:
  "Hello Shahed Storee, I want to order: {productName}. Material: {material}. Variants: {variants}. Please confirm delivery to: {area}."
  Config:
- WhatsApp number stored in env: VITE_WHATSAPP_NUMBER (e.g., 9665XXXXXXX)
- Use wa.me link generation

RESPONSIVE + ACCESSIBILITY (MANDATORY)

- Mobile-first, all sections stack cleanly
- Sidebar -> mobile drawer
- Focus visible; buttons have aria-label if icon-only
- Accordions: aria-expanded, aria-controls
- Respect prefers-reduced-motion:
  - If reduced motion, disable marquee animation + parallax + heavy transitions

ANIMATION / INTERACTIONS

- Use subtle transitions: hover lift, soft scale, fade
- Keep to CSS transitions; DO NOT add heavy animation libs unless needed.
- Provide a small utility: prefersReducedMotion hook.

PROJECT STRUCTURE (MUST IMPLEMENT)
src/
app/
App.tsx (routes)
providers/ (Supabase client provider)
pages/
Home.tsx
Shop.tsx
ProductDetails.tsx
About.tsx
Contact.tsx
FAQ.tsx
Policies.tsx
components/
layout/ (Navbar, Footer, Container, MobileDrawer)
ui/ (Button, Card, Tabs, Accordion, Modal, Badge, Skeleton, Toast optional)
shop/ (ProductCard, FiltersBar)
product/ (Gallery, VariantSelector, RelatedProducts)
content/
siteContent.ts (ALL editable copy + nav links + FAQs + policy text)
lib/
supabase.ts
whatsapp.ts
format.ts
hooks/ (useReducedMotion, useScrollLock)
styles/
tokens.css
globals.css

CONFIG + COMMANDS (MUST INCLUDE)

- Provide exact commands:
  npm create vite@latest shahed-storee -- --template react-ts
  npm i react-router-dom @supabase/supabase-js lucide-react clsx
  npm i -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
- Include .env.example with:
  VITE_SUPABASE_URL=
  VITE_SUPABASE_ANON_KEY=
  VITE_WHATSAPP_NUMBER=966500000000

- Vercel deploy steps: build command, output folder, env vars.

QUALITY GATES (MUST PASS)
Before finalizing, create REQUIREMENTS_TRACE.md mapping:

- each major requirement -> file(s) implementing it
  Create QA_CHECKLIST.md including:
- responsive checks
- keyboard navigation checks
- shop states
- product whatsapp message correctness
  Create DECISIONS.md for assumptions.

DELIVER NOW

1. Generate the full codebase files.
2. Generate Supabase SQL migrations + seed script.
3. Ensure it runs with npm install && npm run dev.
4. Provide brief “how to customize content and replace images” notes in README.md.

BEGIN IMPLEMENTATION NOW.
