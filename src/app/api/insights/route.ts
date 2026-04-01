import { NextResponse } from 'next/server';
import { weeklySummary, dashboardStats } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'weekly';

  if (period === 'weekly') {
    return NextResponse.json({ summary: weeklySummary });
  }

  // Daily insight generation
  const dailyInsights = [
    `Total mentions today: ${dashboardStats.totalMentionsToday.toLocaleString()} (+${dashboardStats.totalMentionsChange}% vs yesterday)`,
    `Fastest growing topic: ${dashboardStats.fastestGrowingTopic} (+${dashboardStats.fastestGrowingChange}% in 24h)`,
    `${dashboardStats.misinformationCount} active misinformation alerts require attention`,
    `Negative sentiment is at 38% — primarily driven by NHIA confusion and healthcare cost concerns`,
    `Postpartum depression search volume is breaking out in Kano, Kaduna, and Abuja — content opportunity detected`,
  ];

  return NextResponse.json({
    period: 'daily',
    date: new Date().toISOString().split('T')[0],
    insights: dailyInsights,
    stats: dashboardStats,
  });
}
