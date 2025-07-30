import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ChartData } from '../types';

interface StockChartProps {
  data: ChartData[];
  currentPrice: number;
  change: number;
  changePercent: number;
}

const StockChart: React.FC<StockChartProps> = ({ data, currentPrice, change, changePercent }) => {
  const [timeframe, setTimeframe] = useState('1Y');
  
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const priceRange = maxPrice - minPrice;
  
  const chartHeight = 200;
  const chartWidth = 800;
  
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;
    return { x, y, price: point.price, date: point.date };
  });
  
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');
  
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">
              ${currentPrice.toFixed(2)}
            </span>
            <div className={`flex items-center space-x-1 ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              <span className="font-semibold">
                {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">Last updated: {new Date().toLocaleString()}</p>
        </div>
        
        <div className="flex space-x-2">
          {['1D', '1W', '1M', '3M', '1Y', '5Y'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeframe === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <svg
          width="100%"
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Price line */}
          <path
            d={pathData}
            fill="none"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Fill area */}
          <path
            d={`${pathData} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`}
            fill={`url(#gradient-${isPositive ? 'green' : 'red'})`}
            opacity="0.1"
          />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient-green" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="gradient-red" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="3"
              fill={isPositive ? '#10b981' : '#ef4444'}
              className="opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <title>{`${point.date}: $${point.price.toFixed(2)}`}</title>
            </circle>
          ))}
        </svg>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{data[0]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </div>
  );
};

export default StockChart;