import { MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/whatsapp'

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-hover hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group"
    >
      <MessageCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      <span className="text-sm font-semibold font-sans overflow-hidden max-w-0 group-hover:max-w-[120px] transition-all duration-300 whitespace-nowrap">
        Chat with us
      </span>
    </a>
  )
}
