import { NextResponse } from 'next/server';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  topic: string;
}

// Nigerian and African health news RSS feeds — all free, no auth required
const RSS_FEEDS = [
  {
    name: 'Pulse Nigeria Health',
    url: 'https://www.pulse.ng/rss/bi/health.rss',
    sourceUrl: 'https://www.pulse.ng/bi/health',
    topic: 'General Health',
  },
  {
    name: 'Vanguard Nigeria Health',
    url: 'https://www.vanguardngr.com/category/health/feed/',
    sourceUrl: 'https://www.vanguardngr.com/category/health/',
    topic: 'General Health',
  },
  {
    name: 'Guardian Nigeria Health',
    url: 'https://guardian.ng/category/features/health/feed/',
    sourceUrl: 'https://guardian.ng/category/features/health/',
    topic: 'General Health',
  },
  {
    name: 'Channels TV Health',
    url: 'https://www.channelstv.com/category/health/feed/',
    sourceUrl: 'https://www.channelstv.com/category/health/',
    topic: 'General Health',
  },
];

// Google News searches for specific women's health topics in Nigeria
const GOOGLE_NEWS_SEARCHES = [
  { query: 'maternal health Nigeria women', topic: 'Maternal Health' },
  { query: 'cervical cancer Nigeria', topic: 'Cervical Cancer' },
  { query: 'fibroid Nigeria women treatment', topic: 'Fibroids' },
  { query: 'NHIA Nigeria women healthcare', topic: 'Healthcare Access' },
  { query: 'PCOS Nigeria fertility', topic: 'PCOS & Fertility' },
];

function parseRssItem(item: string, sourceName: string, sourceUrl: string, topic: string, index: number): NewsArticle | null {
  try {
    const title = (
      item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/s)?.[1] ??
      item.match(/<title>(.*?)<\/title>/s)?.[1] ??
      ''
    ).trim();

    if (!title) return null;

    const link = (
      item.match(/<link>(https?:\/\/[^<]+)<\/link>/)?.[1] ??
      item.match(/<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/)?.[1] ??
      ''
    ).trim();

    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? '';
    const description = (
      item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/s)?.[1] ??
      item.match(/<description>(.*?)<\/description>/s)?.[1] ??
      ''
    ).replace(/<[^>]+>/g, '').trim().slice(0, 300);

    return {
      id: `${sourceName}_${index}`,
      title,
      description,
      url: link || sourceUrl,
      source: sourceName,
      sourceUrl,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      topic,
    };
  } catch {
    return null;
  }
}

async function fetchRssFeed(feed: typeof RSS_FEEDS[0]): Promise<NewsArticle[]> {
  try {
    const res = await fetch(feed.url, {
      next: { revalidate: 1800 }, // cache 30 min
      headers: { 'Accept': 'application/rss+xml, application/xml, text/xml' },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
    return items
      .slice(0, 6)
      .map((item, i) => parseRssItem(item, feed.name, feed.sourceUrl, feed.topic, i))
      .filter((a): a is NewsArticle => a !== null);
  } catch {
    return [];
  }
}

async function fetchGoogleNewsSearch(search: typeof GOOGLE_NEWS_SEARCHES[0]): Promise<NewsArticle[]> {
  try {
    const encoded = encodeURIComponent(search.query);
    const res = await fetch(
      `https://news.google.com/rss/search?q=${encoded}&hl=en-NG&gl=NG&ceid=NG:en`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    return items.slice(0, 4).map((item, i) => {
      const title = (
        item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/s)?.[1] ??
        item.match(/<title>(.*?)<\/title>/s)?.[1] ??
        ''
      ).trim();

      const link = item.match(/<link>(.*?)<\/link>/)?.[1]?.trim() ?? '';
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? '';
      const sourceName = (
        item.match(/<source[^>]*>(.*?)<\/source>/s)?.[1] ?? 'Google News'
      ).trim();

      return {
        id: `gnews_${search.topic}_${i}`,
        title,
        description: '',
        url: link,
        source: sourceName,
        sourceUrl: 'https://news.google.com',
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        topic: search.topic,
      };
    }).filter(a => a.title && a.url);
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic'); // optional filter

  try {
    // Fetch from all sources in parallel
    const rssFetches = RSS_FEEDS.map(feed => fetchRssFeed(feed));
    const googleFetches = GOOGLE_NEWS_SEARCHES.map(s => fetchGoogleNewsSearch(s));

    const results = await Promise.all([...rssFetches, ...googleFetches]);
    let allArticles = results.flat();

    // Filter by topic if requested
    if (topic) {
      allArticles = allArticles.filter(
        a => a.topic.toLowerCase().includes(topic.toLowerCase()) ||
             a.title.toLowerCase().includes(topic.toLowerCase())
      );
    }

    // Deduplicate by title similarity
    const seen = new Set<string>();
    const unique = allArticles.filter(a => {
      const key = a.title.slice(0, 50).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort by date, newest first
    unique.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return NextResponse.json({
      articles: unique.slice(0, 40),
      count: unique.length,
      sources: RSS_FEEDS.map(f => ({ name: f.name, url: f.sourceUrl })),
      fetchedAt: new Date().toISOString(),
      note: 'Live news from Nigerian health publications and Google News. All free, no API key required.',
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch news', articles: [] }, { status: 500 });
  }
}
