'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { influencers } from '@/lib/mock-data';
import { formatNumber, platformLabel, platformColor } from '@/lib/utils';
import type { Influencer } from '@/lib/types';
import { Users, Shield, AlertTriangle, ExternalLink, Info, CheckCircle, Radio } from 'lucide-react';

const categoryColors: Record<string, string> = {
  doctor: 'bg-blue-50 text-blue-700 border-blue-200',
  influencer: 'bg-pink-50 text-pink-700 border-pink-200',
  journalist: 'bg-amber-50 text-amber-700 border-amber-200',
  celebrity: 'bg-purple-50 text-purple-700 border-purple-200',
  ngo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  government: 'bg-slate-50 text-slate-700 border-slate-200',
  media: 'bg-orange-50 text-orange-700 border-orange-200',
};

function InfluencerCard({ inf }: { inf: Influencer }) {
  const initials = inf.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const pColor = platformColor(inf.platform);

  return (
    <div className={`bg-white rounded-2xl border shadow-sm card-lift overflow-hidden ${
      inf.isHelping ? 'border-gray-100' : 'border-red-100'
    }`}>
      {/* Top strip */}
      <div className={`h-0.5 ${inf.isHelping ? 'bg-emerald-400' : 'bg-red-400'}`} />

      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black flex-shrink-0"
            style={{ background: `${pColor}18`, color: pColor, border: `1.5px solid ${pColor}30` }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="text-gray-900 font-bold text-sm">{inf.name}</p>
              {inf.verified && (
                <CheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-gray-400 text-xs">{inf.handle}</p>
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold border"
                style={{ color: pColor, background: `${pColor}12`, borderColor: `${pColor}25` }}>
                {platformLabel(inf.platform)}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium border capitalize ${categoryColors[inf.category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                {inf.category}
              </span>
            </div>
          </div>
          <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${inf.isHelping ? 'bg-emerald-100' : 'bg-red-100'}`}>
            {inf.isHelping
              ? <Shield className="w-3.5 h-3.5 text-emerald-600" />
              : <AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Followers', value: formatNumber(inf.followers) },
            { label: 'Reach', value: formatNumber(inf.reach) },
            { label: 'Eng. Rate', value: `${inf.engagementRate}%` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-center">
              <p className="text-gray-900 font-bold text-sm">{value}</p>
              <p className="text-gray-400 text-[10px] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Topics */}
        <div className="mb-4">
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold mb-1.5">Topics</p>
          <div className="flex flex-wrap gap-1">
            {inf.mainTopics.map(t => (
              <span key={t} className="px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-600 text-[10px] rounded-full">{t}</span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <span className={`text-xs font-semibold flex items-center gap-1 ${inf.isHelping ? 'text-emerald-600' : 'text-red-600'}`}>
            {inf.isHelping ? <><CheckCircle className="w-3 h-3" /> Accurate health info</> : <><AlertTriangle className="w-3 h-3" /> Spreading misinfo</>}
          </span>
          <a href="#" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-400 text-xs hover:text-[#1a4731] transition-colors">
            Profile <ExternalLink className="w-2.5 h-2.5" />
          </a>
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
  const totalReach = influencers.reduce((a, i) => a + i.reach, 0);

  return (
    <div className="bg-[#f8f7f5] min-h-full">
      <Header title="Influencer Tracker" subtitle="Accounts driving women's health conversations" />
      <div className="p-6 space-y-6 max-w-[1600px]">

        {/* Hero stats */}
        <div className="hero-card p-7">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-3">
                <Radio className="w-3 h-3 text-white/70" />
                <span className="text-white/70 text-[11px] font-bold uppercase tracking-widest">Voice Landscape</span>
              </div>
              <h1 className="text-white text-2xl font-bold mb-1">{influencers.length} voices tracked across Nigerian health media</h1>
              <p className="text-white/60 text-sm">
                Combined reach of <span className="text-white font-semibold">{formatNumber(totalReach)}</span> ·
                <span className="text-emerald-300 font-semibold"> {helpers.length} amplifying accurate information</span> ·
                <span className="text-red-300 font-semibold"> {harmful.length} spreading misinformation</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-shrink-0 lg:min-w-[200px]">
              {[
                { label: 'Total Tracked', value: influencers.length, color: 'text-white' },
                { label: 'Good Actors', value: helpers.length, color: 'text-emerald-300' },
                { label: 'Bad Actors', value: harmful.length, color: 'text-red-300' },
                { label: 'Combined Reach', value: formatNumber(totalReach), color: 'text-yellow-300' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white/10 border border-white/20 rounded-xl p-3 text-center">
                  <p className={`text-lg font-black ${color}`}>{value}</p>
                  <p className="text-white/50 text-[10px] mt-0.5 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Misinfo warning */}
        {harmful.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-red-700 font-bold text-sm mb-1">{harmful.length} account{harmful.length > 1 ? 's' : ''} actively spreading misinformation</p>
              <p className="text-red-600 text-sm">
                {harmful.map(i => i.name).join(', ')} — combined reach of {formatNumber(harmful.reduce((a, i) => a + i.reach, 0))}.
                Consider publishing factual counter-content or reporting to platforms.
              </p>
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${
                activeCategory === cat
                  ? 'bg-[#1a4731] text-white shadow-sm'
                  : 'bg-white text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300'
              }`}>
              {cat === 'all' ? `All (${influencers.length})` : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(inf => <InfluencerCard key={inf.id} inf={inf} />)}
        </div>

        {/* Org comparison table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-gray-900 font-semibold text-sm mb-1">Organisation Comparison</h3>
          <p className="text-gray-400 text-xs mb-5">RenewHER vs key organisations in Nigeria's women's health space</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Organisation', 'Platform', 'Followers', 'Weekly Mentions', 'Sentiment', 'Top Topic'].map(h => (
                    <th key={h} className="text-left pb-3 text-gray-400 text-[11px] font-semibold uppercase tracking-wide pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { org: 'RenewHER / WHN', platform: 'Instagram', followers: '67K', mentions: '8,421', sentiment: 'positive', topic: 'NHIA, Fibroids, PCOS' },
                  { org: 'WHO Nigeria', platform: 'X / Twitter', followers: '187K', mentions: '12,340', sentiment: 'positive', topic: 'Maternal Health' },
                  { org: 'UNICEF Nigeria', platform: 'X / Twitter', followers: '298K', mentions: '9,876', sentiment: 'positive', topic: 'Child & Maternal Health' },
                  { org: 'NHIA Nigeria', platform: 'X / Twitter', followers: '23K', mentions: '4,521', sentiment: 'neutral', topic: 'NHIA Enrolment' },
                  { org: 'FMoH Nigeria', platform: 'X / Twitter', followers: '45K', mentions: '3,210', sentiment: 'mixed', topic: 'Health Policy' },
                ].map(({ org, platform, followers, mentions, sentiment, topic }) => (
                  <tr key={org} className={`border-b border-gray-50 hover:bg-gray-50/50 ${org.includes('RenewHER') ? 'bg-[#f0fdf4]/50' : ''}`}>
                    <td className="py-3 pr-4">
                      <span className={`font-semibold text-sm flex items-center gap-1 ${org.includes('RenewHER') ? 'text-[#1a4731]' : 'text-gray-800'}`}>
                        {org} {org.includes('RenewHER') && <span className="text-[10px] bg-[#1a4731] text-white px-1.5 py-0.5 rounded-full">You</span>}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{platform}</td>
                    <td className="py-3 pr-4 text-gray-700 text-sm font-medium">{followers}</td>
                    <td className="py-3 pr-4 text-gray-700 text-sm font-medium">{mentions}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-semibold ${
                        sentiment === 'positive' ? 'text-emerald-600' : sentiment === 'neutral' ? 'text-gray-500' : 'text-amber-600'
                      }`}>{sentiment}</span>
                    </td>
                    <td className="py-3 text-gray-500 text-xs">{topic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-xs leading-relaxed">
            Influencer data is based on publicly available account information. &ldquo;Misinformation&rdquo; classification uses AI analysis
            against verified health guidelines from WHO, NAFDAC, and the Federal Ministry of Health.
          </p>
        </div>
      </div>
    </div>
  );
}
