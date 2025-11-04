import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { TrendingUp, Activity, BarChart3, Clock } from "lucide-react";

const StrategySelector: React.FC<{ onSelect: (strategy: string) => void }> = ({ onSelect }) => {
  const { isDark } = useTheme();
  const [selected, setSelected] = useState("");

  const strategies = [
    { name: "Momentum Trading", icon: TrendingUp },
    { name: "Swing Trading", icon: Activity },
    { name: "Value Investing", icon: BarChart3 },
    { name: "Breakout Strategy", icon: Clock },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div
      className={`relative p-6 rounded-2xl transition-all duration-500 border shadow-md ${
        isDark
          ? "bg-gradient-to-br from-slate-800 via-slate-700 to-gray-800 border-gray-600"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-gray-200"
      }`}
    >
      {/* 🌈 Header */}
      <h3
        className={`text-lg font-semibold mb-4 ${
          isDark ? "text-indigo-400" : "text-indigo-600"
        }`}
      >
        🎯 Select a Trading Strategy
      </h3>

      {/* 📊 Dropdown */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <select
          value={selected}
          onChange={handleChange}
          className={`w-full sm:w-auto flex-grow p-3 rounded-lg font-medium text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
            isDark
              ? "bg-slate-800 text-gray-100 border border-gray-600 focus:ring-indigo-500"
              : "bg-white/90 text-gray-900 border border-gray-300 shadow-sm focus:ring-indigo-400"
          }`}
        >
          <option value="" disabled>
            Choose a trading strategy...
          </option>
          {strategies.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {/* 🧠 Icon Preview (Dynamic) */}
        {selected && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
              isDark
                ? "bg-slate-700 text-indigo-300 border border-gray-600"
                : "bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-700 border border-gray-200 shadow-sm"
            }`}
          >
            {(() => {
              const match = strategies.find((s) => s.name === selected);
              if (!match) return null;
              const Icon = match.icon;
              return <Icon className="w-4 h-4" />;
            })()}
            <span>{selected}</span>
          </div>
        )}
      </div>

      {/* 🪩 Gradient Accent Bar */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[3px] rounded-b-2xl ${
          isDark
            ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            : "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
        }`}
      />
    </div>
  );
};

export default StrategySelector;
