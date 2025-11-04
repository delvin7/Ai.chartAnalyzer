import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { Sun, Moon } from 'lucide-react'; // Exporting icons needed by components

// =================================================================
// --- THEME CONTEXT ---
// =================================================================

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to 'dark' for the trading application aesthetic
  const [theme, setTheme] = useState<Theme>('light'); 

  // Apply the 'dark' class to the html element for Tailwind to recognize the theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const isDark = theme === 'dark';

  const value = useMemo(() => ({ theme, isDark, toggleTheme }), [theme, isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export { Sun, Moon }; // Exporting icons used by Header for convenience
