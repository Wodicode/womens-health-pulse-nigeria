'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Search, BarChart2, TrendingUp, AlertTriangle,
  Lightbulb, Users, Bell, FileText, Settings, Activity,
  Heart, LogOut, ChevronRight
} from 'lucide-react';

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Topic Explorer', href: '/topics', icon: Search },
  { label: 'Sentiment', href: '/sentiment', icon: Activity },
  { label: 'Google Trends', href: '/trends', icon: TrendingUp },
  { label: 'Misinformation', href: '/misinformation', icon: AlertTriangle },
  { label: 'Content Studio', href: '/content-studio', icon: Lightbulb },
  { label: 'Influencers', href: '/influencers', icon: Users },
  { label: 'Alerts', href: '/alerts', icon: Bell, badge: 3 },
  { label: 'Reports', href: '/reports', icon: FileText },
  { label: 'Admin', href: '/admin', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d0b1a] border-r border-white/8 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center flex-shrink-0">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Women&apos;s Health</p>
            <p className="text-rose-400 text-xs font-semibold tracking-widest uppercase">Pulse Nigeria</p>
          </div>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="px-6 py-3 border-b border-white/8">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-white/50">Live · Updated just now</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {nav.map(({ label, href, icon: Icon, badge }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
                active
                  ? 'bg-purple-600/20 text-white border border-purple-500/20'
                  : 'text-white/55 hover:text-white/90 hover:bg-white/5'
              )}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-purple-400' : 'text-white/40 group-hover:text-white/70')} />
              <span className="flex-1 font-medium">{label}</span>
              {badge && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
              {active && <ChevronRight className="w-3 h-3 text-purple-400" />}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/8">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            DA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">Dr. Adanna</p>
            <p className="text-white/40 text-xs truncate">RenewHER · Admin</p>
          </div>
          <LogOut className="w-3.5 h-3.5 text-white/30 hover:text-white/70 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}
