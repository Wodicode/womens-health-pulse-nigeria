'use client';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'positive' | 'negative' | 'warning' | 'info' | 'purple' | 'outline' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

const variants = {
  default: 'bg-gray-100 text-gray-600',
  positive: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  negative: 'bg-red-50 text-red-700 border border-red-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200',
  purple: 'bg-violet-50 text-violet-700 border border-violet-200',
  outline: 'border border-gray-200 text-gray-600',
  gray: 'bg-gray-50 text-gray-500 border border-gray-200',
};

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full font-medium',
      size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
