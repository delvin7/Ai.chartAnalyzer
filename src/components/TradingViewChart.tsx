import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

// Declare TradingView global variable
declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewChartProps {
  symbol: string;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    // Clear previous chart before reloading
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Remove old script if it exists
    const oldScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
    if (oldScript) oldScript.remove();

    // Load TradingView script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "60",
          timezone: "Etc/UTC",
          theme: isDark ? "dark" : "light",
          style: "1",
          locale: "en",
          enable_publishing: false,
          backgroundColor: isDark ? "#0f172a" : "#ffffff",
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: "tradingview_chart",
        });
      }
    };

    document.body.appendChild(script);
  }, [symbol, isDark]);

  return (
    <div
      id="tradingview_chart"
      ref={containerRef}
      className={`
        w-full h-[600px] rounded-2xl border shadow-md transition-all duration-500
        ${isDark
          ? "bg-gradient-to-r from-gray-950 via-slate-900 to-indigo-950 border-gray-800"
          : "bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 border-gray-200"
        }
      `}
    ></div>
  );
};

export default TradingViewChart;
