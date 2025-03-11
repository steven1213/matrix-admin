import React, { createContext, useState, useContext, useEffect } from 'react';

// 定义主题类型
export type ThemeMode = 'light' | 'dark' | 'system';

// 定义主题配置接口
export interface ThemeConfig {
  mode: ThemeMode;
  // 可以添加其他主题相关配置
}

// 导出主题配置对象
export const themes: Record<ThemeMode, ThemeConfig> = {
  light: { mode: 'light' },
  dark: { mode: 'dark' },
  system: { mode: 'system' }
};

// 定义上下文接口
interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (mode: ThemeMode) => void;
}

// 创建上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 主题提供者组件
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 从本地存储获取主题设置，默认为系统主题
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    return themes[savedTheme || 'system'];
  });

  // 设置主题的函数
  const setTheme = (mode: ThemeMode) => {
    setThemeState(themes[mode]);
    localStorage.setItem('theme', mode);
  };

  // 应用主题到文档
  useEffect(() => {
    const applyTheme = () => {
      let currentMode = theme.mode;
      
      // 如果是系统主题，则检测系统偏好
      if (currentMode === 'system') {
        currentMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      // 应用主题类到 body
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${currentMode}-theme`);
    };

    applyTheme();

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme.mode === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 自定义钩子，用于在组件中访问主题
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};