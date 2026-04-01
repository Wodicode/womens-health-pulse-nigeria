'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { misinformationAlerts } from '@/lib/mock-data';
import { severityBg, formatNumber, timeAgo, platformLabel } from '@/lib/utils';
import type { MisinformationAlert } from '@/lib/types';
import {
  AlertTriangle, Shield, Copy, CheckCircle, TrendingUp,
  MapPin, Clock, ExternalLink, ChevronDown, ChevronUp
} from 'lucide-react';

function AlertCard({ alert }: { alert: MisinformationAlert }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const spreadRateColor = alert.spreadRate > 200 ? 'text-red-400' : alert.spreadRate > 100 ? 'text-orange-400' : 'text-amber-400';

  return (
    <div className={`rounded-2xl border transition-all ${
      alert.severity === 'critical' ? 'border-red-500/40 bg-red-500/5' :
      alert.severity === 'high' ? 'border-orange-500/30 bg-orange-500/5' :
      'border-white/10 bg-white/3'
    }`}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            alert.severity === 'critical' ? 'bg-red-500/20' :
            alert.severity === 'high' ? 'bg-orange-500/20' : 'bg-amber-500/20'
          }`}>
            <AlertTriangle className={`w-5 h-5 ${
              alert.severity === 'critical' ? 'text-red-400' :
              alert.severity === 'high' ? 'text-orange-400' : 'text-amber-400'
            }`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${severityBg(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    alert.status === 'active' ? 'bg-red-500/10 text-red-400' :
                    alert.status === 'monitoring' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {alert.status}
                  </span>
                </div>
                <p className="text-white font-semibold text-base">{alert.claim}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-white/50 mb-3">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{formatNumber(alert.mentionCount)} mentions</span>
              </div>
              <div className={`flex items-center gap-1 ${spreadRateColor}`}>
                <Clock className="w-3 h-3" />
                <span>{alert.spreadRate} mentions/hr</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{alert.affectedStates.slice(0, 2).join(', ')}{alert.affectedStates.length > 2 ? ` +${alert.affectedStates.length - 2}` : ''}</span>
              </div>
              <span>Origin: <span className="text-white/70">{platformLabel(alert.originPlatform)}</span></span>
              <span>{timeAgo(alert.firstDetected)}</span>
            </div>

            {/* Spread Rate Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white/40 text-[10px]">Spread velocity</span>
                <span className={`text-[10px] font-semibold ${spreadRateColor}`}>{alert.spreadRate} mentions/hr</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    alert.spreadRate > 200 ? 'bg-red-500' : alert.spreadRate > 100 ? 'bg-orange-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, (alert.spreadRate / 300) * 100)}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-purple-400 text-xs flex items-center gap-1 hover:text-purple-300"
            >
              {expanded ? <><ChevronUp className="w-3 h-3" /> Hide details</> : <><ChevronDown className="w-3 h-3" /> View fact-check & response</>}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-white/8 p-5 space-y-4">
          {/* Factual Correction */}
          <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Factual Correction</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{alert.correction}</p>
          </div>

          {/* Suggested Response */}
          <div className="bg-purple-500/8 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 text-xs font-semibold uppercase tracking-wide">Suggested Social Media Response</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy(alert.suggestedResponse)}
                className="text-[10px] px-2 py-1 h-auto"
              >
                {copied ? <><CheckCircle className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
              </Button>
            </div>
            <pre className="text-white/75 text-xs leading-relaxed whitespace-pre-wrap font-sans">{alert.suggestedResponse}</pre>
          </div>

          {/* Affected States */}
          <div>
            <p className="text-white/40 text-xs font-medium mb-2 uppercase tracking-wide">Affected States</p>
            <div className="flex flex-wrap gap-2">
              {alert.affectedStates.map(s => (
                <span key={s} className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/60 text-xs rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="secondary">Create Counter-Post</Button>
            <Button size="sm" variant="ghost">Assign to Team</Button>
            <Button size="sm" variant="ghost">Mark Resolved</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MisinformationPage() {
  const critical = misinformationAlerts.filter(a => a.severity === 'critical');
  const high = misinformationAlerts.filter(a => a.severity === 'high');
  const medium = misinformationAlerts.filter(a => a.severity === 'medium');

  return (
    <div>
      <Header title="Misinformation Centre" subtitle="AI-powered detection and response for harmful health narratives" />
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Active Alerts', value: misinformationAlerts.filter(a => a.status !== 'resolved').length, color: 'text-white', bg: 'bg-white/4 border-white/10' },
            { label: 'Critical', value: critical.length, color: 'text-red-400', bg: 'bg-red-500/8 border-red-500/20' },
            { label: 'High Severity', value: high.length, color: 'text-orange-400', bg: 'bg-orange-500/8 border-orange-500/20' },
            { label: 'Under Monitoring', value: medium.length, color: 'text-amber-400', bg: 'bg-amber-500/8 border-amber-500/20' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`rounded-2xl border p-4 ${bg}`}>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-white/50 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-purple-500/8 border border-purple-500/15 rounded-2xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-purple-300 font-semibold text-sm mb-1">How the AI Misinformation Engine Works</p>
            <p className="text-white/55 text-sm">
              Our AI continuously scans posts across all platforms for known health misinformation patterns, emerging false claims, and harmful medical myths.
              Each alert includes the original false claim, its spread velocity, affected regions, a factual correction, and a ready-to-use social media response. Critical alerts trigger immediate notifications.
            </p>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Active Misinformation Alerts</h3>
          {[...critical, ...high, ...medium].map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>
    </div>
  );
}
