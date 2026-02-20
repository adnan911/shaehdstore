import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import clsx from 'clsx'
import { formatSARSimple } from '@/lib/format'
import { Badge } from '../ui/Badge'
import { useTranslation } from 'react-i18next'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  category: string
  material: string
  price_sar: number
  is_featured?: boolean
  imageUrl?: string
  className?: string
}

// Deterministic gradient placeholder based on product id
function getPlaceholderGradient(id: string): string {
  const gradients = [
    'from-champagne-light to-ivory-dark',
    'from-olive-light to-warm-gray',
    'from-stone-light to-ivory-dark',
    'from-warm-gray to-champagne-light',
    'from-ivory-dark to-olive-light',
  ]
  const index = id.charCodeAt(0) % gradients.length
  return gradients[index]
}

export function ProductCard({ id, name, slug, category, material, price_sar, is_featured, imageUrl, className }: ProductCardProps) {
  const gradient = getPlaceholderGradient(id)
  const { t } = useTranslation()

  return (
    <Link
      to={`/product/${slug}`}
      className={clsx(
        'group block rounded-2xl overflow-hidden bg-white border border-warm-gray shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
        className
      )}
      aria-label={`View ${name} – ${formatSARSimple(price_sar)}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={clsx('w-full h-64 bg-gradient-to-br flex items-center justify-center', gradient)}>
            <span className="font-serif text-5xl text-champagne opacity-30 select-none">
              {name.charAt(0)}
            </span>
          </div>
        )}
        {is_featured && (
          <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto">
            <Badge variant="gold">{t('common.featured')}</Badge>
          </div>
        )}
        {/* Quick WhatsApp hover overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-all duration-300 flex items-end justify-end p-3 opacity-0 group-hover:opacity-100">
          <div className="bg-[#25D366] text-white rounded-full p-2 shadow-card">
            <MessageCircle className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-sans font-semibold uppercase tracking-widest text-stone mb-1">
          {t(`collections.tabs.${category}`)}
        </p>
        <h3 className="font-serif text-lg font-semibold text-charcoal mb-1 group-hover:text-champagne-dark transition-colors duration-200 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-stone font-sans mb-3">{material}</p>
        <p className="font-sans font-bold text-champagne-dark text-base">
          {formatSARSimple(price_sar)}
        </p>
      </div>
    </Link>
  )
}
