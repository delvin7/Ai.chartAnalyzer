import React from 'react';
import { Bitcoin, Landmark, DollarSign } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type MarketKey = 'Crypto' | 'Stocks' | 'Forex';

interface Props {
  market: MarketKey;
  setMarket: (m: MarketKey) => void;
}

const MarketSelector: React.FC<Props> = ({ market, setMarket }) => {
  const { isDark } = useTheme();

  const markets = [
    { name: 'Crypto', icon: Bitcoin },
    { name: 'Stocks', icon: Landmark },
    { name: 'Forex', icon: DollarSign },
  ];

  return (
    <div
      className={`
        w-full py-4 shadow-sm transition-all duration-500 border-t
        ${isDark
          ? 'bg-gradient-to-r from-gray-950 via-slate-900 to-indigo-950 border-gray-800'
          : 'bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 border-gray-200'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-center gap-4">
        {markets.map((m) => {
          const Icon = m.icon;
          const active = m.name === market;

          return (
            <button
              key={m.name}
              onClick={() => setMarket(m.name as MarketKey)}
              className={`
                flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all duration-300
                ${active
                  ? isDark
                    ? 'bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white shadow-lg scale-105'
                    : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md scale-105'
                  : isDark
                    ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    : 'bg-white text-gray-800 hover:bg-gray-200 border border-gray-300'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {m.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MarketSelector;
