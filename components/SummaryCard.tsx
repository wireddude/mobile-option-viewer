
import React from 'react';
import { formatPercentage } from '../utils/formatters';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  isLoss?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, change, icon, isLoss = false }) => {
  const hasChange = typeof change === 'number';
  const isPositive = hasChange && change > 0 && !isLoss;
  const isNegative = hasChange && (change < 0 || isLoss);

  const changeColor = isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-400';

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-start justify-between">
        <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-100">{value}</p>
        </div>
        <div className="bg-gray-900/50 p-3 rounded-lg">
           {icon}
        </div>
      </div>
      {hasChange && (
        <div className={`mt-3 flex items-center text-sm ${changeColor}`}>
           {isPositive && <ArrowUpRight className="w-4 h-4 mr-1" />}
           {isNegative && <ArrowDownRight className="w-4 h-4 mr-1" />}
          <span>{formatPercentage(change)} {isLoss ? 'of trades' : 'return'}</span>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
