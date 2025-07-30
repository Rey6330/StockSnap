import { Company, NewsItem, EarningsCall, FinancialMetrics, ChartData, CompetitorData } from '../types';

// Import this in useAuth hook
export const mockCompanies: Company[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 185.43,
    change: 2.87,
    changePercent: 1.57,
    marketCap: '$2.89T',
    peRatio: 28.5,
    revenue: '$394.3B',
    profitMargin: 26.3,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    description: 'Apple Inc. designs, manufactures, and markets consumer electronics, computer software, and online services worldwide.',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 138.21,
    change: -1.23,
    changePercent: -0.88,
    marketCap: '$1.75T',
    peRatio: 24.2,
    revenue: '$307.4B',
    profitMargin: 23.1,
    sector: 'Technology',
    industry: 'Internet Content & Information',
    description: 'Alphabet Inc. provides various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.85,
    change: 5.42,
    changePercent: 1.45,
    marketCap: '$2.81T',
    peRatio: 32.1,
    revenue: '$227.6B',
    profitMargin: 36.7,
    sector: 'Technology',
    industry: 'Software',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 248.50,
    change: -8.75,
    changePercent: -3.40,
    marketCap: '$791.5B',
    peRatio: 45.3,
    revenue: '$96.8B',
    profitMargin: 19.3,
    sector: 'Consumer Discretionary',
    industry: 'Electric Vehicles',
    description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 155.89,
    change: 3.21,
    changePercent: 2.10,
    marketCap: '$1.62T',
    peRatio: 42.8,
    revenue: '$574.8B',
    profitMargin: 8.4,
    sector: 'Consumer Discretionary',
    industry: 'E-commerce',
    description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 722.48,
    change: 15.23,
    changePercent: 2.15,
    marketCap: '$1.78T',
    peRatio: 65.4,
    revenue: '$79.8B',
    profitMargin: 32.8,
    sector: 'Technology',
    industry: 'Semiconductors',
    description: 'NVIDIA Corporation operates as a computing company in the United States, Taiwan, China, and internationally.',
  },
];

export const mockNews: { [key: string]: NewsItem[] } = {
  'AAPL': [
    {
      id: '1',
      title: 'Apple Reports Strong iPhone 15 Sales Despite Market Headwinds',
      summary: 'Apple iPhone 15 series shows robust demand with improved camera features and titanium design driving premium sales.',
      source: 'Reuters',
      publishedAt: '2025-01-15T10:30:00Z',
      url: '#',
      sentiment: 'positive',
      category: 'product',
      impact: 'high'
    },
    {
      id: '2',
      title: 'Apple Faces Regulatory Pressure in EU Over App Store Policies',
      summary: 'European Union regulators continue to scrutinize Apple App Store practices under the Digital Markets Act.',
      source: 'Bloomberg',
      publishedAt: '2025-01-14T14:20:00Z',
      url: '#',
      sentiment: 'negative',
      category: 'market',
      impact: 'medium'
    },
    {
      id: '3',
      title: 'Apple Vision Pro Production Ramp Up Signals Strong Enterprise Demand',
      summary: 'Apple increases Vision Pro manufacturing capacity as enterprise adoption accelerates beyond initial consumer launch.',
      source: 'Wall Street Journal',
      publishedAt: '2025-01-13T09:15:00Z',
      url: '#',
      sentiment: 'positive',
      category: 'product',
      impact: 'high'
    }
  ],
  'GOOGL': [
    {
      id: '4',
      title: 'Google Cloud Shows Accelerating Growth in Q4 Earnings',
      summary: 'Google Cloud Platform revenue growth accelerates to 35% year-over-year, driven by AI and enterprise solutions.',
      source: 'CNBC',
      publishedAt: '2025-01-15T11:45:00Z',
      url: '#',
      sentiment: 'positive',
      category: 'earnings',
      impact: 'high'
    },
    {
      id: '5',
      title: 'DOJ Antitrust Case Against Google Search Monopoly Continues',
      summary: 'Department of Justice pushes forward with landmark antitrust case challenging Google search dominance.',
      source: 'New York Times',
      publishedAt: '2025-01-14T16:30:00Z',
      url: '#',
      sentiment: 'negative',
      category: 'market',
      impact: 'high'
    }
  ]
};

export const mockEarningsCall: { [key: string]: EarningsCall } = {
  'AAPL': {
    date: '2025-01-10',
    quarter: 'Q1',
    year: 2025,
    keyQuotes: [
      "We're seeing unprecedented demand for our AI-powered features across all product lines",
      "Services revenue continues to be a key growth driver with 18% year-over-year growth",
      "Our supply chain optimization has improved margins significantly"
    ],
    analystHighlights: [
      "Strong iPhone upgrade cycle expected to continue through 2025",
      "Vision Pro enterprise adoption exceeding expectations",
      "AI integration driving higher average selling prices"
    ],
    nextCallDate: '2025-04-10'
  }
};

export const mockFinancialMetrics: { [key: string]: FinancialMetrics } = {
  'AAPL': {
    revenue: {
      current: 394.3,
      growth: 8.2,
      quarters: [
        { quarter: 'Q1 2024', revenue: 119.6 },
        { quarter: 'Q2 2024', revenue: 90.8 },
        { quarter: 'Q3 2024', revenue: 81.8 },
        { quarter: 'Q4 2024', revenue: 94.9 }
      ]
    },
    profitability: {
      grossMargin: 46.2,
      operatingMargin: 30.1,
      netMargin: 26.3,
      trend: 'improving'
    },
    financialHealth: {
      cashFlow: 99.5,
      debt: 109.3,
      debtToEquity: 1.8,
      currentRatio: 1.0,
      rating: 'strong'
    },
    risks: [
      {
        category: 'Market Risk',
        description: 'iPhone sales dependency on consumer spending patterns',
        severity: 'medium'
      },
      {
        category: 'Regulatory Risk',
        description: 'App Store policies under global regulatory scrutiny',
        severity: 'medium'
      },
      {
        category: 'Supply Chain Risk',
        description: 'China manufacturing concentration risk',
        severity: 'low'
      }
    ],
    outlook: {
      guidance: 'Apple expects continued growth in Services and stable iPhone demand',
      marketExpectations: 'Analysts expect 5-7% revenue growth in FY2025',
      keyDrivers: ['AI features adoption', 'Services expansion', 'Vision Pro scaling']
    }
  }
};

export const mockChartData: { [key: string]: ChartData[] } = {
  'AAPL': [
    { date: '2024-01-01', price: 181.91, volume: 58991100 },
    { date: '2024-02-01', price: 188.85, volume: 64795300 },
    { date: '2024-03-01', price: 170.12, volume: 59773200 },
    { date: '2024-04-01', price: 169.12, volume: 45015500 },
    { date: '2024-05-01', price: 192.35, volume: 79542600 },
    { date: '2024-06-01', price: 196.89, volume: 46262900 },
    { date: '2024-07-01', price: 218.24, volume: 37102200 },
    { date: '2024-08-01', price: 225.77, volume: 52906400 },
    { date: '2024-09-01', price: 220.70, volume: 35748300 },
    { date: '2024-10-01', price: 225.37, volume: 41407200 },
    { date: '2024-11-01', price: 224.94, volume: 36566200 },
    { date: '2024-12-01', price: 239.30, volume: 43014200 },
    { date: '2025-01-01', price: 185.43, volume: 52341100 }
  ]
};

export const mockCompetitors: { [key: string]: CompetitorData[] } = {
  'AAPL': [
    { name: 'Samsung', marketShare: 20.8, trend: 'down', peRatio: 12.4, price: 68.45 },
    { name: 'Xiaomi', marketShare: 12.9, trend: 'up', peRatio: 18.7, price: 14.23 },
    { name: 'Google', marketShare: 8.2, trend: 'stable', peRatio: 24.2, price: 138.21 },
    { name: 'OnePlus', marketShare: 3.1, trend: 'up', peRatio: 15.3, price: 42.18 }
  ]
};

export const trendingStocks = ['AAPL', 'GOOGL', 'MSFT', 'NVDA', 'TSLA', 'AMZN'];

export const searchCompanies = (query: string): Company[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return mockCompanies.filter(company => 
    company.symbol.toLowerCase().includes(lowerQuery) ||
    company.name.toLowerCase().includes(lowerQuery)
  );
};