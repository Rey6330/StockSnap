import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Download, Clock, TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign, Shield, Eye, ExternalLink } from 'lucide-react';
import { Company, NewsItem, EarningsCall, FinancialMetrics, ChartData, CompetitorData } from '../types';
import StockChart from './StockChart';

interface OnePagerProps {
  company: Company;
  news: NewsItem[];
  earningsCall: EarningsCall;
  financialMetrics: FinancialMetrics;
  chartData: ChartData[];
  competitors: CompetitorData[];
  onBack: () => void;
  user: any;
  onLogin: () => void;
  onAddToFavorites: (symbol: string) => void;
  isFavorited: boolean;
}

const OnePager: React.FC<OnePagerProps> = ({
  company,
  news,
  earningsCall,
  financialMetrics,
  chartData,
  competitors,
  onBack,
  user,
  onLogin,
  onAddToFavorites,
  isFavorited
}) => {
  const [activeSection, setActiveSection] = useState(1);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copying' | 'copied' | 'error'>('idle');
  
  const sections = [
    { id: 1, title: 'Financial Overview', icon: DollarSign },
    { id: 2, title: 'News Analysis', icon: AlertTriangle },
    { id: 3, title: 'Real-Time News', icon: Clock },
    { id: 4, title: 'Earnings Call', icon: TrendingUp },
    { id: 5, title: 'Competitive Analysis', icon: Target },
    { id: 6, title: 'Revenue Analysis', icon: TrendingUp },
    { id: 7, title: 'Profitability', icon: DollarSign },
    { id: 8, title: 'Financial Health', icon: Shield },
    { id: 9, title: 'Risk Assessment', icon: AlertTriangle },
    { id: 10, title: 'Forward Outlook', icon: Eye }
  ];
  
  const positiveNews = news.filter(n => n.sentiment === 'positive');
  const negativeNews = news.filter(n => n.sentiment === 'negative');
  const neutralNews = news.filter(n => n.sentiment === 'neutral');
  
  const handleFavoriteClick = () => {
    if (!user) {
      onLogin();
      return;
    }
    onAddToFavorites(company.symbol);
  };
  
  const handleShare = async () => {
    setShareStatus('copying');
    
    const shareUrl = window.location.href;
    const shareText = `Check out this comprehensive analysis of ${company.name} (${company.symbol}) on StockSnap`;
    
    try {
      // Try to use the Web Share API first (mobile devices) with proper checks
      if (navigator.share && navigator.canShare && navigator.canShare({
        title: `${company.name} (${company.symbol}) Analysis`,
        text: shareText,
        url: shareUrl,
      })) {
        await navigator.share({
          title: `${company.name} (${company.symbol}) Analysis`,
          text: shareText,
          url: shareUrl,
        });
        setShareStatus('copied');
      } else {
        // Fallback to clipboard API
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setShareStatus('copied');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Final fallback to clipboard API if share fails
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setShareStatus('copied');
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
        setShareStatus('error');
      }
    }
    
    // Reset status after 3 seconds
    setTimeout(() => {
      setShareStatus('idle');
    }, 3000);
  };
  
  const getShareButtonText = () => {
    switch (shareStatus) {
      case 'copying':
        return 'Copying...';
      case 'copied':
        return 'Copied!';
      case 'error':
        return 'Error';
      default:
        return 'Share';
    }
  };
  
  const getShareButtonStyle = () => {
    switch (shareStatus) {
      case 'copied':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'error':
        return 'bg-red-100 text-red-700 hover:bg-red-200';
      case 'copying':
        return 'bg-blue-100 text-blue-700 cursor-not-allowed';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };
  
  const renderSection = () => {
    switch (activeSection) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Market Cap</h4>
                <p className="text-xl font-bold text-gray-900">{company.marketCap}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">P/E Ratio</h4>
                <p className="text-xl font-bold text-gray-900">{company.peRatio}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Revenue</h4>
                <p className="text-xl font-bold text-gray-900">{company.revenue}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Profit Margin</h4>
                <p className="text-xl font-bold text-gray-900">{company.profitMargin}%</p>
              </div>
            </div>
            <StockChart
              data={chartData}
              currentPrice={company.price}
              change={company.change}
              changePercent={company.changePercent}
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">News Analysis</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
            
            {negativeNews.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  Negative News
                </h4>
                <div className="space-y-3">
                  {negativeNews.map((item) => (
                    <div key={item.id} className="border-b border-red-200 pb-3 last:border-b-0">
                      <h5 className="font-medium text-red-900">{item.title}</h5>
                      <p className="text-sm text-red-700 mt-1">{item.summary}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-red-600">{item.source}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.impact === 'high' ? 'bg-red-200 text-red-800' :
                          item.impact === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                          {item.impact} impact
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {positiveNews.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Positive News
                </h4>
                <div className="space-y-3">
                  {positiveNews.map((item) => (
                    <div key={item.id} className="border-b border-green-200 pb-3 last:border-b-0">
                      <h5 className="font-medium text-green-900">{item.title}</h5>
                      <p className="text-sm text-green-700 mt-1">{item.summary}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-green-600">{item.source}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.impact === 'high' ? 'bg-green-200 text-green-800' :
                          item.impact === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {item.impact} impact
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {neutralNews.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                  Industry/Market News
                </h4>
                <div className="space-y-3">
                  {neutralNews.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <h5 className="font-medium text-gray-900">{item.title}</h5>
                      <p className="text-sm text-gray-700 mt-1">{item.summary}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-600">{item.source}</span>
                        <span className="text-xs text-gray-500">{item.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Real-Time News Feed</h3>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors">
                Refresh
              </button>
            </div>
            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">{item.source}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(item.publishedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ml-4 ${
                      item.sentiment === 'positive' ? 'bg-green-500' :
                      item.sentiment === 'negative' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-blue-800">
                  {earningsCall.quarter} {earningsCall.year} Earnings Call
                </h4>
                <button 
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                  title="Open full earnings call transcript"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-sm">Full Transcript</span>
                </button>
              </div>
              <p className="text-sm text-blue-600">
                Call Date: {new Date(earningsCall.date).toLocaleDateString()}
              </p>
              {earningsCall.nextCallDate && (
                <p className="text-sm text-blue-600">
                  Next Call: {new Date(earningsCall.nextCallDate).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">1. Financial Performance Summary</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Revenue: ${financialMetrics.revenue.current}B ({financialMetrics.revenue.growth > 0 ? '+' : ''}{financialMetrics.revenue.growth}% YoY)</p>
                <p>• Gross Margin: {financialMetrics.profitability.grossMargin}% (vs. industry avg)</p>
                <p>• Operating Cash Flow: ${financialMetrics.financialHealth.cashFlow}B</p>
                <p>• EPS beat analyst estimates by $0.12</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">2. Management Commentary</h4>
              <div className="space-y-3">
                {earningsCall.keyQuotes.map((quote, index) => (
                  <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                    "{quote}"
                  </blockquote>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">3. Guidance and Outlook</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Management Guidance:</strong> {financialMetrics.outlook.guidance}</p>
                <p><strong>Market Expectations:</strong> {financialMetrics.outlook.marketExpectations}</p>
                <div className="mt-3">
                  <p className="font-medium">Key Growth Drivers:</p>
                  <ul className="mt-1 space-y-1">
                    {financialMetrics.outlook.keyDrivers.map((driver, index) => (
                      <li key={index}>• {driver}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">4. Analyst Q&A Highlights</h4>
              <ul className="space-y-2">
                {earningsCall.analystHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">5. Year-over-Year Comparison and Trends</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900 mb-2">Revenue Trends</p>
                  <div className="space-y-1 text-gray-700">
                    {financialMetrics.revenue.quarters.map((quarter, index) => (
                      <p key={index}>{quarter.quarter}: ${quarter.revenue}B</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-2">Profitability Trends</p>
                  <div className="space-y-1 text-gray-700">
                    <p>Gross Margin: {financialMetrics.profitability.grossMargin}%</p>
                    <p>Operating Margin: {financialMetrics.profitability.operatingMargin}%</p>
                    <p>Net Margin: {financialMetrics.profitability.netMargin}%</p>
                    <p>Trend: {financialMetrics.profitability.trend}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">6. Risks and Opportunities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-900 mb-2">Key Risks</p>
                  <div className="space-y-2">
                    {financialMetrics.risks.slice(0, 3).map((risk, index) => (
                      <div key={index} className="text-sm">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          risk.severity === 'high' ? 'bg-red-500' :
                          risk.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></span>
                        <span className="text-gray-700">{risk.category}: {risk.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-2">Growth Opportunities</p>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• Expanding market share in {company.sector.toLowerCase()}</p>
                    <p>• New product launches driving revenue</p>
                    <p>• International market expansion</p>
                    <p>• Strategic partnerships and acquisitions</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">7. Investor Takeaways and Watch Points</h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-medium text-gray-900">Key Takeaways:</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Strong execution on strategic initiatives</li>
                    <li>• Healthy balance sheet with ${financialMetrics.financialHealth.cashFlow}B cash flow</li>
                    <li>• Market leadership position in {company.sector.toLowerCase()}</li>
                    <li>• Consistent dividend policy and shareholder returns</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Watch Points for Next Quarter:</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Revenue growth sustainability</li>
                    <li>• Margin expansion initiatives</li>
                    <li>• Market share trends in key segments</li>
                    <li>• Capital allocation strategy execution</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-gray-900">Market Position</h4>
                <div className="text-sm text-gray-500">vs. {company.name}</div>
              </div>
              
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 pb-3 mb-4 border-b border-gray-200">
                <div className="text-sm font-semibold text-gray-700">Company</div>
                <div className="text-sm font-semibold text-gray-700 text-right">Stock Price</div>
                <div className="text-sm font-semibold text-gray-700 text-right">Market Share</div>
                <div className="text-sm font-semibold text-gray-700 text-right">P/E Ratio</div>
              </div>
              
              <div className="space-y-3">
                {competitors.map((competitor, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 py-4 px-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all duration-200">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900">{competitor.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <span className="text-lg font-bold text-gray-900">${competitor.price}</span>
                        <div className={`flex items-center ${
                          competitor.trend === 'up' ? 'text-green-600' :
                          competitor.trend === 'down' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {competitor.trend === 'up' ? <TrendingUp className="h-4 w-4" /> :
                           competitor.trend === 'down' ? <TrendingDown className="h-4 w-4" /> :
                           <span className="h-4 w-4 flex items-center justify-center text-gray-400">→</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">{competitor.marketShare}%</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">{competitor.peRatio}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Competitive Advantages</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Strong brand recognition and customer loyalty</li>
                <li>• Integrated ecosystem of products and services</li>
                <li>• Significant R&D investment and innovation pipeline</li>
                <li>• Premium positioning with strong pricing power</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Competitive Disadvantages</h4>
              <ul className="space-y-1 text-sm text-red-700">
                <li>• Higher price points may limit market penetration</li>
                <li>• Dependence on key product categories for revenue</li>
                <li>• Slower adoption in emerging markets</li>
                <li>• Regulatory scrutiny in multiple jurisdictions</li>
              </ul>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Revenue Growth</h4>
                <p className="text-2xl font-bold text-blue-900">
                  {financialMetrics.revenue.growth > 0 ? '+' : ''}{financialMetrics.revenue.growth}%
                </p>
                <p className="text-sm text-blue-600">Year-over-year</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Current Revenue</h4>
                <p className="text-2xl font-bold text-gray-900">${financialMetrics.revenue.current}B</p>
                <p className="text-sm text-gray-600">Annual</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Quarterly Performance</h4>
              <div className="space-y-3">
                {financialMetrics.revenue.quarters.map((quarter, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{quarter.quarter}</span>
                    <span className="font-medium text-gray-900">${quarter.revenue}B</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-4">Key Growth Drivers</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-yellow-800 mb-2">Core Business Momentum</h5>
                  <ul className="space-y-1 text-sm text-yellow-700 ml-2">
                    <li>• Strong iPhone upgrade cycle with AI-powered features</li>
                    <li>• Premium product positioning driving higher margins</li>
                    <li>• Consistent market share leadership in key segments</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-yellow-800 mb-2">Recurring Revenue and Customer Stickiness</h5>
                  <ul className="space-y-1 text-sm text-yellow-700 ml-2">
                    <li>• Services revenue growing at 18% year-over-year</li>
                    <li>• App Store ecosystem lock-in effect</li>
                    <li>• Subscription services expansion (iCloud, Apple Music, TV+)</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-yellow-800 mb-2">Scalable, Sustainable Growth Engines</h5>
                  <ul className="space-y-1 text-sm text-yellow-700 ml-2">
                    <li>• Vision Pro enterprise adoption and scaling</li>
                    <li>• AI integration across product portfolio</li>
                    <li>• Expansion into emerging markets and new categories</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 7:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Gross Margin</h4>
                <p className="text-2xl font-bold text-green-900">{financialMetrics.profitability.grossMargin}%</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Operating Margin</h4>
                <p className="text-2xl font-bold text-blue-900">{financialMetrics.profitability.operatingMargin}%</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Net Margin</h4>
                <p className="text-2xl font-bold text-purple-900">{financialMetrics.profitability.netMargin}%</p>
              </div>
            </div>
            
            <div className={`border rounded-lg p-4 ${
              financialMetrics.profitability.trend === 'improving' ? 'bg-green-50 border-green-200' :
              financialMetrics.profitability.trend === 'declining' ? 'bg-red-50 border-red-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                financialMetrics.profitability.trend === 'improving' ? 'text-green-800' :
                financialMetrics.profitability.trend === 'declining' ? 'text-red-800' :
                'text-gray-800'
              }`}>
                Profitability Trend: {financialMetrics.profitability.trend}
              </h4>
              <p className={`text-sm ${
                financialMetrics.profitability.trend === 'improving' ? 'text-green-700' :
                financialMetrics.profitability.trend === 'declining' ? 'text-red-700' :
                'text-gray-700'
              }`}>
                {financialMetrics.profitability.trend === 'improving' 
                  ? 'Margins are expanding due to operational efficiency and pricing power'
                  : financialMetrics.profitability.trend === 'declining'
                  ? 'Margins under pressure from increased competition and costs'
                  : 'Margins remain stable with consistent operational performance'}
              </p>
            </div>
          </div>
        );
      
      case 8:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Cash Flow</h4>
                <p className="text-2xl font-bold text-blue-900">${financialMetrics.financialHealth.cashFlow}B</p>
                <p className="text-sm text-blue-600">Operating Cash Flow</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Current Ratio</h4>
                <p className="text-2xl font-bold text-gray-900">{financialMetrics.financialHealth.currentRatio}</p>
                <p className="text-sm text-gray-600">Liquidity measure</p>
              </div>
            </div>
            
            <div className={`border rounded-lg p-4 ${
              financialMetrics.financialHealth.rating === 'strong' ? 'bg-green-50 border-green-200' :
              financialMetrics.financialHealth.rating === 'moderate' ? 'bg-yellow-50 border-yellow-200' :
              'bg-red-50 border-red-200'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                financialMetrics.financialHealth.rating === 'strong' ? 'text-green-800' :
                financialMetrics.financialHealth.rating === 'moderate' ? 'text-yellow-800' :
                'text-red-800'
              }`}>
                Financial Health Rating: {financialMetrics.financialHealth.rating}
              </h4>
              <p className={`text-sm mt-2 mb-4 ${
                financialMetrics.financialHealth.rating === 'strong' ? 'text-green-700' :
                financialMetrics.financialHealth.rating === 'moderate' ? 'text-yellow-700' :
                'text-red-700'
              }`}>
                {financialMetrics.financialHealth.rating === 'strong' 
                  ? 'The company demonstrates excellent financial stability with strong cash generation, manageable debt levels, and solid liquidity position. This indicates low financial risk and strong ability to weather economic downturns.'
                  : financialMetrics.financialHealth.rating === 'moderate'
                  ? 'The company shows adequate financial health with reasonable debt management and cash flow generation. Some areas may require monitoring but overall financial position is stable.'
                  : 'The company faces financial challenges with concerning debt levels or cash flow issues. Investors should carefully evaluate the financial risks before investing.'}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <span className="text-sm text-gray-600">Total Debt</span>
                  <p className="font-medium">${financialMetrics.financialHealth.debt}B</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Debt-to-Equity</span>
                  <p className="font-medium">{financialMetrics.financialHealth.debtToEquity}</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 9:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
            <div className="space-y-4">
              {financialMetrics.risks.map((risk, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  risk.severity === 'high' ? 'bg-red-50 border-red-200' :
                  risk.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        risk.severity === 'high' ? 'text-red-800' :
                        risk.severity === 'medium' ? 'text-yellow-800' :
                        'text-green-800'
                      }`}>
                        {risk.category}
                      </h4>
                      <p className={`text-sm mt-1 ${
                        risk.severity === 'high' ? 'text-red-700' :
                        risk.severity === 'medium' ? 'text-yellow-700' :
                        'text-green-700'
                      }`}>
                        {risk.description}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      risk.severity === 'high' ? 'bg-red-200 text-red-800' :
                      risk.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {risk.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 10:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Management Guidance</h4>
              <p className="text-sm text-blue-700">{financialMetrics.outlook.guidance}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Market Expectations</h4>
              <p className="text-sm text-gray-700">{financialMetrics.outlook.marketExpectations}</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Key Growth Drivers</h4>
              <ul className="space-y-1 text-sm text-green-700">
                {financialMetrics.outlook.keyDrivers.map((driver, index) => (
                  <li key={index}>• {driver}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      default:
        return <div>Section not found</div>;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <div className="border-l border-gray-300 h-6"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{company.symbol}</h1>
                <p className="text-sm text-gray-600">{company.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleFavoriteClick}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  isFavorited
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                <span>{isFavorited ? 'Favorited' : 'Add to Favorites'}</span>
              </button>
              <button 
                onClick={handleShare}
                disabled={shareStatus === 'copying'}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${getShareButtonStyle()}`}
              >
                <Share2 className="h-5 w-5" />
                <span>{getShareButtonText()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Section Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Analysis Sections</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {sections.find(s => s.id === activeSection)?.title}
                </h2>
                <div className="h-1 bg-gray-200 rounded-full">
                  <div 
                    className="h-1 bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${(activeSection / sections.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePager;