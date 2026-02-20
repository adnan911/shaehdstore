import { useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, MessageCircle } from 'lucide-react'
import clsx from 'clsx'
import { brand } from '@/content/siteContent'
import { WHATSAPP_URL } from '@/lib/whatsapp'
import { useScrollLock } from '@/hooks/useScrollLock'
import { Button } from '../ui/Button'
import { useTranslation } from 'react-i18next'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')
    onClose()
  }
  const closeRef = useRef<HTMLButtonElement>(null)
  useScrollLock(isOpen)

  // Focus close button on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeRef.current?.focus(), 100)
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={clsx(
          'fixed top-0 bottom-0 z-50 w-72 bg-ivory shadow-hover transition-transform duration-300',
          i18n.language === 'ar' ? 'left-0' : 'right-0',
          isOpen 
            ? 'translate-x-0' 
            : (i18n.language === 'ar' ? '-translate-x-full' : 'translate-x-full')
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-warm-gray">
          <span className="font-serif text-xl font-bold text-charcoal">{brand.name}</span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 rounded-lg text-charcoal hover:bg-warm-gray transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="p-5">
          <ul className="space-y-1" role="list">
            <li>
              <Link to="/" onClick={onClose} className={clsx('block px-4 py-3 rounded-xl font-sans font-medium transition-all duration-200', location.pathname === '/' ? 'bg-champagne-light text-champagne-dark' : 'text-charcoal-soft hover:bg-warm-gray hover:text-charcoal')}>
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link to="/shop" onClick={onClose} className={clsx('block px-4 py-3 rounded-xl font-sans font-medium transition-all duration-200', location.pathname === '/shop' ? 'bg-champagne-light text-champagne-dark' : 'text-charcoal-soft hover:bg-warm-gray hover:text-charcoal')}>
                {t('nav.shop')}
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={onClose} className={clsx('block px-4 py-3 rounded-xl font-sans font-medium transition-all duration-200', location.pathname === '/about' ? 'bg-champagne-light text-champagne-dark' : 'text-charcoal-soft hover:bg-warm-gray hover:text-charcoal')}>
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link to="/faq" onClick={onClose} className={clsx('block px-4 py-3 rounded-xl font-sans font-medium transition-all duration-200', location.pathname === '/faq' ? 'bg-champagne-light text-champagne-dark' : 'text-charcoal-soft hover:bg-warm-gray hover:text-charcoal')}>
                {t('nav.faq')}
              </Link>
            </li>
          </ul>

          {/* WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-warm-gray text-charcoal font-medium hover:bg-champagne-light transition-colors duration-200"
          >
            <MessageCircle className="h-5 w-5 text-champagne" />
            <span>{t('common.chatOnWhatsapp')}</span>
          </a>

          <div className="mt-4 flex flex-col gap-3">
            <Button
              onClick={() => { onClose(); window.location.href = '/shop' }}
              className="w-full"
            >
              {t('nav.explore')}
            </Button>
            
            <button
              onClick={toggleLanguage}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-sans font-bold text-charcoal-soft bg-warm-gray hover:bg-champagne-light hover:text-champagne-dark transition-colors uppercase"
            >
              {i18n.language === 'en' ? 'عربى' : 'English'}
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}
