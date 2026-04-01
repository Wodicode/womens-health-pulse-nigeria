'use client';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'purple' | 'rose' | 'emerald' | 'amber';
}

export function Card({ children, className, hover = false, glow }: CardProps) {
  const glowMap = {
    purple: 'hover:shadow-purple-500/10',
    rose: 'hover:shadow-rose-500/10',
    emerald: 'hover:shadow-emerald-500/10',
    amber: 'hover:shadow-amber-500/10',
  };

  return (
    <div className={cn(
      'rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm',
      hover && 'transition-all duration-200 hover:border-white/15 hover:shadow-lg',
      glow && glowMap[glow],
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-5 border-b border-white/8', className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-5', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-sm font-semibold text-white/90 tracking-wide uppercase', className)}>{children}</h3>;
}
