'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { contentOpportunities, topics } from '@/lib/mock-data';
import { formatNumber, scoreColor, scoreBg } from '@/lib/utils';
import type { ContentOpportunity } from '@/lib/types';
import {
  Lightbulb, Copy, CheckCircle, Zap, Target, TrendingUp,
  Film, List, Mic, Link2, Share2, Video, MessageSquare, Star
} from 'lucide-react';

const formatIcons: Record<string, React.ElementType> = {
  reel: Film,
  carousel: List,
  podcast: Mic,
  linkedin_post: Link2,
  x_thread: Share2,
  tiktok: Video,
  facebook_group: MessageSquare,
  youtube: Video,
};

const urgencyColors: Record<string, string> = {
  critical: 'text-red-400 bg-red-500/10 border-red-500/20',
  high: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
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
    <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
      {/* Header */}
      <div className="p-5 border-b border-white/8">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold flex-shrink-0">
              #{rank}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-3.5 h-3.5 text-white/50" />
                <span className="text-white/50 text-xs capitalize">{opp.format.replace('_', ' ')}</span>
                <span className="text-white/25 text-xs">·</span>
                <span className="text-white/50 text-xs capitalize">{opp.platform}</span>
              </div>
              <p className="text-white font-semibold text-sm">{opp.topic}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className={`text-xs px-2 py-1 rounded-full border font-semibold ${urgencyColors[opp.urgency]}`}>
              {opp.urgency}
            </div>
            <div className={`text-lg font-bold ${scoreColor(opp.score)}`}>{opp.score}</div>
            <button
              onClick={() => setSaved(!saved)}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${saved ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-white/30 hover:text-white/70'}`}
            >
              <Star className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Score bar */}
        <div className="mt-3">
          <div className="h-1 bg-white/5 rounded-full">
            <div className={`h-1 rounded-full ${opp.score >= 90 ? 'bg-emerald-500' : opp.score >= 70 ? 'bg-amber-500' : 'bg-orange-500'}`}
              style={{ width: `${opp.score}%` }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-white/30 text-[10px]">Opportunity Score</span>
            <span className={`text-[10px] font-semibold ${scoreColor(opp.score)}`}>{opp.score}/100</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Hook */}
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-wide font-medium mb-1.5">Hook</p>
          <div className="bg-white/5 rounded-xl p-3 flex items-start justify-between gap-2">
            <p className="text-white font-medium text-sm leading-relaxed flex-1">{opp.hook}</p>
            <button onClick={() => copy(opp.hook, 'hook')} className="text-white/30 hover:text-white/70 flex-shrink-0 mt-0.5">
              {copied === 'hook' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Caption */}
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-wide font-medium mb-1.5">Caption / Script</p>
          <div className="bg-white/5 rounded-xl p-3 flex items-start justify-between gap-2">
            <p className="text-white/75 text-xs leading-relaxed flex-1 line-clamp-4">{opp.caption}</p>
            <button onClick={() => copy(opp.caption, 'caption')} className="text-white/30 hover:text-white/70 flex-shrink-0 mt-0.5">
              {copied === 'caption' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* CTA + Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-rose-500/8 border border-rose-500/15 rounded-xl p-3">
            <p className="text-rose-400 text-[10px] font-semibold uppercase tracking-wide mb-1">Call To Action</p>
            <p className="text-white/75 text-xs">{opp.cta}</p>
          </div>
          <div className="bg-purple-500/8 border border-purple-500/15 rounded-xl p-3">
            <p className="text-purple-400 text-[10px] font-semibold uppercase tracking-wide mb-1">Emotional Driver</p>
            <p className="text-white/75 text-xs">{opp.emotionalDriver}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-white/30 text-xs">Est. reach: <span className="text-white/60 font-medium">{formatNumber(opp.estimatedReach)}</span></span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">Schedule</Button>
            <Button size="sm" variant="secondary">Use This</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContentStudioPage() {
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');

  const formats = ['all', 'reel', 'carousel', 'x_thread', 'tiktok', 'podcast', 'linkedin_post'];
  const urgencies = ['all', 'critical', 'high', 'medium'];

  const filtered = contentOpportunities
    .filter(o => filterFormat === 'all' || o.format === filterFormat)
    .filter(o => filterUrgency === 'all' || o.urgency === filterUrgency)
    .sort((a, b) => b.score - a.score);

  return (
    <div>
      <Header title="Content Opportunity Studio" subtitle="AI-generated content ideas ranked by urgency, virality, and audience demand" />
      <div className="p-6 space-y-6">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-purple-600/20 to-rose-600/15 border border-purple-500/25 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/30 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-base mb-1">Top 10 Content Opportunities This Week</p>
              <p className="text-white/55 text-sm">
                Based on social listening data, Google Trends, misinformation activity, and audience questions —
                here are the highest-impact content opportunities for Dr. Adanna and the RenewHER team right now.
              </p>
            </div>
            <Badge variant="purple">AI Generated · Apr 1, 2026</Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1 bg-white/5 rounded-xl p-1">
            {formats.map(f => (
              <button
                key={f}
                onClick={() => setFilterFormat(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  filterFormat === f ? 'bg-purple-600 text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-white/5 rounded-xl p-1">
            {urgencies.map(u => (
              <button
                key={u}
                onClick={() => setFilterUrgency(u)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  filterUrgency === u ? 'bg-purple-600 text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((opp, i) => (
            <OpportunityCard key={opp.id} opp={opp} rank={i + 1} />
          ))}
        </div>

        {/* Comment Trigger Words */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-400" />
              <CardTitle>Comment-to-DM Trigger Words</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-white/50 text-sm mb-4">These are the highest-performing trigger words to use in your content captions. When followers comment these words, send them your resource guide via DM.</p>
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
                { word: 'FERTILITY', topic: 'Fertility', uses: 687 },
                { word: 'PERIOD', topic: 'Menstrual Health', uses: 456 },
              ].map(({ word, topic, uses }) => (
                <div key={word} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                  <p className="text-purple-300 font-bold text-sm">{word}</p>
                  <p className="text-white/35 text-[10px]">{topic}</p>
                  <p className="text-white/50 text-[10px]">{formatNumber(uses)} uses</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
