import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface SearchBarProps {
  onSearch: (symbol: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") onSearch(input);
  };

  // 🎨 Theme-aware gradient backgrounds
  const containerClass = isDark
    ? "bg-gradient-to-r from-gray-900 via-slate-900 to-gray-800 border-b border-gray-700"
    : "bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 border-b border-gray-200";

  const inputClasses = isDark
    ? "bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
    : "bg-white text-gray-900 border border-gray-300 placeholder-gray-600 shadow-sm";

  const buttonClasses = isDark
    ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:opacity-90"
    : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:opacity-90";

  return (
    <div
      className={`flex justify-center p-4 backdrop-blur-md ${containerClass} transition-all duration-700`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 items-center w-full max-w-xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search symbol (e.g. BTCUSDT, AAPL, EURUSD)"
          className={`flex-1 px-4 py-2.5 rounded-lg ${inputClasses} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300`}
        />
        <button
          type="submit"
          className={`px-5 py-2.5 rounded-lg font-semibold ${buttonClasses} transition-all duration-300 transform hover:scale-105`}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
