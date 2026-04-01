'use client';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  dashboardStats, mentionsTrend, platformBreakdown,
  sentimentBreakdown, topics, alerts, nigerianStates,
  weeklySummary, recentMentions
} from '@/lib/mock-data';
import { formatNumber, formatPercent, platformColor, severityBg, timeAgo } from '@/lib/utils';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  TrendingUp, TrendingDown, AlertTriangle, MessageSquare,
  Zap, Shield, Eye, ExternalLink, ArrowUp, ArrowDown, Flame
} from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1630] border border-white/10 rounded-xl p-3 text-xs">
        <p className="text-white/60 mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-white/70">{p.name}:</span>
            <span className="text-white font-semibold">{formatNumber(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const unreadAlerts = alerts.filter(a => !a.isRead);

  const kpis = [
    {
      title: 'Total Mentions Today',
      value: formatNumber(dashboardStats.totalMentionsToday),
      change: dashboardStats.totalMentionsChange,
      icon: MessageSquare,
      color: 'text-purple-400',
      bg: 'from-purple-600/20 to-purple-600/5',
      border: 'border-purple-500/20',
    },
    {
      title: 'Fastest Growing Topic',
      value: dashboardStats.fastestGrowingTopic,
      change: dashboardStats.fastestGrowingChange,
      icon: Flame,
      color: 'text-amber-400',
      bg: 'from-amber-600/20 to-amber-600/5',
      border: 'border-amber-500/20',
      isText: true,
    },
    {
      title: 'Misinformation Detected',
      value: dashboardStats.misinformationCount.toString(),
      subtext: 'active alerts',
      icon: Shield,
      color: 'text-red-400',
      bg: 'from-red-600/20 to-red-600/5',
      border: 'border-red-500/20',
      isAlert: true,
    },
    {
      title: 'High-Risk Conversations',
      value: dashboardStats.highRiskConversations.toString(),
      subtext: 'requiring attention',
      icon: AlertTriangle,
      color: 'text-orange-400',
      bg: 'from-orange-600/20 to-orange-600/5',
      border: 'border-orange-500/20',
    },
  ];

  return (
    <div>
      <Header
        title="Intelligence Dashboard"
        subtitle="Women's Health Nigeria · Real-time monitoring · April 1, 2026"
      />

      <div className="p-6 space-y-6">
        {/* Critical Alert Banner */}
        {unreadAlerts.some(a => a.severity === 'critical') && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-400 font-semibold text-sm">Critical Alert Active</p>
              <p className="text-red-300/70 text-sm mt-0.5">
                HPV vaccine misinformation has reached 34,720 mentions and is spreading rapidly across platforms.
                Immediate response recommended.
              </p>
            </div>
            <Badge variant="negative">Critical</Badge>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map(({ title, value, change, subtext, icon: Icon, color, bg, border, isText, isAlert }) => (
            <div key={title} className={`rounded-2xl border ${border} bg-gradient-to-br ${bg} p-5`}>
              <div className="flex items-start justify-between mb-3">
                <p className="text-white/55 text-xs font-medium uppercase tracking-wide">{title}</p>
                <div className={`w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
              </div>
              <p className={`font-bold mb-1 ${isText ? 'text-base text-white' : 'text-2xl text-white'}`}>{value}</p>
              {change !== undefined && (
                <div className="flex items-center gap-1">
                  {change > 0
                    ? <ArrowUp className="w-3 h-3 text-emerald-400" />
                    : <ArrowDown className="w-3 h-3 text-red-400" />
                  }
                  <span className={`text-xs font-medium ${change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatPercent(change)} vs yesterday
                  </span>
                </div>
              )}
              {subtext && <p className="text-white/35 text-xs mt-1">{subtext}</p>}
              {isAlert && <p className="text-red-400/70 text-xs mt-1 font-medium">⚠ Review immediately</p>}
            </div>
          ))}
        </div>

        {/* Sentiment Split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-2xl p-4">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-1">Positive Sentiment</p>
            <p className="text-white text-3xl font-bold">22%</p>
            <p className="text-white/40 text-xs mt-1">Hope, positivity, solutions</p>
          </div>
          <div className="bg-red-500/8 border border-red-500/20 rounded-2xl p-4">
            <p className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-1">Negative Sentiment</p>
            <p className="text-white text-3xl font-bold">38%</p>
            <p className="text-white/40 text-xs mt-1">Anger, fear, frustration</p>
          </div>
          <div className="bg-white/4 border border-white/10 rounded-2xl p-4">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1">Neutral / Mixed</p>
            <p className="text-white text-3xl font-bold">40%</p>
            <p className="text-white/40 text-xs mt-1">Information-seeking, neutral</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Mentions Trend */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mentions Over Time (7 Days)</CardTitle>
                <div className="flex gap-3 text-xs">
                  {[
                    { label: 'Total', color: '#8b5cf6' },
                    { label: 'Positive', color: '#22c55e' },
                    { label: 'Negative', color: '#ef4444' },
                  ].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="text-white/50">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={mentionsTrend}>
                  <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="positive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="negative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="mentions" name="Total" stroke="#8b5cf6" strokeWidth={2} fill="url(#total)" />
                  <Area type="monotone" dataKey="positive" name="Positive" stroke="#22c55e" strokeWidth={1.5} fill="url(#positive)" />
                  <Area type="monotone" dataKey="negative" name="Negative" stroke="#ef4444" strokeWidth={1.5} fill="url(#negative)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sentiment Pie */}
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={sentimentBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sentimentBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, '']}
                    contentStyle={{ background: '#1a1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                    labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                    itemStyle={{ color: 'white' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {sentimentBreakdown.map(({ name, value, color }) => (
                  <div key={name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-white/50 text-xs truncate">{name}</span>
                    <span className="text-white text-xs font-medium ml-auto">{value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Breakdown + Trending Topics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Platform Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Mentions by Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {platformBreakdown.map(({ platform, count, color }) => {
                  const pct = Math.round((count / platformBreakdown[0].count) * 100);
                  return (
                    <div key={platform} className="flex items-center gap-3">
                      <span className="text-white/60 text-xs w-24 flex-shrink-0">{platform}</span>
                      <div className="flex-1 bg-white/5 rounded-full h-2">
                        <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                      </div>
                      <span className="text-white text-xs font-medium w-10 text-right">{formatNumber(count)}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Trending Topics · Right Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {topics.slice(0, 6).map((topic, i) => (
                <div key={topic.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group cursor-pointer">
                  <span className="text-white/25 text-xs font-bold w-5 text-center">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{topic.name}</span>
                      {topic.isRising && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <span className="text-white/40 text-xs">{formatNumber(topic.mentionCount)} mentions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${topic.mentionChange24h > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatPercent(topic.mentionChange24h)}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${topic.sentimentScore < -0.4 ? 'bg-red-500' : topic.sentimentScore < 0 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts + Viral Posts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Active Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Alerts</CardTitle>
                <Badge variant="negative">{unreadAlerts.length} unread</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.slice(0, 4).map(alert => (
                <div key={alert.id} className={`p-3 rounded-xl border ${alert.isRead ? 'border-white/5 bg-white/2' : 'border-white/10 bg-white/5'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alert.isRead ? 'bg-white/20' : alert.severity === 'critical' ? 'bg-red-500 animate-pulse' : alert.severity === 'high' ? 'bg-orange-500' : 'bg-amber-500'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium ${alert.isRead ? 'text-white/60' : 'text-white'}`}>{alert.title}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${severityBg(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-white/40 text-xs line-clamp-2">{alert.description}</p>
                      <p className="text-white/25 text-[10px] mt-1">{timeAgo(alert.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Viral Posts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Viral Posts</CardTitle>
                <Badge variant="purple">Live</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMentions.filter(m => m.isViral).slice(0, 3).map(mention => (
                <div key={mention.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      {mention.author[0]}
                    </div>
                    <span className="text-white text-xs font-medium">{mention.author}</span>
                    <Badge variant="outline" size="sm" className="text-[10px]">{mention.platform}</Badge>
                    {mention.isMisinformation && <Badge variant="negative" size="sm" className="text-[10px]">Misinfo</Badge>}
                    <span className="text-white/30 text-[10px] ml-auto">{timeAgo(mention.publishedAt)}</span>
                  </div>
                  <p className="text-white/60 text-xs line-clamp-2 pl-8">{mention.content}</p>
                  <div className="flex items-center gap-3 pl-8">
                    <span className="text-white/30 text-[10px]">🔥 {formatNumber(mention.engagementCount)} engagements</span>
                    <a href={mention.url} className="text-purple-400 text-[10px] hover:text-purple-300 flex items-center gap-1">
                      View <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Weekly Key Insights */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>AI Weekly Insights Summary</CardTitle>
              <Badge variant="purple">AI Generated</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {weeklySummary.keyInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white/3 rounded-xl border border-white/6">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-2.5 h-2.5 text-purple-400" />
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* State Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Most Active States — Mentions by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {nigerianStates.slice(0, 12).map(state => (
                <div key={state.code} className="bg-white/3 border border-white/8 rounded-xl p-3 text-center">
                  <p className="text-white font-semibold text-sm">{state.name}</p>
                  <p className="text-purple-400 text-xs font-bold mt-0.5">{formatNumber(state.mentionCount)}</p>
                  <div className={`mt-2 text-[10px] font-medium ${state.sentiment < -0.1 ? 'text-red-400' : state.sentiment > 0.1 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {state.sentiment < -0.1 ? '↓ Neg' : state.sentiment > 0.1 ? '↑ Pos' : '→ Neutral'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
