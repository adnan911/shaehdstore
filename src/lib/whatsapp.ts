const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '966500000000'

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

export function buildProductOrderMessage(params: {
  productName: string
  material: string
  variants: string
  area: string
}): string {
  return `Hello Shahed Storee, I want to order: ${params.productName}. Material: ${params.material}. Variants: ${params.variants}. Please confirm delivery to: ${params.area}.`
}

export function buildContactMessage(params: {
  name: string
  phone: string
  message: string
}): string {
  return `Hello Shahed Storee!\n\nName: ${params.name}\nPhone: ${params.phone}\nMessage: ${params.message}`
}

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
