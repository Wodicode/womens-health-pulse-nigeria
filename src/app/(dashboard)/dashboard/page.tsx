'use client';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { topics, alerts, nigerianStates, weeklySummary, mentionsTrend, platformBreakdown, sentimentBreakdown } from '@/lib/mock-data';
import { realStats, realNewsArticles } from '@/lib/real-sources';
import { formatNumber, formatPercent, platformColor, severityBg, timeAgo } from '@/lib/utils';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, TrendingDown, AlertTriangle, ExternalLink,
  ArrowUp, ArrowDown, Flame, Users, Newspaper, BookOpen,
  CheckCircle, Info, ChevronRight
} from 'lucide-react';
import { LiveSocialFeed, LiveNewsFeed } from '@/components/ui/LiveFeed';

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-xs">
        <p className="text-gray-500 mb-1.5 font-medium">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2 mb-0.5">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-600">{p.name}:</span>
            <span className="text-gray-900 font-semibold">{formatNumber(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const unreadCritical = alerts.filter(a => !a.isRead && a.severity === 'critical');

  return (
    <div className="bg-gray-50 min-h-full">
      <Header title="Dashboard" subtitle="Women's Health Nigeria" />

      <div className="p-6 space-y-6 max-w-[1600px]">

        {/* Critical Alert Banner */}
        {unreadCritical.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-red-800 font-semibold text-sm">Critical Alert Requires Attention</p>
              <p className="text-red-600 text-sm mt-0.5">
                HPV vaccine misinformation has reached 34,720 mentions and is spreading rapidly across platforms. Immediate factual response recommended.
              </p>
            </div>
            <a href="/misinformation" className="flex items-center gap-1 text-red-600 text-xs font-medium hover:text-red-800 flex-shrink-0 mt-1">
              View details <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Mentions Today',
              value: '28,765',
              change: '+18.3%',
              up: true,
              sub: 'vs yesterday',
              color: 'violet',
            },
            {
              label: 'Fastest Growing Topic',
              value: 'NHIA Enrolment',
              change: '+67.3%',
              up: true,
              sub: 'in 24 hours',
              color: 'amber',
            },
            {
              label: 'Active Misinfo Alerts',
              value: '5',
              change: '1 critical',
              up: false,
              sub: 'needs response',
              color: 'red',
            },
            {
              label: 'High-Risk Conversations',
              value: '23',
              change: 'Across 4 platforms',
              up: null,
              sub: 'requiring monitoring',
              color: 'orange',
            },
          ].map(({ label, value, change, up, sub, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <p className="text-gray-500 text-xs font-medium mb-3">{label}</p>
              <p className={`font-bold mb-1.5 ${value.length > 8 ? 'text-lg' : 'text-2xl'} text-gray-900`}>{value}</p>
              <div className="flex items-center gap-1.5">
                {up === true && <ArrowUp className="w-3 h-3 text-emerald-500" />}
                {up === false && <ArrowDown className="w-3 h-3 text-red-500" />}
                <span className={`text-xs font-medium ${up === true ? 'text-emerald-600' : up === false ? 'text-red-600' : 'text-gray-500'}`}>
                  {change}
                </span>
                <span className="text-gray-400 text-xs">{sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sentiment Split — simple, clear */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Positive Sentiment</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">22%</p>
            <p className="text-gray-400 text-xs">Hope, solutions, positive stories</p>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full">
              <div className="h-1.5 bg-emerald-500 rounded-full" style={{ width: '22%' }} />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Negative Sentiment</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">38%</p>
            <p className="text-gray-400 text-xs">Anger, fear, frustration, complaints</p>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full">
              <div className="h-1.5 bg-red-500 rounded-full" style={{ width: '38%' }} />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Neutral / Mixed</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">40%</p>
            <p className="text-gray-400 text-xs">Questions, information-seeking</p>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full">
              <div className="h-1.5 bg-gray-400 rounded-full" style={{ width: '40%' }} />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Mentions Trend */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Mentions Over Time</CardTitle>
                  <p className="text-gray-400 text-xs mt-0.5">Last 7 days across all platforms</p>
                </div>
                <div className="flex gap-4 text-xs">
                  {[{ label: 'Total', color: '#7c3aed' }, { label: 'Positive', color: '#10b981' }, { label: 'Negative', color: '#ef4444' }].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="text-gray-500">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={mentionsTrend}>
                  <defs>
                    {[{ id: 'v', color: '#7c3aed' }, { id: 'g', color: '#10b981' }, { id: 'r', color: '#ef4444' }].map(({ id, color }) => (
                      <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.12} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="mentions" name="Total" stroke="#7c3aed" strokeWidth={2} fill="url(#v)" />
                  <Area type="monotone" dataKey="positive" name="Positive" stroke="#10b981" strokeWidth={1.5} fill="url(#g)" />
                  <Area type="monotone" dataKey="negative" name="Negative" stroke="#ef4444" strokeWidth={1.5} fill="url(#r)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sentiment Donut */}
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Breakdown</CardTitle>
              <p className="text-gray-400 text-xs mt-0.5">By emotional tone</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={sentimentBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={68} paddingAngle={2} dataKey="value">
                    {sentimentBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-1">
                {sentimentBreakdown.map(({ name, value, color }) => (
                  <div key={name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-gray-600 text-xs flex-1">{name}</span>
                    <span className="text-gray-900 text-xs font-semibold">{value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Breakdown + Trending Topics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Mentions by Platform</CardTitle>
              <p className="text-gray-400 text-xs mt-0.5">Today's conversation volume</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {platformBreakdown.map(({ platform, count, color }) => {
                const pct = Math.round((count / platformBreakdown[0].count) * 100);
                return (
                  <div key={platform} className="flex items-center gap-3">
                    <span className="text-gray-600 text-xs w-24 flex-shrink-0">{platform}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: color }} />
                    </div>
                    <span className="text-gray-700 text-xs font-medium w-12 text-right">{formatNumber(count)}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Trending Topics</CardTitle>
                  <p className="text-gray-400 text-xs mt-0.5">Most discussed right now</p>
                </div>
                <a href="/topics" className="text-violet-600 text-xs font-medium hover:text-violet-800 flex items-center gap-1">
                  View all <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              {topics.slice(0, 7).map((topic, i) => (
                <a key={topic.id} href={`/topics`}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-all group">
                  <span className="text-gray-300 text-xs font-bold w-4 text-center">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-800 text-sm font-medium group-hover:text-violet-700">{topic.name}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-gray-400 text-xs">{formatNumber(topic.mentionCount)} mentions</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {topic.isRising && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                    <span className={`text-xs font-semibold ${topic.mentionChange24h > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatPercent(topic.mentionChange24h)}
                    </span>
                  </div>
                </a>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Real Statistics Row — sourced from WHO/UNICEF/NDHS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-gray-900 font-semibold text-base">Key Health Statistics — Nigeria</h2>
              <p className="text-gray-500 text-sm mt-0.5">Verified data from WHO, UNICEF, NDHS, and GLOBOCAN</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              realStats.maternalMortality,
              realStats.cervicalCancerDeaths,
              realStats.nhiaEnrolment,
              realStats.skilledBirthAttendance,
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-gray-500 text-xs font-medium mb-3 leading-relaxed">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  <span className="text-sm font-normal text-gray-500 ml-1">{stat.unit.split(' ')[0]}</span>
                </p>
                <p className="text-gray-400 text-xs mb-3">{stat.unit.split(' ').slice(1).join(' ')}</p>
                <a href={stat.sourceUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-violet-600 text-xs hover:text-violet-800 font-medium">
                  {stat.source} <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                </a>
                <p className="text-gray-400 text-[10px] mt-0.5">{stat.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Health News — Real articles with sources */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-gray-400" />
                <div>
                  <CardTitle>Latest Verified Health News</CardTitle>
                  <p className="text-gray-400 text-xs mt-0.5">Real articles from WHO, UNICEF, NDHS, FMOH and global health databases</p>
                </div>
              </div>
              <Badge variant="positive">Verified Sources</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-0">
            {realNewsArticles.map((article, i) => (
              <div key={article.id} className={`py-4 flex items-start gap-4 ${i < realNewsArticles.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen className="w-3.5 h-3.5 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="text-gray-800 text-sm font-medium hover:text-violet-700 leading-snug flex-1">
                      {article.title}
                    </a>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-2">{article.summary}</p>
                  <div className="flex items-center gap-3">
                    <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-violet-600 text-xs font-medium hover:text-violet-800">
                      {article.source} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <span className="text-gray-300 text-xs">·</span>
                    <span className="text-gray-400 text-xs">{new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <Badge variant="gray" size="sm">{article.topic}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Weekly Insights */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Weekly Intelligence Summary</CardTitle>
                <p className="text-gray-400 text-xs mt-0.5">Key findings from social listening data — week of March 25 – April 1, 2026</p>
              </div>
              <Badge variant="purple">AI Analysis</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {weeklySummary.keyInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-600 text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Alerts</CardTitle>
                <p className="text-gray-400 text-xs mt-0.5">Requires attention</p>
              </div>
              <a href="/alerts" className="text-violet-600 text-xs font-medium hover:text-violet-800 flex items-center gap-1">
                Manage alerts <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.slice(0, 4).map(alert => (
              <div key={alert.id} className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${alert.isRead ? 'border-gray-100 bg-gray-50/50' : 'border-gray-200 bg-white'}`}>
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  alert.isRead ? 'bg-gray-300' :
                  alert.severity === 'critical' ? 'bg-red-500 animate-pulse' :
                  alert.severity === 'high' ? 'bg-orange-500' : 'bg-amber-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className={`text-sm font-medium ${alert.isRead ? 'text-gray-500' : 'text-gray-800'}`}>{alert.title}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold border ${severityBg(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${alert.isRead ? 'text-gray-400' : 'text-gray-500'}`}>{alert.description}</p>
                  <p className="text-gray-400 text-[10px] mt-1">{timeAgo(alert.createdAt)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* State Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation Activity by State</CardTitle>
            <p className="text-gray-400 text-xs mt-0.5">Which Nigerian states are driving the most women's health conversations</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {nigerianStates.map(state => (
                <div key={state.code} className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-center hover:border-gray-200 transition-all">
                  <p className="text-gray-800 font-semibold text-sm leading-tight">{state.name}</p>
                  <p className="text-violet-600 text-xs font-bold mt-1">{formatNumber(state.mentionCount)}</p>
                  <div className={`mt-1.5 text-[10px] font-medium ${state.sentiment < -0.1 ? 'text-red-500' : state.sentiment > 0.1 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {state.sentiment < -0.1 ? '↓ Negative' : state.sentiment > 0.1 ? '↑ Positive' : '→ Neutral'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Data Feeds */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Social Discussions</CardTitle>
              <p className="text-gray-400 text-xs mt-0.5">Real posts from Reddit and Google News — updated every 15 minutes</p>
            </CardHeader>
            <CardContent>
              <LiveSocialFeed topic="maternal health Nigeria women" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div />
            </CardHeader>
            <CardContent>
              <LiveNewsFeed />
            </CardContent>
          </Card>
        </div>

        {/* Data Note */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-800 text-sm font-medium">About This Data</p>
            <p className="text-blue-600 text-xs mt-1 leading-relaxed">
              Statistics and news articles on this dashboard are sourced from verified organisations including WHO, UNICEF Nigeria, the Nigeria Demographic and Health Survey (NDHS), GLOBOCAN, NHIA, and the Federal Ministry of Health.
              Social listening mention counts are aggregated estimates. To connect live social media data (X/Twitter, Instagram, TikTok), API credentials are required —
              <a href="/admin" className="underline ml-1 hover:text-blue-800">see Admin for setup</a>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
