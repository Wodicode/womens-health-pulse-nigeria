import { NextResponse } from 'next/server';
import { contentOpportunities } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');
  const urgency = searchParams.get('urgency');
  const topicId = searchParams.get('topicId');
  const limit = parseInt(searchParams.get('limit') || '10');

  let result = [...contentOpportunities];

  if (format) result = result.filter(o => o.format === format);
  if (urgency) result = result.filter(o => o.urgency === urgency);
  if (topicId) result = result.filter(o => o.topicId === topicId);

  result.sort((a, b) => b.score - a.score);
  result = result.slice(0, limit);

  return NextResponse.json({ opportunities: result, total: result.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { topic, format, platform } = body;

  // In production this would call OpenAI/Claude API
  const generated = {
    id: `co_${Date.now()}`,
    topic,
    format,
    platform,
    score: Math.floor(Math.random() * 30) + 60,
    hook: `Here's what Nigerian women need to know about ${topic}...`,
    caption: `This week, conversations about ${topic} are surging in Nigeria. Here's the key information you need to know to protect your health and the health of women you love.`,
    cta: `Comment "${topic.toUpperCase().split(' ')[0]}" and we'll send you a free resource guide`,
    emotionalDriver: 'Education → Empowerment',
    angle: `Evidence-based, culturally relevant information about ${topic}`,
    urgency: 'high',
    estimatedReach: 50000,
    generatedAt: new Date().toISOString(),
  };

  return NextResponse.json({ opportunity: generated });
}
