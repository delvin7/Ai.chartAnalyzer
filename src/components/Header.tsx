import React from 'react';
import { LineChart, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className={`
        sticky top-0 z-40 border-b shadow-md transition-all duration-500
        ${isDark
          ? 'bg-gradient-to-r from-gray-950 via-slate-900 to-indigo-950 border-gray-800'
          : 'bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 border-gray-200'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-3">
          <LineChart className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
          <h1 className="text-2xl font-bold">
            Smart<span className="text-indigo-500">Chart</span> AI
          </h1>
        </div>

        {/* Right: Theme Toggle + Sign In */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 shadow-md ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700'
                : 'bg-white hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>

          <button
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg
              ${isDark
                ? 'bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 hover:opacity-90 text-white'
                : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white'
              }
            `}
          >
            <User className="w-4 h-4" /> Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
