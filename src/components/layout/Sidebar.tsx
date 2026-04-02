'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Search, BarChart2, TrendingUp, AlertTriangle,
  Lightbulb, Users, Bell, FileText, Settings, Map
} from 'lucide-react';

const navGroups = [
  {
    label: 'Intelligence',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Topic Explorer', href: '/topics', icon: Search },
      { label: 'Sentiment', href: '/sentiment', icon: BarChart2 },
      { label: 'Google Trends', href: '/trends', icon: TrendingUp },
      { label: 'Misinformation', href: '/misinformation', icon: AlertTriangle },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Content Studio', href: '/content-studio', icon: Lightbulb },
    ],
  },
  {
    label: 'Monitoring',
    items: [
      { label: 'Influencers', href: '/influencers', icon: Users },
      { label: 'Alerts', href: '/alerts', icon: Bell, badge: 3 },
    ],
  },
  {
    label: 'Reporting',
    items: [
      { label: 'Reports', href: '/reports', icon: FileText },
      { label: 'Admin', href: '/admin', icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 overflow-y-auto shadow-sm">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100">
        <Image
          src="/renewher-logo.png"
          alt="RenewHER Women's Health Pulse"
          width={160}
          height={52}
          className="object-contain"
          priority
        />
      </div>

      {/* Live indicator */}
      <div className="px-5 py-2.5 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] text-gray-500 font-medium tracking-wide">Live · Updated just now</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ label, href, icon: Icon, badge }) => {
                const active = pathname === href || pathname.startsWith(href + '/');
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
                      active
                        ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-[#1a4731] font-semibold shadow-sm border border-emerald-100'
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    )}
                  >
                    <Icon className={cn(
                      'w-4 h-4 flex-shrink-0 transition-colors',
                      active ? 'text-[#1a4731]' : 'text-gray-400 group-hover:text-gray-600'
                    )} />
                    <span className="flex-1 leading-none">{label}</span>
                    {active && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1a4731] flex-shrink-0" />
                    )}
                    {badge && !active && (
                      <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2.5 px-1">
          <Image
            src="/renewher-mark.png"
            alt="RenewHER"
            width={28}
            height={28}
            className="object-contain flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-gray-700 text-xs font-semibold leading-tight">RenewHER</p>
            <p className="text-gray-400 text-[10px] leading-tight">Health · Equity · Reform</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
