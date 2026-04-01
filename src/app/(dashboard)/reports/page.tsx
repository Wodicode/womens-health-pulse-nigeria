'use client';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { weeklySummary, dashboardStats, topics, misinformationAlerts } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';
import { FileText, Download, Calendar, TrendingUp, AlertTriangle, Lightbulb, BarChart2 } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div>
      <Header title="Reports & Export" subtitle="Daily, weekly, and monthly intelligence summaries" />
      <div className="p-6 space-y-6">
        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Daily Brief',
              desc: 'Key mentions, alerts, and top content opportunities from the last 24 hours.',
              icon: Calendar,
              badge: 'Today · Apr 1',
              badgeVariant: 'positive' as const,
            },
            {
              title: 'Weekly Intelligence Report',
              desc: 'Full week analysis including trends, sentiment shifts, misinformation, and recommendations.',
              icon: FileText,
              badge: 'Mar 25 – Apr 1',
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
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <Badge variant={badgeVariant} size="sm">{badge}</Badge>
                </div>
                <p className="text-white font-semibold text-sm mb-1.5">{title}</p>
                <p className="text-white/50 text-xs leading-relaxed mb-4">{desc}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="flex-1">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1">
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
                <FileText className="w-4 h-4 text-purple-400" />
                <CardTitle>Weekly Intelligence Report Preview</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </Button>
                <Button size="sm" variant="ghost">
                  <Download className="w-3.5 h-3.5" /> PowerPoint
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Report Header */}
            <div className="bg-gradient-to-r from-purple-600/15 to-rose-600/10 rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-2">Women&apos;s Health Pulse Nigeria</p>
                  <h2 className="text-white text-2xl font-bold mb-1">Weekly Intelligence Report</h2>
                  <p className="text-white/55">March 25 – April 1, 2026 · RenewHER / Dr. Adanna</p>
                </div>
                <Badge variant="purple">Confidential</Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {[
                  { label: 'Total Mentions', value: formatNumber(weeklySummary.totalMentions) },
                  { label: 'Top Topics', value: weeklySummary.topTopics.length.toString() },
                  { label: 'Misinfo Alerts', value: weeklySummary.misinformationAlerts.toString() },
                  { label: 'Sentiment Trend', value: weeklySummary.sentimentTrend },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-white font-bold text-xl">{value}</p>
                    <p className="text-white/45 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Topics */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <h3 className="text-white font-semibold text-sm">Top 5 Topics This Week</h3>
              </div>
              <div className="space-y-2">
                {weeklySummary.topTopics.map((topic, i) => {
                  const t = topics.find(t => t.name === topic);
                  return (
                    <div key={topic} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/6">
                      <span className="text-white/30 text-xs font-bold w-5">0{i + 1}</span>
                      <span className="text-white font-medium text-sm flex-1">{topic}</span>
                      {t && (
                        <>
                          <span className="text-white/50 text-xs">{formatNumber(t.mentionCount)} mentions</span>
                          <span className={`text-xs font-semibold ${t.mentionChange24h > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
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
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <h3 className="text-white font-semibold text-sm">AI Key Insights</h3>
              </div>
              <div className="space-y-3">
                {weeklySummary.keyInsights.map((insight, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/3 rounded-xl border border-white/6">
                    <span className="text-purple-400 text-xs font-bold mt-0.5 flex-shrink-0">{i + 1}</span>
                    <p className="text-white/75 text-sm leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Misinformation Summary */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <h3 className="text-white font-semibold text-sm">Misinformation Incidents This Week</h3>
                <Badge variant="negative">{weeklySummary.misinformationAlerts} active</Badge>
              </div>
              <div className="space-y-2">
                {misinformationAlerts.slice(0, 3).map(m => (
                  <div key={m.id} className="flex items-start gap-3 p-3 bg-red-500/5 rounded-xl border border-red-500/15">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${m.severity === 'critical' ? 'bg-red-500' : m.severity === 'high' ? 'bg-orange-500' : 'bg-amber-500'}`} />
                    <div>
                      <p className="text-white/80 text-sm">{m.claim}</p>
                      <p className="text-white/40 text-xs mt-0.5">{formatNumber(m.mentionCount)} mentions · {m.originPlatform}</p>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ml-auto flex-shrink-0 ${
                      m.severity === 'critical' ? 'bg-red-500/15 text-red-400' : 'bg-orange-500/15 text-orange-400'
                    }`}>{m.severity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/8">
              <Button variant="primary">
                <Download className="w-4 h-4" /> Download Full PDF Report
              </Button>
              <Button variant="ghost">
                <Download className="w-4 h-4" /> Export as CSV
              </Button>
              <Button variant="ghost">
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
