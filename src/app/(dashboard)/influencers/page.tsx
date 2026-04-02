'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { influencers } from '@/lib/mock-data';
import { formatNumber, platformLabel, platformColor } from '@/lib/utils';
import type { Influencer } from '@/lib/types';
import { Users, Shield, AlertTriangle, ExternalLink, Info } from 'lucide-react';

const categoryColors: Record<string, string> = {
  doctor: 'bg-blue-50 text-blue-700 border-blue-200',
  influencer: 'bg-pink-50 text-pink-700 border-pink-200',
  journalist: 'bg-amber-50 text-amber-700 border-amber-200',
  celebrity: 'bg-purple-50 text-purple-700 border-purple-200',
  ngo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  government: 'bg-slate-50 text-slate-700 border-slate-200',
  media: 'bg-orange-50 text-orange-700 border-orange-200',
};

function InfluencerCard({ inf }: { influencer?: never; inf: Influencer }) {
  const initials = inf.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const pColor = platformColor(inf.platform);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: `${pColor}15`, color: pColor, border: `1px solid ${pColor}25` }}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <p className="text-gray-800 font-semibold text-sm">{inf.name}</p>
            {inf.verified && <span className="text-blue-500 text-xs">✓</span>}
          </div>
          <p className="text-gray-400 text-xs">{inf.handle}</p>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium border"
              style={{ color: pColor, background: `${pColor}12`, borderColor: `${pColor}25` }}>
              {platformLabel(inf.platform)}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium border capitalize ${categoryColors[inf.category]}`}>
              {inf.category}
            </span>
          </div>
        </div>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${inf.isHelping ? 'bg-emerald-100' : 'bg-red-100'}`}>
          {inf.isHelping ? <Shield className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Followers', value: formatNumber(inf.followers) },
          { label: 'Reach', value: formatNumber(inf.reach) },
          { label: 'Eng. Rate', value: `${inf.engagementRate}%` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-center">
            <p className="text-gray-800 font-semibold text-sm">{value}</p>
            <p className="text-gray-400 text-[10px]">{label}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <p className="text-gray-400 text-[10px] uppercase tracking-wide font-medium mb-1.5">Topics Covered</p>
        <div className="flex flex-wrap gap-1">
          {inf.mainTopics.map(t => (
            <span key={t} className="px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-600 text-[10px] rounded-full">{t}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <span className={`text-xs font-medium ${inf.isHelping ? 'text-emerald-600' : 'text-red-600'}`}>
          {inf.isHelping ? '✓ Sharing accurate health information' : '⚠ Spreading misinformation'}
        </span>
        <a href={`https://${inf.platform}.com/${inf.handle.replace('@', '')}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-gray-400 text-xs hover:text-violet-600">
          View <ExternalLink className="w-2.5 h-2.5" />
        </a>
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
    <div className="bg-gray-50 min-h-full">
      <Header title="Influencer Tracker" subtitle="Accounts driving women's health conversations in Nigeria" />
      <div className="p-6 space-y-6 max-w-[1600px]">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Tracked', value: influencers.length, color: 'text-gray-900' },
            { label: 'Promoting Good Health Info', value: helpers.length, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
            { label: 'Spreading Misinformation', value: harmful.length, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
            { label: 'Combined Reach', value: formatNumber(influencers.reduce((a, i) => a + i.reach, 0)), color: 'text-violet-600' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`rounded-xl border p-5 shadow-sm ${bg || 'bg-white border-gray-100'}`}>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {harmful.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-semibold text-sm mb-1">{harmful.length} Account{harmful.length > 1 ? 's' : ''} Actively Spreading Misinformation</p>
              <p className="text-red-600 text-sm">
                {harmful.map(i => i.name).join(', ')} — combined reach of {formatNumber(harmful.reduce((a, i) => a + i.reach, 0))}.
                Consider publishing factual counter-content or reporting to platforms.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                activeCategory === cat ? 'bg-violet-600 text-white shadow-sm' : 'bg-white text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(inf => <InfluencerCard key={inf.id} inf={inf} />)}
        </div>

        {/* Competitor Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Organisation Comparison</CardTitle>
            <p className="text-gray-400 text-xs mt-0.5">RenewHER vs key organisations in the women's health space</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Organisation', 'Platform', 'Followers', 'Weekly Mentions', 'Sentiment', 'Top Topic'].map(h => (
                      <th key={h} className="text-left pb-3 text-gray-400 text-xs font-medium pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { org: 'RenewHER / WHN', platform: 'Instagram', followers: '67K', mentions: '8,421', sentiment: 'positive', topic: 'NHIA, Fibroids, PCOS', url: 'https://instagram.com' },
                    { org: 'WHO Nigeria', platform: 'X / Twitter', followers: '187K', mentions: '12,340', sentiment: 'positive', topic: 'Maternal Health', url: 'https://www.who.int/nigeria' },
                    { org: 'UNICEF Nigeria', platform: 'X / Twitter', followers: '298K', mentions: '9,876', sentiment: 'positive', topic: 'Child & Maternal Health', url: 'https://www.unicef.org/nigeria' },
                    { org: 'NHIA Nigeria', platform: 'X / Twitter', followers: '23K', mentions: '4,521', sentiment: 'neutral', topic: 'NHIA Enrolment', url: 'https://www.nhia.gov.ng' },
                    { org: 'FMoH Nigeria', platform: 'X / Twitter', followers: '45K', mentions: '3,210', sentiment: 'mixed', topic: 'Health Policy', url: 'https://www.health.gov.ng' },
                  ].map(({ org, platform, followers, mentions, sentiment, topic, url }) => (
                    <tr key={org} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-3 pr-4">
                        <a href={url} target="_blank" rel="noopener noreferrer"
                          className={`font-medium text-sm flex items-center gap-1 hover:underline ${org.includes('RenewHER') ? 'text-violet-600' : 'text-gray-800'}`}>
                          {org} <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>
                      <td className="py-3 pr-4 text-gray-500 text-xs">{platform}</td>
                      <td className="py-3 pr-4 text-gray-700 text-sm">{followers}</td>
                      <td className="py-3 pr-4 text-gray-700 text-sm">{mentions}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs font-medium ${sentiment === 'positive' ? 'text-emerald-600' : sentiment === 'neutral' ? 'text-gray-500' : 'text-amber-600'}`}>
                          {sentiment}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500 text-xs">{topic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-xs leading-relaxed">
            Influencer data is based on publicly available account information. Follower counts and reach figures are estimates.
            &ldquo;Misinformation&rdquo; classification is based on AI analysis of content against verified health guidelines from WHO and NAFDAC.
            External links open the relevant account or organisation website directly.
          </p>
        </div>
      </div>
    </div>
  );
}
