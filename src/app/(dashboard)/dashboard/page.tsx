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
  ArrowUp, ArrowDown, Flame, Newspaper, BookOpen,
  CheckCircle, Info, ChevronRight, Zap, Target, FileText, Map
} from 'lucide-react';
import { LiveSocialFeed, LiveNewsFeed } from '@/components/ui/LiveFeed';

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string
}) => {
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
    <div className="bg-[#f8f7f5] min-h-full">
      <Header title="RenewHER Women's Health Pulse" subtitle="Intelligence Command Centre" />

      <div className="p-6 space-y-6 max-w-[1600px] animate-fade-in">

        {/* ── TIER 1: HERO INSIGHT PANEL ─────────────────────────────────── */}
        <div className="hero-card p-8 md:p-10">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
          />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Main insight */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  <span className="text-rose-200 text-[11px] font-semibold uppercase tracking-widest">Top Issue This Week</span>
                </div>
                <span className="text-white/40 text-xs">Week of Apr 2, 2026</span>
              </div>

              <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3">
                NHIA enrolment confusion surged <span className="text-emerald-300">+67%</span> this week — women in Lagos and Abuja are asking "how do I actually sign up?"
              </h1>
              <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-2xl">
                4,900+ mentions detected across X/Twitter, Facebook, and Nairaland. Strongest signal in Lagos (38%), Abuja (24%), and Kano (18%). Sentiment is 61% confused, 22% frustrated — a prime content opportunity.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="/content-studio"
                  className="inline-flex items-center gap-2 bg-white text-violet-900 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-violet-50 transition-all shadow-sm">
                  <Zap className="w-4 h-4 text-violet-600" />
                  Create Response Content
                </a>
                <a href="/topics"
                  className="inline-flex items-center gap-2 border border-white/25 text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 transition-all">
                  <Target className="w-4 h-4" />
                  View Full Analysis
                </a>
              </div>
            </div>

            {/* Urgency metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 flex-shrink-0 lg:min-w-[180px]">
              {[
                { label: 'Urgency Score', value: '87/100', color: 'text-rose-300' },
                { label: 'Mentions / Hour', value: '+312', color: 'text-amber-300' },
                { label: 'States Affected', value: '12 of 36', color: 'text-emerald-300' },
                { label: 'Content Gap', value: 'Critical', color: 'text-white' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white/10 border border-white/15 rounded-xl p-3">
                  <p className="text-white/50 text-[10px] uppercase tracking-wide mb-1">{label}</p>
                  <p className={`font-bold text-base ${color}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TIER 2: CRITICAL ALERT ─────────────────────────────────────── */}
        {unreadCritical.length > 0 && (
          <div className="urgent-panel p-4 flex items-start gap-4">
            <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4.5 h-4.5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-red-800 font-semibold text-sm">Critical Misinformation — Immediate Response Required</p>
              <p className="text-red-600/80 text-sm mt-0.5 leading-relaxed">
                HPV vaccine misinformation has reached <strong>34,720 mentions</strong> and is spreading rapidly across platforms. Immediate factual response recommended.
              </p>
            </div>
            <a href="/misinformation"
              className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-700 transition-all flex-shrink-0">
              Respond now <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* ── TIER 2: KPI ROW ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-delay-1">
          {[
            {
              label: 'Total Mentions Today',
              value: '28,765',
              change: '+18.3%',
              up: true,
              sub: 'vs yesterday',
              icon: Flame,
              iconBg: 'bg-violet-50',
              iconColor: 'text-violet-600',
            },
            {
              label: 'Fastest Growing Topic',
              value: 'NHIA Enrolment',
              change: '+67.3%',
              up: true,
              sub: 'in 24 hours',
              icon: TrendingUp,
              iconBg: 'bg-amber-50',
              iconColor: 'text-amber-600',
            },
            {
              label: 'Active Misinfo Alerts',
              value: '5',
              change: '1 critical',
              up: false,
              sub: 'needs response',
              icon: AlertTriangle,
              iconBg: 'bg-red-50',
              iconColor: 'text-red-600',
            },
            {
              label: 'Content Opportunities',
              value: '12',
              change: '3 high priority',
              up: null,
              sub: 'ready to create',
              icon: Target,
              iconBg: 'bg-emerald-50',
              iconColor: 'text-emerald-600',
            },
          ].map(({ label, value, change, up, sub, icon: Icon, iconBg, iconColor }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm card-lift">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                {up !== null && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {up ? '↑' : '↓'} {change}
                  </span>
                )}
              </div>
              <p className={`font-bold mb-1 ${value.length > 8 ? 'text-xl' : 'text-3xl'} text-gray-900`}>{value}</p>
              <p className="text-gray-500 text-xs leading-tight">{label}</p>
              <p className="text-gray-400 text-[10px] mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── TIER 2: SENTIMENT SPLIT ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-delay-2">
          {[
            {
              label: 'What Women Are Hopeful About',
              pct: 22,
              color: 'bg-emerald-500',
              textColor: 'text-emerald-600',
              bg: 'bg-emerald-50 border-emerald-100',
              themes: ['Healthcare reform', 'NHIA progress', 'Community support'],
            },
            {
              label: 'What Women Are Angry or Worried About',
              pct: 38,
              color: 'bg-rose-500',
              textColor: 'text-rose-600',
              bg: 'bg-rose-50 border-rose-100',
              themes: ['Healthcare costs', 'Misinformation', 'Lack of access'],
            },
            {
              label: 'What Women Are Confused About',
              pct: 40,
              color: 'bg-amber-500',
              textColor: 'text-amber-600',
              bg: 'bg-amber-50 border-amber-100',
              themes: ['NHIA enrolment', 'Treatment options', 'Vaccine safety'],
            },
          ].map(({ label, pct, color, textColor, bg, themes }) => (
            <div key={label} className={`rounded-2xl border p-5 ${bg}`}>
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-3 leading-relaxed">{label}</p>
              <div className="flex items-end gap-3 mb-4">
                <p className={`text-4xl font-bold ${textColor}`}>{pct}%</p>
                <p className="text-gray-400 text-xs pb-1.5">of all mentions</p>
              </div>
              <div className="w-full bg-white/60 rounded-full h-1.5 mb-4">
                <div className={`h-1.5 ${color} rounded-full`} style={{ width: `${pct}%` }} />
              </div>
              <div className="space-y-1.5">
                {themes.map(t => (
                  <div key={t} className="flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full ${color}`} />
                    <span className="text-gray-600 text-xs">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── TIER 3: CHARTS ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 animate-fade-in-delay-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Mentions Over Time</CardTitle>
                  <p className="text-gray-400 text-xs mt-0.5">Last 7 days across all platforms</p>
                </div>
                <div className="flex gap-4 text-xs">
                  {[{ label: 'Total', color: '#6d28d9' }, { label: 'Positive', color: '#10b981' }, { label: 'Negative', color: '#ef4444' }].map(({ label, color }) => (
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
                    {[{ id: 'v', color: '#6d28d9' }, { id: 'g', color: '#10b981' }, { id: 'r', color: '#ef4444' }].map(({ id, color }) => (
                      <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.12} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="mentions" name="Total" stroke="#6d28d9" strokeWidth={2} fill="url(#v)" />
                  <Area type="monotone" dataKey="positive" name="Positive" stroke="#10b981" strokeWidth={1.5} fill="url(#g)" />
                  <Area type="monotone" dataKey="negative" name="Negative" stroke="#ef4444" strokeWidth={1.5} fill="url(#r)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

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

        {/* ── TIER 3: PLATFORM + TOPICS ──────────────────────────────────── */}
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
                      <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
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
                <a key={topic.id} href="/topics"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-all group card-lift">
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

        {/* ── TIER 3: VERIFIED HEALTH STATISTICS ─────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-gray-900 font-bold text-lg">Key Health Statistics — Nigeria</h2>
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
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm card-lift">
                <p className="text-gray-500 text-xs font-medium mb-3 leading-relaxed">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mb-0.5">
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

        {/* ── TIER 3: NEWS + ALERTS ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-gray-400" />
                  <div>
                    <CardTitle>Latest Verified Health News</CardTitle>
                    <p className="text-gray-400 text-xs mt-0.5">WHO, UNICEF, NDHS, FMoH sources</p>
                  </div>
                </div>
                <Badge variant="positive">Verified</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-0">
              {realNewsArticles.slice(0, 4).map((article, i) => (
                <div key={article.id} className={`py-3.5 flex items-start gap-3 ${i < 3 ? 'border-b border-gray-50' : ''}`}>
                  <div className="w-7 h-7 bg-violet-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className="w-3 h-3 text-violet-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer"
                        className="text-gray-800 text-xs font-medium hover:text-violet-700 leading-snug flex-1 line-clamp-2">
                        {article.title}
                      </a>
                      <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-violet-600 text-[10px] font-medium">
                        {article.source} <ExternalLink className="w-2 h-2" />
                      </a>
                      <span className="text-gray-300 text-[10px]">·</span>
                      <span className="text-gray-400 text-[10px]">{new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Alerts</CardTitle>
                  <p className="text-gray-400 text-xs mt-0.5">Requires attention</p>
                </div>
                <a href="/alerts" className="text-violet-600 text-xs font-medium hover:text-violet-800 flex items-center gap-1">
                  Manage <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {alerts.slice(0, 4).map(alert => (
                <div key={alert.id} className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                  alert.severity === 'critical' && !alert.isRead
                    ? 'border-red-100 bg-red-50'
                    : alert.isRead
                    ? 'border-gray-100 bg-gray-50/50'
                    : 'border-gray-100 bg-white'
                }`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    alert.isRead ? 'bg-gray-300' :
                    alert.severity === 'critical' ? 'bg-red-500 animate-pulse' :
                    alert.severity === 'high' ? 'bg-orange-500' : 'bg-amber-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className={`text-xs font-semibold ${alert.isRead ? 'text-gray-400' : 'text-gray-800'}`}>{alert.title}</p>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold border ${severityBg(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-gray-400 text-[10px] mt-0.5">{timeAgo(alert.createdAt)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ── TIER 3: AI INSIGHTS ─────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Weekly Intelligence Summary</CardTitle>
                <p className="text-gray-400 text-xs mt-0.5">Key findings — week of Mar 26 – Apr 2, 2026</p>
              </div>
              <Badge variant="purple">AI Analysis</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {weeklySummary.keyInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 card-lift">
                  <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-700 text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── TIER 3: STATE ACTIVITY ──────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-gray-400" />
              <div>
                <CardTitle>Conversation Activity by State</CardTitle>
                <p className="text-gray-400 text-xs mt-0.5">Which Nigerian states are driving the most women's health conversations</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {nigerianStates.map(state => (
                <div key={state.code} className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-center hover:border-violet-200 hover:bg-violet-50/30 transition-all cursor-pointer card-lift">
                  <p className="text-gray-800 font-semibold text-sm leading-tight">{state.name}</p>
                  <p className="text-violet-700 text-xs font-bold mt-1">{formatNumber(state.mentionCount)}</p>
                  <div className={`mt-1 text-[10px] font-medium ${
                    state.sentiment < -0.1 ? 'text-red-500' :
                    state.sentiment > 0.1 ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {state.sentiment < -0.1 ? '↓ Negative' : state.sentiment > 0.1 ? '↑ Positive' : '→ Neutral'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── TIER 3: LIVE FEEDS ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Social Discussions</CardTitle>
              <p className="text-gray-400 text-xs mt-0.5">Real posts from Reddit and Google News — refreshed every 15 minutes</p>
            </CardHeader>
            <CardContent>
              <LiveSocialFeed topic="maternal health Nigeria women" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Live Nigerian Health News</CardTitle>
              <p className="text-gray-400 text-xs mt-0.5">Vanguard, Pulse Nigeria, Guardian NG, Channels TV</p>
            </CardHeader>
            <CardContent>
              <LiveNewsFeed />
            </CardContent>
          </Card>
        </div>

        {/* Data note */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-xs leading-relaxed">
            <span className="font-semibold">About this data:</span> Statistics from WHO, UNICEF Nigeria, NDHS, GLOBOCAN, NHIA, and FMoH.
            Social mention volumes are aggregated estimates. For live social media data, connect API credentials in{' '}
            <a href="/admin" className="underline font-medium">Admin Settings</a>.
          </p>
        </div>

      </div>
    </div>
  );
}
