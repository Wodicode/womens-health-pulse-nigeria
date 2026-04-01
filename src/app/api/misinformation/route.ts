import { NextResponse } from 'next/server';
import { misinformationAlerts } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const severity = searchParams.get('severity');
  const status = searchParams.get('status');

  let result = [...misinformationAlerts];

  if (severity) result = result.filter(a => a.severity === severity);
  if (status) result = result.filter(a => a.status === status);

  result.sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.severity] - order[b.severity];
  });

  return NextResponse.json({
    alerts: result,
    total: result.length,
    critical: misinformationAlerts.filter(a => a.severity === 'critical').length,
    high: misinformationAlerts.filter(a => a.severity === 'high').length,
  });
}
