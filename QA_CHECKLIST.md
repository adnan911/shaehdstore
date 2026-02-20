# QA_CHECKLIST.md

## ✅ Responsive Checks

- [ ] Navbar collapses to hamburger on mobile
- [ ] Mobile drawer opens/closes with animation
- [ ] Hero stacks (text then image) on mobile
- [ ] Product grid: 2-col on mobile, 3-col md, 4-col lg
- [ ] Shop filters wrap on mobile
- [ ] Product details stacks (gallery then info) on mobile
- [ ] Footer: 1-col on mobile, 4-col on desktop
- [ ] Floating WhatsApp button visible on all screen sizes

## ✅ Keyboard Navigation

- [ ] Tab through nav links without mouse
- [ ] Mobile drawer: ESC closes it
- [ ] Mobile drawer: tab trapped while open
- [ ] Accordion: spacebar/enter toggles items
- [ ] Product variant selectors focusable
- [ ] All interactive elements have visible focus ring (champagne outline)

## ✅ Shop States

- [ ] Loading: skeleton grid shows while fetching
- [ ] Empty: friendly empty state with "Clear filters" CTA
- [ ] Error: error state with "Try again" button
- [ ] Demo badge shows when using mock data

## ✅ Product Detail States

- [ ] Loading: skeleton layout shows
- [ ] Not found: 404 message with link to shop
- [ ] Error: error state with back link

## ✅ WhatsApp Message Correctness

Test the product page WhatsApp message format:

```
Hello Shahed Storee, I want to order: {productName}.
Material: {material}.
Variants: {Size: 3-Seater, Color: Ivory White}.
Please confirm delivery to: {area}.
```

- [ ] Product name populated
- [ ] Material populated
- [ ] Variants concatenated correctly
- [ ] Area from dropdown populated
- [ ] Contact form message includes name + phone + message
- [ ] General WhatsApp CTA opens correct number

## ✅ Accessibility

- [ ] `aria-label` on icon-only buttons (hamburger, close, gallery arrows)
- [ ] `aria-expanded` on accordion buttons
- [ ] `aria-controls` links accordion header to panel
- [ ] `aria-modal` and `aria-label` on mobile drawer
- [ ] Tabs have `role="tab"` and `aria-selected`
- [ ] Tabpanel has `role="tabpanel"` and `aria-label`
- [ ] Images have descriptive `alt` text
- [ ] Form inputs have associated `<label>` elements
- [ ] Breadcrumb `<nav aria-label="Breadcrumb">`
- [ ] Footer `<nav>` present

## ✅ Reduced Motion

- [ ] Marquee animation pauses when `prefers-reduced-motion: reduce`
- [ ] Large transitions are minimal or zero
