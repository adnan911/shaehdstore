# REQUIREMENTS_TRACE.md

Maps each major requirement from `store.md` to the implementing file(s).

| Requirement                             | File(s)                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------ |
| Vite + React + TypeScript               | `vite.config.ts`, `tsconfig.json`, `package.json`                        |
| TailwindCSS design system               | `tailwind.config.ts`, `src/styles/tokens.css`, `src/styles/globals.css`  |
| React Router multi-page routing         | `src/App.tsx`                                                            |
| Supabase integration                    | `src/lib/supabase.ts`, `supabase/migrations/001_initial.sql`             |
| Vercel deployment                       | `vercel.json`, `README.md`                                               |
| WhatsApp integration                    | `src/lib/whatsapp.ts`, `src/components/layout/FloatingWhatsApp.tsx`      |
| No fabricated external assets           | All images use CSS gradient placeholders                                 |
| Loading / empty / error states          | `src/pages/Shop.tsx`, `src/pages/ProductDetails.tsx`                     |
| Accessibility                           | `Accordion.tsx`, `Tabs.tsx`, `MobileDrawer.tsx`, `Navbar.tsx`, all pages |
| Reduced motion support                  | `src/hooks/useReducedMotion.ts`, `src/pages/Home.tsx` (marquee)          |
| Route: `/` Home                         | `src/pages/Home.tsx`                                                     |
| Route: `/shop` Shop                     | `src/pages/Shop.tsx`                                                     |
| Route: `/product/:slug`                 | `src/pages/ProductDetails.tsx`                                           |
| Route: `/about`                         | `src/pages/About.tsx`                                                    |
| Route: `/contact`                       | `src/pages/Contact.tsx`                                                  |
| Route: `/faq`                           | `src/pages/FAQ.tsx`                                                      |
| Route: `/policies`                      | `src/pages/Policies.tsx`                                                 |
| products table                          | `supabase/migrations/001_initial.sql`                                    |
| product_variants table                  | `supabase/migrations/001_initial.sql`                                    |
| product_images table                    | `supabase/migrations/001_initial.sql`                                    |
| Storage bucket: product-images          | `supabase/migrations/001_initial.sql`                                    |
| 30 products seed                        | `supabase/seed.ts`                                                       |
| All editable copy in one file           | `src/content/siteContent.ts`                                             |
| CSS design tokens                       | `src/styles/tokens.css`                                                  |
| Google Fonts (Fraunces + Manrope)       | `index.html`, `tailwind.config.ts`                                       |
| Champagne gold / ivory theme            | `tailwind.config.ts`, `tokens.css`                                       |
| Navbar: logo + links + WhatsApp         | `src/components/layout/Navbar.tsx`                                       |
| Mobile hamburger drawer                 | `src/components/layout/MobileDrawer.tsx`                                 |
| Hero section                            | `src/pages/Home.tsx` (section 1)                                         |
| Featured collection                     | `src/pages/Home.tsx` (section 2)                                         |
| Collections tabs (Sofa/Bed/Dining)      | `src/pages/Home.tsx` (section 3), `Tabs.tsx`                             |
| Marquee strip                           | `src/pages/Home.tsx` (section 4)                                         |
| About + stats                           | `src/pages/Home.tsx` (section 5)                                         |
| Quality/Eco section                     | `src/pages/Home.tsx` (section 6)                                         |
| FAQ preview accordion                   | `src/pages/Home.tsx` (section 7), `Accordion.tsx`                        |
| CTA banner with WhatsApp                | `src/pages/Home.tsx` (section 8)                                         |
| Footer                                  | `src/components/layout/Footer.tsx`                                       |
| Shop filters (category, material, sort) | `src/components/shop/FiltersBar.tsx`                                     |
| Product card with hover                 | `src/components/shop/ProductCard.tsx`                                    |
| Loading skeleton grid                   | `src/components/ui/Skeleton.tsx`                                         |
| Product gallery                         | `src/components/product/Gallery.tsx`                                     |
| Variant selectors                       | `src/components/product/VariantSelector.tsx`                             |
| Delivery area selector                  | `src/pages/ProductDetails.tsx`                                           |
| WhatsApp order CTA (product page)       | `src/pages/ProductDetails.tsx`                                           |
| Related products                        | `src/components/product/RelatedProducts.tsx`                             |
| Contact form → WhatsApp                 | `src/pages/Contact.tsx`                                                  |
| Full FAQ accordion                      | `src/pages/FAQ.tsx`                                                      |
| Policies with sidebar                   | `src/pages/Policies.tsx`                                                 |
| Floating WhatsApp button                | `src/components/layout/FloatingWhatsApp.tsx`                             |
| .env.example                            | `.env.example`                                                           |
| REQUIREMENTS_TRACE.md                   | `REQUIREMENTS_TRACE.md`                                                  |
| QA_CHECKLIST.md                         | `QA_CHECKLIST.md`                                                        |
| DECISIONS.md                            | `DECISIONS.md`                                                           |
| README / how-to-customize               | `README.md`                                                              |
