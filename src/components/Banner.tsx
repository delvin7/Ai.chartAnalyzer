import React from "react";
import { useTheme } from "../context/ThemeContext";

const Banner: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg mb-10 px-6 sm:px-10 py-10 text-center transition-all duration-700 ${
        isDark
          ? "bg-gradient-to-br from-slate-800/70 via-gray-900/80 to-slate-800/70 text-white"
          : "bg-gradient-to-br from-white/70 via-indigo-50/70 to-purple-50/70 text-gray-900"
      }`}
    >
      {/* 🌈 Subtle background light wave */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(99,102,241,0.25),transparent_70%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.25),transparent_70%)] blur-2xl"></div>

      {/* ✨ Banner Content */}
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          SmartChart AI
        </h1>
        <p
          className={`mt-3 text-base sm:text-lg ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Your intelligent trading companion — analyze, predict, and plan every move
          with clarity and confidence.
        </p>

        {/* 🚀 Accent Line */}
        <div className="mt-6 mx-auto w-32 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-flow"></div>
      </div>
    </div>
  );
};

export default Banner;
