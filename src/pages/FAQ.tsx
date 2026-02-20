import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Accordion'
import { brand } from '@/content/siteContent'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function FAQ() {
  const { t } = useTranslation()
  const faqs = t('faqs', { returnObjects: true }) as Array<{ q: string, a: string }>
  const faqItems = (faqs || []).map((f, i) => ({ id: String(i), question: f.q, answer: f.a }))

  return (
    <main className="min-h-screen bg-ivory pt-24 pb-16">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="gold" className="mb-4">{t('nav.faq')}</Badge>
            <h1 className="font-serif text-5xl font-bold text-charcoal mb-4">{t('faqPage.headline')}</h1>
            <p className="font-sans text-charcoal-soft leading-relaxed">
              {t('faqPage.subheadline')}
            </p>
          </div>

          {/* Accordion */}
          <div className="bg-white rounded-3xl p-6 shadow-card border border-warm-gray mb-10">
            <Accordion items={faqItems} />
          </div>

          {/* CTA */}
          <div className="bg-champagne-light rounded-2xl p-8 text-center">
            <p className="font-serif text-2xl font-semibold text-charcoal mb-2">{t('faqPage.cta.headline')}</p>
            <p className="font-sans text-charcoal-soft mb-5">{t('faqPage.cta.subheadline')}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={buildWhatsAppUrl(`Hello ${brand.name}! I have a question.`)} target="_blank" rel="noopener noreferrer">
                <Button>{t('faqPage.cta.primary')}</Button>
              </a>
              <Link to="/contact">
                <Button variant="outline">{t('faqPage.cta.secondary')} <ArrowRight className="h-4 w-4 rtl:hidden" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
