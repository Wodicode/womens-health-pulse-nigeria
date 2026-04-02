'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { misinformationAlerts } from '@/lib/mock-data';
import { severityBg, formatNumber, timeAgo, platformLabel } from '@/lib/utils';
import type { MisinformationAlert } from '@/lib/types';
import { AlertTriangle, Shield, Copy, CheckCircle, TrendingUp, MapPin, Clock, ChevronDown, ChevronUp, ExternalLink, Info } from 'lucide-react';

function AlertCard({ alert }: { alert: MisinformationAlert }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const spreadRateColor = alert.spreadRate > 200 ? 'text-red-600' : alert.spreadRate > 100 ? 'text-orange-600' : 'text-amber-600';
  const severityBorder = alert.severity === 'critical' ? 'border-red-200' : alert.severity === 'high' ? 'border-orange-200' : 'border-amber-200';
  const severityBg2 = alert.severity === 'critical' ? 'bg-red-50' : alert.severity === 'high' ? 'bg-orange-50' : 'bg-amber-50';

  return (
    <div className={`rounded-xl border ${severityBorder} bg-white shadow-sm overflow-hidden`}>
      <div className={`px-1 py-0.5 ${severityBg2}`} />
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
            alert.severity === 'critical' ? 'bg-red-100' : alert.severity === 'high' ? 'bg-orange-100' : 'bg-amber-100'
          }`}>
            <AlertTriangle className={`w-4 h-4 ${
              alert.severity === 'critical' ? 'text-red-600' : alert.severity === 'high' ? 'text-orange-600' : 'text-amber-600'
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${severityBg(alert.severity)}`}>
                  {alert.severity.toUpperCase()}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  alert.status === 'active' ? 'bg-red-50 text-red-600 border border-red-200' :
                  alert.status === 'monitoring' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                  'bg-emerald-50 text-emerald-600 border border-emerald-200'
                }`}>
                  {alert.status}
                </span>
              </div>
            </div>
            <p className="text-gray-800 font-semibold text-sm mb-3 leading-snug">False claim: &ldquo;{alert.claim}&rdquo;</p>

            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{formatNumber(alert.mentionCount)} mentions</span>
              </div>
              <div className={`flex items-center gap-1 ${spreadRateColor} font-medium`}>
                <Clock className="w-3 h-3" />
                <span>{alert.spreadRate} new mentions/hr</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{alert.affectedStates.slice(0, 2).join(', ')}{alert.affectedStates.length > 2 ? ` +${alert.affectedStates.length - 2} states` : ''}</span>
              </div>
              <span>Origin: <span className="text-gray-700 font-medium">{platformLabel(alert.originPlatform)}</span></span>
              <span>{timeAgo(alert.firstDetected)}</span>
            </div>

            {/* Spread bar */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-400 text-[10px]">Spread velocity</span>
                <span className={`text-[10px] font-semibold ${spreadRateColor}`}>{alert.spreadRate} mentions/hr</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full">
                <div className={`h-1.5 rounded-full transition-all ${
                  alert.spreadRate > 200 ? 'bg-red-500' : alert.spreadRate > 100 ? 'bg-orange-500' : 'bg-amber-500'
                }`} style={{ width: `${Math.min(100, (alert.spreadRate / 300) * 100)}%` }} />
              </div>
            </div>

            <button onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-violet-600 text-xs font-medium hover:text-violet-800">
              {expanded ? <><ChevronUp className="w-3 h-3" /> Hide fact-check & response</> : <><ChevronDown className="w-3 h-3" /> Show fact-check & response copy</>}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 p-5 space-y-4 bg-gray-50/50">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-xs font-semibold uppercase tracking-wide">The Facts</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{alert.correction}</p>
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-violet-600" />
                <span className="text-violet-700 text-xs font-semibold uppercase tracking-wide">Suggested Response Copy</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => copy(alert.suggestedResponse)}>
                {copied ? <><CheckCircle className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
              </Button>
            </div>
            <pre className="text-gray-700 text-xs leading-relaxed whitespace-pre-wrap font-sans">{alert.suggestedResponse}</pre>
          </div>

          <div>
            <p className="text-gray-500 text-xs font-medium mb-2">Affected States</p>
            <div className="flex flex-wrap gap-2">
              {alert.affectedStates.map(s => (
                <span key={s} className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-full">{s}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button size="sm" variant="primary">Create Counter-Post</Button>
            <Button size="sm" variant="outline">Assign to Team</Button>
            <Button size="sm" variant="ghost">Mark Resolved</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MisinformationPage() {
  return (
    <div className="bg-gray-50 min-h-full">
      <Header title="Misinformation Centre" subtitle="AI-powered detection & response for harmful health narratives" />
      <div className="p-6 space-y-6 max-w-[1600px]">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Alerts', value: misinformationAlerts.filter(a => a.status !== 'resolved').length, color: 'text-gray-900' },
            { label: 'Critical', value: misinformationAlerts.filter(a => a.severity === 'critical').length, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
            { label: 'High Severity', value: misinformationAlerts.filter(a => a.severity === 'high').length, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
            { label: 'Under Monitoring', value: misinformationAlerts.filter(a => a.status === 'monitoring').length, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`rounded-xl border p-5 shadow-sm ${bg || 'bg-white border-gray-100'}`}>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Explainer */}
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-violet-800 font-semibold text-sm mb-1">How the Misinformation Engine Works</p>
            <p className="text-violet-700 text-sm leading-relaxed">
              The AI continuously scans posts across platforms for known health misinformation patterns, false medical claims, and harmful myths.
              Each alert includes the false claim, its spread rate, affected regions, a verified factual correction, and a ready-to-copy social media response.
              Critical alerts trigger immediate notifications to your team.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-gray-700 font-semibold text-sm">Active Misinformation Alerts — {misinformationAlerts.length} detected</h3>
          {[...misinformationAlerts.filter(a => a.severity === 'critical'), ...misinformationAlerts.filter(a => a.severity === 'high'), ...misinformationAlerts.filter(a => a.severity === 'medium')].map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-xs leading-relaxed">
            Misinformation alerts are detected using AI pattern matching against known false health claims.
            Factual corrections are based on guidance from WHO, NAFDAC, and the Federal Ministry of Health Nigeria.
            To enable real-time social media scanning, connect your API credentials in <a href="/admin" className="underline font-medium">Admin Settings</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
