import { NextResponse } from 'next/server';

// Search terms for Nigerian women's health
const SEARCH_QUERIES = [
  'maternal health Nigeria',
  'fibroid Nigeria women',
  'cervical cancer Nigeria',
  'PCOS Nigeria',
  'NHIA Nigeria healthcare',
  'maternal mortality Nigeria',
  'women health Nigeria',
];

// Reddit subreddits with Nigerian/African health discussions
const SUBREDDITS = [
  'Nigeria',
  'Africa',
  'NigerianMed',
  'globalhealth',
];

interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  author: string;
  subreddit: string;
  score: number;
  num_comments: number;
  created_utc: number;
  permalink: string;
  url: string;
}

interface NormalizedPost {
  id: string;
  platform: 'reddit' | 'news';
  author: string;
  content: string;
  url: string;
  score: number;
  comments: number;
  publishedAt: string;
  source: string;
  topic: string;
}

async function fetchRedditPosts(query: string): Promise<NormalizedPost[]> {
  try {
    const encoded = encodeURIComponent(query);
    // Reddit JSON API — completely free, no auth needed for public search
    const res = await fetch(
      `https://www.reddit.com/search.json?q=${encoded}+nigeria&sort=relevance&t=month&limit=10`,
      {
        headers: { 'User-Agent': 'WomensHealthPulseNigeria/1.0' },
        next: { revalidate: 900 }, // cache 15 min
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const posts: RedditPost[] = data?.data?.children?.map((c: { data: RedditPost }) => c.data) ?? [];

    return posts
      .filter(p => p.selftext || p.title)
      .map(p => ({
        id: `reddit_${p.id}`,
        platform: 'reddit' as const,
        author: `u/${p.author}`,
        content: p.selftext ? p.selftext.slice(0, 280) : p.title,
        url: `https://reddit.com${p.permalink}`,
        score: p.score,
        comments: p.num_comments,
        publishedAt: new Date(p.created_utc * 1000).toISOString(),
        source: `r/${p.subreddit}`,
        topic: query,
      }));
  } catch {
    return [];
  }
}

async function fetchGoogleNews(query: string): Promise<NormalizedPost[]> {
  try {
    const encoded = encodeURIComponent(`${query} Nigeria`);
    // Google News RSS — free, no API key required
    const res = await fetch(
      `https://news.google.com/rss/search?q=${encoded}&hl=en-NG&gl=NG&ceid=NG:en`,
      { next: { revalidate: 900 } }
    );
    if (!res.ok) return [];
    const xml = await res.text();

    // Parse RSS items from XML text
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
    return itemMatches.slice(0, 5).map((item, i) => {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
        ?? item.match(/<title>(.*?)<\/title>/)?.[1]
        ?? 'News Article';
      const link = item.match(/<link>(.*?)<\/link>/)?.[1] ?? '#';
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? '';
      const source = item.match(/<source[^>]*>(.*?)<\/source>/)?.[1] ?? 'Google News';

      return {
        id: `news_${query}_${i}`,
        platform: 'news' as const,
        author: source,
        content: title,
        url: link,
        score: 0,
        comments: 0,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        source,
        topic: query,
      };
    });
  } catch {
    return [];
  }
}

async function fetchSubredditPosts(subreddit: string): Promise<NormalizedPost[]> {
  try {
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/search.json?q=women+health+OR+maternal+OR+hospital+OR+pregnancy&sort=relevance&t=week&restrict_sr=1&limit=8`,
      {
        headers: { 'User-Agent': 'WomensHealthPulseNigeria/1.0' },
        next: { revalidate: 900 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const posts: RedditPost[] = data?.data?.children?.map((c: { data: RedditPost }) => c.data) ?? [];

    return posts.map(p => ({
      id: `reddit_sub_${p.id}`,
      platform: 'reddit' as const,
      author: `u/${p.author}`,
      content: p.selftext ? p.selftext.slice(0, 280) : p.title,
      url: `https://reddit.com${p.permalink}`,
      score: p.score,
      comments: p.num_comments,
      publishedAt: new Date(p.created_utc * 1000).toISOString(),
      source: `r/${subreddit}`,
      topic: 'General Women\'s Health',
    }));
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic') ?? 'maternal health Nigeria';
  const source = searchParams.get('source') ?? 'all'; // 'reddit' | 'news' | 'all'

  try {
    const promises: Promise<NormalizedPost[]>[] = [];

    if (source === 'all' || source === 'reddit') {
      promises.push(fetchRedditPosts(topic));
      // Also pull from r/Nigeria subreddit
      promises.push(fetchSubredditPosts('Nigeria'));
    }

    if (source === 'all' || source === 'news') {
      promises.push(fetchGoogleNews(topic));
    }

    const results = await Promise.all(promises);
    const allPosts = results.flat();

    // Deduplicate by id
    const seen = new Set<string>();
    const unique = allPosts.filter(p => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });

    // Sort by date descending
    unique.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return NextResponse.json({
      posts: unique.slice(0, 30),
      count: unique.length,
      sources: [...new Set(unique.map(p => p.source))],
      fetchedAt: new Date().toISOString(),
      note: 'Live data from Reddit public API and Google News RSS. No authentication required.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch social posts', posts: [] },
      { status: 500 }
    );
  }
}
