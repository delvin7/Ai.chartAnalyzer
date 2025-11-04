import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import MarketSelector from "./components/MarketSelector";
import SearchBar from "./components/SearchBar";
import DashboardContent from "./pages/DashboardContent";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./style.css";

// ===========================================================
// --- MARKET MAPPING ---
// ===========================================================
const markets = {
  Crypto: "BINANCE:BTCUSDT", // TradingView format
  Stocks: "NASDAQ:AAPL",
  Forex: "FX:EURUSD",
};

type MarketKey = keyof typeof markets;

// ===========================================================
// --- MAIN APP COMPONENT ---
// ===========================================================
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContentWrapper />
    </ThemeProvider>
  );
};

// ===========================================================
// --- APP WRAPPER (Uses Theme Context) ---
// ===========================================================
const AppContentWrapper: React.FC = () => {
  const { isDark } = useTheme();
  const [currentMarket, setCurrentMarket] = useState<MarketKey>("Crypto");
  const [currentSymbol, setCurrentSymbol] = useState(markets["Crypto"]);

  // ✅ Optional API key (keep empty if using public endpoints)
  const apiKey = "";

  // Update symbol when market changes
  useEffect(() => {
    setCurrentSymbol(markets[currentMarket]);
  }, [currentMarket]);

  // ---------------------------------------------------------
  // --- Search & Symbol Handling ---
  // ---------------------------------------------------------
  const handleSearch = (input: string) => {
    let symbol = input.trim().toUpperCase();
    let formattedSymbol = "";

    // 1️⃣ If already prefixed (like BINANCE:BTCUSDT)
    if (symbol.includes(":")) formattedSymbol = symbol;
    // 2️⃣ Detect Crypto
    else if (/BTC|ETH|SOL|BNB|ADA|XRP|DOGE|SHIB|AVAX|DOT|MATIC/.test(symbol))
      formattedSymbol = symbol.endsWith("USDT")
        ? `BINANCE:${symbol}`
        : `BINANCE:${symbol}USDT`;
    // 3️⃣ Detect Forex / Metals
    else if (/^(EUR|USD|GBP|JPY|AUD|CAD|CHF|NZD)/.test(symbol))
      formattedSymbol = `FX:${symbol}`;
    else if (/XAU|XAG/.test(symbol))
      formattedSymbol = `OANDA:${symbol.endsWith("USD") ? symbol : symbol + "USD"}`;
    // 4️⃣ Detect Stocks
    else if (/^[A-Z]{1,5}$/.test(symbol))
      formattedSymbol = `NASDAQ:${symbol}`;
    // 5️⃣ Detect Indices
    else if (/NIFTY|SENSEX/.test(symbol)) formattedSymbol = `NSE:${symbol}`;
    else if (/DOW|SPX|NDX/.test(symbol)) formattedSymbol = `INDEX:${symbol}`;
    // 6️⃣ Fallback
    else formattedSymbol = `BINANCE:${symbol}`;

    console.log("✅ Final symbol:", formattedSymbol);
    setCurrentSymbol(formattedSymbol);
  };

  // Handle market change and symbol selection
  const handleMarketChange = (market: MarketKey) => setCurrentMarket(market);
  const handleSymbolSelect = (symbol: string) => {
    const symbolMap: Record<string, string> = {
      ETH: "BINANCE:ETHUSDT",
      TSLA: "NASDAQ:TSLA",
      GOOGL: "NASDAQ:GOOGL",
      MSFT: "NASDAQ:MSFT",
      USDJPY: "FX:USDJPY",
    };
    setCurrentSymbol(symbolMap[symbol] || symbol);
  };

  // ---------------------------------------------------------
  // --- Dynamic Background ---
  // ---------------------------------------------------------
  const wrapperClasses = `
    min-h-screen font-sans transition-all duration-700
    ${
      isDark
        ? "bg-gradient-to-br from-gray-950 via-slate-900 to-gray-800 text-white"
        : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"
    }
  `;

  // ---------------------------------------------------------
  // --- RENDER ---
  // ---------------------------------------------------------
  return (
    <div className={wrapperClasses}>
      {/* Header */}
      <Header />

      {/* Controls */}
      <div className="sticky top-[68px] z-40 shadow-sm backdrop-blur-md">
        <MarketSelector market={currentMarket} setMarket={handleMarketChange} />
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Main Dashboard */}
      <main className="py-6">
        <DashboardContent
          currentSymbol={currentSymbol}
          onSymbolSelect={handleSymbolSelect}
          apiKey={apiKey}
        />
      </main>

      {/* Footer */}
      <footer
        className={`py-6 text-center text-sm transition-colors duration-500 ${
          isDark
            ? "text-gray-500 border-t border-slate-800"
            : "text-gray-600 border-t border-gray-300"
        }`}
      >
        &copy; {new Date().getFullYear()} <b>SmartChart AI</b> — All Rights Reserved.
        <br />
        <span className="text-xs opacity-70">
          Current Symbol: {currentSymbol}
        </span>
      </footer>
    </div>
  );
};

export default App;
