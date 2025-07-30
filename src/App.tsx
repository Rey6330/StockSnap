import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';
import OnePager from './components/OnePager';
import FavoritesPage from './components/FavoritesPage';
import AuthModal from './components/AuthModal';
import { useAuth } from './hooks/useAuth';
import { 
  mockCompanies, 
  searchCompanies, 
  mockNews, 
  mockEarningsCall, 
  mockFinancialMetrics,
  mockChartData,
  mockCompetitors,
  trendingStocks
} from './data/mockData';
import { Company } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'onepager' | 'favorites'>('home');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { user, login, logout, addToFavorites, isFavorited, getFavoriteCompanies, removeFromFavorites } = useAuth();
  
  const trendingCompanies = mockCompanies.filter(company => 
    trendingStocks.includes(company.symbol)
  );
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const results = searchCompanies(query);
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };
  
  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setCurrentView('onepager');
    setSearchQuery('');
    setSearchResults([]);
  };
  
  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCompany(null);
  };
  
  const handleShowFavorites = () => {
    if (!user) {
      handleLogin();
      return;
    }
    setCurrentView('favorites');
  };
  
  const handleLogin = () => {
    setShowAuthModal(true);
  };
  
  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };
  
  const handleFavoriteClick = (symbol: string) => {
    if (!user) {
      handleLogin();
      return;
    }
    addToFavorites(symbol);
  };
  
  const favoriteCompanies = getFavoriteCompanies();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onCompanySelect={handleCompanySelect}
        searchResults={searchResults}
        isSearching={isSearching}
        user={user}
        onLogin={handleLogin}
        onLogout={logout}
        onShowFavorites={handleShowFavorites}
        favoritesCount={favoriteCompanies.length}
      />
      
      {currentView === 'home' ? (
        <Homepage
          trendingStocks={trendingCompanies}
          favoriteStocks={favoriteCompanies}
          onCompanySelect={handleCompanySelect}
          onSearch={handleSearch}
          searchResults={searchResults}
          isSearching={isSearching}
        />
      ) : currentView === 'favorites' ? (
        <FavoritesPage
          favorites={favoriteCompanies}
          onCompanySelect={handleCompanySelect}
          onRemoveFromFavorites={removeFromFavorites}
          onBack={handleBackToHome}
        />
      ) : (
        selectedCompany && (
          <OnePager
            company={selectedCompany}
            news={mockNews[selectedCompany.symbol] || []}
            earningsCall={mockEarningsCall[selectedCompany.symbol] || {
              date: '',
              quarter: '',
              year: 0,
              keyQuotes: [],
              analystHighlights: []
            }}
            financialMetrics={mockFinancialMetrics[selectedCompany.symbol] || {
              revenue: { current: 0, growth: 0, quarters: [] },
              profitability: { grossMargin: 0, operatingMargin: 0, netMargin: 0, trend: 'stable' },
              financialHealth: { cashFlow: 0, debt: 0, debtToEquity: 0, currentRatio: 0, rating: 'moderate' },
              risks: [],
              outlook: { guidance: '', marketExpectations: '', keyDrivers: [] }
            }}
            chartData={mockChartData[selectedCompany.symbol] || []}
            competitors={mockCompetitors[selectedCompany.symbol] || []}
            onBack={handleBackToHome}
            user={user}
            onLogin={handleLogin}
            onAddToFavorites={handleFavoriteClick}
            isFavorited={isFavorited(selectedCompany.symbol)}
          />
        )
      )}
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={handleAuthModalClose}
        onLogin={login}
      />
    </div>
  );
}

export default App;