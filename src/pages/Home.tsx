import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import { Tabs } from '@/components/ui/Tabs'
import { ProductCard } from '@/components/shop/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { supabase } from '@/lib/supabase'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { brand } from '@/content/siteContent'
import { useReducedMotion } from '@/hooks/useReducedMotion'
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



export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [collectionProducts, setCollectionProducts] = useState<Product[]>([])
  const [activeTab, setActiveTab] = useState<'sofa' | 'bed' | 'dining'>('sofa')
  const [loadingFeatured, setLoadingFeatured] = useState(true)
  const [loadingCollection, setLoadingCollection] = useState(false)
  const reducedMotion = useReducedMotion()
  const { t } = useTranslation()

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(6)
      setFeaturedProducts((data as Product[]) || [])
      setLoadingFeatured(false)
    }
    fetchFeatured()
  }, [])

  useEffect(() => {
    async function fetchCategory() {
      setLoadingCollection(true)
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('category', activeTab)
        .limit(4)
      setCollectionProducts((data as Product[]) || [])
      setLoadingCollection(false)
    }
    fetchCategory()
  }, [activeTab])

  // Map FAQs manually here since we removed the static preview import to stay dynamic
  const faqList = t('faqs', { returnObjects: true }) as Array<{ q: string, a: string }>
  const faqItems = (faqList || []).slice(0, 4).map((f, i) => ({ id: String(i), question: f.q, answer: f.a }))

  return (
    <main>
      {/* ─── HERO ─────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-ivory">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-champagne/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-olive/5 rounded-full blur-2xl" />
        </div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="animate-fade-in">
              <Badge variant="gold" className="mb-6 border border-champagne/30">
                ✦ {t('hero.badges.curated')}
              </Badge>
              <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-charcoal leading-tight mb-6">
                {t('hero.headline').split('\n').map((line: string, i: number) => (
                  <span key={i}>
                    {i === 1 ? <span className="text-gold-gradient">{line}</span> : line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </h1>
              <p className="font-sans text-lg text-charcoal-soft leading-relaxed mb-8 max-w-lg">
                {t('hero.subheadline')}
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Button size="lg" onClick={() => window.location.href = '/shop'}>
                  {t('hero.ctaPrimary')}
                  <ArrowRight className="h-5 w-5 rtl:hidden" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/contact'}>
                  {t('hero.ctaSecondary')}
                </Button>
              </div>

              {/* Info badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white border border-warm-gray rounded-full px-4 py-2 shadow-soft">
                  <span className="text-champagne">✦</span>
                  <span className="text-sm font-sans font-medium text-charcoal">{t('hero.badges.curated')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-warm-gray rounded-full px-4 py-2 shadow-soft">
                  <span className="text-champagne">🚚</span>
                  <span className="text-sm font-sans font-medium text-charcoal">{t('hero.badges.delivery')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-warm-gray rounded-full px-4 py-2 shadow-soft">
                  <span className="text-champagne">⬡</span>
                  <span className="text-sm font-sans font-medium text-charcoal">{t('hero.badges.materials')}</span>
                </div>
              </div>
            </div>

            {/* Right – Hero image */}
            <div className="relative animate-slide-up">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-h-[600px]">
                <img
                  src="/images/sections/hero-living-room.png"
                  alt="Premium modern living room with luxury furniture"
                  className="w-full h-full object-cover"
                />
                {/* Floating stat card */}
                <div className="absolute bottom-6 rtl:right-6 bg-white/90 rtl:left-auto left-6 backdrop-blur-sm rounded-2xl p-4 shadow-hover">
                  <p className="text-2xl font-serif font-bold text-charcoal">30+</p>
                  <p className="text-xs font-sans text-stone">{t('hero.stats.premiumPieces')}</p>
                </div>
                <div className="absolute top-6 right-6 rtl:left-6 rtl:right-auto bg-charcoal/90 backdrop-blur-sm rounded-2xl p-4 shadow-hover">
                  <div className="flex gap-0.5 mb-1">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-champagne text-champagne" />)}
                  </div>
                  <p className="text-xs font-sans text-ivory">{t('hero.stats.trusted')}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── FEATURED COLLECTION ────────── */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <Badge variant="gold" className="mb-4">{t('featured.eyebrow')}</Badge>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-4">
                {t('featured.headline').split('\n').map((l: string, i: number) => <span key={i}>{l}{i === 0 && <br />}</span>)}
              </h2>
              <p className="font-sans text-charcoal-soft leading-relaxed mb-6">{t('featured.description')}</p>
              <Link to="/shop">
                <Button variant="outline">
                  {t('featured.cta')}
                  <ArrowRight className="h-4 w-4 rtl:hidden" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img src="/images/sections/featured-collection-1.png" alt="Premium furniture collection" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square mt-8">
                <img src="/images/products/oasis-velvet-sofa.png" alt="Luxury velvet sofa" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Featured products grid */}
          {loadingFeatured ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {featuredProducts.map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            // Demo fallback cards when no Supabase data
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {DEMO_PRODUCTS.slice(0, 6).map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ─── COLLECTIONS TABS ───────────── */}
      <section className="py-20 bg-ivory-dark">
        <Container>
          <div className="text-center mb-10">
            <Badge variant="olive" className="mb-4">{t('collections.eyebrow')}</Badge>
            <h2 className="font-serif text-4xl font-bold text-charcoal">{t('collections.headline')}</h2>
          </div>
          <div className="flex justify-center mb-10">
            <Tabs
              items={[
                { key: 'sofa', label: t('collections.tabs.sofa') },
                { key: 'bed', label: t('collections.tabs.bed') },
                { key: 'dining', label: t('collections.tabs.dining') }
              ]}
              active={activeTab}
              onChange={setActiveTab}
            />
          </div>
          <div
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-label={t(`collections.tabs.${activeTab}`)}
          >
            {loadingCollection ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : collectionProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {collectionProducts.map(p => <ProductCard key={p.id} {...p} />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {DEMO_PRODUCTS.filter(p => p.category === activeTab).slice(0, 4).map(p => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            )}
          </div>
          <div className="text-center mt-10">
            <Link to={`/shop?category=${activeTab}`}>
              <Button variant="secondary">
                {t('collections.viewAll', { category: t(`collections.tabs.${activeTab}`) })}
                <ArrowRight className="h-4 w-4 rtl:hidden" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ─── MARQUEE STRIP ──────────────── */}
      <section className="py-4 bg-charcoal overflow-hidden" aria-hidden="true">
        <div className={`flex ${reducedMotion ? '' : 'marquee-track'} gap-12 py-4`}>
          {(() => {
             const items = t('marquee', { returnObjects: true }) as string[]
             return [...items, ...items].map((item, i) => (
              <span key={i} className="font-serif text-3xl font-bold text-champagne/40 whitespace-nowrap select-none">
                {item} <span className="text-champagne/20">✦</span>
              </span>
             ))
          })()}
        </div>
      </section>

      {/* ─── ABOUT + STATS ──────────────── */}
      <section className="py-20 bg-ivory">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-square max-w-md">
                <img src="/images/sections/hero-living-room.png" alt="Shahed Storee showroom" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-champagne text-charcoal rounded-2xl p-5 shadow-hover">
                <p className="font-serif text-3xl font-bold">7+</p>
                <p className="text-xs font-sans font-medium">Years of Excellence</p>
              </div>
            </div>
            <div>
              <Badge variant="gold" className="mb-4">{t('aboutSection.eyebrow')}</Badge>
              <h2 className="font-serif text-4xl font-bold text-charcoal mb-5">{t('aboutSection.headline')}</h2>
              <p className="font-sans text-charcoal-soft leading-relaxed mb-8">{t('aboutSection.body')}</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center bg-white rounded-2xl p-4 shadow-soft border border-warm-gray">
                  <p className="font-serif text-2xl font-bold text-champagne-dark">30+</p>
                  <p className="text-xs font-sans text-stone mt-1">{t('aboutSection.stats.curated')}</p>
                </div>
                <div className="text-center bg-white rounded-2xl p-4 shadow-soft border border-warm-gray">
                  <p className="font-serif text-2xl font-bold text-champagne-dark">100%</p>
                  <p className="text-xs font-sans text-stone mt-1">{t('aboutSection.stats.materials')}</p>
                </div>
                <div className="text-center bg-white rounded-2xl p-4 shadow-soft border border-warm-gray">
                  <p className="font-serif text-2xl font-bold text-champagne-dark">KSA</p>
                  <p className="text-xs font-sans text-stone mt-1">{t('aboutSection.stats.coverage')}</p>
                </div>
              </div>
              <Link to="/about">
                <Button variant="outline">{t('aboutSection.cta')} <ArrowRight className="h-4 w-4 rtl:hidden" /></Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── ECO / QUALITY SECTION ──────── */}
      <section className="py-20 bg-olive-light">
        <Container>
          <div className="text-center mb-14">
            <Badge variant="olive" className="mb-4">{t('quality.eyebrow')}</Badge>
            <h2 className="font-serif text-4xl font-bold text-charcoal max-w-xl mx-auto">
              {t('quality.headline').split('\n').map((l: string, i: number) => <span key={i}>{l}{i === 0 && <br />}</span>)}
            </h2>
            <p className="font-sans text-charcoal-soft mt-4 max-w-lg mx-auto">{t('quality.description')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft hover-lift">
              <div className="w-12 h-12 rounded-xl bg-olive-light flex items-center justify-center mb-4 text-2xl">🌿</div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">{t('quality.pillars.sustainable.title')}</h3>
              <p className="font-sans text-sm text-charcoal-soft leading-relaxed">{t('quality.pillars.sustainable.desc')}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft hover-lift">
              <div className="w-12 h-12 rounded-xl bg-olive-light flex items-center justify-center mb-4 text-2xl">🏆</div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">{t('quality.pillars.craftsmanship.title')}</h3>
              <p className="font-sans text-sm text-charcoal-soft leading-relaxed">{t('quality.pillars.craftsmanship.desc')}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft hover-lift">
              <div className="w-12 h-12 rounded-xl bg-olive-light flex items-center justify-center mb-4 text-2xl">🚛</div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">{t('quality.pillars.delivery.title')}</h3>
              <p className="font-sans text-sm text-charcoal-soft leading-relaxed">{t('quality.pillars.delivery.desc')}</p>
            </div>
          </div>
          {/* Image grid */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { src: '/images/products/sahara-modular-sofa.png', alt: 'Sustainable sofa craftsmanship' },
              { src: '/images/products/madina-dining-table.png', alt: 'Premium dining table' },
              { src: '/images/products/al-madinah-king-bed.png', alt: 'Quality bed craftsmanship' },
            ].map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-video">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── FAQ PREVIEW ────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <Badge variant="stone" className="mb-4">{t('faqPreview.eyebrow')}</Badge>
              <h2 className="font-serif text-4xl font-bold text-charcoal">{t('faqPreview.headline')}</h2>
            </div>
            <Accordion items={faqItems} />
            <div className="text-center mt-8">
              <Link to="/faq">
                <Button variant="ghost">
                  {t('faqPreview.cta')} <ArrowRight className="h-4 w-4 rtl:hidden" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── CTA BANNER ─────────────────── */}
      <section className="py-16 bg-ivory-dark">
        <Container>
          <div className="bg-charcoal rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-champagne/10 rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-champagne/5 rounded-full pointer-events-none" />
            <div className="relative z-10">
              <Badge variant="gold" className="mb-6">{t('ctaBanner.badge')}</Badge>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-ivory mb-4">
                {t('ctaBanner.headline').split('\n').map((l: string, i: number) => <span key={i}>{l}{i === 0 && <br />}</span>)}
              </h2>
              <p className="font-sans text-stone-light max-w-lg mx-auto mb-8">{t('ctaBanner.subheadline')}</p>
              <a
                href={buildWhatsAppUrl(`Hello ${brand.name}! I'd like to explore your furniture collection.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-champagne text-charcoal hover:bg-champagne-dark">
                  {t('ctaBanner.cta')}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

// Demo product data for when Supabase is not configured
const DEMO_PRODUCTS: (Product & { imageUrl?: string })[] = [
  { id: 'a1', name: 'Sahara Modular Sofa', slug: 'sahara-modular-sofa', category: 'sofa', material: 'Italian Leather', price_sar: 8500, is_featured: true, imageUrl: '/images/products/sahara-modular-sofa.png' },
  { id: 'a2', name: 'Al Madinah King Bed', slug: 'al-madinah-king-bed', category: 'bed', material: 'Solid Walnut', price_sar: 6200, is_featured: true, imageUrl: '/images/products/al-madinah-king-bed.png' },
  { id: 'a3', name: 'Madina Dining Table', slug: 'madina-dining-table', category: 'dining', material: 'Sintered Stone', price_sar: 12000, is_featured: true, imageUrl: '/images/products/madina-dining-table.png' },
  { id: 'a4', name: 'Oasis Velvet Sofa', slug: 'oasis-velvet-sofa', category: 'sofa', material: 'Premium Velvet', price_sar: 7300, is_featured: true, imageUrl: '/images/products/oasis-velvet-sofa.png' },
  { id: 'a5', name: 'Dune Platform Bed', slug: 'dune-platform-bed', category: 'bed', material: 'Oak Wood', price_sar: 5400, is_featured: false, imageUrl: '/images/products/dune-platform-bed.png' },
  { id: 'a6', name: 'Sultana Dining Set', slug: 'sultana-dining-set', category: 'dining', material: 'Teak + Travertine', price_sar: 9800, is_featured: false, imageUrl: '/images/products/sultana-dining-set.png' },
]
