import clsx from 'clsx'
import { type ReactNode } from 'react'

interface TabItem<T extends string> {
  key: T
  label: string
  icon?: ReactNode
}

interface TabsProps<T extends string> {
  items: TabItem<T>[]
  active: T
  onChange: (key: T) => void
  className?: string
}

export function Tabs<T extends string>({ items, active, onChange, className }: TabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label="Collection tabs"
      className={clsx('flex gap-1 p-1 bg-warm-gray rounded-full w-fit', className)}
    >
      {items.map(item => (
        <button
          key={item.key}
          role="tab"
          aria-selected={active === item.key}
          aria-controls={`tabpanel-${item.key}`}
          onClick={() => onChange(item.key)}
          className={clsx(
            'px-5 py-2 rounded-full text-sm font-sans font-semibold transition-all duration-200',
            active === item.key
              ? 'bg-champagne text-charcoal shadow-sm'
              : 'text-stone hover:text-charcoal hover:bg-ivory'
          )}
        >
          {item.icon && <span className="mr-1">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  )
}
