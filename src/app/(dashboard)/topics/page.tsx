'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { topics, audienceQuestions } from '@/lib/mock-data';
import { realStats } from '@/lib/real-sources';
import { formatNumber, formatPercent, scoreColor, scoreBg } from '@/lib/utils';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { TrendingUp, Search, Plus, Target, Zap, HelpCircle, ExternalLink, Info } from 'lucide-react';

const radarData = (topic: typeof topics[0]) => [
  { subject: 'Trend', A: topic.trendScore },
  { subject: 'Content', A: topic.contentOpportunityScore },
  { subject: 'Campaign', A: topic.campaignReadinessScore },
  { subject: 'Volume', A: Math.min(100, (topic.mentionCount / 8472) * 100) },
  { subject: 'Urgency', A: Math.abs(topic.sentimentScore) * 100 },
];

export default function TopicsPage() {
  const [selected, setSelected] = useState(topics[0]);
  const [search, setSearch] = useState('');

  const filtered = topics.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-gray-50 min-h-full">
      <Header title="Topic Explorer" subtitle="Explore and compare women's health topics"
        actions={<Button size="sm" variant="outline"><Plus className="w-3.5 h-3.5" /> Add Topic</Button>} />
      <div className="p-6 space-y-6 max-w-[1600px]">

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Topic List */}
          <div className="xl:col-span-1 space-y-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
              <Search className="w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search topics..." value={search} onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none flex-1" />
            </div>
            <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
              {filtered.map(topic => (
                <button key={topic.id} onClick={() => setSelected(topic)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selected.id === topic.id
                      ? 'bg-violet-50 border-violet-200 shadow-sm'
                      : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                  }`}>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-gray-800 font-medium text-sm">{topic.name}</span>
                    {topic.isRising && <TrendingUp className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-500 text-xs">{formatNumber(topic.mentionCount)} mentions</span>
                    <span className={`text-xs font-semibold ${topic.mentionChange24h > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatPercent(topic.mentionChange24h)}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${scoreBg(topic.contentOpportunityScore)}`}>
                      Content {topic.contentOpportunityScore}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${scoreBg(topic.campaignReadinessScore)}`}>
                      Campaign {topic.campaignReadinessScore}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Detail */}
          <div className="xl:col-span-2 space-y-4">
            {/* Header */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-gray-900 text-xl font-bold">{selected.name}</h2>
                  <p className="text-gray-500 text-sm mt-0.5">{formatNumber(selected.mentionCount)} total mentions this week</p>
                </div>
                <div className="flex gap-2">
                  {selected.isRising && <Badge variant="positive">↑ Rising</Badge>}
                  <Badge variant={selected.sentimentScore < -0.4 ? 'negative' : selected.sentimentScore > 0.1 ? 'positive' : 'warning'}>
                    {selected.sentimentScore < -0.4 ? 'High Concern' : selected.sentimentScore > 0.1 ? 'Positive' : 'Mixed'}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Trend Score', value: selected.trendScore, icon: TrendingUp },
                  { label: 'Content Opportunity', value: selected.contentOpportunityScore, icon: Zap },
                  { label: 'Campaign Readiness', value: selected.campaignReadinessScore, icon: Target },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3.5 text-center border border-gray-100">
                    <Icon className={`w-4 h-4 mx-auto mb-1.5 ${scoreColor(value)}`} />
                    <p className={`text-2xl font-bold ${scoreColor(value)}`}>{value}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle>Intelligence Radar</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={radarData(selected)}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#6b7280' }} />
                      <Radar name="Score" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.12} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Tracked Keywords</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selected.keywords.map(kw => (
                      <span key={kw} className="px-2.5 py-1 bg-violet-50 border border-violet-200 text-violet-700 text-xs rounded-full">{kw}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-gray-500 text-xs font-medium mb-2">Top Platforms</p>
                    <div className="flex gap-2 flex-wrap">
                      {selected.topPlatforms.map(p => (
                        <span key={p} className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-lg capitalize">{p}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Audience Questions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-violet-500" />
                  <div>
                    <CardTitle>Questions Nigerian Women Are Asking</CardTitle>
                    <p className="text-gray-400 text-xs mt-0.5">From search trends and social media comments</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {audienceQuestions.slice(0, 6).map((q, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 text-[9px] font-bold flex-shrink-0 mt-0.5">Q</div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm">{q.question}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-gray-400 text-[10px]">{formatNumber(q.frequency)} people asked</span>
                        <span className="text-gray-300 text-[10px]">·</span>
                        <span className="text-gray-400 text-[10px]">via {q.platform}</span>
                      </div>
                    </div>
                    <a href="/content-studio" className="text-violet-600 text-[10px] hover:text-violet-800 font-medium whitespace-nowrap">Create content →</a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
