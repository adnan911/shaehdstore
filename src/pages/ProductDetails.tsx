import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AlertCircle, ChevronRight, MapPin, Truck, MessageCircle } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Gallery } from '@/components/product/Gallery'
import { VariantSelector } from '@/components/product/VariantSelector'
import { RelatedProducts } from '@/components/product/RelatedProducts'
import { ProductDetailSkeleton } from '@/components/ui/Skeleton'
import { supabase } from '@/lib/supabase'
import { formatSARSimple } from '@/lib/format'
import { buildWhatsAppUrl, buildProductOrderMessage } from '@/lib/whatsapp'
import { useTranslation } from 'react-i18next'

interface Product {
  id: string
  name: string
  slug: string
  category: 'sofa' | 'bed' | 'dining'
  material: string
  description: string | null
  price_sar: number
  is_featured: boolean
}

interface Variant {
  id: string
  variant_name: string
  variant_value: string
  price_delta: number
}

interface ProductImage {
  id: string
  url: string
  alt: string | null
}

const SAUDI_AREAS = [
  'Madina', 'Jeddah', 'Dammam', 'Makkah', 'Madinah', 'Khobar',
  'Taif', 'Abha', 'Tabuk', 'Qassim', 'Other area',
]

const DEMO_PRODUCT: Product = {
  id: 'demo',
  name: 'Sahara Modular Sofa',
  slug: 'sahara-modular-sofa',
  category: 'sofa',
  material: 'Italian Leather',
  description: 'The Sahara Modular Sofa brings together the finest Italian leather with precision engineering. Its modular design allows you to configure it to perfectly suit your space. The low-profile silhouette and deep cushions provide unmatched comfort, while the clean lines make it a timeless statement piece.',
  price_sar: 8500,
  is_featured: true,
}

const DEMO_VARIANTS: Variant[] = [
  { id: 'v1', variant_name: 'Size', variant_value: '2-Seater', price_delta: 0 },
  { id: 'v2', variant_name: 'Size', variant_value: '3-Seater', price_delta: 1200 },
  { id: 'v3', variant_name: 'Size', variant_value: 'L-Shape', price_delta: 2500 },
  { id: 'v4', variant_name: 'Color', variant_value: 'Ivory White', price_delta: 0 },
  { id: 'v5', variant_name: 'Color', variant_value: 'Cognac Brown', price_delta: 0 },
  { id: 'v6', variant_name: 'Color', variant_value: 'Charcoal Grey', price_delta: 0 },
]

export default function ProductDetails() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [variants, setVariants] = useState<Variant[]>([])
  const [images, setImages] = useState<ProductImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [selectedArea, setSelectedArea] = useState('')

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return
      setLoading(true)
      setError(null)
      try {
        const { data: prod, error: err } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single()
        if (err || !prod) {
          // Use demo product
          setProduct(DEMO_PRODUCT)
          setVariants(DEMO_VARIANTS)
          setImages([])
          return
        }
        setProduct(prod as Product)

        const [{ data: vars }, { data: imgs }] = await Promise.all([
          supabase.from('product_variants').select('*').eq('product_id', prod.id),
          supabase.from('product_images').select('*').eq('product_id', prod.id),
        ])
        setVariants((vars as Variant[]) || [])
        setImages((imgs as ProductImage[]) || [])
      } catch {
        setProduct(DEMO_PRODUCT)
        setVariants(DEMO_VARIANTS)
        setImages([])
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [slug])

  function handleVariantChange(name: string, value: string) {
    setSelectedVariants(prev => ({ ...prev, [name]: value }))
  }

  function buildOrderUrl() {
    if (!product) return '#'
    const variantStr = Object.entries(selectedVariants)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ') || 'Default'
    const msg = buildProductOrderMessage({
      productName: product.name,
      material: product.material,
      variants: variantStr,
      area: selectedArea || 'Not specified',
    })
    return buildWhatsAppUrl(msg)
  }

  const totalPrice = product
    ? product.price_sar + variants
        .filter(v => selectedVariants[v.variant_name] === v.variant_value)
        .reduce((sum, v) => sum + v.price_delta, 0)
    : 0

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-24 pb-16">
        <Container><ProductDetailSkeleton /></Container>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-ivory pt-24 pb-16">
        <Container>
          <div className="flex flex-col items-center py-20 text-center">
            <AlertCircle className="h-14 w-14 text-stone mb-4" />
            <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">{t('common.error')}</h2>
            <p className="text-charcoal-soft mb-6">{error}</p>
            <Link to="/shop"><Button>{t('shopPage.empty.clearFilters')}</Button></Link>
          </div>
        </Container>
      </main>
    )
  }

  if (!product) return null

  return (
    <main className="min-h-screen bg-ivory pt-24 pb-16">
      <Container>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm font-sans text-stone mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-champagne transition-colors">{t('nav.home')}</Link>
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          <Link to="/shop" className="hover:text-champagne transition-colors">{t('nav.shop')}</Link>
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          <span className="text-charcoal-soft capitalize">{t(`collections.tabs.${product.category}`)}</span>
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          <span className="text-charcoal line-clamp-1">{product.name}</span>
        </nav>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <Gallery
            images={images.map(img => ({ url: img.url, alt: img.alt || product.name }))}
            productName={product.name}
          />

          {/* Product info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="stone" className="capitalize">{t(`collections.tabs.${product.category}`)}</Badge>
              {product.is_featured && <Badge variant="gold">{t('common.featured')}</Badge>}
            </div>

            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal mb-2">{product.name}</h1>
            <p className="font-sans text-charcoal-soft mb-4">{product.material}</p>

            <p className="font-serif text-3xl font-bold text-champagne-dark mb-6">
              {formatSARSimple(totalPrice)}
            </p>

            {product.description && (
              <p className="font-sans text-charcoal-soft leading-relaxed mb-8 border-b border-warm-gray pb-8">
                {product.description}
              </p>
            )}

            {/* Variants */}
            {variants.length > 0 && (
              <div className="mb-8">
                <VariantSelector
                  variants={variants}
                  selected={selectedVariants}
                  onChange={handleVariantChange}
                />
              </div>
            )}

            {/* Area selector */}
            <div className="mb-8">
              <label className="block font-sans text-sm font-semibold text-charcoal mb-2" htmlFor="area-selector">
                {t('checkout.form.city')}
              </label>
              <div className="flex items-center gap-2 bg-warm-gray rounded-xl p-1 border border-transparent focus-within:border-champagne-light transition-colors">
                <MapPin className="h-4 w-4 text-champagne rtl:mr-2 ltr:ml-2 flex-shrink-0" />
                <select
                  id="area-selector"
                  value={selectedArea}
                  onChange={e => setSelectedArea(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-sans text-charcoal py-2 rtl:pl-2 ltr:pr-2 focus:outline-none"
                >
                  <option value="">{t('checkout.form.cityPlaceholder')}</option>
                  {SAUDI_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <p className="text-xs text-stone mt-1.5 flex items-center gap-1.5">
                <Truck className="h-3 w-3" />
                {t('policiesPage.shipping.subtitle')}
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={buildOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-[#25D366] text-white font-semibold font-sans rounded-full hover:bg-[#1ebe59] hover:-translate-y-0.5 transition-all duration-200 shadow-card hover:shadow-hover mb-4"
              aria-label={`Order ${product.name} on WhatsApp`}
            >
              <MessageCircle className="h-5 w-5" />
              {t('checkout.summary.submit')}
            </a>
            <p className="text-xs text-center text-stone font-sans">
              {t('contactPage.form.disclaimer')}
            </p>
          </div>
        </div>

        {/* Related products */}
        <RelatedProducts currentSlug={slug || ''} category={product.category} />
      </Container>
    </main>
  )
}
