'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { misinformationAlerts } from '@/lib/mock-data';
import { severityBg, formatNumber, timeAgo, platformLabel } from '@/lib/utils';
import type { MisinformationAlert } from '@/lib/types';
import {
  AlertTriangle, Shield, Copy, CheckCircle, TrendingUp,
  MapPin, Clock, ChevronDown, ChevronUp, Zap, Info, Radio
} from 'lucide-react';

function AlertCard({ alert }: { alert: MisinformationAlert }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isRed = alert.severity === 'critical';
  const isOrange = alert.severity === 'high';

  const leftBar = isRed ? 'bg-red-500' : isOrange ? 'bg-orange-400' : 'bg-amber-400';
  const iconBg = isRed ? 'bg-red-100' : isOrange ? 'bg-orange-100' : 'bg-amber-100';
  const iconColor = isRed ? 'text-red-600' : isOrange ? 'text-orange-600' : 'text-amber-600';
  const badgeBg = isRed ? 'bg-red-600' : isOrange ? 'bg-orange-500' : 'bg-amber-500';
  const spreadRateColor = alert.spreadRate > 200 ? 'text-red-600' : alert.spreadRate > 100 ? 'text-orange-600' : 'text-amber-600';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex">
      {/* Left severity strip */}
      <div className={`w-1 flex-shrink-0 ${leftBar}`} />

      <div className="flex-1 min-w-0">
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
              <AlertTriangle className={`w-4 h-4 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold text-white ${badgeBg}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                    alert.status === 'active' ? 'bg-red-50 text-red-600 border-red-200' :
                    alert.status === 'monitoring' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                    'bg-emerald-50 text-emerald-600 border-emerald-200'
                  }`}>
                    {alert.status}
                  </span>
                </div>
                <span className="text-gray-400 text-[10px] flex-shrink-0">{timeAgo(alert.firstDetected)}</span>
              </div>

              <p className="text-gray-800 font-semibold text-sm mb-3 leading-snug">
                &ldquo;{alert.claim}&rdquo;
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{formatNumber(alert.mentionCount)} mentions</span>
                </div>
                <div className={`flex items-center gap-1 font-semibold ${spreadRateColor}`}>
                  <Radio className="w-3 h-3" />
                  <span>{alert.spreadRate}/hr spreading</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{alert.affectedStates.slice(0, 2).join(', ')}{alert.affectedStates.length > 2 ? ` +${alert.affectedStates.length - 2}` : ''}</span>
                </div>
                <span className="text-gray-400">via {platformLabel(alert.originPlatform)}</span>
              </div>

              {/* Spread bar */}
              <div className="mb-4">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-1.5 rounded-full ${
                    alert.spreadRate > 200 ? 'bg-red-500' : alert.spreadRate > 100 ? 'bg-orange-500' : 'bg-amber-500'
                  }`} style={{ width: `${Math.min(100, (alert.spreadRate / 300) * 100)}%` }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-400 text-[10px]">Spread velocity</span>
                  <span className={`text-[10px] font-semibold ${spreadRateColor}`}>{alert.spreadRate} mentions/hr</span>
                </div>
              </div>

              <button onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1.5 text-[#1a4731] text-xs font-semibold hover:text-[#0d3425] transition-colors">
                {expanded
                  ? <><ChevronUp className="w-3 h-3" /> Hide fact-check & response</>
                  : <><ChevronDown className="w-3 h-3" /> Show fact-check & response copy</>}
              </button>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="border-t border-gray-100 p-5 space-y-4 bg-gray-50/50">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">The Facts</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{alert.correction}</p>
            </div>

            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#1a4731]" />
                  <span className="text-[#1a4731] text-xs font-bold uppercase tracking-widest">Suggested Response Copy</span>
                </div>
                <button onClick={() => copy(alert.suggestedResponse)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white border border-[#1a4731]/20 text-[#1a4731] rounded-lg font-medium hover:bg-[#1a4731] hover:text-white transition-all">
                  {copied ? <><CheckCircle className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
              <pre className="text-gray-700 text-xs leading-relaxed whitespace-pre-wrap font-sans">{alert.suggestedResponse}</pre>
            </div>

            <div>
              <p className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wide">Affected States</p>
              <div className="flex flex-wrap gap-2">
                {alert.affectedStates.map(s => (
                  <span key={s} className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-full">{s}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <a href="/content-studio" className="flex items-center gap-1.5 text-xs px-4 py-2 bg-[#c8006e] hover:bg-[#a8005c] text-white rounded-xl font-semibold transition-all">
                <Zap className="w-3 h-3" /> Create Counter-Post
              </a>
              <button className="text-xs px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-all">
                Assign to Team
              </button>
              <button className="text-xs px-4 py-2 text-gray-400 hover:text-gray-600 rounded-xl font-medium transition-all">
                Mark Resolved
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MisinformationPage() {
  const active = misinformationAlerts.filter(a => a.status !== 'resolved');
  const critical = misinformationAlerts.filter(a => a.severity === 'critical');
  const high = misinformationAlerts.filter(a => a.severity === 'high');
  const monitoring = misinformationAlerts.filter(a => a.status === 'monitoring');

  return (
    <div className="bg-[#f8f7f5] min-h-full">
      <Header title="Misinformation Centre" subtitle="AI-powered detection & rapid response" />
      <div className="p-6 space-y-6 max-w-[1600px]">

        {/* Crisis hero */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 40%, #c8006e 100%)' }}>
          <div className="relative p-8">
            {/* Dot pattern overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 bg-red-900/40 border border-red-400/30 rounded-full px-3 py-1 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
                  </span>
                  <span className="text-red-200 text-[11px] font-bold uppercase tracking-widest">Live Threat Monitor</span>
                </div>
                <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
                  {critical.length} critical {critical.length === 1 ? 'threat' : 'threats'} require <span className="text-red-300">immediate response</span>
                </h1>
                <p className="text-red-200/80 text-sm leading-relaxed max-w-xl">
                  HPV vaccine misinformation is the most dangerous active claim — spreading at 312 mentions/hr across Lagos, Abuja, and Kano.
                  AI-generated response copy is ready to deploy.
                </p>
              </div>
              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-3 flex-shrink-0 lg:min-w-[200px]">
                {[
                  { label: 'Active Alerts', value: active.length, color: 'text-white' },
                  { label: 'Critical', value: critical.length, color: 'text-red-300' },
                  { label: 'High Severity', value: high.length, color: 'text-orange-300' },
                  { label: 'Monitoring', value: monitoring.length, color: 'text-yellow-300' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-white/10 border border-white/20 rounded-xl p-3 text-center">
                    <p className={`text-xl font-black ${color}`}>{value}</p>
                    <p className="text-white/60 text-[10px] mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
          <div className="w-9 h-9 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-[#1a4731]" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-sm mb-1">How the Misinformation Engine Works</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              AI continuously scans posts for known health misinformation patterns and harmful myths.
              Each alert includes the false claim, its spread rate, affected regions, a verified correction, and a ready-to-deploy social media response.
              Critical alerts surface immediately. Factual corrections are grounded in WHO, NAFDAC, and FMOH guidance.
            </p>
          </div>
        </div>

        {/* Alert list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-700 font-semibold text-sm">
              Active Alerts
              <span className="ml-2 text-[10px] bg-red-100 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-bold">{active.length} live</span>
            </h3>
            <span className="text-gray-400 text-xs">Sorted by severity · highest risk first</span>
          </div>

          {[...misinformationAlerts.filter(a => a.severity === 'critical'),
            ...misinformationAlerts.filter(a => a.severity === 'high'),
            ...misinformationAlerts.filter(a => a.severity === 'medium')
          ].map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700 text-xs leading-relaxed">
            Alerts are detected using AI pattern matching against known false health claims.
            Connect live social API credentials in <a href="/admin" className="underline font-medium">Admin Settings</a> for real-time scanning.
          </p>
        </div>

      </div>
    </div>
  );
}
