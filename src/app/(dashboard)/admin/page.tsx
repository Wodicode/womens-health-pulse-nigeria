'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { topics } from '@/lib/mock-data';
import { Settings, Users, Plus, Tag, Globe, Database, Key, Bell, Shield, Trash2 } from 'lucide-react';

const teamMembers = [
  { name: 'Dr. Adanna', role: 'Admin', email: 'adanna@renewher.ng', lastActive: '2 min ago', status: 'online' },
  { name: 'Kemi Okafor', role: 'Editor', email: 'kemi@renewher.ng', lastActive: '1 hour ago', status: 'away' },
  { name: 'Tunde Babatunde', role: 'Viewer', email: 'tunde@renewher.ng', lastActive: '3 hours ago', status: 'offline' },
  { name: 'Ngozi Eze', role: 'Editor', email: 'ngozi@renewher.ng', lastActive: 'Yesterday', status: 'offline' },
];

const dataSources = [
  { name: 'X / Twitter API', status: 'connected', lastSync: '2 min ago', icon: '🐦' },
  { name: 'Google Trends', status: 'connected', lastSync: '15 min ago', icon: '📊' },
  { name: 'News Scraper', status: 'connected', lastSync: '30 min ago', icon: '📰' },
  { name: 'Nairaland', status: 'connected', lastSync: '1 hr ago', icon: '💬' },
  { name: 'Instagram API', status: 'pending', lastSync: 'Not connected', icon: '📸' },
  { name: 'TikTok API', status: 'pending', lastSync: 'Not connected', icon: '🎵' },
  { name: 'Facebook API', status: 'error', lastSync: 'Token expired', icon: '👥' },
  { name: 'YouTube API', status: 'connected', lastSync: '45 min ago', icon: '▶️' },
];

export default function AdminPage() {
  const [newKeyword, setNewKeyword] = useState('');
  const [keywords, setKeywords] = useState(['maternal mortality', 'fibroid', 'PCOS', 'NHIA', 'cervical cancer', 'postpartum depression', 'menstrual health', 'fertility Nigeria', 'antenatal care', 'period poverty']);

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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Team Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <CardTitle>Team Members</CardTitle>
                </div>
                <Button size="sm" variant="ghost">
                  <Plus className="w-3.5 h-3.5" /> Invite
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamMembers.map(member => (
                <div key={member.name} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/6">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0d0b1a] ${
                      member.status === 'online' ? 'bg-emerald-500' :
                      member.status === 'away' ? 'bg-amber-500' : 'bg-white/20'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{member.name}</p>
                    <p className="text-white/40 text-xs">{member.email} · {member.lastActive}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    member.role === 'Admin' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20' :
                    member.role === 'Editor' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' :
                    'bg-white/10 text-white/50 border border-white/15'
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
                <Database className="w-4 h-4 text-purple-400" />
                <CardTitle>Data Sources & Integrations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {dataSources.map(({ name, status, lastSync, icon }) => (
                <div key={name} className="flex items-center gap-3 p-2.5 bg-white/3 rounded-xl border border-white/6">
                  <span className="text-base flex-shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">{name}</p>
                    <p className="text-white/35 text-[10px]">{lastSync}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    status === 'connected' ? 'bg-emerald-500/15 text-emerald-400' :
                    status === 'error' ? 'bg-red-500/15 text-red-400' :
                    'bg-white/10 text-white/50'
                  }`}>
                    {status}
                  </span>
                  <button className="text-purple-400 text-xs hover:text-purple-300">
                    {status === 'connected' ? 'Sync' : 'Connect'}
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Keyword Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-purple-400" />
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
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-500/50"
              />
              <Button onClick={addKeyword}>
                <Plus className="w-4 h-4" /> Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map(kw => (
                <div key={kw} className="flex items-center gap-1 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded-full group">
                  <span>{kw}</span>
                  <button
                    onClick={() => setKeywords(prev => prev.filter(k => k !== kw))}
                    className="text-purple-400/50 hover:text-red-400 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-xs mt-3">{keywords.length} keywords tracked across all platforms</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* API Keys */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                <CardTitle>API Keys</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'OpenAI API Key', configured: true },
                { label: 'Twitter Bearer Token', configured: true },
                { label: 'Google Trends API', configured: true },
                { label: 'YouTube API Key', configured: true },
                { label: 'Instagram API', configured: false },
                { label: 'Slack Webhook URL', configured: false },
              ].map(({ label, configured }) => (
                <div key={label} className="flex items-center justify-between py-1.5">
                  <span className="text-white/60 text-xs">{label}</span>
                  <span className={`text-[10px] font-medium ${configured ? 'text-emerald-400' : 'text-white/30'}`}>
                    {configured ? '✓ Set' : '— Not set'}
                  </span>
                </div>
              ))}
              <Button size="sm" variant="ghost" className="w-full mt-2">Manage API Keys</Button>
            </CardContent>
          </Card>

          {/* Platform Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
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
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-1.5">
                  <span className="text-white/60 text-xs">{label}</span>
                  <span className="text-purple-400 text-xs font-medium">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
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
                  <span className="text-white/60 text-xs">{label}</span>
                  <span className={`text-xs font-medium ${ok ? 'text-emerald-400' : 'text-white/40'}`}>{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
