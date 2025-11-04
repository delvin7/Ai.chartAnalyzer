import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface WatchlistProps {
    onSymbolSelect: (symbol: string) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ onSymbolSelect }) => {
    const { isDark } = useTheme();
    
    // Mock data for the watchlist
    const assets = [
        { symbol: "TSLA", price: "245.30", change: 0.015 },
        { symbol: "ETH", price: "3,820.75", change: 0.032 },
        { symbol: "GOOGL", price: "172.10", change: -0.005 },
        { symbol: "USDJPY", price: "155.12", change: -0.011 },
        { symbol: "MSFT", price: "420.01", change: 0.008 },
    ];

    const containerClasses = isDark ? "bg-slate-800/50" : "bg-white";
    const headerClasses = isDark ? "text-indigo-400" : "text-indigo-600";
    const itemClasses = isDark ? "text-gray-200 hover:bg-slate-700/50" : "text-gray-800 hover:bg-gray-100";

    return (
        <div className={`p-6 rounded-xl border ${isDark ? 'border-slate-700' : 'border-gray-200'} ${containerClasses} shadow-xl`}>
            <h3 className={`text-xl font-semibold mb-4 ${headerClasses}`}>
                Your Watchlist
            </h3>
            <div className="space-y-3">
                {assets.map((asset) => {
                    const isPositive = asset.change >= 0;
                    const changeColor = isPositive ? "text-emerald-400" : "text-rose-400";

                    return (
                        <div 
                            key={asset.symbol} 
                            onClick={() => onSymbolSelect(asset.symbol)}
                            className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition duration-150 ${itemClasses}`}
                        >
                            <span className="font-bold">{asset.symbol}</span>
                            <div className="text-right">
                                <span className={`font-mono block ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.price}</span>
                                <span className={`text-sm font-medium ${changeColor}`}>
                                    {isPositive ? '+' : ''}{(asset.change * 100).toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Watchlist;
