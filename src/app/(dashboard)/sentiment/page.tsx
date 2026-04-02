'use client';
import { Header } from '@/components/layout/Header';
import { topics, recentMentions, sentimentBreakdown, mentionsTrend } from '@/lib/mock-data';
import { sentimentLabel } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { SmilePlus, Frown, Meh, TrendingDown, TrendingUp, Info, Heart, Flame, HelpCircle } from 'lucide-react';

const weeklyMood = mentionsTrend.map(d => ({
  date: d.date,
  'Positive %': Math.round((d.positive / d.mentions) * 100),
  'Negative %': Math.round((d.negative / d.mentions) * 100),
}));

const sentimentByTopic = topics.map(t => ({
  name: t.name.split(' ').slice(0, 3).join(' '),
  negative: Math.round(Math.abs(t.sentimentScore) * 60),
  positive: Math.round((1 - Math.abs(t.sentimentScore)) * 40),
  neutral: Math.round((1 - Math.abs(t.sentimentScore)) * 20),
}));

const emotionalTones = [
  { name: 'Negative', value: 38, color: '#ef4444', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', trend: '+4.1%', up: true },
  { name: 'Positive', value: 22, color: '#10b981', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', trend: '-1.2%', up: false },
  { name: 'Neutral', value: 18, color: '#6b7280', bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-500', trend: '+0.3%', up: true },
  { name: 'Frustration', value: 10, color: '#f59e0b', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', trend: '+2.8%', up: true },
  { name: 'Hope', value: 8, color: '#06b6d4', bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600', trend: '+0.9%', up: true },
  { name: 'Fear', value: 4, color: '#8b5cf6', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', trend: '-0.5%', up: false },
];

export default function SentimentPage() {
  const happyPosts = recentMentions.filter(m => ['positive', 'hope'].includes(m.sentiment));
  const concernedPosts = recentMentions.filter(m => ['negative', 'anger', 'frustration', 'fear'].includes(m.sentiment));

  return (
    <div className="bg-[#f8f7f5] min-h-full">
      <Header title="Sentiment Intelligence" subtitle="Emotional pulse of women's health conversations" />
      <div className="p-6 space-y-6 max-w-[1600px]">

        {/* Hero insight banner */}
        <div className="hero-card p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-3 py-1 mb-4">
                <Flame className="w-3 h-3 text-red-300" />
                <span className="text-red-200 text-[11px] font-semibold uppercase tracking-widest">Dominant Tone This Week</span>
              </div>
              <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
                38% of conversations carry <span className="text-red-300">frustration or fear</span>
              </h1>
              <p className="text-white/70 text-sm leading-relaxed max-w-xl">
                Healthcare cost anxiety is driving the most negative sentiment — peaking Thursday. Positive conversations cluster around community support and shared recovery stories.
              </p>
            </div>
            {/* Quick tone bars */}
            <div className="flex-shrink-0 w-full lg:w-72 space-y-2">
              {emotionalTones.slice(0, 4).map(({ name, value, color }) => (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-white/60 text-xs w-20 text-right flex-shrink-0">{name}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-2 rounded-full" style={{ width: `${value * 2.5}%`, background: color }} />
                  </div>
                  <span className="text-white text-xs font-bold w-8">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emotion tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {emotionalTones.map(({ name, value, bg, border, text, trend, up }) => (
            <div key={name} className={`${bg} ${border} border rounded-2xl p-4 text-center card-lift`}>
              <p className={`text-2xl font-black ${text}`}>{value}%</p>
              <p className="text-gray-600 text-xs font-medium mt-0.5">{name}</p>
              <div className={`flex items-center justify-center gap-0.5 mt-1.5 ${up ? 'text-red-500' : 'text-emerald-500'}`}>
                {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-[10px] font-semibold">{trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trend chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-gray-900 font-semibold text-sm">7-Day Emotional Trend</h3>
              <p className="text-gray-400 text-xs mt-0.5">How the emotional tone has shifted this week</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />Positive</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Negative</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyMood}>
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v) => [`${v}%`]} />
              <Line type="monotone" dataKey="Positive %" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 3 }} />
              <Line type="monotone" dataKey="Negative %" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Two emotional sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Hope section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">What Women Are Hopeful About</h3>
                  <p className="text-white/70 text-xs">Positive + hope sentiment · 22% of all conversations</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-3">
                {[
                  { theme: 'Community support & shared experiences', pct: 34 },
                  { theme: 'Successful treatments & recoveries', pct: 28 },
                  { theme: 'Awareness campaigns gaining traction', pct: 19 },
                  { theme: 'Doctors sharing accurate information', pct: 12 },
                  { theme: 'Free healthcare access points', pct: 7 },
                ].map(({ theme, pct }) => (
                  <div key={theme}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 text-xs">{theme}</span>
                      <span className="text-emerald-600 text-xs font-bold">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Sample Voices</p>
                {happyPosts.slice(0, 2).map(post => (
                  <div key={post.id} className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                    <p className="text-gray-700 text-xs line-clamp-3 leading-relaxed">&ldquo;{post.content}&rdquo;</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-400 text-[10px]">— {post.author}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{sentimentLabel(post.sentiment)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fear / Worry section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <Frown className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">What Women Are Worried or Angry About</h3>
                  <p className="text-white/70 text-xs">Negative + anger + frustration · 38% of all conversations</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-3">
                {[
                  { theme: 'Cost of healthcare & antenatal care', pct: 41 },
                  { theme: 'Medical negligence & poor treatment', pct: 27 },
                  { theme: 'NHIA confusion & inaccessibility', pct: 16 },
                  { theme: 'Misinformation & harmful myths', pct: 10 },
                  { theme: 'Lack of mental health support', pct: 6 },
                ].map(({ theme, pct }) => (
                  <div key={theme}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 text-xs">{theme}</span>
                      <span className="text-red-600 text-xs font-bold">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-1.5 bg-gradient-to-r from-red-400 to-rose-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Sample Voices</p>
                {concernedPosts.slice(0, 2).map(post => (
                  <div key={post.id} className="bg-red-50 border border-red-100 rounded-xl p-3">
                    <p className="text-gray-700 text-xs line-clamp-3 leading-relaxed">&ldquo;{post.content}&rdquo;</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-400 text-[10px]">— {post.author}</span>
                      <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">{sentimentLabel(post.sentiment)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment by topic bar + language */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-gray-900 font-semibold text-sm mb-1">Sentiment by Topic</h3>
            <p className="text-gray-400 text-xs mb-5">Emotional tone breakdown per health topic</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={sentimentByTopic} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} width={120} />
                <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="positive" name="Positive" fill="#10b981" radius={[0, 0, 0, 0]} stackId="a" />
                <Bar dataKey="neutral" name="Neutral" fill="#d1d5db" radius={0} stackId="a" />
                <Bar dataKey="negative" name="Negative" fill="#ef4444" radius={[0, 4, 4, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-gray-900 font-semibold text-sm mb-1">Language Breakdown</h3>
            <p className="text-gray-400 text-xs mb-5">Languages detected in health conversations</p>
            <div className="space-y-4">
              {[
                { lang: 'English', pct: 68, color: '#1a4731' },
                { lang: 'Nigerian Pidgin', pct: 18, color: '#c8006e' },
                { lang: 'Yoruba', pct: 6, color: '#f59e0b' },
                { lang: 'Hausa', pct: 5, color: '#10b981' },
                { lang: 'Igbo', pct: 3, color: '#06b6d4' },
              ].map(({ lang, pct, color }) => (
                <div key={lang}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-gray-700 text-xs font-medium">{lang}</span>
                    <span className="text-gray-900 text-xs font-bold">{pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-blue-700 text-[11px] leading-relaxed">
                Sentiment uses AI NLP across aggregated social and news data. Connect live APIs in <a href="/admin" className="underline font-medium">Admin Settings</a> for real-time posts.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
