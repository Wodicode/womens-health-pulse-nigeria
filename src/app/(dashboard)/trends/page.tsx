'use client';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { googleTrends, nigerianStates, topics } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { TrendingUp, Zap, MapPin, Search, AlertCircle } from 'lucide-react';

const emergingTopics = topics
  .filter(t => t.isRising)
  .sort((a, b) => b.trendScore - a.trendScore)
  .slice(0, 5);

const stateHeatData = nigerianStates.sort((a, b) => b.mentionCount - a.mentionCount);

const trendTimeline = [
  { week: 'Mar W1', fibroids: 45, nhia: 12, postpartum: 18, hpv: 55 },
  { week: 'Mar W2', fibroids: 52, nhia: 18, postpartum: 24, hpv: 47 },
  { week: 'Mar W3', fibroids: 61, nhia: 31, postpartum: 38, hpv: 42 },
  { week: 'Mar W4', fibroids: 79, nhia: 67, postpartum: 72, hpv: 88 },
  { week: 'Apr W1', fibroids: 100, nhia: 95, postpartum: 82, hpv: 78 },
];

export default function TrendsPage() {
  return (
    <div>
      <Header title="Google Trends Intelligence" subtitle="Nigeria · Breakout topics, rising searches, and geographic concentration" />
      <div className="p-6 space-y-6">
        {/* Breakout Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {googleTrends.filter(t => t.isBreakout).map(trend => (
            <div key={trend.query} className="bg-gradient-to-br from-amber-600/15 to-amber-600/5 border border-amber-500/25 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400 text-[10px] font-semibold uppercase tracking-wide">Breakout</span>
              </div>
              <p className="text-white font-semibold text-sm mb-1">{trend.query}</p>
              <p className="text-amber-400 font-bold text-lg">+{trend.change}%</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-white/30" />
                <span className="text-white/40 text-xs">{trend.state}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Search Interest Over Time (Google Trends Nigeria)</CardTitle>
              <div className="flex gap-3 text-xs">
                {[
                  { label: 'Fibroids', color: '#8b5cf6' },
                  { label: 'NHIA', color: '#22c55e' },
                  { label: 'Postpartum', color: '#ec4899' },
                  { label: 'HPV', color: '#f59e0b' },
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
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={trendTimeline}>
                <defs>
                  {[
                    { id: 'g1', color: '#8b5cf6' },
                    { id: 'g2', color: '#22c55e' },
                    { id: 'g3', color: '#ec4899' },
                    { id: 'g4', color: '#f59e0b' },
                  ].map(({ id, color }) => (
                    <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#1a1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                  itemStyle={{ color: 'white' }}
                />
                <Area type="monotone" dataKey="fibroids" name="Fibroids" stroke="#8b5cf6" strokeWidth={2} fill="url(#g1)" />
                <Area type="monotone" dataKey="nhia" name="NHIA" stroke="#22c55e" strokeWidth={2} fill="url(#g2)" />
                <Area type="monotone" dataKey="postpartum" name="Postpartum" stroke="#ec4899" strokeWidth={2} fill="url(#g3)" />
                <Area type="monotone" dataKey="hpv" name="HPV" stroke="#f59e0b" strokeWidth={2} fill="url(#g4)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rising Queries Table + State Map */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Rising Queries */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <CardTitle>Rising Search Queries — Nigeria</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {googleTrends.map((trend, i) => (
                  <div key={trend.query} className="flex items-center gap-3">
                    <span className="text-white/25 text-xs font-bold w-5 text-center">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white text-sm">{trend.query}</span>
                        {trend.isBreakout && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/15 text-amber-400 rounded-full border border-amber-500/20 font-semibold">
                            Breakout
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/5 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-purple-500" style={{ width: `${trend.value}%` }} />
                        </div>
                        <span className="text-emerald-400 text-xs font-semibold">+{trend.change}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Concentration */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                <CardTitle>Geographic Concentration — Nigerian States</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stateHeatData.slice(0, 8)} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip
                    contentStyle={{ background: '#1a1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                    labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                    itemStyle={{ color: 'white' }}
                    formatter={(v) => [formatNumber(Number(v)), 'Mentions']}
                  />
                  <Bar dataKey="mentionCount" name="Mentions" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Emerging Topic Radar */}
        <Card className="border-amber-500/20 bg-gradient-to-br from-amber-600/8 to-transparent">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <CardTitle className="text-amber-400">Emerging Topic Radar — Next 7 Days Prediction</CardTitle>
              <Badge variant="warning">AI Predicted</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { topic: 'Menopause Awareness', prediction: 'Rising conversation expected as World Menopause Month approaches. Lagos and Abuja leading.', confidence: 87, driver: 'Seasonal + trending' },
                { topic: 'NHIA Enrolment Deadline', prediction: 'If government announces a deadline, this will spike massively. Monitor closely.', confidence: 79, driver: 'Policy watch' },
                { topic: 'Postpartum Mental Health', prediction: 'Search volume increasing 35% week-on-week. Expect mainstream coverage soon.', confidence: 92, driver: 'Breakout trend' },
                { topic: 'Free Cervical Cancer Screening', prediction: 'Multiple NGOs planning awareness campaigns. Opportunity to lead conversation.', confidence: 74, driver: 'Campaign calendar' },
                { topic: 'Affordable Fibroids Treatment', prediction: 'Cost-focused queries surging. Women seeking alternatives to expensive surgery.', confidence: 83, driver: 'Search + social' },
              ].map(({ topic, prediction, confidence, driver }) => (
                <div key={topic} className="bg-white/4 border border-amber-500/15 rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-white font-semibold text-sm">{topic}</p>
                    <span className="text-amber-400 text-xs font-bold">{confidence}%</span>
                  </div>
                  <p className="text-white/55 text-xs leading-relaxed mb-3">{prediction}</p>
                  <Badge variant="warning" size="sm">{driver}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Searches */}
        <Card>
          <CardHeader><CardTitle>Related Search Clusters</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {googleTrends.slice(0, 4).map(trend => (
                <div key={trend.query}>
                  <p className="text-white/60 text-xs font-medium mb-2">Related to: <span className="text-purple-400">{trend.query}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {trend.relatedQueries.map(q => (
                      <span key={q} className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/70 text-xs rounded-full flex items-center gap-1">
                        <Search className="w-2.5 h-2.5" />
                        {q}
                      </span>
                    ))}
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
