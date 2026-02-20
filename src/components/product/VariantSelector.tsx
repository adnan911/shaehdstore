import clsx from 'clsx'

interface Variant {
  id: string
  variant_name: string
  variant_value: string
  price_delta: number
}

interface GroupedVariant {
  name: string
  options: Variant[]
}

interface VariantSelectorProps {
  variants: Variant[]
  selected: Record<string, string>
  onChange: (name: string, value: string) => void
}

function groupVariants(variants: Variant[]): GroupedVariant[] {
  const map = new Map<string, Variant[]>()
  for (const v of variants) {
    const arr = map.get(v.variant_name) || []
    arr.push(v)
    map.set(v.variant_name, arr)
  }
  return Array.from(map.entries()).map(([name, options]) => ({ name, options }))
}

export function VariantSelector({ variants, selected, onChange }: VariantSelectorProps) {
  const groups = groupVariants(variants)

  if (groups.length === 0) return null

  return (
    <div className="space-y-5">
      {groups.map(group => (
        <div key={group.name}>
          <p className="font-sans text-sm font-semibold text-charcoal mb-2">
            {group.name}:{' '}
            <span className="text-champagne-dark font-medium">
              {selected[group.name] || 'Select'}
            </span>
          </p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={group.name}>
            {group.options.map(opt => {
              const isActive = selected[group.name] === opt.variant_value
              return (
                <button
                  key={opt.id}
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => onChange(group.name, opt.variant_value)}
                  className={clsx(
                    'px-4 py-2 rounded-full text-sm font-sans font-medium border-2 transition-all duration-200',
                    isActive
                      ? 'border-champagne bg-champagne-light text-champagne-dark'
                      : 'border-warm-gray bg-white text-charcoal-soft hover:border-champagne-light'
                  )}
                >
                  {opt.variant_value}
                  {opt.price_delta !== 0 && (
                    <span className="ml-1 text-xs text-stone">
                      {opt.price_delta > 0 ? `+${opt.price_delta}` : opt.price_delta} SAR
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
