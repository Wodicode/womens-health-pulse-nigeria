'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { alerts } from '@/lib/mock-data';
import { severityBg, timeAgo } from '@/lib/utils';
import { Bell, Settings, Mail, Hash, MessageSquare, Check, Trash2, AlertTriangle, Info } from 'lucide-react';

export default function AlertsPage() {
  const [alertList, setAlertList] = useState(alerts);
  const [channels, setChannels] = useState({
    email: true, slack: false, whatsapp: true, in_app: true
  });

  const markRead = (id: string) => {
    setAlertList(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const markAllRead = () => {
    setAlertList(prev => prev.map(a => ({ ...a, isRead: true })));
  };

  const unread = alertList.filter(a => !a.isRead).length;

  return (
    <div>
      <Header title="Alerts & Notifications" subtitle="Smart alerts for spikes, misinformation, and breaking topics" />
      <div className="p-6 space-y-6">

        {/* Info note */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-blue-700 text-sm leading-relaxed">
            Alerts are triggered by your tracked keywords and thresholds. Connect live data sources in{' '}
            <a href="/admin" className="underline font-medium">Admin Settings</a> to receive real-time notifications.
            Current alerts reflect estimated activity across Nigerian social and news platforms.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Alerts', value: alertList.length, color: 'text-gray-900' },
            { label: 'Unread', value: unread, color: unread > 0 ? 'text-amber-600' : 'text-gray-900' },
            { label: 'Critical', value: alertList.filter(a => a.severity === 'critical').length, color: 'text-red-600' },
            { label: 'This Week', value: alertList.length, color: 'text-gray-900' },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl border border-gray-100 bg-white shadow-sm p-4">
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Alert Feed */}
          <div className="xl:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-700 font-semibold text-sm">Alert Feed</h3>
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-violet-600 text-xs hover:text-violet-700 flex items-center gap-1 font-medium"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>

            {alertList.map(alert => (
              <div
                key={alert.id}
                className={`rounded-xl border p-4 transition-all ${
                  !alert.isRead
                    ? alert.severity === 'critical'
                      ? 'border-red-200 bg-red-50'
                      : 'border-violet-100 bg-violet-50'
                    : 'border-gray-100 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    alert.isRead ? 'bg-gray-300' :
                    alert.severity === 'critical' ? 'bg-red-500 animate-pulse' :
                    alert.severity === 'high' ? 'bg-orange-500' : 'bg-amber-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-sm font-semibold ${alert.isRead ? 'text-gray-400' : 'text-gray-900'}`}>
                          {alert.title}
                        </p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold border ${severityBg(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        {alert.platform && (
                          <span className="text-[10px] text-gray-400 capitalize">{alert.platform}</span>
                        )}
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        {!alert.isRead && (
                          <button
                            onClick={() => markRead(alert.id)}
                            className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700"
                            title="Mark as read"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500"
                          title="Dismiss alert"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className={`text-xs leading-relaxed ${alert.isRead ? 'text-gray-400' : 'text-gray-600'}`}>
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-gray-400 text-[10px]">{timeAgo(alert.createdAt)}</span>
                      {alert.topic && (
                        <span className="text-violet-500 text-[10px] font-medium">{alert.topic}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {alertList.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No alerts at this time</p>
              </div>
            )}
          </div>

          {/* Alert Settings */}
          <div className="space-y-4">
            {/* Notification Channels */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-violet-600" />
                  <CardTitle>Notification Channels</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { key: 'email', label: 'Email', desc: 'Digest & critical alerts', icon: Mail },
                  { key: 'slack', label: 'Slack', desc: 'Team workspace integration', icon: Hash },
                  { key: 'whatsapp', label: 'WhatsApp', desc: 'Webhook notifications', icon: MessageSquare },
                  { key: 'in_app', label: 'In-App', desc: 'Real-time dashboard alerts', icon: Bell },
                ].map(({ key, label, desc, icon: Icon }) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-800 text-sm font-medium">{label}</p>
                        <p className="text-gray-400 text-xs">{desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setChannels(prev => ({ ...prev, [key]: !prev[key as keyof typeof channels] }))}
                      className={`w-10 h-5 rounded-full relative transition-all ${channels[key as keyof typeof channels] ? 'bg-violet-600' : 'bg-gray-200'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${channels[key as keyof typeof channels] ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alert Thresholds */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <CardTitle>Alert Thresholds</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Mention spike threshold', value: '+25%', unit: 'in 1 hour' },
                  { label: 'Negative sentiment alert', value: '70%', unit: 'of topic mentions' },
                  { label: 'Misinformation spread rate', value: '50+', unit: 'mentions/hour' },
                  { label: 'Viral post threshold', value: '1,000+', unit: 'engagements' },
                ].map(({ label, value, unit }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-xs">{label}</p>
                      <p className="text-gray-400 text-[10px]">{unit}</p>
                    </div>
                    <span className="text-violet-700 font-semibold text-sm bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-lg">
                      {value}
                    </span>
                  </div>
                ))}
                <Button size="sm" variant="outline" className="w-full">Edit Thresholds</Button>
              </CardContent>
            </Card>

            {/* Alert Types */}
            <Card>
              <CardHeader><CardTitle>Active Alert Types</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { type: 'Topic Spike', active: true },
                  { type: 'Sentiment Threshold', active: true },
                  { type: 'Misinformation Detected', active: true },
                  { type: 'Keyword Appears in News', active: true },
                  { type: 'Google Trends Breakout', active: true },
                  { type: 'Influencer Posts', active: false },
                  { type: 'Weekly Digest', active: true },
                ].map(({ type, active }) => (
                  <div key={type} className="flex items-center justify-between py-1.5">
                    <span className="text-gray-600 text-xs">{type}</span>
                    <span className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
