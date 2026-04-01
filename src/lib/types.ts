export type Platform = 'twitter' | 'instagram' | 'facebook' | 'linkedin' | 'tiktok' | 'youtube' | 'nairaland' | 'reddit' | 'news' | 'google_trends';

export type Sentiment = 'positive' | 'negative' | 'neutral' | 'fear' | 'anger' | 'hope' | 'frustration' | 'confusion' | 'misinformation';

export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type Language = 'english' | 'pidgin' | 'hausa' | 'yoruba' | 'igbo';

export type ContentFormat = 'reel' | 'carousel' | 'podcast' | 'linkedin_post' | 'x_thread' | 'tiktok' | 'facebook_group' | 'youtube';

export type UserRole = 'admin' | 'editor' | 'viewer';

export type AlertChannel = 'email' | 'slack' | 'whatsapp' | 'in_app';

export interface NigerianState {
  name: string;
  code: string;
  region: 'north' | 'south';
  mentionCount: number;
  sentiment: number; // -1 to 1
}

export interface Mention {
  id: string;
  platform: Platform;
  content: string;
  author: string;
  authorHandle: string;
  authorFollowers: number;
  publishedAt: string;
  sentiment: Sentiment;
  topic: string;
  state?: string;
  language: Language;
  engagementCount: number;
  isViral: boolean;
  isMisinformation: boolean;
  url: string;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  keywords: string[];
  mentionCount: number;
  mentionChange24h: number;
  sentimentScore: number;
  trendScore: number;
  contentOpportunityScore: number;
  campaignReadinessScore: number;
  topPlatforms: Platform[];
  isRising: boolean;
  lastUpdated: string;
}

export interface MisinformationAlert {
  id: string;
  claim: string;
  origin: string;
  originPlatform: Platform;
  mentionCount: number;
  spreadRate: number; // mentions per hour
  severity: Severity;
  correction: string;
  suggestedResponse: string;
  firstDetected: string;
  affectedStates: string[];
  status: 'active' | 'monitoring' | 'resolved';
}

export interface TrendItem {
  query: string;
  value: number; // 0-100
  change: number;
  isBreakout: boolean;
  relatedQueries: string[];
  state?: string;
  category: string;
}

export interface ContentOpportunity {
  id: string;
  topic: string;
  topicId: string;
  score: number; // 1-100
  format: ContentFormat;
  hook: string;
  caption: string;
  cta: string;
  platform: Platform;
  emotionalDriver: string;
  angle: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  estimatedReach: number;
  generatedAt: string;
}

export interface Influencer {
  id: string;
  name: string;
  handle: string;
  platform: Platform;
  followers: number;
  reach: number;
  sentimentInfluence: 'positive' | 'negative' | 'mixed';
  mainTopics: string[];
  category: 'journalist' | 'doctor' | 'influencer' | 'celebrity' | 'ngo' | 'government' | 'media';
  isHelping: boolean;
  recentPosts: number;
  engagementRate: number;
  verified: boolean;
  avatar?: string;
}

export interface Alert {
  id: string;
  type: 'spike' | 'sentiment_threshold' | 'misinformation' | 'keyword' | 'breakout_trend';
  title: string;
  description: string;
  severity: Severity;
  isRead: boolean;
  createdAt: string;
  topic?: string;
  platform?: Platform;
}

export interface DashboardStats {
  totalMentionsToday: number;
  totalMentionsChange: number;
  mentionsByPlatform: Record<Platform, number>;
  sentimentSplit: Record<Sentiment, number>;
  fastestGrowingTopic: string;
  fastestGrowingChange: number;
  misinformationCount: number;
  highRiskConversations: number;
  topViralPosts: Mention[];
  activeStates: NigerianState[];
}

export interface WeeklySummary {
  weekStart: string;
  weekEnd: string;
  totalMentions: number;
  topTopics: string[];
  keyInsights: string[];
  misinformationAlerts: number;
  contentOpportunities: ContentOpportunity[];
  sentimentTrend: 'improving' | 'declining' | 'stable';
}
