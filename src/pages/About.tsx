import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { brand } from '@/content/siteContent'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { useTranslation } from 'react-i18next'

function PlaceholderImage({ className, gradient }: { className?: string; gradient?: string }) {
  return (
    <div className={`bg-gradient-to-br ${gradient || 'from-champagne-light to-ivory-dark'} flex items-center justify-center ${className || ''}`}>
      <span className="font-serif text-6xl text-champagne opacity-20 select-none">✦</span>
    </div>
  )
}

export default function About() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen bg-ivory pt-24 pb-16">
      {/* Hero */}
      <section className="py-20 bg-ivory">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="gold" className="mb-4">{t('nav.about')}</Badge>
            <h1 className="font-serif text-5xl font-bold text-charcoal mb-6">
              {t('aboutPage.headline').split('\n').map((l: string, i: number) => (
                <span key={i}>{l}{i === 0 && <br />}</span>
              ))}
            </h1>
            <p className="font-sans text-charcoal-soft text-lg leading-relaxed">{t('aboutPage.body.0')}</p>
          </div>
        </Container>
      </section>

      {/* Story + image */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="rounded-3xl overflow-hidden aspect-square max-w-lg">
              <PlaceholderImage className="w-full h-full" gradient="from-champagne-light to-stone-light" />
            </div>
            <div className="space-y-5">
              {(() => {
                 const bodyText = t('aboutPage.body', { returnObjects: true }) as string[]
                 return bodyText.map((para, i) => (
                  <p key={i} className="font-sans text-charcoal-soft leading-relaxed">{para}</p>
                 ))
              })()}
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 bg-ivory-dark">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="olive" className="mb-4">{t('aboutPage.values.eyebrow')}</Badge>
            <h2 className="font-serif text-4xl font-bold text-charcoal">{t('aboutPage.values.headline')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(() => {
              const values = t('aboutPage.values.items', { returnObjects: true }) as Array<{ icon?: string, title: string, description: string }>
              
              // Map icons explicitly since they aren't fully serializable in JSON if we wanted specific complex logic, but here we can just map them standardly or inject them if missing
              const icons = ['🌟', '👥', '💡', '🤝']
              
              return values.map((val, i) => (
                <div key={val.title} className="bg-white rounded-2xl p-6 shadow-soft hover-lift">
                  <div className="text-3xl mb-4">{val.icon || icons[i]}</div>
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">{val.title}</h3>
                  <p className="font-sans text-sm text-charcoal-soft leading-relaxed">{val.description}</p>
                </div>
              ))
            })()}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 bg-charcoal">
        <Container>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-5xl font-bold text-champagne mb-2">30+</p>
              <p className="font-sans text-stone-light">{t('aboutSection.stats.curated')}</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-bold text-champagne mb-2">100%</p>
              <p className="font-sans text-stone-light">{t('aboutSection.stats.materials')}</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-bold text-champagne mb-2">KSA</p>
              <p className="font-sans text-stone-light">{t('aboutSection.stats.coverage')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ivory">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-charcoal mb-2">{t('aboutPage.cta.headline')}</h2>
              <p className="font-sans text-charcoal-soft">{t('aboutPage.cta.subheadline')}</p>
            </div>
            <div className="flex gap-3 rtl:mr-6 ltr:ml-6">
              <Link to="/shop">
                <Button>{t('aboutPage.cta.primary')} <ArrowRight className="h-4 w-4 rtl:hidden" /></Button>
              </Link>
              <a href={buildWhatsAppUrl(`Hello ${brand.name}! I'd like to learn more about your story and products.`)} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">{t('aboutPage.cta.secondary')}</Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
