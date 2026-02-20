// =============================================
// SITE CONTENT – Edit all copy here
// =============================================

export const brand = {
  name: 'Shahed Storee',
  tagline: 'Timeless Furniture, Crafted for Modern Living',
  subTagline: 'Discover premium furniture pieces that blend luxury craftsmanship with contemporary design — made for discerning Saudi homes.',
  address: 'Madina, Kingdom of Saudi Arabia',
  phone: '+966 50 000 0000',
  email: 'hello@shahedstoree.sa',
  whatsappLabel: 'Chat on WhatsApp',
  currency: 'SAR',
  locale: 'ar-SA',
}

export const nav = {
  links: [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ],
  ctaLabel: 'Explore Collection',
  ctaHref: '/shop',
}

export const hero = {
  headline: 'Timeless Furniture,\nCrafted for Modern Living',
  subheadline: brand.subTagline,
  ctaPrimary: { label: 'Explore Collection', href: '/shop' },
  ctaSecondary: { label: 'Contact Us', href: '/contact' },
  badge1: { label: '+30 Curated Pieces', icon: '✦' },
  badge2: { label: 'Fast Saudi Delivery', icon: '🚚' },
  badge3: { label: 'Premium Materials', icon: '⬡' },
}

export const featuredSection = {
  eyebrow: 'Featured Collection',
  headline: 'Our most popular\npieces, handpicked for you',
  description: 'Each piece in our signature collection is selected for its exceptional craftsmanship, material quality, and timeless appeal.',
  cta: { label: 'Shop All Pieces', href: '/shop' },
}

export const collectionsSection = {
  eyebrow: 'Signature Collections',
  headline: 'Find Your Perfect Piece',
  tabs: [
    { key: 'sofa', label: 'Sofas' },
    { key: 'bed', label: 'Beds' },
    { key: 'dining', label: 'Dining' },
  ],
}

export const marqueeItems = [
  'FURNITURE', 'INTERIOR', 'DESIGN', 'LUXURY', 'MADINA', 'CRAFTSMANSHIP', 'SAUDI ARABIA', 'TIMELESS'
]

export const aboutSection = {
  eyebrow: 'Our Story',
  headline: 'Built on a Passion for Beautiful Living',
  body: `At Shahed Storee, we believe your home deserves furniture as unique as you are. Founded in the heart of Saudi Arabia, we curate premium furniture pieces that marry timeless design with contemporary sensibility.\n\nEvery piece in our collection is hand-selected for material quality, durability, and aesthetic excellence — ensuring your investment lasts a lifetime.`,
  stats: [
    { value: '30+', label: 'Curated Pieces' },
    { value: '100%', label: 'Premium Materials' },
    { value: 'KSA-Wide', label: 'Delivery Coverage' },
  ],
}

export const qualitySection = {
  eyebrow: 'Our Commitment',
  headline: 'Eco-Friendly Designs,\nTimeless Quality',
  description: 'We partner with manufacturers who share our values — sustainable sourcing, ethical production, and uncompromising quality standards.',
  pillars: [
    { icon: '🌿', title: 'Sustainable Materials', description: 'Responsibly sourced wood, natural fabrics, and eco-conscious finishes.' },
    { icon: '🏆', title: 'Premium Craftsmanship', description: 'Every joint, stitch, and finish is held to the highest standard.' },
    { icon: '🚛', title: 'White Glove Delivery', description: 'We deliver and set up your furniture with care across Saudi Arabia.' },
  ],
}

export const faqPreview = [
  {
    question: 'Do you deliver across Saudi Arabia?',
    answer: 'Yes, we deliver to all major cities in Saudi Arabia. Delivery times vary by area — contact us on WhatsApp for your specific location.',
  },
  {
    question: 'Can I see the furniture before buying?',
    answer: 'We currently operate online only. All product images are high-quality and accurately represent the pieces. Contact us for more photos or videos of any item.',
  },
  {
    question: 'What materials do you use?',
    answer: 'Our collection features premium materials including Italian leather, solid hardwood, sintered stone, and high-grade fabric upholstery.',
  },
  {
    question: 'How do I place an order?',
    answer: 'Simply chat with us on WhatsApp! Select your desired piece, choose your variants, and we\'ll guide you through the order and delivery process.',
  },
]

export const allFaqs = [
  ...faqPreview,
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 7 days of delivery if the item is in original condition. Custom or made-to-order pieces are non-returnable. See our full Returns Policy for details.',
  },
  {
    question: 'Do you offer custom sizes or fabrics?',
    answer: 'Many of our pieces are available in custom sizes and fabric options. Please contact us on WhatsApp to discuss customization options and lead times.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery within Madina takes 3–5 business days. Delivery to other cities varies from 5–10 business days. We\'ll confirm the timeline when you order.',
  },
  {
    question: 'Are prices negotiable?',
    answer: 'Our prices are fixed and reflect the premium quality of our pieces. However, we occasionally run seasonal promotions. Follow us on social media to stay updated.',
  },
]

export const ctaBanner = {
  headline: "Let's Create Your\nDream Living Space",
  subheadline: 'Chat with our furniture experts on WhatsApp and get personalized recommendations for your home.',
  cta: { label: 'Start the Conversation', href: 'whatsapp' },
}

export const footer = {
  description: 'Premium furniture curated for modern Saudi living. Timeless pieces, exceptional quality.',
  sections: [
    {
      title: 'Quick Links',
      links: [
        { label: 'Shop', href: '/shop' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Policies',
      links: [
        { label: 'Shipping Policy', href: '/policies#shipping' },
        { label: 'Return Policy', href: '/policies#returns' },
        { label: 'Privacy Policy', href: '/policies#privacy' },
        { label: 'Terms & Conditions', href: '/policies#terms' },
      ],
    },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/shahedstoree' },
    { label: 'TikTok', href: 'https://tiktok.com/@shahedstoree' },
    { label: 'Snapchat', href: 'https://snapchat.com/add/shahedstoree' },
  ],
  copyright: `© ${new Date().getFullYear()} Shahed Storee. All rights reserved.`,
}

export const aboutPage = {
  headline: 'Crafting Beautiful Spaces,\nOne Piece at a Time',
  body: [
    'Shahed Storee was born from a simple belief: everyone deserves a home that feels both luxurious and personal. Founded in Madina, we set out to bring world-class furniture to Saudi homemakers — pieces that tell a story, built to last generations.',
    'Our team personally curates every item in our collection, working directly with manufacturers who share our commitment to quality, sustainability, and ethical production. From Italian leather sofas to hand-carved dining tables, each piece carries the mark of true craftsmanship.',
    'We are proud to serve customers across Saudi Arabia, delivering premium furniture with the care and attention it deserves.',
  ],
  values: [
    { icon: '✦', title: 'Quality First', description: 'Every piece is vetted for materials, construction, and longevity before it earns a place in our collection.' },
    { icon: '🌍', title: 'Sustainability', description: 'We prioritize responsibly sourced materials and eco-conscious manufacturing partners.' },
    { icon: '🤝', title: 'Customer Focus', description: 'Your satisfaction is our measure of success. We\'re always here on WhatsApp to help.' },
    { icon: '🏠', title: 'Saudi Heritage', description: 'Proudly serving the Kingdom — our designs respect both modern tastes and traditional values.' },
  ],
}

export const contactPage = {
  headline: 'Get in Touch',
  subheadline: 'Have a question? Want to see more photos? Ready to order? We\'re just a message away.',
  whatsappCta: 'Chat on WhatsApp',
  address: 'Madina, Kingdom of Saudi Arabia',
  hours: 'Sat–Thu, 9 AM – 9 PM (KSA)',
}

export const policiesContent = {
  shipping: {
    title: 'Shipping Policy',
    content: `**Delivery Areas**\nWe deliver across Saudi Arabia, including Madina, Jeddah, Dammam, Makkah, Madinah, and other cities.\n\n**Delivery Times**\n- Madina: 3–5 business days\n- Major cities: 5–7 business days\n- Remote areas: 7–14 business days\n\n**Delivery Fees**\nDelivery fees vary by location and order size. Final delivery cost is confirmed at time of order via WhatsApp.\n\n**White Glove Service**\nOur team delivers and assembles furniture in your home at no extra charge within Madina.`,
  },
  returns: {
    title: 'Return Policy',
    content: `**Return Window**\nWe accept returns within 7 days of delivery for items in original, unused condition.\n\n**Conditions**\n- Item must be in original packaging or returned without damage\n- Custom and made-to-order items are non-returnable\n- Assembly and delivery fees are non-refundable\n\n**How to Return**\nContact us on WhatsApp to initiate a return. We will arrange pickup at a time convenient for you.\n\n**Refunds**\nRefunds are processed within 5–10 business days after item inspection.`,
  },
  privacy: {
    title: 'Privacy Policy',
    content: `**Data We Collect**\nWe collect your name, phone number, and order details as provided through WhatsApp.\n\n**How We Use Your Data**\nYour information is used solely to process and deliver your orders. We do not sell or share your data with third parties.\n\n**WhatsApp Communication**\nBy contacting us via WhatsApp, you consent to communication through this platform for order-related purposes.\n\n**Contact**\nFor privacy concerns, contact us at hello@shahedstoree.sa`,
  },
  terms: {
    title: 'Terms & Conditions',
    content: `**1. Orders**\nAll orders are placed via WhatsApp and confirmed by our team. An order is binding upon confirmation of payment.\n\n**2. Pricing**\nAll prices are listed in SAR (Saudi Riyal) and include VAT. Prices are subject to change without notice.\n\n**3. Payment**\nPayment details are provided at time of order confirmation via WhatsApp.\n\n**4. Liability**\nShahed Storee is not liable for delays caused by circumstances beyond our control, including customs, natural events, or logistics disruptions.\n\n**5. Governing Law**\nThese terms are governed by the laws of the Kingdom of Saudi Arabia.`,
  },
}
