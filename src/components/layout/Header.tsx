'use client';
import { Bell, Search, Download, RefreshCw, ExternalLink } from 'lucide-react';
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
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <header className="h-14 border-b border-gray-100 bg-white flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="text-gray-900 font-semibold text-base truncate">{title}</h1>
          {subtitle && (
            <>
              <span className="text-gray-200 text-sm">/</span>
              <span className="text-gray-400 text-sm truncate hidden md:block">{subtitle}</span>
            </>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-56">
        <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search topics, keywords..."
          className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none flex-1"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {actions}
        <button onClick={handleRefresh}
          className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all">
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
        <button className="relative w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all">
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c8006e] hover:bg-[#a8005c] text-white text-xs font-medium rounded-lg transition-all">
          <Download className="w-3 h-3" />
          Export
        </button>
      </div>
    </header>
  );
}
