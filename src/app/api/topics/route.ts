import { NextResponse } from 'next/server';
import { topics } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const sort = searchParams.get('sort') || 'trend';

  let result = [...topics];

  if (query) {
    result = result.filter(t =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
    );
  }

  if (sort === 'trend') result.sort((a, b) => b.trendScore - a.trendScore);
  if (sort === 'mentions') result.sort((a, b) => b.mentionCount - a.mentionCount);
  if (sort === 'content') result.sort((a, b) => b.contentOpportunityScore - a.contentOpportunityScore);

  return NextResponse.json({ topics: result, total: result.length });
}
