'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, Users, Plus, Tag, Globe, Database, Key, Bell, Shield, CheckCircle, XCircle, Clock, Info } from 'lucide-react';

const teamMembers = [
  { name: 'Dr. Adanna', role: 'Admin', email: 'adanna@renewher.ng', lastActive: '2 min ago', status: 'online' },
  { name: 'Kemi Okafor', role: 'Editor', email: 'kemi@renewher.ng', lastActive: '1 hour ago', status: 'away' },
  { name: 'Tunde Babatunde', role: 'Viewer', email: 'tunde@renewher.ng', lastActive: '3 hours ago', status: 'offline' },
  { name: 'Ngozi Eze', role: 'Editor', email: 'ngozi@renewher.ng', lastActive: 'Yesterday', status: 'offline' },
];

const dataSources = [
  {
    name: 'Reddit (r/Nigeria, r/Africa)',
    status: 'connected',
    lastSync: '5 min ago',
    icon: '💬',
    note: 'Free — no API key required',
    docsUrl: 'https://www.reddit.com/dev/api',
  },
  {
    name: 'Google News RSS',
    status: 'connected',
    lastSync: '15 min ago',
    icon: '📰',
    note: 'Free — public RSS feed',
    docsUrl: 'https://news.google.com',
  },
  {
    name: 'YouTube Data API v3',
    status: 'connected',
    lastSync: '30 min ago',
    icon: '▶️',
    note: 'Free tier: 10,000 units/day',
    docsUrl: 'https://developers.google.com/youtube/v3',
  },
  {
    name: 'Pulse Nigeria RSS',
    status: 'connected',
    lastSync: '20 min ago',
    icon: '🌍',
    note: 'Free — public RSS feed',
    docsUrl: 'https://www.pulse.ng',
  },
  {
    name: 'X / Twitter API',
    status: 'pending',
    lastSync: 'Not connected',
    icon: '𝕏',
    note: 'Basic tier: $100/month',
    docsUrl: 'https://developer.twitter.com/en/docs/twitter-api',
  },
  {
    name: 'Instagram Graph API',
    status: 'pending',
    lastSync: 'Not connected',
    icon: '📸',
    note: 'Requires app review (2–4 weeks)',
    docsUrl: 'https://developers.facebook.com/docs/instagram-api',
  },
  {
    name: 'TikTok Research API',
    status: 'pending',
    lastSync: 'Not connected',
    icon: '🎵',
    note: 'Free for researchers — application required',
    docsUrl: 'https://developers.tiktok.com/products/research-api',
  },
  {
    name: 'Facebook Pages API',
    status: 'error',
    lastSync: 'Token expired',
    icon: '👥',
    note: 'Requires re-authentication',
    docsUrl: 'https://developers.facebook.com/docs/graph-api',
  },
];

const apiKeys = [
  { label: 'YouTube Data API Key', configured: true, envVar: 'YOUTUBE_API_KEY', docsUrl: 'https://console.cloud.google.com' },
  { label: 'OpenAI API Key (AI insights)', configured: false, envVar: 'OPENAI_API_KEY', docsUrl: 'https://platform.openai.com/api-keys' },
  { label: 'Google Custom Search API', configured: false, envVar: 'GOOGLE_SEARCH_API_KEY', docsUrl: 'https://developers.google.com/custom-search/v1/introduction' },
  { label: 'Twitter Bearer Token', configured: false, envVar: 'TWITTER_BEARER_TOKEN', docsUrl: 'https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens' },
  { label: 'Instagram Access Token', configured: false, envVar: 'INSTAGRAM_ACCESS_TOKEN', docsUrl: 'https://developers.facebook.com/docs/instagram-api/getting-started' },
  { label: 'Slack Webhook URL', configured: false, envVar: 'SLACK_WEBHOOK_URL', docsUrl: 'https://api.slack.com/messaging/webhooks' },
];

export default function AdminPage() {
  const [newKeyword, setNewKeyword] = useState('');
  const [keywords, setKeywords] = useState([
    'maternal mortality', 'fibroid', 'PCOS', 'NHIA', 'cervical cancer',
    'postpartum depression', 'menstrual health', 'fertility Nigeria',
    'antenatal care', 'period poverty',
  ]);

  const addKeyword = () => {
    if (newKeyword.trim()) {
      setKeywords(prev => [...prev, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  return (
    <div>
      <Header title="Admin Settings" subtitle="Manage team, data sources, keywords, and integrations" />
      <div className="p-6 space-y-6">

        {/* Info banner */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="text-blue-700 text-sm leading-relaxed space-y-1">
            <p className="font-medium">Setting up live data</p>
            <p>
              This dashboard currently uses verified health statistics from WHO, UNICEF, and NDHS alongside estimated keyword trend data.
              To enable live social listening, connect the free data sources below first (Reddit, Google News, YouTube).
              Paid APIs (Twitter, Instagram) can be added later via your <code className="bg-blue-100 px-1 rounded text-xs">.env.local</code> file.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Team Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-violet-600" />
                  <CardTitle>Team Members</CardTitle>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="w-3.5 h-3.5" /> Invite
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamMembers.map(member => (
                <div key={member.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      member.status === 'online' ? 'bg-emerald-500' :
                      member.status === 'away' ? 'bg-amber-500' : 'bg-gray-300'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm font-medium">{member.name}</p>
                    <p className="text-gray-400 text-xs">{member.email} · {member.lastActive}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                    member.role === 'Admin'
                      ? 'bg-violet-50 text-violet-700 border-violet-200'
                      : member.role === 'Editor'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-gray-100 text-gray-500 border-gray-200'
                  }`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Data Sources */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-violet-600" />
                <CardTitle>Data Sources & Integrations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {dataSources.map(({ name, status, lastSync, icon, note, docsUrl }) => (
                <div key={name} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-base flex-shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-sm">{name}</p>
                    <p className="text-gray-400 text-[10px]">{lastSync} · {note}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    status === 'connected'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : status === 'error'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}>
                    {status}
                  </span>
                  <a
                    href={docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 text-xs hover:text-violet-700 font-medium flex-shrink-0"
                  >
                    {status === 'connected' ? 'Docs' : 'Setup'}
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Keyword Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-violet-600" />
              <CardTitle>Tracked Keywords & Topic Engine</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newKeyword}
                onChange={e => setNewKeyword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addKeyword()}
                placeholder="Add new keyword or phrase..."
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              />
              <Button onClick={addKeyword} variant="primary">
                <Plus className="w-4 h-4" /> Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map(kw => (
                <div
                  key={kw}
                  className="flex items-center gap-1 px-3 py-1.5 bg-violet-50 border border-violet-100 text-violet-700 text-xs rounded-full group"
                >
                  <span>{kw}</span>
                  <button
                    onClick={() => setKeywords(prev => prev.filter(k => k !== kw))}
                    className="text-violet-400 hover:text-red-500 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove keyword"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs mt-3">{keywords.length} keywords tracked across all connected platforms</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* API Keys */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-500" />
                <CardTitle>API Keys</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-500 text-xs">
                Set keys in your <code className="bg-gray-100 px-1 rounded">.env.local</code> file.
              </p>
              {apiKeys.map(({ label, configured, envVar, docsUrl }) => (
                <div key={label} className="flex items-center justify-between py-1.5 gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-600 text-xs truncate">{label}</p>
                    <p className="text-gray-400 text-[10px] font-mono">{envVar}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {configured ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-gray-300" />
                    )}
                    <a
                      href={docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-violet-600 hover:text-violet-700 font-medium"
                    >
                      Docs
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Platform Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-violet-600" />
                <CardTitle>Platform Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Default Country', value: 'Nigeria (NG)' },
                { label: 'Primary Language', value: 'English + Pidgin' },
                { label: 'Update Frequency', value: 'Every 15 minutes' },
                { label: 'Data Retention', value: '12 months' },
                { label: 'Timezone', value: 'WAT (UTC+1)' },
                { label: 'Focus Region', value: 'Sub-Saharan Africa' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-1.5">
                  <span className="text-gray-500 text-xs">{label}</span>
                  <span className="text-violet-700 text-xs font-medium">{value}</span>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full mt-2">Edit Settings</Button>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <CardTitle>Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Two-Factor Auth', value: 'Enabled', ok: true },
                { label: 'Session Timeout', value: '8 hours', ok: true },
                { label: 'IP Allowlist', value: 'Disabled', ok: false },
                { label: 'Audit Logging', value: 'Enabled', ok: true },
                { label: 'Data Encryption', value: 'AES-256', ok: true },
              ].map(({ label, value, ok }) => (
                <div key={label} className="flex items-center justify-between py-1.5">
                  <span className="text-gray-500 text-xs">{label}</span>
                  <span className={`text-xs font-medium ${ok ? 'text-emerald-600' : 'text-gray-400'}`}>{value}</span>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full mt-2">Security Settings</Button>
            </CardContent>
          </Card>
        </div>

        {/* Alert Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-violet-600" />
              <CardTitle>Alert Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: 'Mention spike (>25% in 1 hour)', active: true },
                { label: 'Negative sentiment >70%', active: true },
                { label: 'New misinformation claim detected', active: true },
                { label: 'Topic reaches Google Trends breakout', active: true },
                { label: 'Weekly digest (Mondays, 8am WAT)', active: true },
                { label: 'Influencer posts tracked keywords', active: false },
              ].map(({ label, active }) => (
                <div key={label} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${active ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                  <span className="text-gray-600 text-xs">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a href="/alerts" className="text-violet-600 text-sm font-medium hover:text-violet-700">
                Manage alert thresholds →
              </a>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
