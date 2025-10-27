
import React from 'react';
import { OptionTrade } from '../types';
import { formatCurrency, formatPercentage, formatDate } from '../utils/formatters';
import { TrendingUp, TrendingDown, Calendar, Hash, Target } from 'lucide-react';

interface PortfolioCardProps {
  trade: OptionTrade;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ trade }) => {
  const isProfit = trade.PnL_adjusted >= 0;
  const pnlColor = isProfit ? 'text-green-400' : 'text-red-400';
  const pnlBgColor = isProfit ? 'bg-green-500/10' : 'bg-red-500/10';
  const typeColor = trade.CP === 'Call' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300';
  const positionTypeColor = trade.position_type === 'L' ? 'bg-blue-500/20 text-blue-300' : 'bg-yellow-500/20 text-yellow-300';

  const expDate = new Date(trade['EXP Date']);
  const today = new Date();
  const dte = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const dteColor = dte <= 7 ? 'text-red-400' : dte <= 30 ? 'text-yellow-400' : 'text-green-400';
  
  const stockChangeColor = trade['Stock Change'] >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-gray-800 border border-gray-700/80 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-indigo-500/20 hover:border-indigo-500/50">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{trade.Ticker}</h3>
            <p className="text-sm text-gray-400">
              {formatCurrency(trade['Stock Price'])}
              <span className={`ml-2 font-semibold ${stockChangeColor}`}>
                {trade['Stock Change'] > 0 ? '+' : ''}{formatCurrency(trade['Stock Change'], '')} ({formatPercentage(trade['Stock Percent'])})
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${typeColor}`}>{trade.CP}</span>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${positionTypeColor}`}>{trade.position_type === 'L' ? 'Long' : 'Short'}</span>
          </div>
        </div>

        <div className={`${pnlBgColor} rounded-lg p-3 mb-4 flex justify-between items-center`}>
            <span className="font-medium text-gray-300">P&L</span>
            <div className={`text-right font-bold text-lg ${pnlColor}`}>
                {formatCurrency(trade.PnL_adjusted)}
                <span className="block text-sm font-normal">{formatPercentage(trade['% PnL'])}</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-gray-400" />
                <div>
                    <p className="text-gray-400">Strike</p>
                    <p className="font-semibold text-white">{formatCurrency(trade.Strike)}</p>
                </div>
            </div>
             <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-gray-400" />
                <div>
                    <p className="text-gray-400">Contracts</p>
                    <p className="font-semibold text-white">{trade.num}</p>
                </div>
            </div>
             <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                    <p className="text-gray-400">Expiration</p>
                    <p className="font-semibold text-white">{formatDate(trade['EXP Date'])}</p>
                </div>
            </div>
             <div className="flex items-center space-x-2">
                <Calendar className={`w-4 h-4 ${dteColor}`} />
                <div>
                    <p className="text-gray-400">DTE</p>
                    <p className={`font-bold ${dteColor}`}>{dte}</p>
                </div>
            </div>
        </div>
      </div>
      <div className="bg-gray-900/50 px-5 py-2 text-xs text-gray-500 flex justify-between">
        <span>Opened: {formatDate(trade.Opened)}</span>
        <span>Capital: {formatCurrency(trade.Capital)}</span>
      </div>
    </div>
  );
};

export default PortfolioCard;
