import React from 'react';
import { Heart, TrendingUp, TrendingDown, ArrowRight, Trash2 } from 'lucide-react';
import { Company } from '../types';

interface FavoritesPageProps {
  favorites: Company[];
  onCompanySelect: (company: Company) => void;
  onRemoveFromFavorites: (symbol: string) => void;
  onBack: () => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
  onCompanySelect,
  onRemoveFromFavorites,
  onBack
}) => {
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="bg-white rounded-full p-6 w-24 h-24 mx-auto mb-6 shadow-lg">
              <Heart className="h-12 w-12 text-gray-400 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Favorites Yet</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Start building your watchlist by adding companies to your favorites. 
              Click the heart icon on any company's one-pager to save it here.
            </p>
            <button
              onClick={onBack}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Explore Stocks
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 rounded-full p-3">
              <Heart className="h-8 w-8 text-red-600 fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>
              <p className="text-gray-600">{favorites.length} saved {favorites.length === 1 ? 'company' : 'companies'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((company) => (
            <div
              key={company.symbol}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border hover:border-blue-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {company.symbol}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{company.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{company.sector}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromFavorites(company.symbol);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Remove from favorites"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${company.price.toFixed(2)}
                  </span>
                  <div className={`flex items-center space-x-1 ${
                    company.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {company.change >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {company.change >= 0 ? '+' : ''}{company.change.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  company.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {company.change >= 0 ? '+' : ''}{company.changePercent.toFixed(2)}% today
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-2">
                  <span className="text-gray-500 block">Market Cap</span>
                  <span className="font-semibold text-gray-900">{company.marketCap}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <span className="text-gray-500 block">P/E Ratio</span>
                  <span className="font-semibold text-gray-900">{company.peRatio}</span>
                </div>
              </div>
              
              <button
                onClick={() => onCompanySelect(company)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2 group-hover:bg-blue-700"
              >
                <span>View Analysis</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;