import { NextResponse } from 'next/server';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
  topic: string;
}

// Health topics to search on YouTube
const HEALTH_TOPICS = [
  'women health Nigeria',
  'maternal health Nigeria',
  'fibroid treatment Nigeria doctor',
  'cervical cancer awareness Nigeria',
  'PCOS Nigeria',
  'menstrual health Nigeria',
];

async function searchYouTube(query: string, apiKey: string): Promise<YouTubeVideo[]> {
  try {
    const encoded = encodeURIComponent(query);
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encoded}&regionCode=NG&relevanceLanguage=en&type=video&maxResults=5&order=relevance&key=${apiKey}`,
      { next: { revalidate: 3600 } } // cache 1 hour
    );
    if (!searchRes.ok) return [];
    const searchData = await searchRes.json();

    if (!searchData.items?.length) return [];

    // Get video statistics
    const videoIds = searchData.items.map((i: { id: { videoId: string } }) => i.id.videoId).join(',');
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const statsData = statsRes.ok ? await statsRes.json() : { items: [] };
    const statsMap: Record<string, { viewCount: string; likeCount: string; commentCount: string }> = {};
    for (const item of statsData.items ?? []) {
      statsMap[item.id] = item.statistics;
    }

    return searchData.items.map((item: {
      id: { videoId: string };
      snippet: {
        title: string;
        description: string;
        channelTitle: string;
        channelId: string;
        publishedAt: string;
        thumbnails: { medium: { url: string } };
      };
    }) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description?.slice(0, 200) ?? '',
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails?.medium?.url ?? '',
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      viewCount: statsMap[item.id.videoId]?.viewCount,
      likeCount: statsMap[item.id.videoId]?.likeCount,
      commentCount: statsMap[item.id.videoId]?.commentCount,
      topic: query,
    }));
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic') ?? 'women health Nigeria';
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      videos: [],
      error: 'YOUTUBE_API_KEY not configured',
      setup: 'Get a free API key at https://console.cloud.google.com — YouTube Data API v3 is free up to 10,000 units/day',
      note: 'Add YOUTUBE_API_KEY to your .env.local file to enable this feature',
    }, { status: 200 }); // 200 so the UI can show the setup message gracefully
  }

  try {
    // Search for the requested topic plus a few standard ones
    const queries = topic === 'all'
      ? HEALTH_TOPICS.slice(0, 3)
      : [topic];

    const results = await Promise.all(queries.map(q => searchYouTube(q, apiKey)));
    const allVideos = results.flat();

    // Deduplicate
    const seen = new Set<string>();
    const unique = allVideos.filter(v => {
      if (seen.has(v.id)) return false;
      seen.add(v.id);
      return true;
    });

    unique.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return NextResponse.json({
      videos: unique.slice(0, 20),
      count: unique.length,
      fetchedAt: new Date().toISOString(),
      source: 'YouTube Data API v3',
      sourceUrl: 'https://developers.google.com/youtube/v3',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch YouTube data', videos: [] }, { status: 500 });
  }
}
