import React, { createContext, useContext, useState, useEffect } from 'react';

// Define theme config interface
export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
  };
  gradients: {
    primary: string;
    secondary: string;
  };
}

// Predefined themes
export const themes: Record<string, ThemeConfig> = {
  blue: {
    id: 'blue',
    name: '深蓝科技',
    colors: {
      primary: '#3b82f6',
      secondary: '#10b981',
      background: '#050b1f',
      cardBackground: 'rgba(13, 18, 38, 0.8)',
      textPrimary: 'rgba(255, 255, 255, 0.8)',
      textSecondary: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 255, 255, 0.1)'
    },
    gradients: {
      primary: 'linear-gradient(90deg, #3b82f6, #10b981)',
      secondary: 'linear-gradient(135deg, #3b82f6, #10b981)'
    }
  },
  purple: {
    id: 'purple',
    name: '紫罗兰',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      background: '#0f0720',
      cardBackground: 'rgba(25, 15, 50, 0.8)',
      textPrimary: 'rgba(255, 255, 255, 0.8)',
      textSecondary: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 255, 255, 0.1)'
    },
    gradients: {
      primary: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
      secondary: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
    }
  },
  green: {
    id: 'green',
    name: '翡翠绿',
    colors: {
      primary: '#10b981',
      secondary: '#3b82f6',
      background: '#071a12',
      cardBackground: 'rgba(15, 40, 30, 0.8)',
      textPrimary: 'rgba(255, 255, 255, 0.8)',
      textSecondary: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 255, 255, 0.1)'
    },
    gradients: {
      primary: 'linear-gradient(90deg, #10b981, #3b82f6)',
      secondary: 'linear-gradient(135deg, #10b981, #3b82f6)'
    }
  },
  dark: {
    id: 'dark',
    name: '暗夜',
    colors: {
      primary: '#6b7280',
      secondary: '#4b5563',
      background: '#111827',
      cardBackground: 'rgba(30, 41, 59, 0.8)',
      textPrimary: 'rgba(255, 255, 255, 0.8)',
      textSecondary: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 255, 255, 0.1)'
    },
    gradients: {
      primary: 'linear-gradient(90deg, #6b7280, #4b5563)',
      secondary: 'linear-gradient(135deg, #6b7280, #4b5563)'
    }
  }
};

// Default theme
export const defaultTheme = themes.blue;

// Create theme context
interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  availableThemes: Object.values(themes)
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get theme from config, or use default theme
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  
  // Load theme from config
  useEffect(() => {
    // Import config dynamically to avoid circular dependencies
    import('../config').then(config => {
      if (config.default.theme) {
        setTheme(config.default.theme);
      }
    });
  }, []);

  // Apply theme to document root element
  useEffect(() => {
    const root = document.documentElement;
    
    // Set CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });
    
    // Set theme ID as body class
    document.body.className = `theme-${theme.id}`;
    
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      availableThemes: Object.values(themes) 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};