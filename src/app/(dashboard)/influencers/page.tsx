'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { influencers } from '@/lib/mock-data';
import { formatNumber, platformLabel, platformColor } from '@/lib/utils';
import type { Influencer } from '@/lib/types';
import { Users, TrendingUp, Shield, AlertTriangle, ExternalLink, Filter } from 'lucide-react';

const categoryColors: Record<string, string> = {
  doctor: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  influencer: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
  journalist: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  celebrity: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  ngo: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  government: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
  media: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
};

function InfluencerCard({ influencer: inf }: { influencer: Influencer }) {
  const initials = inf.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const platformCol = platformColor(inf.platform);

  return (
    <div className="bg-white/3 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: `${platformCol}30`, border: `1px solid ${platformCol}40` }}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-white font-semibold text-sm">{inf.name}</p>
            {inf.verified && <span className="text-blue-400 text-xs">✓</span>}
          </div>
          <p className="text-white/40 text-xs">{inf.handle}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium border" style={{ color: platformCol, background: `${platformCol}20`, borderColor: `${platformCol}30` }}>
              {platformLabel(inf.platform)}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border capitalize ${categoryColors[inf.category]}`}>
              {inf.category}
            </span>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${inf.isHelping ? 'bg-emerald-500/15' : 'bg-red-500/15'}`}>
          {inf.isHelping
            ? <Shield className="w-4 h-4 text-emerald-400" />
            : <AlertTriangle className="w-4 h-4 text-red-400" />
          }
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Followers', value: formatNumber(inf.followers) },
          { label: 'Reach', value: formatNumber(inf.reach) },
          { label: 'Eng. Rate', value: `${inf.engagementRate}%` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white/5 rounded-xl p-2 text-center">
            <p className="text-white font-semibold text-sm">{value}</p>
            <p className="text-white/40 text-[10px]">{label}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <p className="text-white/40 text-[10px] uppercase tracking-wide mb-1.5">Main Topics</p>
        <div className="flex flex-wrap gap-1.5">
          {inf.mainTopics.map(t => (
            <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/8 text-white/60 text-[10px] rounded-full">{t}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/8">
        <div className={`text-xs font-semibold ${inf.isHelping ? 'text-emerald-400' : 'text-red-400'}`}>
          {inf.isHelping ? '✓ Helping public understanding' : '⚠ Spreading misinformation'}
        </div>
        <div className="flex gap-2">
          <button className="text-purple-400 text-xs hover:text-purple-300 flex items-center gap-1">
            View <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InfluencersPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = ['all', 'doctor', 'influencer', 'journalist', 'ngo', 'government', 'media'];

  const filtered = influencers.filter(inf => activeCategory === 'all' || inf.category === activeCategory);
  const helpers = influencers.filter(i => i.isHelping);
  const harmful = influencers.filter(i => !i.isHelping);

  return (
    <div>
      <Header title="Influencer & Source Tracker" subtitle="Accounts driving women's health conversations in Nigeria" />
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Tracked', value: influencers.length, color: 'text-white' },
            { label: 'Helping', value: helpers.length, color: 'text-emerald-400' },
            { label: 'Harmful', value: harmful.length, color: 'text-red-400' },
            { label: 'Total Reach', value: formatNumber(influencers.reduce((a, i) => a + i.reach, 0)), color: 'text-purple-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white/3 border border-white/8 rounded-2xl p-4">
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-white/50 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Harmful Influencer Alert */}
        {harmful.length > 0 && (
          <div className="bg-red-500/8 border border-red-500/25 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-semibold text-sm mb-1">{harmful.length} Account{harmful.length > 1 ? 's' : ''} Spreading Misinformation</p>
              <p className="text-white/55 text-sm">
                {harmful.map(i => i.name).join(', ')} — {harmful.reduce((a, i) => a + i.reach, 0).toLocaleString()} combined reach.
                Consider engaging with factual counter-content or flagging for platform review.
              </p>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/8'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Influencer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(inf => <InfluencerCard key={inf.id} influencer={inf} />)}
        </div>

        {/* Competitor Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Competitor Organisation Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    {['Organisation', 'Platform', 'Followers', 'Mentions (Week)', 'Sentiment', 'Top Topic'].map(h => (
                      <th key={h} className="text-left pb-3 text-white/40 text-xs font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {[
                    { org: 'RenewHER / WHN', platform: 'Instagram', followers: '67K', mentions: '8,421', sentiment: 'positive', topic: 'NHIA, Fibroids, PCOS' },
                    { org: 'WHO Nigeria', platform: 'Twitter', followers: '187K', mentions: '12,340', sentiment: 'positive', topic: 'Maternal Health' },
                    { org: 'UNICEF Nigeria', platform: 'Twitter', followers: '298K', mentions: '9,876', sentiment: 'positive', topic: 'Child/Maternal Health' },
                    { org: 'NHIA Nigeria', platform: 'Twitter', followers: '23K', mentions: '4,521', sentiment: 'neutral', topic: 'NHIA Enrolment' },
                    { org: 'FMOH Nigeria', platform: 'Twitter', followers: '45K', mentions: '3,210', sentiment: 'mixed', topic: 'Health Policy' },
                  ].map(({ org, platform, followers, mentions, sentiment, topic }) => (
                    <tr key={org} className="border-b border-white/5">
                      <td className={`py-3 font-medium ${org.includes('RenewHER') ? 'text-purple-400' : 'text-white/80'}`}>{org}</td>
                      <td className="py-3 text-white/50 text-xs">{platform}</td>
                      <td className="py-3 text-white/70">{followers}</td>
                      <td className="py-3 text-white/70">{mentions}</td>
                      <td className="py-3">
                        <span className={`text-xs font-medium ${sentiment === 'positive' ? 'text-emerald-400' : sentiment === 'neutral' ? 'text-white/50' : 'text-amber-400'}`}>
                          {sentiment}
                        </span>
                      </td>
                      <td className="py-3 text-white/50 text-xs">{topic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
