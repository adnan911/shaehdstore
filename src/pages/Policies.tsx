import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { useTranslation } from 'react-i18next'

const SECTION_KEYS = ['shipping', 'returns', 'privacy', 'terms'] as const
type SectionKey = typeof SECTION_KEYS[number]



function renderMarkdown(text: string) {
  // Basic markdown-like rendering
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      const content = line.slice(2, -2)
      return <h3 key={i} className="font-sans font-bold text-charcoal mt-5 mb-2">{content}</h3>
    }
    if (line.startsWith('- ')) {
      return <li key={i} className="font-sans text-charcoal-soft text-sm ml-4 list-disc">{line.slice(2)}</li>
    }
    if (line === '') return <br key={i} />
    // Inline bold
    const parts = line.split(/\*\*(.*?)\*\*/g)
    return (
      <p key={i} className="font-sans text-charcoal-soft text-sm leading-relaxed">
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-semibold text-charcoal">{part}</strong> : part
        )}
      </p>
    )
  })
}

export default function Policies() {
  const { t } = useTranslation()
  const [active, setActive] = useState<SectionKey>('shipping')

  const title = t(`policiesPage.${active}.title`)
  const contentBody = t(`policiesPage.${active}.content`)

  return (
    <main className="min-h-screen bg-ivory pt-24 pb-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <Badge variant="stone" className="mb-4">{t('footer.policies')}</Badge>
            <h1 className="font-serif text-4xl font-bold text-charcoal">{t('policiesPage.headline')}</h1>
          </div>

          <div className="grid md:grid-cols-[220px_1fr] gap-8">
            {/* Sidebar nav */}
            <nav aria-label="Policy sections">
              <ul className="space-y-1" role="list">
                {SECTION_KEYS.map(key => (
                  <li key={key}>
                    <a
                      href={`#${key}`}
                      id={key}
                      onClick={e => { e.preventDefault(); setActive(key) }}
                      className={`block px-4 py-3 rounded-xl font-sans font-medium text-sm transition-all duration-200 ${
                        active === key
                          ? 'bg-champagne-light text-champagne-dark'
                          : 'text-charcoal-soft hover:bg-warm-gray hover:text-charcoal'
                      }`}
                    >
                      {t(`policiesPage.sections.${key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Content */}
            <article className="bg-white rounded-3xl p-8 shadow-card border border-warm-gray">
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-6 pb-4 border-b border-warm-gray">
                {title}
              </h2>
              <div className="prose-sm space-y-1">
                {renderMarkdown(contentBody)}
              </div>
            </article>
          </div>
        </div>
      </Container>
    </main>
  )
}
