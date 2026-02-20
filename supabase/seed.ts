/**
 * Shahed Storee – Supabase Seed Script
 * 
 * Run with: npx ts-node supabase/seed.ts
 * Or paste the SQL output into Supabase SQL Editor.
 * 
 * Requirements:
 * - npm i -D ts-node @types/node
 * - Set SUPABASE_URL and SUPABASE_SERVICE_KEY in your environment
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

interface ProductSeed {
  name: string
  slug: string
  category: 'sofa' | 'bed' | 'dining'
  material: string
  description: string
  price_sar: number
  is_featured: boolean
  variants: { variant_name: string; variant_value: string; price_delta: number }[]
}

const PRODUCTS: ProductSeed[] = [
  // ── SOFAS ──────────────────────────────────────────
  {
    name: 'Sahara Modular Sofa',
    slug: 'sahara-modular-sofa',
    category: 'sofa',
    material: 'Italian Leather',
    description: 'The Sahara Modular Sofa brings together the finest Italian leather with precision engineering. Its modular design allows you to configure it perfectly for your space.',
    price_sar: 8500,
    is_featured: true,
    variants: [
      { variant_name: 'Size', variant_value: '2-Seater', price_delta: 0 },
      { variant_name: 'Size', variant_value: '3-Seater', price_delta: 1200 },
      { variant_name: 'Size', variant_value: 'L-Shape', price_delta: 2500 },
      { variant_name: 'Color', variant_value: 'Ivory White', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Cognac Brown', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Charcoal Grey', price_delta: 0 },
    ],
  },
  {
    name: 'Oasis Velvet Sofa',
    slug: 'oasis-velvet-sofa',
    category: 'sofa',
    material: 'Premium Velvet',
    description: 'A statement piece in lustrous velvet. The Oasis sofa combines retro silhouette with contemporary proportions, available in rich, jewel-toned colors.',
    price_sar: 7300,
    is_featured: true,
    variants: [
      { variant_name: 'Size', variant_value: '2-Seater', price_delta: 0 },
      { variant_name: 'Size', variant_value: '3-Seater', price_delta: 900 },
      { variant_name: 'Color', variant_value: 'Emerald', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Deep Navy', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Blush Rose', price_delta: 0 },
    ],
  },
  {
    name: 'Desert Wind Sofa',
    slug: 'desert-wind-sofa',
    category: 'sofa',
    material: 'Boucle Fabric',
    description: 'Wrapped in cloud-soft boucle, the Desert Wind sofa brings warmth and texture to any living room. A favorite for minimalist interiors.',
    price_sar: 6100,
    is_featured: false,
    variants: [
      { variant_name: 'Size', variant_value: '2-Seater', price_delta: 0 },
      { variant_name: 'Size', variant_value: '3-Seater', price_delta: 800 },
      { variant_name: 'Color', variant_value: 'Cream', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Sand', price_delta: 0 },
    ],
  },
  {
    name: 'Mirage L-Shape Sectional',
    slug: 'mirage-l-shape',
    category: 'sofa',
    material: 'Microfiber',
    description: 'Perfect for open-plan living, the Mirage L-Shape sectional offers generous seating with a sleek, low-profile design.',
    price_sar: 9200,
    is_featured: false,
    variants: [
      { variant_name: 'Color', variant_value: 'Stone Beige', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Graphite', price_delta: 0 },
    ],
  },
  {
    name: 'Al Noor Sectional',
    slug: 'al-noor-sectional',
    category: 'sofa',
    material: 'Linen Blend',
    description: 'A grand sectional sofa in luxurious linen blend. The Al Noor offers deep cushions and removable covers for easy maintenance.',
    price_sar: 11500,
    is_featured: true,
    variants: [
      { variant_name: 'Color', variant_value: 'Natural Linen', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Warm Taupe', price_delta: 0 },
      { variant_name: 'Leg Finish', variant_value: 'Dark Walnut', price_delta: 0 },
      { variant_name: 'Leg Finish', variant_value: 'Brushed Gold', price_delta: 500 },
    ],
  },
  {
    name: 'Falak Chaise Lounge',
    slug: 'falak-chaise-lounge',
    category: 'sofa',
    material: 'Cashmere Wool',
    description: 'The ultimate in relaxation. The Falak chaise is draped in sumptuous cashmere wool with solid hardwood legs.',
    price_sar: 5800,
    is_featured: false,
    variants: [
      { variant_name: 'Color', variant_value: 'Ivory', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Caramel', price_delta: 0 },
    ],
  },
  {
    name: 'Zenith Corner Sofa',
    slug: 'zenith-corner-sofa',
    category: 'sofa',
    material: 'Full-Grain Leather',
    description: 'Handstitched full-grain leather corner sofa with feather-filled cushion inserts. A lifetime investment piece.',
    price_sar: 18900,
    is_featured: true,
    variants: [
      { variant_name: 'Color', variant_value: 'Saddle Brown', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Midnight Black', price_delta: 0 },
    ],
  },

  // ── BEDS ──────────────────────────────────────────
  {
    name: 'Al Madinah King Bed',
    slug: 'al-madinah-king-bed',
    category: 'bed',
    material: 'Solid Walnut',
    description: 'Crafted from solid American walnut with dovetail joinery. The Al Madinah bed frame is built to last generations.',
    price_sar: 6200,
    is_featured: true,
    variants: [
      { variant_name: 'Size', variant_value: 'Queen (150×200)', price_delta: 0 },
      { variant_name: 'Size', variant_value: 'King (180×200)', price_delta: 600 },
      { variant_name: 'Size', variant_value: 'Super King (200×200)', price_delta: 1200 },
    ],
  },
  {
    name: 'Dune Platform Bed',
    slug: 'dune-platform-bed',
    category: 'bed',
    material: 'Oak Wood',
    description: 'A contemporary low-profile platform bed in natural oak. Minimalist design with hidden under-bed storage.',
    price_sar: 5400,
    is_featured: false,
    variants: [
      { variant_name: 'Size', variant_value: 'Queen', price_delta: 0 },
      { variant_name: 'Size', variant_value: 'King', price_delta: 500 },
      { variant_name: 'Storage', variant_value: 'Without Storage', price_delta: 0 },
      { variant_name: 'Storage', variant_value: 'With Drawers', price_delta: 900 },
    ],
  },
  {
    name: 'Raha Upholstered Bed',
    slug: 'raha-upholstered-bed',
    category: 'bed',
    material: 'Velvet Headboard',
    description: 'An opulent upholstered bed with a floor-to-ceiling tufted velvet headboard. The Raha transforms any bedroom into a suite.',
    price_sar: 7800,
    is_featured: true,
    variants: [
      { variant_name: 'Size', variant_value: 'Queen', price_delta: 0 },
      { variant_name: 'Size', variant_value: 'King', price_delta: 700 },
      { variant_name: 'Color', variant_value: 'Royal Blue', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Stone Grey', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Blush Pink', price_delta: 0 },
    ],
  },
  {
    name: 'Serenity Panel Bed',
    slug: 'serenity-panel-bed',
    category: 'bed',
    material: 'MDF + Leather',
    description: 'A sleek panel bed in faux leather with integrated LED lighting in the headboard. Modern luxury at an accessible price.',
    price_sar: 4900,
    is_featured: false,
    variants: [
      { variant_name: 'Size', variant_value: 'Queen', price_delta: 0 },
      { variant_name: 'Size', variant_value: 'King', price_delta: 400 },
      { variant_name: 'Color', variant_value: 'White', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Black', price_delta: 0 },
    ],
  },
  {
    name: 'Horizon Canopy Bed',
    slug: 'horizon-canopy-bed',
    category: 'bed',
    material: 'Iron + Fabric',
    description: 'A dramatic four-poster canopy bed in matte black iron with fabric draping. Creates a sanctuary-like atmosphere.',
    price_sar: 8400,
    is_featured: false,
    variants: [
      { variant_name: 'Size', variant_value: 'Queen', price_delta: 0 },
      { variant_name: 'Size', variant_value: 'King', price_delta: 600 },
    ],
  },
  {
    name: 'Naeem Bedside Tables (Set)',
    slug: 'naeem-bedside-tables',
    category: 'bed',
    material: 'Solid Pine',
    description: 'A matching pair of solid pine nightstands with sculptural silhouettes and deep drawers. Sold as a set of two.',
    price_sar: 2800,
    is_featured: false,
    variants: [
      { variant_name: 'Finish', variant_value: 'Natural Pine', price_delta: 0 },
      { variant_name: 'Finish', variant_value: 'Painted White', price_delta: 0 },
    ],
  },
  {
    name: 'Sultan Bed Frame',
    slug: 'sultan-bed-frame',
    category: 'bed',
    material: 'Teak Wood',
    description: 'Solid teak bed frame with carved detailing inspired by traditional Saudi craftsmanship. A showpiece for master bedrooms.',
    price_sar: 12000,
    is_featured: true,
    variants: [
      { variant_name: 'Size', variant_value: 'King', price_delta: 0 },
      { variant_name: 'Size', variant_value: 'Super King', price_delta: 1500 },
    ],
  },
  {
    name: 'Wadi Bedside Unit',
    slug: 'wadi-bedside-unit',
    category: 'bed',
    material: 'Marble + Brass',
    description: 'A compact side table in Carrara marble top with brushed brass legs. Add a touch of luxury beside any bed.',
    price_sar: 1900,
    is_featured: false,
    variants: [
      { variant_name: 'Marble', variant_value: 'White Carrara', price_delta: 0 },
      { variant_name: 'Marble', variant_value: 'Green Jade', price_delta: 300 },
    ],
  },

  // ── DINING ───────────────────────────────────────
  {
    name: 'Madina Dining Table',
    slug: 'madina-dining-table',
    category: 'dining',
    material: 'Sintered Stone',
    description: 'A commanding 2.4-meter dining table in Italian sintered stone. Heat and scratch resistant, with a brushed steel base.',
    price_sar: 12000,
    is_featured: true,
    variants: [
      { variant_name: 'Size', variant_value: '6-Person (180cm)', price_delta: 0 },
      { variant_name: 'Size', variant_value: '8-Person (240cm)', price_delta: 2000 },
      { variant_name: 'Stone Color', variant_value: 'Dark Grey', price_delta: 0 },
      { variant_name: 'Stone Color', variant_value: 'White Marble Look', price_delta: 0 },
    ],
  },
  {
    name: 'Sultana Dining Set',
    slug: 'sultana-dining-set',
    category: 'dining',
    material: 'Teak + Travertine',
    description: 'A complete luxury dining set including 6 chairs and a travertine-top table with solid teak legs.',
    price_sar: 9800,
    is_featured: false,
    variants: [
      { variant_name: 'Chairs', variant_value: '4 Chairs', price_delta: -1400 },
      { variant_name: 'Chairs', variant_value: '6 Chairs', price_delta: 0 },
      { variant_name: 'Chairs', variant_value: '8 Chairs', price_delta: 1600 },
    ],
  },
  {
    name: 'Majlis Round Table',
    slug: 'majlis-round-table',
    category: 'dining',
    material: 'Marble Top',
    description: 'A round dining table in Calacatta marble with a gold-leaf base. Inspired by traditional majlis gatherings, perfectly proportioned for intimate dining.',
    price_sar: 14500,
    is_featured: true,
    variants: [
      { variant_name: 'Diameter', variant_value: '120cm (4-Person)', price_delta: 0 },
      { variant_name: 'Diameter', variant_value: '150cm (6-Person)', price_delta: 2000 },
    ],
  },
  {
    name: 'Breeze Dining Chairs (Set of 2)',
    slug: 'breeze-dining-chairs',
    category: 'dining',
    material: 'Rattan + Foam',
    description: 'Handwoven rattan dining chairs with foam-padded seats. Light, durable and perfectly complementary to stone or wooden tables.',
    price_sar: 2800,
    is_featured: false,
    variants: [
      { variant_name: 'Upholstery', variant_value: 'Natural Linen', price_delta: 0 },
      { variant_name: 'Upholstery', variant_value: 'Boucle Cream', price_delta: 200 },
    ],
  },
  {
    name: 'Amber Buffet Cabinet',
    slug: 'amber-buffet-cabinet',
    category: 'dining',
    material: 'Acacia Wood',
    description: 'A sideboard in live-edge acacia wood with cane-front doors. Perfect as a statement piece in the dining room.',
    price_sar: 6700,
    is_featured: false,
    variants: [
      { variant_name: 'Width', variant_value: '160cm', price_delta: 0 },
      { variant_name: 'Width', variant_value: '200cm', price_delta: 800 },
    ],
  },
  {
    name: 'Zephyr Extendable Table',
    slug: 'zephyr-extendable-table',
    category: 'dining',
    material: 'Tempered Glass + Steel',
    description: 'Extends from 140cm to 200cm, perfect for entertaining. Tempered glass top with chrome hairpin legs.',
    price_sar: 5300,
    is_featured: false,
    variants: [
      { variant_name: 'Base Color', variant_value: 'Chrome', price_delta: 0 },
      { variant_name: 'Base Color', variant_value: 'Matte Black', price_delta: 0 },
    ],
  },
  {
    name: 'Rahma Dining Bench',
    slug: 'rahma-dining-bench',
    category: 'dining',
    material: 'Solid Oak',
    description: 'A generous 180cm dining bench in solid oak with a padded velvet seat. Seats 3 comfortably.',
    price_sar: 3200,
    is_featured: false,
    variants: [
      { variant_name: 'Cushion Color', variant_value: 'Olive Green', price_delta: 0 },
      { variant_name: 'Cushion Color', variant_value: 'Navy Blue', price_delta: 0 },
      { variant_name: 'Cushion Color', variant_value: 'Natural Linen', price_delta: 0 },
    ],
  },
  {
    name: 'Ayla Dining Armchairs (Set of 2)',
    slug: 'ayla-dining-armchairs',
    category: 'dining',
    material: 'Bouclé + Walnut',
    description: 'Host chairs that double as statement pieces. Bouclé upholstered armchairs with solid walnut frames and arms.',
    price_sar: 4600,
    is_featured: true,
    variants: [
      { variant_name: 'Color', variant_value: 'Cream Bouclé', price_delta: 0 },
      { variant_name: 'Color', variant_value: 'Sage Bouclé', price_delta: 0 },
    ],
  },
]

async function seed() {
  console.log('🌱 Seeding Shahed Storee database...\n')

  let successCount = 0
  let errorCount = 0

  for (const product of PRODUCTS) {
    const { variants, ...productData } = product

    // Insert product
    const { data: inserted, error: prodError } = await supabase
      .from('products')
      .upsert(productData, { onConflict: 'slug' })
      .select('id, name')
      .single()

    if (prodError) {
      console.error(`❌ ${product.name}:`, prodError.message)
      errorCount++
      continue
    }

    // Insert variants
    if (variants.length > 0) {
      const variantsWithProductId = variants.map(v => ({
        ...v,
        product_id: inserted!.id,
      }))

      const { error: varError } = await supabase
        .from('product_variants')
        .upsert(variantsWithProductId)

      if (varError) {
        console.warn(`  ⚠️  Variants warning for ${product.name}:`, varError.message)
      }
    }

    console.log(`  ✅ ${inserted!.name}`)
    successCount++
  }

  console.log(`\n─────────────────────`)
  console.log(`✅ ${successCount} products seeded`)
  if (errorCount > 0) console.log(`❌ ${errorCount} errors`)
  console.log('🎉 Seeding complete!')
}

seed().catch(console.error)
