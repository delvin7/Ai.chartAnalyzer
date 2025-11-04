import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import MiniStatsCard from "../components/MiniStatCard";
import TradingViewChart from "../components/TradingViewChart";
import AnalysisPanel from "../analysis/AnalysisPanel";
import Banner from "../components/Banner";

interface DashboardContentProps {
  currentSymbol: string;
  onSymbolSelect: (symbol: string) => void;
  apiKey: string;
}

interface MarketStats {
  label: string;
  value: number | string | null | undefined;
  type?: "price" | "change" | "cap" | "volume";
}

const DashboardContent: React.FC<DashboardContentProps> = ({ currentSymbol }) => {
  const { isDark } = useTheme();
  const [statsData, setStatsData] = useState<MarketStats[]>([]);
  const [loading, setLoading] = useState(true);

  const textClasses = isDark ? "text-gray-200" : "text-gray-800";
  const symbolBgClasses = isDark
    ? "bg-slate-800 text-white border border-gray-700"
    : "bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-gray-900 shadow-sm border border-gray-200";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (currentSymbol.startsWith("BINANCE:")) {
          const baseCoin = currentSymbol
            .replace("BINANCE:", "")
            .replace("USDT", "")
            .toLowerCase();

          const coinMap: Record<string, string> = {
            btc: "bitcoin",
            eth: "ethereum",
            bnb: "binancecoin",
            sol: "solana",
            ada: "cardano",
            xrp: "ripple",
            doge: "dogecoin",
          };

          const id = coinMap[baseCoin] || "bitcoin";
          const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}?localization=false&sparkline=false`
          );
          const data = await res.json();

          setStatsData([
            { label: "Price", value: data.market_data.current_price.usd, type: "price" },
            { label: "24h Change", value: data.market_data.price_change_percentage_24h, type: "change" },
            { label: "Market Cap", value: data.market_data.market_cap.usd / 1e9, type: "cap" },
            { label: "24h Volume", value: data.market_data.total_volume.usd / 1e6, type: "volume" },
          ]);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setStatsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentSymbol]);

  return (
    <div className="relative glow-bg min-h-screen py-10 px-6 sm:px-10">
      {/* ✨ Main glass card */}
      <div
        className={`max-w-7xl mx-auto p-8 sm:p-10 glass-panel fade-in transition-all duration-700 ${
          isDark
            ? "bg-gradient-to-br from-[#0f1224]/70 via-[#1a1f35]/70 to-[#0b0d18]/70"
            : "bg-gradient-to-br from-white/60 via-indigo-50/60 to-purple-50/60"
        }`}
      >
        {/* 🌟 Floating Banner */}
        <Banner />

        {/* 📌 Header */}
        <div className="mb-8 text-center">
          <p className={`text-lg font-medium ${textClasses}`}>
            Asset Overview:{" "}
            <span
              className={`font-mono px-3 py-1 rounded-md font-semibold shadow-sm ${symbolBgClasses}`}
            >
              {currentSymbol}
            </span>
          </p>
        </div>

        {/* 📊 Chart Section */}
        <div className="w-full fade-in mb-8 rounded-2xl overflow-hidden shadow-lg">
          <TradingViewChart symbol={currentSymbol} />
        </div>

        {/* 📈 Mini Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {loading ? (
            <p className="text-center text-gray-400 col-span-4 animate-pulse">
              Fetching market data...
            </p>
          ) : statsData.length > 0 ? (
            statsData.map((stat, index) => (
              <MiniStatsCard key={index} title={stat.label} {...stat} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">No data available</p>
          )}
        </div>

        {/* 🧠 AI Analysis Panel */}
        <AnalysisPanel symbol={currentSymbol} />
      </div>
    </div>
  );
};

export default DashboardContent;
