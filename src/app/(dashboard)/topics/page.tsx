'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { topics, audienceQuestions } from '@/lib/mock-data';
import { formatNumber, formatPercent, scoreColor, scoreBg } from '@/lib/utils';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { TrendingUp, Search, Target, Zap, HelpCircle, Plus, ArrowRight, Flame } from 'lucide-react';

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

  const topRising = topics.filter(t => t.isRising).sort((a, b) => b.mentionChange24h - a.mentionChange24h)[0];

  return (
    <div className="bg-[#f8f7f5] min-h-full">
      <Header title="Topic Explorer" subtitle="Women's health intelligence newsroom"
        actions={
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all font-medium">
            <Plus className="w-3.5 h-3.5" /> Track Topic
          </button>
        } />
      <div className="p-6 max-w-[1600px]">

        {/* Top story bar */}
        {topRising && (
          <div className="hero-card p-5 mb-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-3 py-1 flex-shrink-0">
                <Flame className="w-3 h-3 text-emerald-300" />
                <span className="text-emerald-200 text-[11px] font-bold uppercase tracking-widest">Top Rising Topic</span>
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-base truncate">{topRising.name}</p>
                <p className="text-white/60 text-xs">
                  {formatNumber(topRising.mentionCount)} mentions ·
                  <span className="text-emerald-300 font-semibold"> {formatPercent(topRising.mentionChange24h)} in 24h</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button onClick={() => setSelected(topRising)}
                className="flex items-center gap-1.5 text-xs px-4 py-2 bg-white text-[#1a4731] rounded-xl font-bold hover:bg-white/90 transition-all">
                Analyse <ArrowRight className="w-3 h-3" />
              </button>
              <a href="/content-studio" className="flex items-center gap-1.5 text-xs px-4 py-2 bg-[#c8006e] text-white rounded-xl font-bold hover:bg-[#a8005c] transition-all">
                <Zap className="w-3 h-3" /> Create Content
              </a>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Topic List */}
          <div className="xl:col-span-1 space-y-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 shadow-sm">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <input type="text" placeholder="Search topics or keywords…" value={search} onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none flex-1" />
            </div>
            <p className="text-gray-400 text-[11px] px-1">{filtered.length} topic{filtered.length !== 1 ? 's' : ''}</p>
            <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
              {filtered.map(topic => (
                <button key={topic.id} onClick={() => setSelected(topic)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selected.id === topic.id
                      ? 'bg-[#f0fdf4] border-[#bbf7d0] shadow-sm ring-1 ring-[#1a4731]/10'
                      : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                  }`}>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`font-semibold text-sm ${selected.id === topic.id ? 'text-[#1a4731]' : 'text-gray-800'}`}>{topic.name}</span>
                    {topic.isRising && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-1.5 py-0.5 flex-shrink-0">
                        <TrendingUp className="w-2.5 h-2.5" /> Rising
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-gray-500 text-xs">{formatNumber(topic.mentionCount)} mentions</span>
                    <span className={`text-xs font-bold ${topic.mentionChange24h > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatPercent(topic.mentionChange24h)}
                    </span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
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
            {/* Topic header */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-[#0d3425] to-[#1a4731] px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {selected.isRising && (
                        <span className="text-[10px] bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                          ↑ Rising
                        </span>
                      )}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold text-white ${
                        selected.sentimentScore < -0.4 ? 'bg-red-500/40' : selected.sentimentScore > 0.1 ? 'bg-emerald-500/40' : 'bg-amber-500/40'
                      }`}>
                        {selected.sentimentScore < -0.4 ? 'High Concern' : selected.sentimentScore > 0.1 ? 'Positive' : 'Mixed Sentiment'}
                      </span>
                    </div>
                    <h2 className="text-white text-xl font-bold">{selected.name}</h2>
                    <p className="text-white/60 text-sm mt-0.5">{formatNumber(selected.mentionCount)} total mentions this week</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a href="/content-studio"
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#c8006e] hover:bg-[#a8005c] text-white rounded-xl font-semibold transition-all">
                      <Zap className="w-3 h-3" /> Create Content
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-5 grid grid-cols-3 gap-3">
                {[
                  { label: 'Trend Score', value: selected.trendScore, icon: TrendingUp },
                  { label: 'Content Opportunity', value: selected.contentOpportunityScore, icon: Zap },
                  { label: 'Campaign Readiness', value: selected.campaignReadinessScore, icon: Target },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <Icon className={`w-4 h-4 mx-auto mb-2 ${scoreColor(value)}`} />
                    <p className={`text-2xl font-black ${scoreColor(value)}`}>{value}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Radar */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-gray-900 font-semibold text-sm mb-1">Intelligence Radar</h3>
                <p className="text-gray-400 text-xs mb-4">Multi-dimensional topic scoring</p>
                <ResponsiveContainer width="100%" height={190}>
                  <RadarChart data={radarData(selected)}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#6b7280' }} />
                    <Radar name="Score" dataKey="A" stroke="#1a4731" fill="#1a4731" fillOpacity={0.12} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Keywords */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-gray-900 font-semibold text-sm mb-1">Tracked Keywords</h3>
                <p className="text-gray-400 text-xs mb-4">Terms driving this topic's signal</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selected.keywords.map(kw => (
                    <span key={kw} className="px-2.5 py-1 bg-[#f0fdf4] border border-[#bbf7d0] text-[#1a4731] text-xs rounded-full font-medium">{kw}</span>
                  ))}
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest mb-2">Top Platforms</p>
                  <div className="flex gap-2 flex-wrap">
                    {selected.topPlatforms.map(p => (
                      <span key={p} className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-lg capitalize">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Audience Questions — the newsroom heartbeat */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-3.5 h-3.5 text-[#1a4731]" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm">Questions Nigerian Women Are Asking</h3>
                    <p className="text-gray-400 text-xs">From search trends and social media comments</p>
                  </div>
                </div>
                <span className="text-[10px] bg-[#f0fdf4] border border-[#bbf7d0] text-[#1a4731] px-2 py-0.5 rounded-full font-bold">
                  {audienceQuestions.length} questions
                </span>
              </div>
              <div className="space-y-2">
                {audienceQuestions.slice(0, 6).map((q, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 bg-gray-50 hover:bg-[#f0fdf4] rounded-xl border border-gray-100 hover:border-[#bbf7d0] transition-all group">
                    <div className="w-5 h-5 bg-[#1a4731]/10 rounded-full flex items-center justify-center text-[#1a4731] text-[9px] font-bold flex-shrink-0 mt-0.5">Q</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-sm">{q.question}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-gray-400 text-[10px]">{formatNumber(q.frequency)} people asked</span>
                        <span className="text-gray-300 text-[10px]">·</span>
                        <span className="text-gray-400 text-[10px]">via {q.platform}</span>
                      </div>
                    </div>
                    <a href="/content-studio"
                      className="text-[#c8006e] text-[10px] font-semibold hover:text-[#a8005c] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Create content →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
