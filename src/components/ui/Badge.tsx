import clsx from 'clsx'
import { type HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'gold' | 'olive' | 'stone'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-warm-gray text-charcoal-soft',
  gold: 'bg-champagne-light text-champagne-dark',
  olive: 'bg-olive-light text-olive',
  stone: 'bg-stone-light text-stone',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-sans font-semibold uppercase tracking-wider',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
