'use client';
import { useState, useEffect } from 'react';
import { ExternalLink, MessageSquare, ThumbsUp, RefreshCw, Newspaper, AlertCircle } from 'lucide-react';

interface Post {
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

interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  topic: string;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  const m = Math.floor(diff / 60000);
  return `${m}m ago`;
}

export function LiveSocialFeed({ topic = 'maternal health Nigeria' }: { topic?: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastFetch, setLastFetch] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/social-posts?topic=${encodeURIComponent(topic)}`);
      const data = await res.json();
      if (data.posts) {
        setPosts(data.posts.filter((p: Post) => p.content.length > 30).slice(0, 10));
        setLastFetch(new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }));
      } else {
        setError('Could not load posts');
      }
    } catch {
      setError('Network error — check connection');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, [topic]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-gray-500 font-medium">Live · Reddit & Google News</span>
          {lastFetch && <span className="text-[10px] text-gray-400">Updated {lastFetch}</span>}
        </div>
        <button
          onClick={fetchPosts}
          disabled={loading}
          className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-red-600 text-xs">{error}</p>
        </div>
      )}

      {!loading && !error && posts.map(post => (
        <a
          key={post.id}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 bg-white rounded-xl border border-gray-100 hover:border-violet-200 hover:shadow-sm transition-all group"
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                post.platform === 'reddit'
                  ? 'bg-orange-50 text-orange-600 border border-orange-200'
                  : 'bg-blue-50 text-blue-600 border border-blue-200'
              }`}>
                {post.platform === 'reddit' ? 'Reddit' : 'News'}
              </span>
              <span className="text-[10px] text-gray-400">{post.source}</span>
              <span className="text-[10px] text-gray-300">·</span>
              <span className="text-[10px] text-gray-400">{timeAgo(post.publishedAt)}</span>
            </div>
            <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-violet-500 flex-shrink-0 mt-0.5" />
          </div>
          <p className="text-gray-700 text-xs leading-relaxed line-clamp-2">{post.content}</p>
          {(post.score > 0 || post.comments > 0) && (
            <div className="flex items-center gap-3 mt-1.5">
              {post.score > 0 && (
                <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                  <ThumbsUp className="w-2.5 h-2.5" /> {post.score}
                </span>
              )}
              {post.comments > 0 && (
                <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                  <MessageSquare className="w-2.5 h-2.5" /> {post.comments}
                </span>
              )}
            </div>
          )}
        </a>
      ))}

      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-400 text-xs text-center py-4">No posts found for this topic right now.</p>
      )}

      <p className="text-[10px] text-gray-400 pt-1">
        Real posts from Reddit public API and Google News RSS · No authentication required ·{' '}
        <a href="/admin" className="text-violet-500 hover:underline">Add more sources in Admin</a>
      </p>
    </div>
  );
}

export function LiveNewsFeed({ topic }: { topic?: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/news${topic ? `?topic=${encodeURIComponent(topic)}` : ''}`)
      .then(r => r.json())
      .then(d => { setArticles(d.articles?.slice(0, 8) ?? []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [topic]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <Newspaper className="w-4 h-4 text-violet-600" />
        <span className="text-sm font-semibold text-gray-800">Live Nigerian Health News</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {loading && (
        <div className="space-y-2">
          {[1,2,3].map(i => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      )}

      {!loading && articles.map(article => (
        <a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-violet-200 hover:shadow-sm transition-all group"
        >
          <div className="flex-1 min-w-0">
            <p className="text-gray-800 text-xs font-medium leading-snug line-clamp-2 group-hover:text-violet-700">
              {article.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-gray-400">{article.source}</span>
              <span className="text-[10px] text-gray-300">·</span>
              <span className="text-[10px] text-gray-400">{timeAgo(article.publishedAt)}</span>
              {article.topic !== 'General Health' && (
                <>
                  <span className="text-[10px] text-gray-300">·</span>
                  <span className="text-[10px] text-violet-500">{article.topic}</span>
                </>
              )}
            </div>
          </div>
          <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-violet-500 flex-shrink-0 mt-0.5" />
        </a>
      ))}

      {!loading && articles.length === 0 && (
        <p className="text-gray-400 text-xs text-center py-4">No news articles found.</p>
      )}

      <p className="text-[10px] text-gray-400 pt-1">
        Sources: Vanguard Nigeria, Pulse Nigeria, Guardian NG, Channels TV, Google News ·{' '}
        <a href="https://www.vanguardngr.com/category/health/" target="_blank" rel="noopener noreferrer" className="text-violet-500 hover:underline">
          View all on Vanguard
        </a>
      </p>
    </div>
  );
}
