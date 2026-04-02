'use client';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { topics, recentMentions, sentimentBreakdown, mentionsTrend } from '@/lib/mock-data';
import { sentimentLabel, formatNumber } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { SmilePlus, Frown, Info } from 'lucide-react';

const weeklyMood = mentionsTrend.map(d => ({
  date: d.date,
  'Positive %': Math.round((d.positive / d.mentions) * 100),
  'Negative %': Math.round((d.negative / d.mentions) * 100),
}));

const sentimentByTopic = topics.map(t => ({
  name: t.name.split(' ').slice(0, 2).join(' '),
  negative: Math.round(Math.abs(t.sentimentScore) * 60),
  positive: Math.round((1 - Math.abs(t.sentimentScore)) * 40),
  neutral: Math.round((1 - Math.abs(t.sentimentScore)) * 20),
}));

export default function SentimentPage() {
  const happyPosts = recentMentions.filter(m => ['positive', 'hope'].includes(m.sentiment));
  const concernedPosts = recentMentions.filter(m => ['negative', 'anger', 'frustration', 'fear'].includes(m.sentiment));

  return (
    <div className="bg-gray-50 min-h-full">
      <Header title="Sentiment Dashboard" subtitle="Emotional intelligence across all conversations" />
      <div className="p-6 space-y-6 max-w-[1600px]">

        {/* Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sentimentBreakdown.map(({ name, value, color }) => (
            <div key={name} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                <span className="text-gray-500 text-xs font-medium">{name}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}%</p>
              <div className="mt-2 h-1 bg-gray-100 rounded-full">
                <div className="h-1 rounded-full" style={{ width: `${value}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>

        {/* 7-day trend */}
        <Card>
          <CardHeader>
            <CardTitle>Positive vs Negative Trend — 7 Days</CardTitle>
            <p className="text-gray-400 text-xs mt-0.5">How the emotional tone of conversations has shifted this week</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyMood}>
                <CartesianGrid stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v) => [`${v}%`]} />
                <Line type="monotone" dataKey="Positive %" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 3 }} />
                <Line type="monotone" dataKey="Negative %" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <SmilePlus className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-emerald-700">What Women Are Positive About</CardTitle>
                  <p className="text-gray-400 text-xs mt-0.5">Top themes driving positive conversations</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2.5">
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
                      <span className="text-emerald-600 text-xs font-semibold">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-1.5 bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-100 space-y-3">
                <p className="text-gray-400 text-[10px] uppercase tracking-wide font-medium">Example Posts (Illustrative)</p>
                {happyPosts.slice(0, 2).map(post => (
                  <div key={post.id} className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                    <p className="text-gray-700 text-xs line-clamp-3 leading-relaxed">&ldquo;{post.content}&rdquo;</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-500 text-[10px]">— {post.author}</span>
                      <Badge variant="positive" size="sm">{sentimentLabel(post.sentiment)}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                  <Frown className="w-3.5 h-3.5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-red-600">What Women Are Worried / Angry About</CardTitle>
                  <p className="text-gray-400 text-xs mt-0.5">Top themes driving negative conversations</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2.5">
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
                      <span className="text-red-600 text-xs font-semibold">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-1.5 bg-red-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-100 space-y-3">
                <p className="text-gray-400 text-[10px] uppercase tracking-wide font-medium">Example Posts (Illustrative)</p>
                {concernedPosts.slice(0, 2).map(post => (
                  <div key={post.id} className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-gray-700 text-xs line-clamp-3 leading-relaxed">&ldquo;{post.content}&rdquo;</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-500 text-[10px]">— {post.author}</span>
                      <Badge variant="negative" size="sm">{sentimentLabel(post.sentiment)}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sentiment by Topic */}
        <Card>
          <CardHeader>
            <CardTitle>Positive vs Negative by Topic</CardTitle>
            <p className="text-gray-400 text-xs mt-0.5">Breakdown of emotional tone for each health topic</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={sentimentByTopic} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} width={110} />
                <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="positive" name="Positive" fill="#10b981" radius={[0, 4, 4, 0]} stackId="a" />
                <Bar dataKey="neutral" name="Neutral" fill="#9ca3af" radius={0} stackId="a" />
                <Bar dataKey="negative" name="Negative" fill="#ef4444" radius={[0, 4, 4, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Language breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Language Detection</CardTitle>
            <p className="text-gray-400 text-xs mt-0.5">Languages detected in women's health conversations in Nigeria</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { lang: 'English', pct: 68, color: '#7c3aed' },
                { lang: 'Nigerian Pidgin', pct: 18, color: '#e11d48' },
                { lang: 'Yoruba', pct: 6, color: '#f59e0b' },
                { lang: 'Hausa', pct: 5, color: '#10b981' },
                { lang: 'Igbo', pct: 3, color: '#06b6d4' },
              ].map(({ lang, pct, color }) => (
                <div key={lang} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-sm font-bold border-4"
                    style={{ borderColor: color, background: `${color}20`, color }}>
                    {pct}%
                  </div>
                  <p className="text-gray-700 text-xs font-medium">{lang}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-xs leading-relaxed">
            Sentiment analysis is performed using AI natural language processing across aggregated social media and news data.
            Example posts shown are illustrative. To see real social media posts with live sentiment scoring, connect platform API credentials in <a href="/admin" className="underline font-medium">Admin Settings</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
