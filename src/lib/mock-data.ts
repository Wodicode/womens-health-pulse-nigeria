import type {
  Mention, Topic, MisinformationAlert, TrendItem,
  ContentOpportunity, Influencer, Alert, DashboardStats,
  NigerianState, WeeklySummary
} from './types';

// ─── Nigerian States ───────────────────────────────────────────────────────────
export const nigerianStates: NigerianState[] = [
  { name: 'Lagos', code: 'LA', region: 'south', mentionCount: 4821, sentiment: 0.12 },
  { name: 'Abuja (FCT)', code: 'AB', region: 'north', mentionCount: 3247, sentiment: 0.08 },
  { name: 'Kano', code: 'KN', region: 'north', mentionCount: 2109, sentiment: -0.15 },
  { name: 'Rivers', code: 'RV', region: 'south', mentionCount: 1876, sentiment: -0.04 },
  { name: 'Oyo', code: 'OY', region: 'south', mentionCount: 1654, sentiment: 0.21 },
  { name: 'Kaduna', code: 'KD', region: 'north', mentionCount: 1432, sentiment: -0.18 },
  { name: 'Anambra', code: 'AN', region: 'south', mentionCount: 1298, sentiment: 0.07 },
  { name: 'Delta', code: 'DL', region: 'south', mentionCount: 987, sentiment: -0.09 },
  { name: 'Enugu', code: 'EN', region: 'south', mentionCount: 876, sentiment: 0.14 },
  { name: 'Plateau', code: 'PL', region: 'north', mentionCount: 743, sentiment: -0.22 },
  { name: 'Borno', code: 'BO', region: 'north', mentionCount: 621, sentiment: -0.31 },
  { name: 'Imo', code: 'IM', region: 'south', mentionCount: 598, sentiment: 0.04 },
];

// ─── Topics ────────────────────────────────────────────────────────────────────
export const topics: Topic[] = [
  {
    id: '1', name: 'Maternal Mortality', slug: 'maternal-mortality',
    keywords: ['maternal death', 'maternal mortality', 'women dying in labour', 'childbirth death'],
    mentionCount: 8472, mentionChange24h: 34.2, sentimentScore: -0.62,
    trendScore: 88, contentOpportunityScore: 92, campaignReadinessScore: 85,
    topPlatforms: ['twitter', 'facebook', 'news'], isRising: true, lastUpdated: '2026-04-01T10:00:00Z',
  },
  {
    id: '2', name: 'Fibroids', slug: 'fibroids',
    keywords: ['fibroids', 'fibroid', 'uterine fibroids', 'fibroid surgery', 'fibroid symptoms'],
    mentionCount: 6231, mentionChange24h: 18.7, sentimentScore: -0.44,
    trendScore: 79, contentOpportunityScore: 88, campaignReadinessScore: 78,
    topPlatforms: ['tiktok', 'instagram', 'twitter'], isRising: true, lastUpdated: '2026-04-01T10:00:00Z',
  },
  {
    id: '3', name: 'PCOS', slug: 'pcos',
    keywords: ['PCOS', 'polycystic ovary', 'irregular periods', 'hormonal imbalance'],
    mentionCount: 5109, mentionChange24h: 22.1, sentimentScore: -0.38,
    trendScore: 74, contentOpportunityScore: 85, campaignReadinessScore: 72,
    topPlatforms: ['instagram', 'tiktok', 'twitter'], isRising: true, lastUpdated: '2026-04-01T10:00:00Z',
  },
  {
    id: '4', name: 'NHIA Enrolment', slug: 'nhia',
    keywords: ['NHIA', 'health insurance', 'NHIA enrolment', 'national health insurance'],
    mentionCount: 4876, mentionChange24h: 67.3, sentimentScore: -0.51,
    trendScore: 95, contentOpportunityScore: 96, campaignReadinessScore: 91,
    topPlatforms: ['twitter', 'facebook', 'linkedin'], isRising: true, lastUpdated: '2026-04-01T10:00:00Z',
  },
  {
    id: '5', name: 'Cervical Cancer', slug: 'cervical-cancer',
    keywords: ['cervical cancer', 'HPV vaccine', 'pap smear', 'cervical screening'],
    mentionCount: 3987, mentionChange24h: 12.4, sentimentScore: -0.29,
    trendScore: 71, contentOpportunityScore: 82, campaignReadinessScore: 80,
    topPlatforms: ['facebook', 'instagram', 'news'], isRising: false, lastUpdated: '2026-04-01T10:00:00Z',
  },
  {
    id: '6', name: 'Antenatal Care', slug: 'antenatal-care',
    keywords: ['antenatal', 'ANC', 'prenatal care', 'antenatal care', 'booking appointment'],
    mentionCount: 3654, mentionChange24h: 8.9, sentimentScore: -0.41,
    trendScore: 68, contentOpportunityScore: 79, campaignReadinessScore: 75,
    topPlatforms: ['facebook', 'twitter', 'nairaland'], isRising: false, lastUpdated: '2026-04-01T10:00:00Z',
  },
  {
    id: '7', name: 'Postpartum Depression', slug: 'postpartum-depression',
    keywords: ['postpartum depression', 'PPD', 'baby blues', 'postnatal depression', 'after birth depression'],
    mentionCount: 2876, mentionChange24h: 45.6, sentimentScore: -0.55,
    trendScore: 83, contentOpportunityScore: 90, campaignReadinessScore: 70,
    topPlatforms: ['instagram', 'twitter', 'tiktok'], isRising: true, lastUpdated: '2026-04-01T10:00:00Z',
  },
  {
    id: '8', name: 'Period Poverty', slug: 'period-poverty',
    keywords: ['period poverty', 'sanitary pad', 'menstrual hygiene', 'period products'],
    mentionCount: 2543, mentionChange24h: 28.3, sentimentScore: -0.48,
    trendScore: 76, contentOpportunityScore: 87, campaignReadinessScore: 82,
    topPlatforms: ['twitter', 'instagram', 'facebook'], isRising: true, lastUpdated: '2026-04-01T10:00:00Z',
  },
  {
    id: '9', name: 'Fertility & Infertility', slug: 'fertility',
    keywords: ['infertility', 'fertility treatment', 'IVF Nigeria', 'trying to conceive', 'TTC'],
    mentionCount: 4321, mentionChange24h: 15.2, sentimentScore: -0.36,
    trendScore: 72, contentOpportunityScore: 84, campaignReadinessScore: 68,
    topPlatforms: ['instagram', 'facebook', 'nairaland'], isRising: false, lastUpdated: '2026-04-01T10:00:00Z',
  },
  {
    id: '10', name: 'Breast Cancer', slug: 'breast-cancer',
    keywords: ['breast cancer', 'breast lump', 'mammogram', 'breast screening', 'mastectomy'],
    mentionCount: 3198, mentionChange24h: 9.8, sentimentScore: -0.32,
    trendScore: 65, contentOpportunityScore: 78, campaignReadinessScore: 74,
    topPlatforms: ['facebook', 'instagram', 'news'], isRising: false, lastUpdated: '2026-04-01T10:00:00Z',
  },
  {
    id: '11', name: 'Menopause', slug: 'menopause',
    keywords: ['menopause', 'perimenopause', 'hot flashes', 'menopause symptoms'],
    mentionCount: 1876, mentionChange24h: 31.4, sentimentScore: -0.21,
    trendScore: 62, contentOpportunityScore: 75, campaignReadinessScore: 60,
    topPlatforms: ['instagram', 'facebook', 'tiktok'], isRising: true, lastUpdated: '2026-04-01T10:00:00Z',
  },
  {
    id: '12', name: 'Gender-Based Violence', slug: 'gbv',
    keywords: ['gender-based violence', 'GBV', 'domestic violence', 'sexual assault', 'rape'],
    mentionCount: 5432, mentionChange24h: 21.7, sentimentScore: -0.78,
    trendScore: 86, contentOpportunityScore: 71, campaignReadinessScore: 65,
    topPlatforms: ['twitter', 'facebook', 'news'], isRising: true, lastUpdated: '2026-04-01T10:00:00Z',
  },
];

// ─── Mentions ──────────────────────────────────────────────────────────────────
export const recentMentions: Mention[] = [
  {
    id: 'm1', platform: 'twitter', content: 'Why are women still dying in Nigerian hospitals during childbirth in 2026? The government must act now. Our maternal mortality rate is a national emergency. #MaternalMortality #NigeriaHealth',
    author: 'Dr. Chioma Obi', authorHandle: '@drchiomaobi', authorFollowers: 45200,
    publishedAt: '2026-04-01T09:15:00Z', sentiment: 'anger', topic: 'Maternal Mortality',
    state: 'Lagos', language: 'english', engagementCount: 3241, isViral: true, isMisinformation: false,
    url: 'https://twitter.com/drchiomaobi/status/1',
  },
  {
    id: 'm2', platform: 'tiktok', content: 'POV: You have fibroids and the doctor says "just pray about it" 😭 Ladies, here is what actually helped me: 1) Get a proper scan 2) See a gynaecologist 3) Understand your options #Fibroids #WomensHealth',
    author: 'Adaeze Lifestyle', authorHandle: '@adaezelifestyle', authorFollowers: 128000,
    publishedAt: '2026-04-01T08:30:00Z', sentiment: 'frustration', topic: 'Fibroids',
    state: 'Abuja (FCT)', language: 'english', engagementCount: 18420, isViral: true, isMisinformation: false,
    url: 'https://tiktok.com/@adaezelifestyle',
  },
  {
    id: 'm3', platform: 'facebook', content: 'I registered for NHIA today and I am so confused. The process is not clear at all. Which documents do you need? Nobody at the office could explain it properly. This is frustrating. Nigerian women need better healthcare access.',
    author: 'Fatima Bello', authorHandle: 'Fatima Bello', authorFollowers: 892,
    publishedAt: '2026-04-01T07:45:00Z', sentiment: 'frustration', topic: 'NHIA Enrolment',
    state: 'Kano', language: 'english', engagementCount: 234, isViral: false, isMisinformation: false,
    url: 'https://facebook.com',
  },
  {
    id: 'm4', platform: 'instagram', content: 'Your postpartum body is not a before picture 💜 Three months after birth, I am still struggling with depression and nobody told me this was normal. Sending love to every new mum going through this silently. #PostpartumDepression #NigerianMums',
    author: 'Blessing Adeyemi', authorHandle: '@blessingadeyemi', authorFollowers: 67400,
    publishedAt: '2026-04-01T07:00:00Z', sentiment: 'hope', topic: 'Postpartum Depression',
    state: 'Lagos', language: 'english', engagementCount: 9876, isViral: true, isMisinformation: false,
    url: 'https://instagram.com/blessingadeyemi',
  },
  {
    id: 'm5', platform: 'nairaland', content: 'Re: Fibroids cure - Has anyone tried the agbo jedi jedi treatment? My aunty said it shrinks fibroids completely within 3 months. Doctor said it is not proven but the testimonies online are convincing...',
    author: 'NaijaHealthMum', authorHandle: 'NaijaHealthMum', authorFollowers: 0,
    publishedAt: '2026-03-31T22:00:00Z', sentiment: 'confusion', topic: 'Fibroids',
    state: 'Oyo', language: 'pidgin', engagementCount: 312, isViral: false, isMisinformation: true,
    url: 'https://nairaland.com',
  },
  {
    id: 'm6', platform: 'twitter', content: 'Thread: Why PCOS is massively underdiagnosed in Nigerian women 🧵 1/ Most doctors still dismiss period irregularities as "stress" or "thin blood". Here is what you need to know about PCOS symptoms specific to Black African women...',
    author: 'Dr. Ngozi Eze', authorHandle: '@drngozi_gynaec', authorFollowers: 23100,
    publishedAt: '2026-03-31T18:00:00Z', sentiment: 'positive', topic: 'PCOS',
    state: 'Abuja (FCT)', language: 'english', engagementCount: 5621, isViral: true, isMisinformation: false,
    url: 'https://twitter.com/drngozi_gynaec',
  },
  {
    id: 'm7', platform: 'youtube', content: 'HPV VACCINE KILLS - DO NOT GIVE YOUR DAUGHTER THIS VACCINE | My daughter had a seizure after the HPV jab and now has nerve damage. Share this before it gets deleted. Protect your children! [347K views]',
    author: 'NaturalHealthNG', authorHandle: 'NaturalHealthNG', authorFollowers: 89000,
    publishedAt: '2026-03-31T12:00:00Z', sentiment: 'misinformation', topic: 'Cervical Cancer',
    state: 'Lagos', language: 'english', engagementCount: 34700, isViral: true, isMisinformation: true,
    url: 'https://youtube.com',
  },
];

// ─── Misinformation Alerts ─────────────────────────────────────────────────────
export const misinformationAlerts: MisinformationAlert[] = [
  {
    id: 'mis1',
    claim: 'HPV vaccine causes infertility and nerve damage in girls',
    origin: 'NaturalHealthNG YouTube channel',
    originPlatform: 'youtube',
    mentionCount: 34720,
    spreadRate: 287,
    severity: 'critical',
    correction: 'The HPV vaccine (Gardasil) has been extensively studied in over 270 million doses administered globally. It does NOT cause infertility or nerve damage. It prevents cervical cancer, which kills thousands of Nigerian women yearly. The WHO, NAFDAC, and FMOH all endorse its safety.',
    suggestedResponse: '❌ FALSE: The HPV vaccine does NOT cause infertility or nerve damage. This has been studied in 270M+ doses globally.\n✅ FACT: It prevents cervical cancer — which kills thousands of Nigerian women every year.\n📋 Both WHO and NAFDAC confirm it is safe.\n\nProtect your daughter. Get the facts. [Link to WHO resource]',
    firstDetected: '2026-03-31T12:00:00Z',
    affectedStates: ['Lagos', 'Oyo', 'Rivers', 'Abuja (FCT)'],
    status: 'active',
  },
  {
    id: 'mis2',
    claim: 'Drinking agbo (herbal mixture) for 3 months will shrink fibroids completely without surgery',
    origin: 'Multiple Nairaland threads and WhatsApp forwards',
    originPlatform: 'nairaland',
    mentionCount: 8934,
    spreadRate: 45,
    severity: 'high',
    correction: 'There is no herbal remedy proven to shrink uterine fibroids. Depending on size and symptoms, options include watchful waiting, medication (GnRH agonists), non-invasive procedures (MRI-guided ultrasound), or surgery (myomectomy/hysterectomy). Delaying evidence-based treatment can lead to complications.',
    suggestedResponse: '🌿 We understand why herbal remedies are appealing — but fibroid "cures" circulating on WhatsApp are NOT medically proven.\n\n✅ What actually works:\n• Monitoring if small and symptom-free\n• Medication to manage symptoms\n• Myomectomy to remove fibroids\n• Speak with a gynaecologist\n\nDelaying treatment can cause serious complications. Book a consultation today.',
    firstDetected: '2026-03-29T08:00:00Z',
    affectedStates: ['Oyo', 'Lagos', 'Anambra', 'Imo'],
    status: 'active',
  },
  {
    id: 'mis3',
    claim: 'NHIA only covers government workers — private sector and self-employed people cannot register',
    origin: 'Twitter misinformation thread going viral',
    originPlatform: 'twitter',
    mentionCount: 12450,
    spreadRate: 167,
    severity: 'high',
    correction: 'NHIA (National Health Insurance Authority) is open to ALL Nigerians including informal sector workers, self-employed individuals, and voluntary contributors. The BHCPF (Basic Health Care Provision Fund) specifically targets low-income and vulnerable groups.',
    suggestedResponse: '🚨 CORRECTION: NHIA is NOT only for government workers.\n\nALL Nigerians can enrol including:\n✅ Self-employed workers\n✅ Traders and artisans\n✅ Informal sector workers\n✅ Students\n\nVisit nhia.gov.ng or call 09-4621234 to register today.',
    firstDetected: '2026-03-30T14:00:00Z',
    affectedStates: ['Kano', 'Kaduna', 'Lagos', 'Abuja (FCT)', 'Rivers'],
    status: 'active',
  },
  {
    id: 'mis4',
    claim: 'Women with PCOS cannot get pregnant naturally',
    origin: 'Instagram reels and comments',
    originPlatform: 'instagram',
    mentionCount: 5621,
    spreadRate: 78,
    severity: 'medium',
    correction: 'Many women with PCOS conceive naturally. PCOS affects ovulation but with lifestyle changes, medication (like Clomiphene or Letrozole), and in some cases IVF, the majority of women with PCOS can achieve pregnancy. Early diagnosis and management improve outcomes significantly.',
    suggestedResponse: '💜 If you have PCOS, please know: you CAN get pregnant.\n\nWith the right support:\n• Lifestyle changes (diet + exercise)\n• Medication to stimulate ovulation\n• IVF when needed\n\nDon\'t lose hope. Book a consultation with a reproductive endocrinologist. Early action matters.',
    firstDetected: '2026-03-28T10:00:00Z',
    affectedStates: ['Lagos', 'Abuja (FCT)', 'Oyo'],
    status: 'monitoring',
  },
  {
    id: 'mis5',
    claim: 'Breastfeeding prevents pregnancy 100% — no need for contraception',
    origin: 'Facebook mothers group',
    originPlatform: 'facebook',
    mentionCount: 3240,
    spreadRate: 22,
    severity: 'medium',
    correction: 'Lactational Amenorrhoea Method (LAM) can reduce pregnancy risk but is only ~98% effective if: baby is under 6 months, exclusively breastfeeding, and mother has not resumed periods. This is not 100% protection. Women should discuss contraception options with their healthcare provider.',
    suggestedResponse: '⚠️ IMPORTANT: Breastfeeding is NOT 100% protection against pregnancy.\n\nThe LAM method only works if ALL of these are true:\n• Baby is under 6 months old\n• You are exclusively breastfeeding\n• Your periods have not returned\n\nEven then, it is only ~98% effective. Talk to your doctor about safe contraception options that are compatible with breastfeeding.',
    firstDetected: '2026-03-27T16:00:00Z',
    affectedStates: ['Anambra', 'Enugu', 'Imo', 'Delta'],
    status: 'monitoring',
  },
];

// ─── Google Trends ─────────────────────────────────────────────────────────────
export const googleTrends: TrendItem[] = [
  { query: 'fibroids symptoms', value: 100, change: 145, isBreakout: true, relatedQueries: ['fibroid surgery cost Nigeria', 'fibroid vs ovarian cyst', 'fibroid treatment without surgery'], state: 'Lagos', category: 'Fibroids' },
  { query: 'why am I not getting pregnant', value: 87, change: 62, isBreakout: false, relatedQueries: ['signs of infertility woman', 'IVF cost Nigeria', 'fertility test Nigeria'], state: 'Abuja (FCT)', category: 'Fertility' },
  { query: 'postpartum depression Nigeria', value: 82, change: 210, isBreakout: true, relatedQueries: ['postpartum depression symptoms', 'baby blues vs postpartum', 'postpartum anxiety'], state: 'Kano', category: 'Maternal Mental Health' },
  { query: 'how to register for NHIA', value: 95, change: 380, isBreakout: true, relatedQueries: ['NHIA enrollment documents', 'NHIA private hospital list', 'NHIA premium cost'], state: 'Lagos', category: 'NHIA' },
  { query: 'HPV vaccine Nigeria', value: 78, change: 290, isBreakout: true, relatedQueries: ['HPV vaccine age Nigeria', 'HPV vaccine side effects', 'HPV vaccine free Nigeria'], state: 'Lagos', category: 'Cervical Cancer' },
  { query: 'PCOS treatment Nigeria', value: 71, change: 44, isBreakout: false, relatedQueries: ['PCOS diet', 'PCOS symptoms', 'PCOS and pregnancy'], state: 'Oyo', category: 'PCOS' },
  { query: 'antenatal care cost Nigeria', value: 68, change: 28, isBreakout: false, relatedQueries: ['free antenatal care Nigeria', 'antenatal care schedule', 'government hospital antenatal'], state: 'Rivers', category: 'Antenatal Care' },
  { query: 'cervical cancer screening Nigeria', value: 65, change: 35, isBreakout: false, relatedQueries: ['pap smear cost Nigeria', 'cervical cancer symptoms', 'free cancer screening Nigeria'], state: 'Abuja (FCT)', category: 'Cervical Cancer' },
  { query: 'menopause symptoms Nigeria', value: 58, change: 88, isBreakout: false, relatedQueries: ['early menopause Nigeria', 'menopause HRT', 'menopause age'], state: 'Lagos', category: 'Menopause' },
  { query: 'domestic violence hotline Nigeria', value: 54, change: 16, isBreakout: false, relatedQueries: ['shelters for women Nigeria', 'legal aid domestic violence Nigeria', 'NAPTIP Nigeria'], state: 'Lagos', category: 'GBV' },
];

// ─── Content Opportunities ─────────────────────────────────────────────────────
export const contentOpportunities: ContentOpportunity[] = [
  {
    id: 'co1', topic: 'NHIA Enrolment', topicId: '4', score: 96,
    format: 'reel', platform: 'instagram',
    hook: 'Thousands of Nigerians are missing out on health insurance because of this one confusing step...',
    caption: '📋 How to actually enrol for NHIA in 2026 — a step-by-step guide that nobody explains clearly.\n\n✅ Who can register (hint: EVERYONE)\n✅ Documents you need\n✅ How to pay\n✅ Which hospitals to use\n\nSave this post. Share with someone who needs it. 💜\n\n#NHIA #NigeriaHealth #HealthInsurance #WomensHealth',
    cta: 'Comment "NHIA" and we\'ll send you the complete guide',
    emotionalDriver: 'Confusion → Empowerment',
    angle: 'Demystify the NHIA process with a clear, visual step-by-step guide',
    urgency: 'critical',
    estimatedReach: 250000,
    generatedAt: '2026-04-01T10:00:00Z',
  },
  {
    id: 'co2', topic: 'Postpartum Depression', topicId: '7', score: 90,
    format: 'reel', platform: 'instagram',
    hook: 'Nobody warned me about this part of becoming a mum in Nigeria...',
    caption: '💜 Postpartum depression is real, it is common, and it is NOT your fault.\n\nSigns to watch for:\n😢 Persistent sadness or emptiness\n😰 Feeling detached from your baby\n😤 Irritability and rage\n😴 Extreme fatigue beyond normal new-mum tiredness\n💭 Thoughts of harming yourself\n\nIf you or someone you know is struggling — please reach out. You deserve support.\n\n#PostpartumDepression #NigerianMums #MaternalMentalHealth #YouAreNotAlone',
    cta: 'DM us "PPD" for our free mental health resource guide',
    emotionalDriver: 'Shame → Validation → Action',
    angle: 'Normalise PPD in the Nigerian cultural context where mothers are expected to "be strong"',
    urgency: 'high',
    estimatedReach: 180000,
    generatedAt: '2026-04-01T10:00:00Z',
  },
  {
    id: 'co3', topic: 'HPV Vaccine Misinformation', topicId: '5', score: 92,
    format: 'carousel', platform: 'instagram',
    hook: 'Before you share that video about the HPV vaccine — please read this first.',
    caption: 'The viral video claiming the HPV vaccine causes infertility is FALSE.\n\nSwipe to see:\n→ What the HPV vaccine actually does\n→ The real science behind it\n→ Why Nigerian girls need it\n→ What WHO and NAFDAC say\n\nShare this before the misinformation spreads further. 💜',
    cta: 'Save this carousel and share it with every parent you know',
    emotionalDriver: 'Fear → Education → Protection',
    angle: 'Direct fact-check response to the viral misinformation spreading on YouTube',
    urgency: 'critical',
    estimatedReach: 320000,
    generatedAt: '2026-04-01T10:00:00Z',
  },
  {
    id: 'co4', topic: 'Fibroids', topicId: '2', score: 88,
    format: 'x_thread', platform: 'twitter',
    hook: 'Thread: 7 things your doctor should have told you about fibroids but probably didn\'t 🧵',
    caption: '1/ Fibroids affect 1 in 3 Nigerian women of reproductive age — yet most of us know almost nothing about them.\n\n2/ They are NOT caused by eating the wrong foods, spiritual problems, or "overworking yourself"\n\n3/ Many fibroids cause NO symptoms at all and need no treatment\n\n4/ But when they do cause problems (heavy bleeding, pain, fertility issues), there ARE effective treatments...',
    cta: 'Retweet to help other women understand their options',
    emotionalDriver: 'Confusion → Clarity → Confidence',
    angle: 'Education-first approach debunking myths while presenting evidence-based options',
    urgency: 'high',
    estimatedReach: 95000,
    generatedAt: '2026-04-01T10:00:00Z',
  },
  {
    id: 'co5', topic: 'Maternal Mortality', topicId: '1', score: 85,
    format: 'podcast', platform: 'youtube',
    hook: 'Why Nigeria\'s maternal mortality rate is still one of the worst in the world — and what we must do about it',
    caption: 'In this episode, Dr. Adanna breaks down:\n• The real numbers behind Nigeria\'s maternal mortality crisis\n• Why women are still dying from preventable causes\n• What the government MUST do\n• What YOU can do to protect yourself and the women you love\n\nThis is the conversation Nigeria needs to have.',
    cta: 'Subscribe and share with every pregnant woman you know',
    emotionalDriver: 'Outrage → Education → Advocacy',
    angle: 'Data-driven, emotionally resonant expose of a preventable crisis',
    urgency: 'high',
    estimatedReach: 75000,
    generatedAt: '2026-04-01T10:00:00Z',
  },
  {
    id: 'co6', topic: 'Period Poverty', topicId: '8', score: 87,
    format: 'tiktok', platform: 'tiktok',
    hook: 'POV: You missed school this week because you couldn\'t afford pads 💔',
    caption: 'Period poverty is a public health crisis in Nigeria that nobody is talking about.\n\n1 in 3 Nigerian girls miss school during their period.\nMany use rags, tissue, or leaves as alternatives.\nThis affects their education, health, and future.\n\nWhat can we do about it? Watch to the end. 🧵',
    cta: 'Comment "PADS" and we\'ll send you info on where to donate or access free products',
    emotionalDriver: 'Empathy → Outrage → Action',
    angle: 'Personal narrative combined with systemic analysis and actionable solution',
    urgency: 'high',
    estimatedReach: 210000,
    generatedAt: '2026-04-01T10:00:00Z',
  },
  {
    id: 'co7', topic: 'PCOS', topicId: '3', score: 82,
    format: 'linkedin_post', platform: 'linkedin',
    hook: 'PCOS is not just a "women\'s issue" — it\'s an economic and public health crisis that Nigerian healthcare is ignoring.',
    caption: 'As a healthcare professional, I am frustrated by how often PCOS is dismissed in Nigerian clinical settings.\n\nThe facts:\n→ PCOS affects 6-12% of reproductive-age women\n→ It is one of the leading causes of infertility\n→ It significantly increases risk of diabetes and cardiovascular disease\n→ Most Nigerian women wait years for a correct diagnosis\n\nWe need more training for GPs. We need better diagnostic protocols. We need policy change.\n\nI\'m calling on the Federal Ministry of Health to include PCOS screening in routine reproductive health checkups.',
    cta: 'Share this post if you agree that PCOS needs a national policy response',
    emotionalDriver: 'Professional advocacy → System change',
    angle: 'Policy-focused, professional tone designed for healthcare practitioners and policymakers',
    urgency: 'medium',
    estimatedReach: 45000,
    generatedAt: '2026-04-01T10:00:00Z',
  },
  {
    id: 'co8', topic: 'Cervical Cancer', topicId: '5', score: 80,
    format: 'facebook_group', platform: 'facebook',
    hook: 'Free cervical cancer screening is available — but most Nigerian women don\'t know about it.',
    caption: '📢 IMPORTANT HEALTH ALERT for Nigerian women:\n\nCervical cancer is the 2nd most common cancer killing women in Nigeria — but it is PREVENTABLE.\n\nFree screening is available at:\n• Selected government hospitals\n• LUTH, UCH, ABUTH teaching hospitals\n• Some state primary health centres\n\nWho should get screened:\n✅ All women aged 25-65\n✅ Anyone who has ever been sexually active\n✅ Especially important if you have never been screened\n\nEarly detection saves lives. Book your screening today.',
    cta: 'Comment your state and we\'ll send you the nearest screening centre',
    emotionalDriver: 'Urgency → Empowerment → Community action',
    angle: 'Community-health approach with actionable, locally relevant information',
    urgency: 'high',
    estimatedReach: 120000,
    generatedAt: '2026-04-01T10:00:00Z',
  },
];

// ─── Influencers ───────────────────────────────────────────────────────────────
export const influencers: Influencer[] = [
  {
    id: 'inf1', name: 'Dr. Chioma Obi', handle: '@drchiomaobi', platform: 'twitter',
    followers: 45200, reach: 380000, sentimentInfluence: 'positive',
    mainTopics: ['Maternal Mortality', 'NHIA', 'Maternal Health Policy'],
    category: 'doctor', isHelping: true, recentPosts: 47, engagementRate: 4.2, verified: true,
  },
  {
    id: 'inf2', name: 'Adaeze Lifestyle', handle: '@adaezelifestyle', platform: 'tiktok',
    followers: 128000, reach: 892000, sentimentInfluence: 'positive',
    mainTopics: ['Fibroids', 'PCOS', 'Women\'s Wellness'],
    category: 'influencer', isHelping: true, recentPosts: 23, engagementRate: 8.7, verified: true,
  },
  {
    id: 'inf3', name: 'NaturalHealthNG', handle: 'NaturalHealthNG', platform: 'youtube',
    followers: 89000, reach: 1200000, sentimentInfluence: 'negative',
    mainTopics: ['HPV Vaccine', 'Herbal Remedies', 'Anti-vaccination'],
    category: 'influencer', isHelping: false, recentPosts: 31, engagementRate: 12.1, verified: false,
  },
  {
    id: 'inf4', name: 'Premium Times Health', handle: '@premiumtimesng', platform: 'twitter',
    followers: 234000, reach: 1890000, sentimentInfluence: 'positive',
    mainTopics: ['Maternal Mortality', 'Health Policy', 'NHIA', 'GBV'],
    category: 'media', isHelping: true, recentPosts: 89, engagementRate: 2.1, verified: true,
  },
  {
    id: 'inf5', name: 'Dr. Ngozi Eze', handle: '@drngozi_gynaec', platform: 'twitter',
    followers: 23100, reach: 198000, sentimentInfluence: 'positive',
    mainTopics: ['PCOS', 'Fibroids', 'Reproductive Health'],
    category: 'doctor', isHelping: true, recentPosts: 62, engagementRate: 5.8, verified: true,
  },
  {
    id: 'inf6', name: 'WHO Nigeria', handle: '@WHOnigeria', platform: 'twitter',
    followers: 187000, reach: 1450000, sentimentInfluence: 'positive',
    mainTopics: ['Maternal Health', 'Vaccination', 'Disease Prevention'],
    category: 'ngo', isHelping: true, recentPosts: 34, engagementRate: 1.4, verified: true,
  },
  {
    id: 'inf7', name: 'UNICEF Nigeria', handle: '@UNICEFNigeria', platform: 'twitter',
    followers: 298000, reach: 2100000, sentimentInfluence: 'positive',
    mainTopics: ['Child Health', 'Maternal Health', 'Period Poverty', 'GBV'],
    category: 'ngo', isHelping: true, recentPosts: 41, engagementRate: 1.8, verified: true,
  },
  {
    id: 'inf8', name: 'Punch Newspapers', handle: '@MobilePunch', platform: 'twitter',
    followers: 1200000, reach: 8900000, sentimentInfluence: 'mixed',
    mainTopics: ['Health News', 'Government Policy', 'GBV'],
    category: 'media', isHelping: true, recentPosts: 234, engagementRate: 0.9, verified: true,
  },
];

// ─── Alerts ────────────────────────────────────────────────────────────────────
export const alerts: Alert[] = [
  { id: 'a1', type: 'misinformation', title: 'Critical: HPV Vaccine Misinformation Spreading Fast', description: 'A YouTube video claiming HPV vaccine causes infertility has reached 347K views and is being shared across platforms. Immediate response recommended.', severity: 'critical', isRead: false, createdAt: '2026-04-01T09:00:00Z', topic: 'Cervical Cancer', platform: 'youtube' },
  { id: 'a2', type: 'spike', title: 'NHIA Mentions Up 67% in 24 Hours', description: 'Negative sentiment around NHIA enrolment has spiked significantly. Women are confused about the registration process and eligible benefits.', severity: 'high', isRead: false, createdAt: '2026-04-01T08:30:00Z', topic: 'NHIA Enrolment', platform: 'twitter' },
  { id: 'a3', type: 'breakout_trend', title: 'Breakout: "Postpartum Depression Nigeria" on Google Trends', description: 'Search volume for postpartum depression has increased 210% in the last 24 hours, particularly in Kano, Kaduna, and Abuja.', severity: 'high', isRead: false, createdAt: '2026-04-01T07:00:00Z', topic: 'Postpartum Depression' },
  { id: 'a4', type: 'sentiment_threshold', title: 'Negative Sentiment: Antenatal Care Cost Crossed 70%', description: 'Conversations about antenatal care costs have crossed the 70% negative sentiment threshold. Women are sharing experiences of being turned away from hospitals.', severity: 'medium', isRead: true, createdAt: '2026-03-31T22:00:00Z', topic: 'Antenatal Care' },
  { id: 'a5', type: 'keyword', title: 'New Keyword Detected: "Free Hospital Delivery"', description: '"Free hospital delivery" has suddenly appeared in 342 posts across Facebook and Nairaland. This may be related to a new government announcement.', severity: 'medium', isRead: true, createdAt: '2026-03-31T18:00:00Z', platform: 'facebook' },
  { id: 'a6', type: 'misinformation', title: 'Fibroid Herbal Cure Claims Spreading on Nairaland', description: 'Multiple threads promoting unproven herbal fibroid cures are gaining traction. Risk of women delaying evidence-based treatment.', severity: 'high', isRead: false, createdAt: '2026-03-31T14:00:00Z', topic: 'Fibroids', platform: 'nairaland' },
];

// ─── Weekly Summary ────────────────────────────────────────────────────────────
export const weeklySummary: WeeklySummary = {
  weekStart: '2026-03-25',
  weekEnd: '2026-04-01',
  totalMentions: 142876,
  topTopics: ['Maternal Mortality', 'NHIA Enrolment', 'Fibroids', 'Postpartum Depression', 'Gender-Based Violence'],
  keyInsights: [
    'Negative sentiment around NHIA increased 34% this week because women are confused about enrolment costs and documentation requirements.',
    'Fibroids misinformation has increased rapidly on TikTok and X in Lagos and Abuja — herbal cure claims are going viral.',
    'Google searches for postpartum depression are rising in Kano, Kaduna, and Abuja — indicating unmet need for maternal mental health support.',
    'The most effective content opportunity this week is a short Reel or carousel explaining what NHIA actually covers and how to register.',
    'The viral HPV vaccine misinformation video is the single highest-risk item this week and requires immediate factual counter-messaging.',
    'Positive sentiment around cervical cancer awareness increased by 18% following Dr. Ngozi Eze\'s thread, suggesting doctor-led content performs well.',
  ],
  misinformationAlerts: 5,
  contentOpportunities: contentOpportunities.slice(0, 3),
  sentimentTrend: 'declining',
};

// ─── Chart Data ────────────────────────────────────────────────────────────────
export const mentionsTrend = [
  { date: 'Mar 26', mentions: 18234, positive: 6102, negative: 8941, neutral: 3191 },
  { date: 'Mar 27', mentions: 19876, positive: 6421, negative: 9876, neutral: 3579 },
  { date: 'Mar 28', mentions: 21432, positive: 7012, negative: 10234, neutral: 4186 },
  { date: 'Mar 29', mentions: 23187, positive: 7234, negative: 11456, neutral: 4497 },
  { date: 'Mar 30', mentions: 20456, positive: 6789, negative: 10123, neutral: 3544 },
  { date: 'Mar 31', mentions: 24321, positive: 7654, negative: 12109, neutral: 4558 },
  { date: 'Apr 1', mentions: 28765, positive: 8932, negative: 14321, neutral: 5512 },
];

export const platformBreakdown = [
  { platform: 'X / Twitter', count: 34521, color: '#1d9bf0' },
  { platform: 'Facebook', count: 28734, color: '#1877f2' },
  { platform: 'Instagram', count: 22109, color: '#e1306c' },
  { platform: 'TikTok', count: 18432, color: '#010101' },
  { platform: 'Nairaland', count: 12876, color: '#2d6a4f' },
  { platform: 'YouTube', count: 11234, color: '#ff0000' },
  { platform: 'LinkedIn', count: 7821, color: '#0a66c2' },
  { platform: 'News', count: 5432, color: '#7c3aed' },
  { platform: 'Reddit', count: 1517, color: '#ff4500' },
];

export const sentimentBreakdown = [
  { name: 'Negative', value: 38, color: '#ef4444' },
  { name: 'Positive', value: 22, color: '#22c55e' },
  { name: 'Neutral', value: 18, color: '#94a3b8' },
  { name: 'Frustration', value: 10, color: '#f59e0b' },
  { name: 'Fear', value: 6, color: '#f97316' },
  { name: 'Hope', value: 4, color: '#a855f7' },
  { name: 'Confusion', value: 2, color: '#6366f1' },
];

export const dashboardStats: DashboardStats = {
  totalMentionsToday: 28765,
  totalMentionsChange: 18.3,
  mentionsByPlatform: {
    twitter: 8934, instagram: 5421, facebook: 7123, linkedin: 1234,
    tiktok: 4321, youtube: 2109, nairaland: 3421, reddit: 654,
    news: 1341, google_trends: 0,
  },
  sentimentSplit: {
    positive: 22, negative: 38, neutral: 18, fear: 6,
    anger: 0, hope: 4, frustration: 10, confusion: 2, misinformation: 0,
  },
  fastestGrowingTopic: 'NHIA Enrolment',
  fastestGrowingChange: 67.3,
  misinformationCount: 5,
  highRiskConversations: 23,
  topViralPosts: recentMentions.filter(m => m.isViral),
  activeStates: nigerianStates.slice(0, 6),
};

// ─── Audience Questions ────────────────────────────────────────────────────────
export const audienceQuestions = [
  { question: 'How do I know if I have fibroids without a scan?', frequency: 1243, topic: 'Fibroids', platform: 'nairaland' },
  { question: 'Is NHIA really free or do you still pay?', frequency: 987, topic: 'NHIA', platform: 'twitter' },
  { question: 'Why am I feeling so sad after having my baby — is something wrong with me?', frequency: 876, topic: 'Postpartum Depression', platform: 'facebook' },
  { question: 'Can I get pregnant with PCOS naturally?', frequency: 812, topic: 'PCOS', platform: 'instagram' },
  { question: 'Should I be scared to give my daughter the HPV vaccine?', frequency: 743, topic: 'Cervical Cancer', platform: 'facebook' },
  { question: 'How much does fibroid surgery cost in Nigeria?', frequency: 698, topic: 'Fibroids', platform: 'google_trends' },
  { question: 'What are the signs of cervical cancer in its early stages?', frequency: 621, topic: 'Cervical Cancer', platform: 'google_trends' },
  { question: 'Is it normal to have very heavy periods?', frequency: 587, topic: 'Menstrual Health', platform: 'nairaland' },
];
