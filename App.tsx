
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { OptionTrade } from './types';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import PortfolioCard from './components/PortfolioCard';
import { formatCurrency, formatPercentage } from './utils/formatters';
import { FileUp, TrendingUp, TrendingDown, Wallet, Briefcase } from 'lucide-react';

const App: React.FC = () => {
  const [trades, setTrades] = useState<OptionTrade[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await fetch('./data/portfolio.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && (data.length === 0 || 'Ticker' in data[0])) {
          setTrades(data);
          setError(null);
        } else {
          setError("Invalid JSON format in initial data. Expected an array of trades.");
        }
      } catch (err) {
        setError("Failed to load or parse initial portfolio data.");
        console.error(err);
      }
    };
    loadInitialData();
  }, []);

  const summaryStats = useMemo(() => {
    if (trades.length === 0) {
      return {
        totalCapital: 0,
        totalPnL: 0,
        winningTrades: 0,
        totalTrades: 0,
        overallReturn: 0,
      };
    }
    const totalCapital = trades.reduce((acc, trade) => acc + trade.Capital, 0);
    const totalPnL = trades.reduce((acc, trade) => acc + trade.PnL_adjusted, 0);
    const winningTrades = trades.filter((trade) => trade.PnL_adjusted > 0).length;
    const overallReturn = totalCapital > 0 ? (totalPnL / totalCapital) * 100 : 0;

    return {
      totalCapital,
      totalPnL,
      winningTrades,
      totalTrades: trades.length,
      overallReturn,
    };
  }, [trades]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          if (typeof content === 'string') {
            const data = JSON.parse(content);
            // Basic validation
            if (Array.isArray(data) && data.length > 0 && 'Ticker' in data[0]) {
               setTrades(data);
               setError(null);
            } else {
              setError("Invalid JSON format. Expected an array of trades.");
            }
          }
        } catch (err) {
          setError("Failed to parse JSON file. Please check the file content.");
          console.error(err);
        }
      };
      reader.onerror = () => {
        setError("Failed to read the file.");
      }
      reader.readAsText(file);
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header onFileUpload={handleFileUpload} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        
        {error && (
          <div className="bg-red-900 border border-red-600 text-red-100 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <SummaryCard
            title="Total P&L"
            value={formatCurrency(summaryStats.totalPnL)}
            change={summaryStats.overallReturn}
            icon={<Wallet className="w-8 h-8 text-indigo-400" />}
          />
          <SummaryCard
            title="Total Capital"
            value={formatCurrency(summaryStats.totalCapital)}
            icon={<Briefcase className="w-8 h-8 text-blue-400" />}
          />
          <SummaryCard
            title="Winning Trades"
            value={`${summaryStats.winningTrades} / ${summaryStats.totalTrades}`}
            change={(summaryStats.totalTrades > 0) ? (summaryStats.winningTrades / summaryStats.totalTrades) * 100 : 0}
            icon={<TrendingUp className="w-8 h-8 text-green-400" />}
          />
          <SummaryCard
            title="Losing Trades"
            value={`${summaryStats.totalTrades - summaryStats.winningTrades} / ${summaryStats.totalTrades}`}
            change={(summaryStats.totalTrades > 0) ? ((summaryStats.totalTrades - summaryStats.winningTrades) / summaryStats.totalTrades) * 100 : 0}
            isLoss={true}
            icon={<TrendingDown className="w-8 h-8 text-red-400" />}
          />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Open Positions</h2>
          {trades.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {trades.map((trade) => (
                <PortfolioCard key={trade.option_code} trade={trade} />
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
                <FileUp className="w-16 h-16 text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-300">No Portfolio Data</h3>
                <p className="text-gray-400 mt-2">Upload a JSON file to see your options portfolio.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
