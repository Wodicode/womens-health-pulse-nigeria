'use client';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { topics, recentMentions, sentimentBreakdown, mentionsTrend } from '@/lib/mock-data';
import { sentimentColor, sentimentLabel, formatNumber, timeAgo, platformLabel } from '@/lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';
import { SmilePlus, Frown, AlertCircle, MessageSquare } from 'lucide-react';

const happyPosts = recentMentions.filter(m => ['positive', 'hope'].includes(m.sentiment));
const concernedPosts = recentMentions.filter(m => ['negative', 'anger', 'frustration', 'fear'].includes(m.sentiment));

const sentimentByTopic = topics.map(t => ({
  name: t.name.split(' ').slice(0, 2).join(' '),
  negative: Math.round(Math.abs(t.sentimentScore) * 60),
  positive: Math.round((1 - Math.abs(t.sentimentScore)) * 40),
  neutral: Math.round((1 - Math.abs(t.sentimentScore)) * 20),
}));

const weeklyMoodData = mentionsTrend.map(d => ({
  date: d.date,
  'Positive %': Math.round((d.positive / d.mentions) * 100),
  'Negative %': Math.round((d.negative / d.mentions) * 100),
}));

export default function SentimentPage() {
  return (
    <div>
      <Header title="Sentiment Dashboard" subtitle="Emotional intelligence across all women's health conversations" />
      <div className="p-6 space-y-6">
        {/* Sentiment Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sentimentBreakdown.map(({ name, value, color }) => (
            <div key={name} className="rounded-2xl border border-white/8 bg-white/3 p-4">
              <div className="w-3 h-3 rounded-full mb-3" style={{ background: color }} />
              <p className="text-white text-2xl font-bold">{value}%</p>
              <p className="text-white/50 text-xs mt-0.5">{name}</p>
            </div>
          ))}
        </div>

        {/* Sentiment Trend Over Time */}
        <Card>
          <CardHeader><CardTitle>Positive vs Negative Sentiment — 7 Day Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyMoodData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip
                  contentStyle={{ background: '#1a1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                  itemStyle={{ color: 'white' }}
                  formatter={(v) => [`${v}%`]}
                />
                <Line type="monotone" dataKey="Positive %" stroke="#22c55e" strokeWidth={2.5} dot={{ fill: '#22c55e', r: 3 }} />
                <Line type="monotone" dataKey="Negative %" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Side by Side: Happy vs Concerned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* What Women Are Happy About */}
          <Card className="border-emerald-500/20">
            <CardHeader className="border-emerald-500/10">
              <div className="flex items-center gap-2">
                <SmilePlus className="w-4 h-4 text-emerald-400" />
                <CardTitle className="text-emerald-400">What Women Are Happy About</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Themes */}
              <div className="space-y-2">
                {[
                  { theme: 'Community support & shared experiences', pct: 34 },
                  { theme: 'Successful treatments & recoveries', pct: 28 },
                  { theme: 'Awareness campaigns gaining traction', pct: 19 },
                  { theme: 'Doctors sharing accurate information', pct: 12 },
                  { theme: 'Free healthcare access points', pct: 7 },
                ].map(({ theme, pct }) => (
                  <div key={theme}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/70 text-xs">{theme}</span>
                      <span className="text-emerald-400 text-xs font-semibold">{pct}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Example Posts */}
              <div className="pt-3 border-t border-white/8 space-y-3">
                <p className="text-white/40 text-[10px] uppercase tracking-wide font-medium">Example Posts</p>
                {happyPosts.slice(0, 2).map(post => (
                  <div key={post.id} className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3">
                    <p className="text-white/70 text-xs line-clamp-3">&quot;{post.content}&quot;</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-emerald-400/70 text-[10px]">— {post.author}</span>
                      <Badge variant="positive" size="sm" className="text-[10px]">{sentimentLabel(post.sentiment)}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What Women Are Angry or Worried About */}
          <Card className="border-red-500/20">
            <CardHeader className="border-red-500/10">
              <div className="flex items-center gap-2">
                <Frown className="w-4 h-4 text-red-400" />
                <CardTitle className="text-red-400">What Women Are Angry or Worried About</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  { theme: 'Cost of healthcare & antenatal care', pct: 41 },
                  { theme: 'Medical negligence & poor treatment', pct: 27 },
                  { theme: 'NHIA confusion & inaccessibility', pct: 16 },
                  { theme: 'Misinformation & harmful myths', pct: 10 },
                  { theme: 'Lack of mental health support', pct: 6 },
                ].map(({ theme, pct }) => (
                  <div key={theme}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/70 text-xs">{theme}</span>
                      <span className="text-red-400 text-xs font-semibold">{pct}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-red-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/8 space-y-3">
                <p className="text-white/40 text-[10px] uppercase tracking-wide font-medium">Example Posts</p>
                {concernedPosts.slice(0, 2).map(post => (
                  <div key={post.id} className="bg-red-500/5 border border-red-500/15 rounded-xl p-3">
                    <p className="text-white/70 text-xs line-clamp-3">&quot;{post.content}&quot;</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-red-400/70 text-[10px]">— {post.author}</span>
                      <Badge variant="negative" size="sm" className="text-[10px]">{sentimentLabel(post.sentiment)}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sentiment by Topic Chart */}
        <Card>
          <CardHeader><CardTitle>Sentiment Breakdown by Topic</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={sentimentByTopic} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }} axisLine={false} tickLine={false} width={100} />
                <Tooltip
                  contentStyle={{ background: '#1a1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                  itemStyle={{ color: 'white' }}
                />
                <Bar dataKey="positive" name="Positive" fill="#22c55e" radius={[0, 4, 4, 0]} stackId="a" />
                <Bar dataKey="neutral" name="Neutral" fill="#6b7280" radius={0} stackId="a" />
                <Bar dataKey="negative" name="Negative" fill="#ef4444" radius={[0, 4, 4, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Language Breakdown */}
        <Card>
          <CardHeader><CardTitle>Language Detection</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { lang: 'English', pct: 68, color: '#8b5cf6' },
                { lang: 'Nigerian Pidgin', pct: 18, color: '#ec4899' },
                { lang: 'Yoruba', pct: 6, color: '#f59e0b' },
                { lang: 'Hausa', pct: 5, color: '#22c55e' },
                { lang: 'Igbo', pct: 3, color: '#06b6d4' },
              ].map(({ lang, pct, color }) => (
                <div key={lang} className="text-center p-4 bg-white/3 rounded-2xl border border-white/8">
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-lg font-bold border-4" style={{ borderColor: color, background: `${color}20` }}>
                    {pct}%
                  </div>
                  <p className="text-white/70 text-xs font-medium">{lang}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
