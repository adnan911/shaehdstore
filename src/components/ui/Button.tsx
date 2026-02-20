import { type ButtonHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  as?: 'button' | 'a'
  href?: string
}

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-champagne text-charcoal hover:bg-champagne-dark hover:shadow-card-hover active:scale-[0.98]',
  secondary:
    'bg-charcoal text-ivory hover:bg-charcoal-soft active:scale-[0.98]',
  outline:
    'border-2 border-champagne text-champagne bg-transparent hover:bg-champagne hover:text-charcoal active:scale-[0.98]',
  ghost:
    'bg-transparent text-charcoal-soft hover:bg-warm-gray active:scale-[0.98]',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(base, variants[variant], sizes[size], className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
