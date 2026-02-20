import { useState } from 'react'
import { MessageCircle, MapPin, Clock, Phone } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'

import { brand } from '@/content/siteContent'
import { buildContactMessage, buildWhatsAppUrl, WHATSAPP_URL } from '@/lib/whatsapp'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const { t } = useTranslation()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const msg = buildContactMessage(form)
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="min-h-screen bg-ivory pt-24 pb-16">
      <Container>
        <div className="max-w-lg mx-auto text-center mb-12">
          <Badge variant="gold" className="mb-4">{t('nav.contact')}</Badge>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-charcoal mb-4">{t('contactPage.headline')}</h1>
          <p className="font-sans text-charcoal-soft leading-relaxed">{t('contactPage.subheadline')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Form */}
          <div className="bg-white rounded-3xl p-8 shadow-card border border-warm-gray">
            <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">{t('contactPage.form.title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold font-sans text-charcoal mb-1.5">{t('contactPage.form.nameLabel')}</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder={t('contactPage.form.namePlaceholder')}
                  className="w-full bg-ivory-dark border border-warm-gray rounded-xl px-4 py-3 font-sans text-sm text-charcoal placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-champagne transition-all"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-semibold font-sans text-charcoal mb-1.5">{t('contactPage.form.phoneLabel')}</label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder={t('contactPage.form.phonePlaceholder')}
                  className="w-full bg-ivory-dark border border-warm-gray rounded-xl px-4 py-3 font-sans text-sm text-charcoal placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-champagne transition-all"
                />
              </div>
              <div>
                <label htmlFor="contact-msg" className="block text-sm font-semibold font-sans text-charcoal mb-1.5">{t('contactPage.form.messageLabel')}</label>
                <textarea
                  id="contact-msg"
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder={t('contactPage.form.messagePlaceholder')}
                  className="w-full bg-ivory-dark border border-warm-gray rounded-xl px-4 py-3 font-sans text-sm text-charcoal placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-champagne transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold font-sans py-3.5 rounded-full hover:bg-[#1ebe59] transition-all duration-200 hover:-translate-y-0.5 shadow-card hover:shadow-hover"
              >
                <MessageCircle className="h-5 w-5" />
                {t('contactPage.form.submit')}
              </button>
              <p className="text-xs text-center text-stone font-sans">
                {t('contactPage.form.disclaimer')}
              </p>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-champagne-light rounded-3xl p-8">
              <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">{t('contactPage.info.title')}</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-champagne flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-charcoal" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-charcoal text-sm">{t('contactPage.info.address')}</p>
                    <p className="font-sans text-charcoal-soft text-sm">{brand.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-champagne flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-charcoal" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-charcoal text-sm">{t('contactPage.info.phone')}</p>
                    <a href={`tel:${brand.phone}`} className="font-sans text-charcoal-soft text-sm hover:text-champagne-dark transition-colors">{brand.phone}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-champagne flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-charcoal" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-charcoal text-sm">{t('contactPage.info.hoursLabel')}</p>
                    <p className="font-sans text-charcoal-soft text-sm">{t('contactPage.info.hours')}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* WhatsApp direct */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-charcoal text-ivory rounded-3xl p-6 hover:bg-charcoal-soft transition-colors duration-200 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-sans font-semibold text-ivory">{t('contactPage.whatsapp.title')}</p>
                <p className="text-sm text-stone-light">{t('contactPage.whatsapp.subtitle')}</p>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </main>
  )
}
