import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

interface GalleryProps {
  images: { url: string; alt?: string }[]
  productName: string
}

const GRADIENT_COLORS = [
  'from-champagne-light to-ivory-dark',
  'from-olive-light to-warm-gray',
  'from-stone-light to-champagne-light',
]

export function Gallery({ images, productName }: GalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  // Use placeholders if no real images
  const slides =
    images.length > 0
      ? images
      : GRADIENT_COLORS.map((_, i) => ({ url: '', alt: `${productName} view ${i + 1}` }))

  const prev = () => setActiveIdx(i => (i === 0 ? slides.length - 1 : i - 1))
  const next = () => setActiveIdx(i => (i === slides.length - 1 ? 0 : i + 1))

  const current = slides[activeIdx]

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-ivory-dark">
        {current.url ? (
          <img
            src={current.url}
            alt={current.alt || productName}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className={clsx('w-full h-full bg-gradient-to-br flex items-center justify-center', GRADIENT_COLORS[activeIdx % GRADIENT_COLORS.length])}>
            <span className="font-serif text-8xl text-champagne opacity-20 select-none">
              {productName.charAt(0)}
            </span>
          </div>
        )}

        {/* Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-card hover:bg-white transition-all"
            >
              <ChevronLeft className="h-5 w-5 text-charcoal" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-card hover:bg-white transition-all"
            >
              <ChevronRight className="h-5 w-5 text-charcoal" />
            </button>
          </>
        )}

        {/* Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Go to image ${i + 1}`}
                className={clsx(
                  'w-2 h-2 rounded-full transition-all duration-200',
                  i === activeIdx ? 'bg-champagne w-4' : 'bg-white/60 hover:bg-white'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {slides.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`View image ${i + 1}`}
              className={clsx(
                'flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200',
                i === activeIdx ? 'border-champagne' : 'border-transparent hover:border-champagne-light'
              )}
            >
              {slide.url ? (
                <img src={slide.url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className={clsx('w-full h-full bg-gradient-to-br', GRADIENT_COLORS[i % GRADIENT_COLORS.length])} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
