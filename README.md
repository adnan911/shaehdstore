# Shahed Storee – Premium Furniture Website

A luxury furniture brand website for **Shahed Storee**, built for the Saudi Arabian market.

**Tech Stack:** Vite + React + TypeScript + TailwindCSS + Supabase + React Router

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_WHATSAPP_NUMBER=966500000000
```

### 3. Run the dev server

```bash
npm run dev
```

> **Demo Mode:** If Supabase is not configured, the site uses mock product data automatically.

---

## 🗄️ Supabase Setup

### Step 1: Create a Supabase project

Go to [supabase.com](https://supabase.com) → New Project.

### Step 2: Run the migration

In Supabase → SQL Editor, paste and run the contents of:

```
supabase/migrations/001_initial.sql
```

### Step 3: Seed the database

```bash
# Install dev deps
npm install -D ts-node @types/node

# Set service role key (from Supabase → Settings → API → service_role)
export SUPABASE_URL=https://your-project.supabase.co
export SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Run seed
npx ts-node supabase/seed.ts
```

---

## 🖼️ Adding Product Images

1. Go to **Supabase → Storage → product-images bucket**
2. Upload your images
3. Copy the public URL from Supabase Storage
4. In SQL Editor, insert records into `product_images`:

```sql
INSERT INTO product_images (product_id, url, alt)
VALUES (
  'your-product-uuid',
  'https://your-project.supabase.co/storage/v1/object/public/product-images/sofa.jpg',
  'Sahara Modular Sofa in Ivory'
);
```

---

## ✏️ Customizing Content

**All editable copy is in one file:**  
`src/content/siteContent.ts`

Edit here to change:

- Brand name, tagline, address
- Navigation links and CTA labels
- Hero headline and badges
- About/brand story
- FAQ questions and answers
- Footer content, social links
- Policy text (shipping, returns, privacy, terms)

---

## 📱 WhatsApp Integration

Set your number in `.env`:

```
VITE_WHATSAPP_NUMBER=966500000000
```

The format is: Country code + number without `+` or spaces.

All WhatsApp links are built via `src/lib/whatsapp.ts`.

---

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com) dashboard
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WHATSAPP_NUMBER`
4. Build command: `npm run build`
5. Output directory: `dist`

The `vercel.json` handles SPA routing automatically.

---

## 🏗️ Project Structure

```
src/
├── app/            # App.tsx (routes)
├── components/
│   ├── layout/     # Navbar, Footer, MobileDrawer, Container, FloatingWhatsApp
│   ├── ui/         # Button, Card, Tabs, Accordion, Modal, Badge, Skeleton
│   ├── shop/       # ProductCard, FiltersBar
│   └── product/    # Gallery, VariantSelector, RelatedProducts
├── content/
│   └── siteContent.ts  ← Edit all copy here
├── hooks/          # useReducedMotion, useScrollLock
├── lib/            # supabase.ts, whatsapp.ts, format.ts
├── pages/          # Home, Shop, ProductDetails, About, Contact, FAQ, Policies
└── styles/         # tokens.css, globals.css
supabase/
├── migrations/     # SQL migrations
└── seed.ts         # Seed script
```

# shaehdstore
