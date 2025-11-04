import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const indicatorList = [
  "RSI",
  "MACD",
  "EMA",
  "SMA",
  "Bollinger Bands",
  "Volume",
  "VWAP",
  "Stochastic",
  "ATR",
];

const IndicatorSelector: React.FC<{ onSelect: (selected: string[]) => void }> = ({ onSelect }) => {
  const { isDark } = useTheme();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleIndicator = (indicator: string) => {
    const updated = selected.includes(indicator)
      ? selected.filter((i) => i !== indicator)
      : [...selected, indicator];
    setSelected(updated);
    onSelect(updated);
  };

  return (
    <div
      className={`p-4 mt-6 rounded-xl transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-r from-gray-900 via-slate-900 to-gray-800 border border-gray-700"
          : "bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 border border-gray-200"
      }`}
    >
      <h2 className={`text-center mb-4 font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
        ⚙️ Select Indicators
      </h2>

      <div className="flex flex-wrap justify-center gap-3">
        {indicatorList.map((indicator) => (
          <button
            key={indicator}
            onClick={() => toggleIndicator(indicator)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selected.includes(indicator)
                ? "bg-indigo-600 text-white scale-105"
                : isDark
                ? "bg-slate-800 text-gray-300 hover:bg-slate-700"
                : "bg-white text-gray-800 hover:bg-indigo-100"
            }`}
          >
            {indicator}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IndicatorSelector;
