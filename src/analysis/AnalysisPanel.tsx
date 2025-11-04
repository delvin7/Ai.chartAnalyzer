import React, { useState } from "react";
import StrategySelector from "./StrategySelector";
import IndicatorSelector from "./IndicatorSelector";
import { useTheme } from "../context/ThemeContext";

const AnalysisPanel: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { isDark } = useTheme();
  const [strategy, setStrategy] = useState("");
  const [indicators, setIndicators] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState("");

  const handleAnalyze = () => {
    const prompt = `
Analyze ${symbol} with the following details:
- Strategy: ${strategy || "Not selected"}
- Indicators: ${indicators.length > 0 ? indicators.join(", ") : "None selected"}
- Timeframe: ${timeframe || "Not selected"}
Provide AI-based analysis for entry, exit, and overall trend.
    `;
    console.log(prompt);
    alert("🧠 AI Analysis started!\nCheck console for generated prompt.");
  };

  return (
    <div
      className={`mt-10 rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-950 via-slate-900 to-gray-800 border border-gray-700"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-gray-200"
      }`}
    >
      {/* 🧭 Section Title */}
      <h2
        className={`text-center text-2xl font-bold mb-8 ${
          isDark ? "text-gray-100" : "text-gray-800"
        }`}
      >
        ⚙️ Smart Analysis Setup
      </h2>

      {/* 📈 Strategy / Indicators / Timeframe */}
      <div className="space-y-8">
        <StrategySelector onSelect={setStrategy} />
        <IndicatorSelector onSelect={setIndicators} />

      </div>

      {/* 🚀 Start Analysis Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleAnalyze}
          className={`px-8 py-3 rounded-xl font-semibold text-lg shadow-md transform hover:scale-[1.03] transition-all duration-300 ${
            isDark
              ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:opacity-90"
              : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90"
          }`}
        >
          🚀 Start AI Analysis
        </button>
      </div>

      {/* Optional visual divider */}
      <div
        className={`mt-8 border-t ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      ></div>

      {/* Display Summary */}
      <div
        className={`mt-6 text-center text-sm ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        <p>
          <span className="font-semibold">Strategy:</span>{" "}
          {strategy || "Not selected"}
        </p>
        <p>
          <span className="font-semibold">Indicators:</span>{" "}
          {indicators.length > 0 ? indicators.join(", ") : "None selected"}
        </p>
      
      </div>
    </div>
  );
};

export default AnalysisPanel;
