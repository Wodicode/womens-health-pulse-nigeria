'use client';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { googleTrends, nigerianStates, topics } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Zap, MapPin, Search, AlertCircle, ExternalLink, Info } from 'lucide-react';

const trendTimeline = [
  { week: 'Mar W1', fibroids: 45, nhia: 12, postpartum: 18, hpv: 55 },
  { week: 'Mar W2', fibroids: 52, nhia: 18, postpartum: 24, hpv: 47 },
  { week: 'Mar W3', fibroids: 61, nhia: 31, postpartum: 38, hpv: 42 },
  { week: 'Mar W4', fibroids: 79, nhia: 67, postpartum: 72, hpv: 88 },
  { week: 'Apr W1', fibroids: 100, nhia: 95, postpartum: 82, hpv: 78 },
];

export default function TrendsPage() {
  return (
    <div className="bg-gray-50 min-h-full">
      <Header title="Google Trends" subtitle="Rising searches and breakout topics — Nigeria" />
      <div className="p-6 space-y-6 max-w-[1600px]">

        {/* Breakout Cards */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-500" />
            <h2 className="text-gray-800 font-semibold text-sm">Breakout Topics — Sudden significant increase in searches</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {googleTrends.filter(t => t.isBreakout).map(trend => (
              <div key={trend.query} className="bg-white rounded-xl border border-amber-200 p-4 shadow-sm">
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span className="text-amber-600 text-[10px] font-semibold uppercase tracking-wide">Breakout</span>
                </div>
                <p className="text-gray-800 font-semibold text-sm mb-1.5">{trend.query}</p>
                <p className="text-2xl font-bold text-amber-600">+{trend.change}%</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500 text-xs">Top in {trend.state}</span>
                </div>
                <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(trend.query)}&geo=NG`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-violet-600 text-[10px] font-medium mt-2 hover:text-violet-800">
                  View on Google Trends <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Search Interest Over Time — Nigeria</CardTitle>
                <p className="text-gray-400 text-xs mt-0.5">Relative search volume index (0–100)</p>
              </div>
              <div className="flex gap-4 text-xs">
                {[
                  { label: 'Fibroids', color: '#7c3aed' },
                  { label: 'NHIA', color: '#10b981' },
                  { label: 'Postpartum', color: '#e11d48' },
                  { label: 'HPV', color: '#f59e0b' },
                ].map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="text-gray-500">{label}</span>
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
                    { id: 'a1', color: '#7c3aed' }, { id: 'a2', color: '#10b981' },
                    { id: 'a3', color: '#e11d48' }, { id: 'a4', color: '#f59e0b' },
                  ].map(({ id, color }) => (
                    <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.12} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} />
                <Area type="monotone" dataKey="fibroids" name="Fibroids" stroke="#7c3aed" strokeWidth={2} fill="url(#a1)" />
                <Area type="monotone" dataKey="nhia" name="NHIA" stroke="#10b981" strokeWidth={2} fill="url(#a2)" />
                <Area type="monotone" dataKey="postpartum" name="Postpartum" stroke="#e11d48" strokeWidth={2} fill="url(#a3)" />
                <Area type="monotone" dataKey="hpv" name="HPV" stroke="#f59e0b" strokeWidth={2} fill="url(#a4)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {/* Rising Queries */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-violet-500" />
                <div>
                  <CardTitle>Rising Search Queries</CardTitle>
                  <p className="text-gray-400 text-xs mt-0.5">Most searched women's health terms in Nigeria</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {googleTrends.map((trend, i) => (
                <div key={trend.query} className="flex items-center gap-3">
                  <span className="text-gray-300 text-xs font-bold w-4 text-center flex-shrink-0">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-800 text-sm">{trend.query}</span>
                      {trend.isBreakout && <Badge variant="warning" size="sm">Breakout</Badge>}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full bg-violet-500" style={{ width: `${trend.value}%` }} />
                      </div>
                      <span className="text-emerald-600 text-xs font-semibold flex-shrink-0">+{trend.change}%</span>
                    </div>
                  </div>
                  <a href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(trend.query)}&geo=NG`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-violet-600">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* State Map */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <div>
                  <CardTitle>Geographic Concentration</CardTitle>
                  <p className="text-gray-400 text-xs mt-0.5">Which Nigerian states are searching most</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nigerianStates.slice(0, 8)} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }}
                    formatter={(v) => [formatNumber(Number(v)), 'Mentions']} />
                  <Bar dataKey="mentionCount" name="Mentions" fill="#7c3aed" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Emerging Radar */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <div>
                <CardTitle>Emerging Topic Radar — Predicted Next 7 Days</CardTitle>
                <p className="text-gray-400 text-xs mt-0.5">Topics likely to become major conversations soon</p>
              </div>
              <Badge variant="warning">AI Predicted</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { topic: 'Menopause Awareness', prediction: 'Rising conversation expected. Lagos and Abuja leading. Strong content opportunity.', confidence: 87, driver: 'Seasonal + social trend' },
                { topic: 'Postpartum Mental Health', prediction: 'Search volume increasing 35% week-on-week. Expect mainstream media coverage soon.', confidence: 92, driver: 'Breakout search trend' },
                { topic: 'Free Cervical Cancer Screening', prediction: 'Multiple NGOs planning awareness campaigns. Opportunity to lead conversation.', confidence: 74, driver: 'Campaign calendar' },
                { topic: 'Affordable Fibroids Treatment', prediction: 'Cost-focused queries surging. Women seeking alternatives to expensive surgery.', confidence: 83, driver: 'Search + social data' },
                { topic: 'NHIA Registration Deadline', prediction: 'If government announces a deadline, this will spike massively. Monitor closely.', confidence: 79, driver: 'Policy watch' },
              ].map(({ topic, prediction, confidence, driver }) => (
                <div key={topic} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-amber-200 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-gray-800 font-semibold text-sm">{topic}</p>
                    <span className="text-amber-600 text-sm font-bold ml-2 flex-shrink-0">{confidence}%</span>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{prediction}</p>
                  <Badge variant="warning" size="sm">{driver}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Searches */}
        <Card>
          <CardHeader>
            <CardTitle>Related Search Clusters</CardTitle>
            <p className="text-gray-400 text-xs mt-0.5">What people also search for alongside each topic</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {googleTrends.slice(0, 4).map(trend => (
              <div key={trend.query} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <p className="text-gray-500 text-xs font-medium mb-2">
                  Related to: <span className="text-violet-600">&ldquo;{trend.query}&rdquo;</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {trend.relatedQueries.map(q => (
                    <a key={q}
                      href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(q)}&geo=NG`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-full hover:border-violet-300 hover:text-violet-700 transition-all">
                      <Search className="w-2.5 h-2.5" />
                      {q}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-xs leading-relaxed">
            Trend data is based on publicly available Google Trends information for Nigeria.
            Links on this page open directly in Google Trends for live, up-to-date data.
            Search volume indices are relative (0–100) — 100 represents peak popularity for the term.
          </p>
        </div>
      </div>
    </div>
  );
}
