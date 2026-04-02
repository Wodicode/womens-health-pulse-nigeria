'use client';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { weeklySummary, topics, misinformationAlerts } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';
import { FileText, Download, Calendar, TrendingUp, AlertTriangle, Lightbulb, BarChart2, Info } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div>
      <Header title="Reports & Export" subtitle="Daily, weekly, and monthly intelligence summaries" />
      <div className="p-6 space-y-6">

        {/* Info note */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
          <Info className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-amber-700 text-sm leading-relaxed">
            Reports are generated from tracked keyword data. Statistics marked with source links are verified from WHO, UNICEF, and Nigerian government datasets.
            Social media volume figures are estimates based on publicly available trend signals.
          </p>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Daily Brief',
              desc: 'Key mentions, alerts, and top content opportunities from the last 24 hours.',
              icon: Calendar,
              badge: 'Today · Apr 2',
              badgeVariant: 'positive' as const,
            },
            {
              title: 'Weekly Intelligence Report',
              desc: 'Full week analysis including trends, sentiment shifts, misinformation, and recommendations.',
              icon: FileText,
              badge: 'Mar 26 – Apr 2',
              badgeVariant: 'purple' as const,
            },
            {
              title: 'Monthly Campaign Report',
              desc: 'Monthly summary of all topics, content performance, and strategic insights for campaigns.',
              icon: BarChart2,
              badge: 'March 2026',
              badgeVariant: 'outline' as const,
            },
          ].map(({ title, desc, icon: Icon, badge, badgeVariant }) => (
            <Card key={title} hover className="cursor-pointer">
              <CardContent className="pt-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-violet-600" />
                  </div>
                  <Badge variant={badgeVariant} size="sm">{badge}</Badge>
                </div>
                <p className="text-gray-900 font-semibold text-sm mb-1.5">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{desc}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="w-3.5 h-3.5" /> CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Summary Report Preview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-600" />
                <CardTitle>Weekly Intelligence Report Preview</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="primary">
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-3.5 h-3.5" /> PowerPoint
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Report Header */}
            <div className="bg-gradient-to-r from-violet-600 to-rose-500 rounded-xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-violet-100 text-xs font-semibold uppercase tracking-widest mb-2">
                    Women&apos;s Health Pulse Nigeria
                  </p>
                  <h2 className="text-white text-2xl font-bold mb-1">Weekly Intelligence Report</h2>
                  <p className="text-white/75">March 26 – April 2, 2026 · RenewHER / Dr. Adanna</p>
                </div>
                <span className="text-xs bg-white/20 border border-white/30 px-2.5 py-1 rounded-full font-medium">
                  Confidential
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/20">
                {[
                  { label: 'Total Mentions', value: formatNumber(weeklySummary.totalMentions) },
                  { label: 'Top Topics', value: weeklySummary.topTopics.length.toString() },
                  { label: 'Misinfo Alerts', value: weeklySummary.misinformationAlerts.toString() },
                  { label: 'Sentiment Trend', value: weeklySummary.sentimentTrend },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-white font-bold text-xl">{value}</p>
                    <p className="text-white/60 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Topics */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-violet-600" />
                <h3 className="text-gray-800 font-semibold text-sm">Top 5 Topics This Week</h3>
              </div>
              <div className="space-y-2">
                {weeklySummary.topTopics.map((topic, i) => {
                  const t = topics.find(t => t.name === topic);
                  return (
                    <div key={topic} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-gray-400 text-xs font-bold w-5">0{i + 1}</span>
                      <span className="text-gray-800 font-medium text-sm flex-1">{topic}</span>
                      {t && (
                        <>
                          <span className="text-gray-500 text-xs">{formatNumber(t.mentionCount)} mentions</span>
                          <span className={`text-xs font-semibold ${t.mentionChange24h > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            +{t.mentionChange24h.toFixed(1)}%
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Insights */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h3 className="text-gray-800 font-semibold text-sm">AI Key Insights</h3>
              </div>
              <div className="space-y-3">
                {weeklySummary.keyInsights.map((insight, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-violet-600 text-xs font-bold mt-0.5 flex-shrink-0">{i + 1}</span>
                    <p className="text-gray-700 text-sm leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Misinformation Summary */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="text-gray-800 font-semibold text-sm">Misinformation Incidents This Week</h3>
                <Badge variant="negative">{weeklySummary.misinformationAlerts} active</Badge>
              </div>
              <div className="space-y-2">
                {misinformationAlerts.slice(0, 3).map(m => (
                  <div key={m.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      m.severity === 'critical' ? 'bg-red-500' :
                      m.severity === 'high' ? 'bg-orange-500' : 'bg-amber-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-sm">{m.claim}</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {formatNumber(m.mentionCount)} mentions · {m.originPlatform}
                      </p>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                      m.severity === 'critical'
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : 'bg-orange-100 text-orange-700 border border-orange-200'
                    }`}>
                      {m.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Sources Note */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-gray-500 text-xs leading-relaxed">
                <span className="font-medium text-gray-700">Data note:</span> Health statistics sourced from WHO, UNICEF Nigeria, and NDHS 2021.
                Social media mention volumes are estimated from keyword tracking signals and publicly available trend data.
                This report is intended for internal use by the RenewHER team.
              </p>
            </div>

            {/* Export Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
              <Button variant="primary">
                <Download className="w-4 h-4" /> Download Full PDF Report
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4" /> Export as CSV
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4" /> Export as PowerPoint
              </Button>
              <Button variant="outline">
                Schedule Auto-Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
