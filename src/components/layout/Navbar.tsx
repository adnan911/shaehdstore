import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, MessageCircle } from 'lucide-react'
import clsx from 'clsx'
import { Container } from './Container'
import { Button } from '../ui/Button'
import { MobileDrawer } from './MobileDrawer'
import { brand } from '@/content/siteContent'
import { WHATSAPP_URL } from '@/lib/whatsapp'
import { useTranslation } from 'react-i18next'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer on navigation
  useEffect(() => setDrawerOpen(false), [location.pathname])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md border-b border-warm-gray shadow-soft py-3'
            : 'bg-transparent py-5'
        )}
      >
        <Container>
          <nav className="flex items-center justify-between" aria-label="Main navigation">
            {/* Logo */}
            <Link
              to="/"
              className="font-serif text-2xl font-bold text-charcoal hover:text-champagne transition-colors duration-200"
              aria-label={brand.name + ' – Home'}
            >
              {brand.name}
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              <li>
                <Link to="/" className={clsx('font-sans text-sm font-medium transition-colors duration-200 hover:text-champagne', location.pathname === '/' ? 'text-champagne font-semibold' : 'text-charcoal-soft')}>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/shop" className={clsx('font-sans text-sm font-medium transition-colors duration-200 hover:text-champagne', location.pathname === '/shop' ? 'text-champagne font-semibold' : 'text-charcoal-soft')}>
                  {t('nav.shop')}
                </Link>
              </li>
              <li>
                <Link to="/about" className={clsx('font-sans text-sm font-medium transition-colors duration-200 hover:text-champagne', location.pathname === '/about' ? 'text-champagne font-semibold' : 'text-charcoal-soft')}>
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className={clsx('font-sans text-sm font-medium transition-colors duration-200 hover:text-champagne', location.pathname === '/faq' ? 'text-champagne font-semibold' : 'text-charcoal-soft')}>
                  {t('nav.faq')}
                </Link>
              </li>
            </ul>

            {/* Desktop right side */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="text-sm font-sans font-bold text-charcoal-soft hover:text-champagne transition-colors duration-200 px-2 uppercase"
                aria-label="Toggle language"
              >
                {i18n.language === 'en' ? 'عربى' : 'EN'}
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex items-center gap-2 text-sm font-medium text-charcoal-soft hover:text-champagne transition-colors duration-200"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="hidden lg:inline">WhatsApp</span>
              </a>
              <Button as="a" size="sm" onClick={() => window.location.href = '/shop'}>
                {t('nav.explore')}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-charcoal hover:bg-warm-gray transition-colors"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <Menu className="h-6 w-6" />
            </button>
          </nav>
        </Container>
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
