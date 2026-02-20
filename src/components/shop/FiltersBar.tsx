import { ChevronDown } from 'lucide-react'

interface FiltersBarProps {
  selectedCategory: string
  onCategoryChange: (cat: string) => void
  selectedMaterial: string
  onMaterialChange: (mat: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  materials: string[]
  resultCount: number
}

const CATEGORIES = [
  { key: '', label: 'All' },
  { key: 'sofa', label: 'Sofas' },
  { key: 'bed', label: 'Beds' },
  { key: 'dining', label: 'Dining' },
]

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A–Z' },
]

export function FiltersBar({
  selectedCategory,
  onCategoryChange,
  selectedMaterial,
  onMaterialChange,
  sortBy,
  onSortChange,
  materials,
  resultCount,
}: FiltersBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white border border-warm-gray rounded-2xl p-4 shadow-soft">
      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter by category">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => onCategoryChange(cat.key)}
            aria-pressed={selectedCategory === cat.key}
            className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200 ${
              selectedCategory === cat.key
                ? 'bg-champagne text-charcoal'
                : 'bg-warm-gray text-stone hover:bg-champagne-light hover:text-champagne-dark'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Right side: material + sort */}
      <div className="flex gap-3 items-center flex-wrap">
        {/* Material select */}
        <div className="relative">
          <label htmlFor="material-filter" className="sr-only">Filter by material</label>
          <select
            id="material-filter"
            value={selectedMaterial}
            onChange={e => onMaterialChange(e.target.value)}
            className="appearance-none bg-warm-gray text-stone text-sm font-sans rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-champagne transition-colors hover:bg-champagne-light"
          >
            <option value="">All Materials</option>
            {materials.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <label htmlFor="sort-select" className="sr-only">Sort by</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            className="appearance-none bg-warm-gray text-stone text-sm font-sans rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-champagne transition-colors hover:bg-champagne-light"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone pointer-events-none" />
        </div>

        {/* Count */}
        <span className="text-xs text-stone font-sans whitespace-nowrap">{resultCount} pieces</span>
      </div>
    </div>
  )
}
