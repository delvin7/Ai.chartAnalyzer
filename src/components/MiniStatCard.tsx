import React from "react";
import { useTheme } from "../context/ThemeContext";

interface MiniStatCardProps {
  title: string;
  value: number | string | null | undefined;
  type?: "price" | "change" | "cap" | "volume" | "default";
}

const MiniStatCard: React.FC<MiniStatCardProps> = ({ title, value, type = "default" }) => {
  const { isDark } = useTheme();

  const formatValue = () => {
    if (value === null || value === undefined) return "Loading...";
    const numValue = typeof value === "string" && !isNaN(Number(value)) ? Number(value) : value;

    if (type === "price") return `$${Number(numValue).toFixed(2)}`;
    if (type === "change") {
      const val = Number(numValue);
      return `${val >= 0 ? "+" : ""}${val.toFixed(2)}%`;
    }
    if (type === "cap") return value === "N/A" ? "N/A" : `$${Number(numValue).toFixed(2)}B`;
    if (type === "volume") return value === "N/A" ? "N/A" : `$${Number(numValue).toFixed(2)}M`;
    return String(value);
  };

  const getColorClasses = () => {
    const val = Number(value);
    if (type === "change") {
      return val >= 0
        ? "text-green-500 dark:text-green-400"
        : "text-red-500 dark:text-red-400";
    }
    return "text-gray-900 dark:text-white";
  };

  return (
    <div
      className={`
        rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 border backdrop-blur-sm
        ${isDark
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 border-gray-700"
          : "bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 border-gray-200"
        }
      `}
    >
      <h3
        className={`text-sm font-semibold mb-2 ${
          isDark ? "text-gray-100" : "text-gray-700"
        }`}
      >
        {title}
      </h3>
      <p className={`text-xl font-bold ${getColorClasses()}`}>{formatValue()}</p>
    </div>
  );
};

export default MiniStatCard;
