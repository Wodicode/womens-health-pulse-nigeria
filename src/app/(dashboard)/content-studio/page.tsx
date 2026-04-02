'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { contentOpportunities } from '@/lib/mock-data';
import { formatNumber, scoreColor, scoreBg } from '@/lib/utils';
import type { ContentOpportunity } from '@/lib/types';
import { Lightbulb, Copy, CheckCircle, Film, List, Mic, Link2, Share2, Video, MessageSquare, Star, Info } from 'lucide-react';

const formatIcons: Record<string, React.ElementType> = {
  reel: Film, carousel: List, podcast: Mic,
  linkedin_post: Link2, x_thread: Share2, tiktok: Video,
  facebook_group: MessageSquare, youtube: Video,
};

const urgencyStyle: Record<string, string> = {
  critical: 'bg-red-50 text-red-700 border-red-200',
  high: 'bg-orange-50 text-orange-700 border-orange-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function OpportunityCard({ opp, rank }: { opp: ContentOpportunity; rank: number }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const Icon = formatIcons[opp.format] || Film;

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:border-gray-200 hover:shadow-md transition-all">
      {/* Score bar top */}
      <div className="h-1 bg-gray-100">
        <div className={`h-1 ${opp.score >= 90 ? 'bg-emerald-500' : opp.score >= 70 ? 'bg-amber-500' : 'bg-orange-500'}`}
          style={{ width: `${opp.score}%` }} />
      </div>

      <div className="p-5 border-b border-gray-50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-500 text-[10px] font-bold flex-shrink-0">
              #{rank}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Icon className="w-3 h-3 text-gray-400" />
                <span className="text-gray-500 text-xs capitalize">{opp.format.replace('_', ' ')} · {opp.platform}</span>
              </div>
              <p className="text-gray-800 font-semibold text-sm">{opp.topic}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border capitalize ${urgencyStyle[opp.urgency]}`}>{opp.urgency}</span>
            <span className={`text-xl font-bold ${scoreColor(opp.score)}`}>{opp.score}</span>
            <button onClick={() => setSaved(!saved)}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all border ${saved ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600'}`}>
              <Star className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {[
          { key: 'hook', label: 'Hook', value: opp.hook },
          { key: 'caption', label: 'Caption / Script', value: opp.caption },
        ].map(({ key, label, value }) => (
          <div key={key}>
            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1.5">{label}</p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-start justify-between gap-2">
              <p className={`text-gray-700 text-sm leading-relaxed flex-1 ${key === 'caption' ? 'line-clamp-4' : ''}`}>{value}</p>
              <button onClick={() => copy(value, key)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                {copied === key ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
            <p className="text-rose-600 text-[10px] font-semibold uppercase tracking-wide mb-1">Call To Action</p>
            <p className="text-gray-700 text-xs">{opp.cta}</p>
          </div>
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-3">
            <p className="text-violet-600 text-[10px] font-semibold uppercase tracking-wide mb-1">Emotional Driver</p>
            <p className="text-gray-700 text-xs">{opp.emotionalDriver}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-gray-400 text-xs">Est. reach: <span className="text-gray-700 font-medium">{formatNumber(opp.estimatedReach)}</span></span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Schedule</Button>
            <Button size="sm" variant="primary">Use This</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContentStudioPage() {
  const [filterFormat, setFilterFormat] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');

  const formats = ['all', 'reel', 'carousel', 'x_thread', 'tiktok', 'podcast', 'linkedin_post'];
  const urgencies = ['all', 'critical', 'high', 'medium'];

  const filtered = contentOpportunities
    .filter(o => filterFormat === 'all' || o.format === filterFormat)
    .filter(o => filterUrgency === 'all' || o.urgency === filterUrgency)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="bg-gray-50 min-h-full">
      <Header title="Content Studio" subtitle="AI-generated content opportunities ranked by impact" />
      <div className="p-6 space-y-6 max-w-[1600px]">

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-violet-600" />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-bold text-base">Top Content Opportunities This Week</p>
            <p className="text-gray-500 text-sm mt-0.5">
              Based on what Nigerian women are searching for, talking about, and asking online — these are the highest-impact content ideas for the RenewHER team right now.
            </p>
          </div>
          <Badge variant="purple">AI Generated · Apr 1, 2026</Badge>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            {formats.map(f => (
              <button key={f} onClick={() => setFilterFormat(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${filterFormat === f ? 'bg-violet-600 text-white' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            {urgencies.map(u => (
              <button key={u} onClick={() => setFilterUrgency(u)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${filterUrgency === u ? 'bg-violet-600 text-white' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}>
                {u}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((opp, i) => <OpportunityCard key={opp.id} opp={opp} rank={i + 1} />)}
        </div>

        {/* Trigger Words */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-500" />
              <div>
                <CardTitle>Comment-to-DM Trigger Words</CardTitle>
                <p className="text-gray-400 text-xs mt-0.5">Use these in captions — when followers comment, send them your resource via DM</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                { word: 'NHIA', topic: 'NHIA Enrolment', uses: 847 },
                { word: 'FIBROIDS', topic: 'Fibroids', uses: 1243 },
                { word: 'ANC', topic: 'Antenatal Care', uses: 621 },
                { word: 'PPD', topic: 'Postpartum Depression', uses: 534 },
                { word: 'PCOS', topic: 'PCOS', uses: 892 },
                { word: 'HPV', topic: 'Cervical Cancer', uses: 743 },
                { word: 'GUIDE', topic: 'General', uses: 1876 },
                { word: 'HELP', topic: 'General', uses: 2341 },
              ].map(({ word, topic, uses }) => (
                <div key={word} className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                  <p className="text-violet-700 font-bold text-sm">{word}</p>
                  <p className="text-gray-500 text-[10px]">{topic}</p>
                  <p className="text-gray-400 text-[10px]">{formatNumber(uses)} uses</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-xs leading-relaxed">
            Content ideas are generated by AI based on current trending topics, sentiment analysis, and audience question data.
            Hook and caption suggestions are starting points — always review and personalise before publishing.
          </p>
        </div>
      </div>
    </div>
  );
}
