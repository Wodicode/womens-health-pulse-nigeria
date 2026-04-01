'use client';
import { Bell, Search, Filter, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <header className="h-16 border-b border-white/8 bg-[#0d0b1a]/80 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-white font-semibold text-lg leading-tight truncate">{title}</h1>
        {subtitle && <p className="text-white/40 text-xs truncate">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-64">
        <Search className="w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search topics, mentions..."
          className="bg-transparent text-sm text-white/80 placeholder:text-white/30 outline-none flex-1"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {actions}
        <button
          onClick={handleRefresh}
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white/90 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
        <button className="relative w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white/90 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <Button variant="secondary" size="sm">
          <Download className="w-3.5 h-3.5" />
          Export
        </Button>
      </div>
    </header>
  );
}
