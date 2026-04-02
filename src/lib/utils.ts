import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type Platform, type Sentiment, type Severity } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatPercent(n: number): string {
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
}

export function sentimentColor(sentiment: Sentiment): string {
  const map: Record<Sentiment, string> = {
    positive: '#22c55e',
    negative: '#ef4444',
    neutral: '#94a3b8',
    fear: '#f97316',
    anger: '#dc2626',
    hope: '#a855f7',
    frustration: '#f59e0b',
    confusion: '#6366f1',
    misinformation: '#ec4899',
  };
  return map[sentiment];
}

export function sentimentLabel(sentiment: Sentiment): string {
  const map: Record<Sentiment, string> = {
    positive: 'Positive',
    negative: 'Negative',
    neutral: 'Neutral',
    fear: 'Fear / Anxiety',
    anger: 'Anger',
    hope: 'Hope',
    frustration: 'Frustration',
    confusion: 'Confusion',
    misinformation: 'Misinformation',
  };
  return map[sentiment];
}

export function platformLabel(platform: Platform): string {
  const map: Record<Platform, string> = {
    twitter: 'X / Twitter',
    instagram: 'Instagram',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    nairaland: 'Nairaland',
    reddit: 'Reddit',
    news: 'News',
    google_trends: 'Google Trends',
  };
  return map[platform];
}

export function platformColor(platform: Platform): string {
  const map: Record<Platform, string> = {
    twitter: '#1d9bf0',
    instagram: '#e1306c',
    facebook: '#1877f2',
    linkedin: '#0a66c2',
    tiktok: '#010101',
    youtube: '#ff0000',
    nairaland: '#2d6a4f',
    reddit: '#ff4500',
    news: '#7c3aed',
    google_trends: '#4285f4',
  };
  return map[platform];
}

export function severityColor(severity: Severity): string {
  const map: Record<Severity, string> = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#f97316',
    critical: '#ef4444',
  };
  return map[severity];
}

export function severityBg(severity: Severity): string {
  const map: Record<Severity, string> = {
    low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    high: 'bg-orange-50 text-orange-700 border-orange-200',
    critical: 'bg-red-50 text-red-700 border-red-200',
  };
  return map[severity];
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function scoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
}

export function scoreBg(score: number): string {
  if (score >= 80) return 'bg-emerald-50 border-emerald-200 text-emerald-700';
  if (score >= 60) return 'bg-amber-50 border-amber-200 text-amber-700';
  if (score >= 40) return 'bg-orange-50 border-orange-200 text-orange-700';
  return 'bg-red-50 border-red-200 text-red-700';
}
