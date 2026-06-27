import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default dark mode
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Theme colors
  const theme = {
    dark: {
      bg: 'rgba(8, 44, 94, 0.92)',
      pageBg: '#082c5e',
      cardBg: 'rgba(255, 255, 255, 0.05)',
      text: '#f1dcc1',
      brand: '#f9d28d',
      accent: '#098a8b',
      border: 'rgba(249, 210, 141, 0.2)',
      hover: 'rgba(9, 138, 139, 0.1)',
      inputBg: 'rgba(255, 255, 255, 0.08)',
    },
    light: {
      bg: '#ffffff',
      pageBg: '#f5f7fa',
      cardBg: '#ffffff',
      text: '#082c5e',
      brand: '#098a8b',
      accent: '#f9d28d',
      border: 'rgba(8, 44, 94, 0.1)',
      hover: 'rgba(249, 210, 141, 0.2)',
      inputBg: '#f8f9fa',
    }
  };

  const colors = isDarkMode ? theme.dark : theme.light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};