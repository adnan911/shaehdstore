// =============================================
// PRODUCT IMAGE MAP – slug → image path
// =============================================

/**
 * Maps product slugs to their image paths in /public/images/products/.
 * Usage: productImages[slug] → "/images/products/{slug}.png"
 */
export const productImages: Record<string, string> = {
  // Sofas
  'sahara-modular-sofa': '/images/products/sahara-modular-sofa.png',
  'oasis-velvet-sofa': '/images/products/oasis-velvet-sofa.png',
  'desert-wind-sofa': '/images/products/desert-wind-sofa.png',
  'mirage-l-shape': '/images/products/mirage-l-shape.png',
  'al-noor-sectional': '/images/products/al-noor-sectional.png',
  // Beds
  'al-madinah-king-bed': '/images/products/al-madinah-king-bed.png',
  'dune-platform-bed': '/images/products/dune-platform-bed.png',
  'raha-upholstered-bed': '/images/products/raha-upholstered-bed.png',
  'serenity-panel-bed': '/images/products/serenity-panel-bed.png',
  'horizon-canopy-bed': '/images/products/horizon-canopy-bed.png',
  // Dining
  'madina-dining-table': '/images/products/madina-dining-table.png',
  'sultana-dining-set': '/images/products/sultana-dining-set.png',
  'majlis-round-table': '/images/products/majlis-round-table.png',
  'breeze-dining-chairs': '/images/products/breeze-dining-chairs.png',
  'amber-buffet-cabinet': '/images/products/amber-buffet-cabinet.png',
}

/** Section/hero images used across the site */
export const sectionImages = {
  hero: '/images/sections/hero-living-room.png',
  featuredCollection1: '/images/sections/featured-collection-1.png',
}

/** Helper to get a product image by slug, with fallback */
export function getProductImage(slug: string): string | undefined {
  return productImages[slug]
}
