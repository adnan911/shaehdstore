import { Link } from 'react-router-dom'
import { MessageCircle, Instagram, MapPin, Phone, Mail } from 'lucide-react'
import { Container } from './Container'
import { brand } from '@/content/siteContent'
import { WHATSAPP_URL } from '@/lib/whatsapp'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-charcoal text-ivory">
      <Container>
        <div className="pt-16 pb-8">
          {/* Top grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="font-serif text-2xl font-bold text-ivory hover:text-champagne-light transition-colors">
                {t('brand.name')}
              </Link>
              <p className="mt-3 text-stone-light text-sm leading-relaxed">
                {t('footer.description')}
              </p>
              {/* Social */}
              <div className="mt-5 flex gap-3">
                {[
                  { label: 'Instagram', href: 'https://instagram.com/' },
                  { label: 'TikTok', href: 'https://tiktok.com/' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-charcoal-soft hover:bg-champagne hover:text-charcoal text-stone-light transition-all duration-200"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link sections */}
            <div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-champagne mb-4">
                {t('footer.links')}
              </h3>
              <ul className="space-y-2">
                <li><Link to="/shop" className="text-stone-light text-sm hover:text-champagne-light transition-colors">{t('nav.shop')}</Link></li>
                <li><Link to="/about" className="text-stone-light text-sm hover:text-champagne-light transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="/contact" className="text-stone-light text-sm hover:text-champagne-light transition-colors">{t('nav.contact')}</Link></li>
                <li><Link to="/faq" className="text-stone-light text-sm hover:text-champagne-light transition-colors">{t('nav.faq')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-champagne mb-4">
                {t('footer.policies')}
              </h3>
              <ul className="space-y-2">
                <li><Link to="/policies#shipping" className="text-stone-light text-sm hover:text-champagne-light transition-colors">Shipping Policy</Link></li>
                <li><Link to="/policies#returns" className="text-stone-light text-sm hover:text-champagne-light transition-colors">Return Policy</Link></li>
                <li><Link to="/policies#privacy" className="text-stone-light text-sm hover:text-champagne-light transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-champagne mb-4">
                {t('nav.contact')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-stone-light text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-champagne" />
                  {t('brand.address')}
                </li>
                <li>
                  <a href={`tel:${brand.phone}`} className="flex items-center gap-2 text-stone-light text-sm hover:text-champagne-light transition-colors">
                    <Phone className="h-4 w-4 text-champagne" />
                    {brand.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${brand.email}`} className="flex items-center gap-2 text-stone-light text-sm hover:text-champagne-light transition-colors">
                    <Mail className="h-4 w-4 text-champagne" />
                    {brand.email}
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-stone-light text-sm hover:text-champagne-light transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-champagne" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider + Copyright */}
          <div className="border-t border-charcoal-soft pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-stone text-xs">© {new Date().getFullYear()} {t('footer.rights')}</p>
            <p className="text-stone text-xs">Built with ❤️</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
