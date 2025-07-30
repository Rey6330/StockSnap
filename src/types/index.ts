export interface Company {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  revenue: string;
  profitMargin: number;
  sector: string;
  industry: string;
  description: string;
  logo?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: 'product' | 'management' | 'earnings' | 'industry' | 'market';
  impact: 'high' | 'medium' | 'low';
}

export interface EarningsCall {
  date: string;
  quarter: string;
  year: number;
  keyQuotes: string[];
  analystHighlights: string[];
  nextCallDate?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  favorites: Company[];
  subscriptions: string[];
}

export interface ChartData {
  date: string;
  price: number;
  volume: number;
}

export interface CompetitorData {
  name: string;
  marketShare: number;
  trend: 'up' | 'down' | 'stable';
  peRatio: number;
  price: number;
}

export interface FinancialMetrics {
  revenue: {
    current: number;
    growth: number;
    quarters: { quarter: string; revenue: number }[];
  };
  profitability: {
    grossMargin: number;
    operatingMargin: number;
    netMargin: number;
    trend: 'improving' | 'declining' | 'stable';
  };
  financialHealth: {
    cashFlow: number;
    debt: number;
    debtToEquity: number;
    currentRatio: number;
    rating: 'strong' | 'moderate' | 'weak';
  };
  risks: {
    category: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
  }[];
  outlook: {
    guidance: string;
    marketExpectations: string;
    keyDrivers: string[];
  };
}