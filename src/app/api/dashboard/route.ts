import { NextResponse } from 'next/server';
import { dashboardStats, mentionsTrend, platformBreakdown, sentimentBreakdown } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    stats: dashboardStats,
    mentionsTrend,
    platformBreakdown,
    sentimentBreakdown,
    timestamp: new Date().toISOString(),
  });
}
