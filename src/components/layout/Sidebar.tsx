'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Search, BarChart2, TrendingUp, AlertTriangle,
  Lightbulb, Users, Bell, FileText, Settings, Heart, ChevronRight
} from 'lucide-react';

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Topic Explorer', href: '/topics', icon: Search },
  { label: 'Sentiment', href: '/sentiment', icon: BarChart2 },
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
    <aside className="h-screen w-60 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 overflow-y-auto z-40 shadow-sm">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-rose-500 flex items-center justify-center flex-shrink-0">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-gray-900 font-bold text-sm leading-tight">Women's Health</p>
            <p className="text-violet-600 text-[10px] font-semibold tracking-widest uppercase">Pulse Nigeria</p>
          </div>
        </div>
      </div>

      {/* Live pill */}
      <div className="px-5 py-2.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] text-gray-400 font-medium">Live · Updated just now</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        <p className="px-2 mb-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Intelligence</p>
        {nav.slice(0, 6).map(({ label, href, icon: Icon, badge }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href}
              className={cn(
                'group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150',
                active
                  ? 'bg-violet-50 text-violet-700 font-medium'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              )}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-violet-600' : 'text-gray-400 group-hover:text-gray-600')} />
              <span className="flex-1">{label}</span>
              {active && <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
              {badge && !active && (
                <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}

        <p className="px-2 mt-4 mb-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Management</p>
        {nav.slice(6).map(({ label, href, icon: Icon, badge }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href}
              className={cn(
                'group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150',
                active
                  ? 'bg-violet-50 text-violet-700 font-medium'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              )}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-violet-600' : 'text-gray-400 group-hover:text-gray-600')} />
              <span className="flex-1">{label}</span>
              {active && <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
              {badge && !active && (
                <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Brand tag */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
            R
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-700 text-xs font-semibold">RenewHER</p>
            <p className="text-gray-400 text-[10px]">Women's Health Nigeria</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
