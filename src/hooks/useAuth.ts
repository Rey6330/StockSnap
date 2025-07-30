import { useState, useEffect } from 'react';
import { User } from '../types';
import { mockCompanies } from '../data/mockData';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('stockanalyzer_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('stockanalyzer_user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('stockanalyzer_user');
  };
  
  const addToFavorites = (symbol: string) => {
    if (!user) return;
    
    const company = mockCompanies.find(c => c.symbol === symbol);
    if (!company) return;
    
    const updatedUser = {
      ...user,
      favorites: user.favorites.some(f => f.symbol === symbol)
        ? user.favorites.filter(f => f.symbol !== symbol)
        : [...user.favorites, company]
    };
    
    setUser(updatedUser);
    localStorage.setItem('stockanalyzer_user', JSON.stringify(updatedUser));
  };
  
  const isFavorited = (symbol: string) => {
    return user?.favorites.some(f => f.symbol === symbol) || false;
  };
  
  const getFavoriteCompanies = () => {
    return user?.favorites || [];
  };
  
  const removeFromFavorites = (symbol: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      favorites: user.favorites.filter(f => f.symbol !== symbol)
    };
    
    setUser(updatedUser);
    localStorage.setItem('stockanalyzer_user', JSON.stringify(updatedUser));
  };
  
  return {
    user,
    isLoading,
    login,
    logout,
    addToFavorites,
    isFavorited,
    getFavoriteCompanies,
    removeFromFavorites
  };
};