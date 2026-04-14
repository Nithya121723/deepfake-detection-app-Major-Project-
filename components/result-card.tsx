'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ResultCardProps {
  title: string
  value: string | number
  subtitle?: string
  variant?: 'default' | 'success' | 'danger' | 'warning'
  icon?: React.ReactNode
  className?: string
}

export function ResultCard({
  title,
  value,
  subtitle,
  variant = 'default',
  icon,
  className,
}: ResultCardProps) {
  const variantStyles = {
    default: 'border-border',
    success: 'border-emerald-500/50 bg-emerald-500/5',
    danger: 'border-red-500/50 bg-red-500/5',
    warning: 'border-amber-500/50 bg-amber-500/5',
  }

  const valueStyles = {
    default: 'text-foreground',
    success: 'text-emerald-500',
    danger: 'text-red-500',
    warning: 'text-amber-500',
  }

  return (
    <Card className={cn('transition-all hover:shadow-lg', variantStyles[variant], className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className={cn('text-2xl font-bold', valueStyles[variant])}>
          {typeof value === 'number' ? `${(value * 100).toFixed(1)}%` : value}
        </div>
        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  )
}
