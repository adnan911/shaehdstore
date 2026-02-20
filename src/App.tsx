import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import ProductDetails from '@/pages/ProductDetails'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import FAQ from '@/pages/FAQ'
import Policies from '@/pages/Policies'
import '@/styles/globals.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  )
}

function NotFound() {
  return (
    <main className="min-h-screen bg-ivory flex items-center justify-center pt-24">
      <div className="text-center">
        <p className="font-serif text-8xl font-bold text-champagne mb-4">404</p>
        <h1 className="font-serif text-3xl font-bold text-charcoal mb-3">Page not found</h1>
        <p className="font-sans text-charcoal-soft mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="inline-flex items-center gap-2 bg-champagne text-charcoal font-semibold rounded-full px-6 py-3 hover:bg-champagne-dark transition-all duration-200">
          Return Home
        </a>
      </div>
    </main>
  )
}
