import React from 'react';
import { TrendingUp, TrendingDown, Star, ArrowRight, Search } from 'lucide-react';
import { Company } from '../types';

interface HomepageProps {
  trendingStocks: Company[];
  favoriteStocks: Company[];
  onCompanySelect: (company: Company) => void;
  onSearch: (query: string) => void;
  searchResults: Company[];
  isSearching: boolean;
}

const Homepage: React.FC<HomepageProps> = ({ 
  trendingStocks, 
  favoriteStocks,
  onCompanySelect, 
  onSearch, 
  searchResults, 
  isSearching 
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showResults, setShowResults] = React.useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    setShowResults(true);
  };

  const handleCompanyClick = (company: Company) => {
    onCompanySelect(company);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            One snap a day to stay stock-smart.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get comprehensive company analysis reports with real-time data, news sentiment, and financial insights all in one beautifully designed one-pager.
          </p>
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input
                  type="text"
                  placeholder="Search stocks by symbol or company name..."
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-lg"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowResults(true)}
                />
              </div>
              
              {/* Search Results */}
              {showResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-2 shadow-xl max-h-64 overflow-y-auto z-50">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((company) => (
                      <div
                        key={company.symbol}
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleCompanyClick(company)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{company.symbol}</div>
                            <div className="text-sm text-gray-500">{company.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">${company.price.toFixed(2)}</div>
                            <div className={`text-sm ${company.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {company.change >= 0 ? '+' : ''}{company.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Stocks Section */}
      {favoriteStocks.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Your Favorites</h2>
              <div className="flex items-center text-sm text-gray-500">
                {favoriteStocks.length} saved {favoriteStocks.length === 1 ? 'stock' : 'stocks'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer border hover:border-blue-200"
                  onClick={() => onCompanySelect(stock)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{stock.symbol}</h3>
                      <p className="text-sm text-gray-600 truncate">{stock.name}</p>
                     <p className="text-xs text-gray-500">{stock.industry}</p>
                    </div>
                    <div className="flex items-center">
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ${stock.price.toFixed(2)}
                    </span>
                    <div className={`flex items-center text-sm font-medium ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                      <span className="ml-1">
                        ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Market Cap</span>
                      <div className="font-medium text-gray-900">{stock.marketCap}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">P/E Ratio</span>
                      <div className="font-medium text-gray-900">{stock.peRatio}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{stock.sector}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trending Stocks Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {favoriteStocks.length > 0 ? 'Trending Stocks' : 'Trending Stocks'}
            </h2>
            <div className="flex items-center text-sm text-gray-500">
              Most viewed today
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingStocks.map((stock) => (
              <div
                key={stock.symbol}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer border hover:border-blue-200"
                onClick={() => onCompanySelect(stock)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{stock.symbol}</h3>
                    <p className="text-sm text-gray-600 truncate">{stock.name}</p>
                   <p className="text-xs text-gray-500">{stock.industry}</p>
                  </div>
                  <div className="flex items-center">
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ${stock.price.toFixed(2)}
                  </span>
                  <div className={`flex items-center text-sm font-medium ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    <span className="ml-1">
                      ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Market Cap</span>
                    <div className="font-medium text-gray-900">{stock.marketCap}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">P/E Ratio</span>
                    <div className="font-medium text-gray-900">{stock.peRatio}</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{stock.sector}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;