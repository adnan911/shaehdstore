import clsx from 'clsx'
import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({ hover = false, padding = 'md', className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white border border-warm-gray rounded-2xl shadow-card',
        hover && 'hover-lift cursor-pointer',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
