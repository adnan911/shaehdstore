import { useState, type ReactNode } from 'react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id))

  return (
    <div className={clsx('divide-y divide-warm-gray', className)} role="list">
      {items.map(item => {
        const isOpen = openId === item.id
        const contentId = `accordion-content-${item.id}`
        const headerId = `accordion-header-${item.id}`

        return (
          <div key={item.id} role="listitem">
            <button
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left text-charcoal font-medium hover:text-champagne-dark transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne focus-visible:rounded"
            >
              <span className="text-base font-sans font-semibold">{item.question}</span>
              <ChevronDown
                className={clsx(
                  'h-5 w-5 flex-shrink-0 text-champagne transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className={clsx(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 pb-5' : 'max-h-0'
              )}
            >
              <p className="text-charcoal-soft font-sans leading-relaxed">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Single accordion item for custom use
interface SingleAccordionProps {
  id: string
  question: ReactNode
  answer: ReactNode
  defaultOpen?: boolean
}

export function SingleAccordion({ id, question, answer, defaultOpen = false }: SingleAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = `sa-content-${id}`
  const headerId = `sa-header-${id}`

  return (
    <div className="border-b border-warm-gray last:border-0">
      <button
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen(p => !p)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left font-sans font-semibold text-charcoal hover:text-champagne-dark transition-colors"
      >
        {question}
        <ChevronDown
          className={clsx('h-5 w-5 flex-shrink-0 text-champagne transition-transform duration-300', isOpen && 'rotate-180')}
        />
      </button>
      <div
        id={contentId}
        aria-labelledby={headerId}
        className={clsx('overflow-hidden transition-all duration-300', isOpen ? 'max-h-96 pb-5' : 'max-h-0')}
      >
        {answer}
      </div>
    </div>
  )
}
