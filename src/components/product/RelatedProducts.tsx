import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { formatSARSimple } from '@/lib/format'
import { ProductCardSkeleton } from '../ui/Skeleton'

interface Product {
  id: string
  name: string
  slug: string
  category: string
  material: string
  price_sar: number
  is_featured: boolean
}

interface RelatedProductsProps {
  currentSlug: string
  category: string
}

export function RelatedProducts({ currentSlug, category }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data } = await supabase
        .from('products')
        .select('id,name,slug,category,material,price_sar,is_featured')
        .eq('category', category)
        .neq('slug', currentSlug)
        .limit(4)
      setProducts((data as Product[]) || [])
      setLoading(false)
    }
    load()
  }, [currentSlug, category])

  if (!loading && products.length === 0) return null

  return (
    <section aria-label="Related products">
      <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">You May Also Like</h2>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(p => (
            <Link
              key={p.id}
              to={`/product/${p.slug}`}
              className="group block rounded-xl overflow-hidden border border-warm-gray hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              aria-label={p.name}
            >
              <div className="h-44 bg-gradient-to-br from-champagne-light to-ivory-dark flex items-center justify-center">
                <span className="font-serif text-4xl text-champagne opacity-30">{p.name.charAt(0)}</span>
              </div>
              <div className="p-3 bg-white">
                <p className="font-serif text-sm font-semibold text-charcoal group-hover:text-champagne-dark transition-colors line-clamp-1">{p.name}</p>
                <p className="text-xs text-stone font-sans">{formatSARSimple(p.price_sar)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
