import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { FiltersBar } from '@/components/shop/FiltersBar'
import { ProductCard } from '@/components/shop/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { supabase } from '@/lib/supabase'
import { AlertCircle, PackageOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Product {
  id: string
  name: string
  slug: string
  category: 'sofa' | 'bed' | 'dining'
  material: string
  price_sar: number
  is_featured: boolean
}

const DEMO_PRODUCTS: (Product & { imageUrl?: string })[] = [
  { id: 'a1', name: 'Sahara Modular Sofa', slug: 'sahara-modular-sofa', category: 'sofa', material: 'Italian Leather', price_sar: 8500, is_featured: true, imageUrl: '/images/products/sahara-modular-sofa.png' },
  { id: 'a2', name: 'Oasis Velvet Sofa', slug: 'oasis-velvet-sofa', category: 'sofa', material: 'Premium Velvet', price_sar: 7300, is_featured: true, imageUrl: '/images/products/oasis-velvet-sofa.png' },
  { id: 'a3', name: 'Desert Wind Sofa', slug: 'desert-wind-sofa', category: 'sofa', material: 'Boucle Fabric', price_sar: 6100, is_featured: false, imageUrl: '/images/products/desert-wind-sofa.png' },
  { id: 'a4', name: 'Mirage L-Shape', slug: 'mirage-l-shape', category: 'sofa', material: 'Microfiber', price_sar: 9200, is_featured: false, imageUrl: '/images/products/mirage-l-shape.png' },
  { id: 'a5', name: 'Al Noor Sectional', slug: 'al-noor-sectional', category: 'sofa', material: 'Linen Blend', price_sar: 11500, is_featured: true, imageUrl: '/images/products/al-noor-sectional.png' },
  { id: 'b1', name: 'Al Madinah King Bed', slug: 'al-madinah-king-bed', category: 'bed', material: 'Solid Walnut', price_sar: 6200, is_featured: true, imageUrl: '/images/products/al-madinah-king-bed.png' },
  { id: 'b2', name: 'Dune Platform Bed', slug: 'dune-platform-bed', category: 'bed', material: 'Oak Wood', price_sar: 5400, is_featured: false, imageUrl: '/images/products/dune-platform-bed.png' },
  { id: 'b3', name: 'Raha Upholstered Bed', slug: 'raha-upholstered-bed', category: 'bed', material: 'Velvet Headboard', price_sar: 7800, is_featured: true, imageUrl: '/images/products/raha-upholstered-bed.png' },
  { id: 'b4', name: 'Serenity Panel Bed', slug: 'serenity-panel-bed', category: 'bed', material: 'MDF + Leather', price_sar: 4900, is_featured: false, imageUrl: '/images/products/serenity-panel-bed.png' },
  { id: 'b5', name: 'Horizon Canopy Bed', slug: 'horizon-canopy-bed', category: 'bed', material: 'Iron + Fabric', price_sar: 8400, is_featured: false, imageUrl: '/images/products/horizon-canopy-bed.png' },
  { id: 'c1', name: 'Madina Dining Table', slug: 'madina-dining-table', category: 'dining', material: 'Sintered Stone', price_sar: 12000, is_featured: true, imageUrl: '/images/products/madina-dining-table.png' },
  { id: 'c2', name: 'Sultana Dining Set', slug: 'sultana-dining-set', category: 'dining', material: 'Teak + Travertine', price_sar: 9800, is_featured: false, imageUrl: '/images/products/sultana-dining-set.png' },
  { id: 'c3', name: 'Majlis Round Table', slug: 'majlis-round-table', category: 'dining', material: 'Marble Top', price_sar: 14500, is_featured: true, imageUrl: '/images/products/majlis-round-table.png' },
  { id: 'c4', name: 'Breeze Dining Chairs', slug: 'breeze-dining-chairs', category: 'dining', material: 'Rattan + Foam', price_sar: 2800, is_featured: false, imageUrl: '/images/products/breeze-dining-chairs.png' },
  { id: 'c5', name: 'Amber Buffet Cabinet', slug: 'amber-buffet-cabinet', category: 'dining', material: 'Acacia Wood', price_sar: 6700, is_featured: false, imageUrl: '/images/products/amber-buffet-cabinet.png' },
]

export default function Shop() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  const selectedCategory = searchParams.get('category') || ''
  const selectedMaterial = searchParams.get('material') || ''
  const sortBy = searchParams.get('sort') || ''

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      setError(null)
      try {
        let query = supabase.from('products').select('*')
        if (selectedCategory) query = query.eq('category', selectedCategory)
        if (selectedMaterial) query = query.eq('material', selectedMaterial)
        if (sortBy === 'price_asc') query = query.order('price_sar', { ascending: true })
        else if (sortBy === 'price_desc') query = query.order('price_sar', { ascending: false })
        else if (sortBy === 'name_asc') query = query.order('name', { ascending: true })
        else query = query.order('created_at', { ascending: false })

        const { data, error: err } = await query
        if (err) throw err
        if (!data || data.length === 0) {
          setIsDemo(true)
          setProducts(DEMO_PRODUCTS)
        } else {
          setIsDemo(false)
          setProducts(data as Product[])
        }
      } catch {
        setIsDemo(true)
        setProducts(DEMO_PRODUCTS)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedMaterial, sortBy])

  const allMaterials = useMemo(() => [...new Set(DEMO_PRODUCTS.map(p => p.material))], [])

  const filteredProducts = useMemo(() => {
    let list = [...products]
    if (isDemo && selectedCategory) list = list.filter(p => p.category === selectedCategory)
    if (isDemo && selectedMaterial) list = list.filter(p => p.material === selectedMaterial)
    if (isDemo) {
      if (sortBy === 'price_asc') list.sort((a, b) => a.price_sar - b.price_sar)
      else if (sortBy === 'price_desc') list.sort((a, b) => b.price_sar - a.price_sar)
      else if (sortBy === 'name_asc') list.sort((a, b) => a.name.localeCompare(b.name))
    }
    return list
  }, [products, isDemo, selectedCategory, selectedMaterial, sortBy])

  function resetFilters() {
    setSearchParams({})
  }

  return (
    <main className="min-h-screen bg-ivory pt-24 pb-16">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-sans text-stone mb-1">
            <a href="/" className="hover:text-champagne transition-colors">{t('nav.home')}</a>
            <span className="mx-2 rtl:rotate-180 inline-block">›</span>
            {t('nav.shop')}
          </p>
          <h1 className="font-serif text-4xl font-bold text-charcoal">{t('shopPage.headline')}</h1>
          <p className="font-sans text-charcoal-soft mt-2">{t('shopPage.subheadline')}</p>
        </div>

        {/* Filters */}
        <FiltersBar
          selectedCategory={selectedCategory}
          onCategoryChange={cat => setSearchParams(p => { const n = new URLSearchParams(p); cat ? n.set('category', cat) : n.delete('category'); return n })}
          selectedMaterial={selectedMaterial}
          onMaterialChange={mat => setSearchParams(p => { const n = new URLSearchParams(p); mat ? n.set('material', mat) : n.delete('material'); return n })}
          sortBy={sortBy}
          onSortChange={s => setSearchParams(p => { const n = new URLSearchParams(p); s ? n.set('sort', s) : n.delete('sort'); return n })}
          materials={allMaterials}
          resultCount={filteredProducts.length}
        />

        <div className="mt-8">
          {/* Loading state */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="h-14 w-14 text-stone mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-2">{t('common.error')}</h3>
              <p className="text-charcoal-soft font-sans mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>{t('common.tryAgain')}</Button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <PackageOpen className="h-14 w-14 text-stone mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-2">{t('shopPage.empty.title')}</h3>
              <p className="text-charcoal-soft font-sans mb-6">{t('shopPage.empty.subtitle')}</p>
              <Button onClick={resetFilters} variant="outline">{t('shopPage.empty.clearFilters')}</Button>
            </div>
          )}

          {/* Product grid */}
          {!loading && !error && filteredProducts.length > 0 && (
            <>
              {isDemo && (
                <div className="mb-6">
                  <Badge variant="stone">Demo Mode – Connect Supabase to load real products</Badge>
                </div>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </main>
  )
}
