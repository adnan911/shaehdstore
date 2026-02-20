import { type ReactNode } from 'react'
import clsx from 'clsx'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={clsx('max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Tag>
  )
}
