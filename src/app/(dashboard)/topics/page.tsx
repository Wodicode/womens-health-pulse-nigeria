'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { topics, mentionsTrend, recentMentions, audienceQuestions } from '@/lib/mock-data';
import { formatNumber, formatPercent, scoreColor, scoreBg } from '@/lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import {
  TrendingUp, Search, Plus, Filter, ChevronRight,
  MessageSquare, Target, Zap, HelpCircle
} from 'lucide-react';

const scoreRadar = (topic: typeof topics[0]) => [
  { subject: 'Trend', A: topic.trendScore },
  { subject: 'Content Opp', A: topic.contentOpportunityScore },
  { subject: 'Campaign', A: topic.campaignReadinessScore },
  { subject: 'Mentions', A: Math.min(100, (topic.mentionCount / 8472) * 100) },
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
    <div>
      <Header
        title="Topic Explorer"
        subtitle="Explore and compare women's health topics"
        actions={<Button size="sm" variant="ghost"><Plus className="w-3.5 h-3.5" /> Add Topic</Button>}
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Topic List */}
          <div className="xl:col-span-1 space-y-3">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search topics..."
                className="bg-transparent text-sm text-white/80 placeholder:text-white/30 outline-none flex-1"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filtered.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelected(topic)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selected.id === topic.id
                      ? 'bg-purple-600/15 border-purple-500/30'
                      : 'bg-white/3 border-white/8 hover:border-white/15 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-white font-medium text-sm">{topic.name}</span>
                    {topic.isRising && <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/50 text-xs">{formatNumber(topic.mentionCount)} mentions</span>
                    <span className={`text-xs font-semibold ${topic.mentionChange24h > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatPercent(topic.mentionChange24h)}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    <div className={`text-[10px] px-1.5 py-0.5 rounded-full border ${scoreBg(topic.contentOpportunityScore)}`}>
                      Content: {topic.contentOpportunityScore}
                    </div>
                    <div className={`text-[10px] px-1.5 py-0.5 rounded-full border ${scoreBg(topic.campaignReadinessScore)}`}>
                      Campaign: {topic.campaignReadinessScore}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Detail */}
          <div className="xl:col-span-2 space-y-4">
            {/* Header Card */}
            <Card className="bg-gradient-to-br from-purple-600/10 to-rose-600/5 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-white text-2xl font-bold">{selected.name}</h2>
                    <p className="text-white/50 text-sm mt-1">{formatNumber(selected.mentionCount)} total mentions</p>
                  </div>
                  <div className="flex gap-2">
                    {selected.isRising && <Badge variant="positive">↑ Rising</Badge>}
                    <Badge variant={selected.sentimentScore < -0.4 ? 'negative' : selected.sentimentScore > 0.1 ? 'positive' : 'warning'}>
                      {selected.sentimentScore < -0.4 ? 'High Concern' : selected.sentimentScore > 0.1 ? 'Positive' : 'Mixed'}
                    </Badge>
                  </div>
                </div>

                {/* Score Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Trend Score', value: selected.trendScore, icon: TrendingUp },
                    { label: 'Content Opportunity', value: selected.contentOpportunityScore, icon: Zap },
                    { label: 'Campaign Readiness', value: selected.campaignReadinessScore, icon: Target },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <div className="flex justify-center mb-1.5">
                        <Icon className={`w-4 h-4 ${scoreColor(value)}`} />
                      </div>
                      <p className={`text-2xl font-bold ${scoreColor(value)}`}>{value}</p>
                      <p className="text-white/40 text-[10px] mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Radar Chart + Keywords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle>Topic Intelligence Radar</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={scoreRadar(selected)}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }} />
                      <Radar name="Score" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Tracked Keywords</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selected.keywords.map(kw => (
                      <span key={kw} className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded-full">
                        {kw}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/8">
                    <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wide">Top Platforms</p>
                    <div className="flex gap-2">
                      {selected.topPlatforms.map(p => (
                        <span key={p} className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/70 text-xs rounded-lg capitalize">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Audience Questions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Audience Questions We Need To Answer</CardTitle>
                  <HelpCircle className="w-4 h-4 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {audienceQuestions.slice(0, 5).map((q, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/3 border border-white/6 rounded-xl">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-[10px] font-bold flex-shrink-0 mt-0.5">
                      Q
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-sm">{q.question}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-white/30 text-[10px]">{formatNumber(q.frequency)} people asked</span>
                        <span className="text-white/30 text-[10px]">via {q.platform}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-[10px] px-2 py-1 h-auto">
                      Create Content
                    </Button>
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
