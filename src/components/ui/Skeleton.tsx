import { type HTMLAttributes } from 'react'
import clsx from 'clsx'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  height?: string
  width?: string
  rounded?: string
}

export function Skeleton({ height, width, rounded = 'rounded-xl', className, style, ...props }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'bg-gradient-to-r from-warm-gray via-ivory-dark to-warm-gray bg-[length:200%_100%] animate-pulse',
        rounded,
        className
      )}
      style={{ height, width, ...style }}
      {...props}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-warm-gray">
      <Skeleton height="280px" rounded="rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton height="20px" width="70%" />
        <Skeleton height="16px" width="50%" />
        <Skeleton height="24px" width="40%" />
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <Skeleton height="500px" rounded="rounded-2xl" />
      <div className="space-y-4">
        <Skeleton height="40px" width="80%" />
        <Skeleton height="24px" width="40%" />
        <Skeleton height="16px" />
        <Skeleton height="16px" />
        <Skeleton height="16px" width="60%" />
        <Skeleton height="52px" rounded="rounded-full" className="mt-6" />
      </div>
    </div>
  )
}
