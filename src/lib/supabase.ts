import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars not set. Using demo mode with mock data.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          slug: string
          category: 'sofa' | 'bed' | 'dining'
          material: string
          description: string | null
          price_sar: number
          is_featured: boolean
          created_at: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          variant_name: string
          variant_value: string
          price_delta: number
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          url: string
          alt: string | null
        }
      }
    }
  }
}
