import { ThemeMode, ThemeConfig } from '../contexts/ThemeContext';

// 扩展主题类型
export type ExtendedThemeMode = ThemeMode | 'blue' | 'green' | 'purple' | 'orange';

// 扩展主题配置
export interface ExtendedThemeConfig extends ThemeConfig {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

// 导出扩展的主题配置对象
export const themes: Record<ExtendedThemeMode, ExtendedThemeConfig> = {
  // 基础主题
  light: { mode: 'light' },
  dark: { mode: 'dark' },
  system: { mode: 'system' },
  
  // 扩展颜色主题
  blue: { 
    mode: 'light', 
    primaryColor: '#4a6cf7',
    secondaryColor: '#6c757d',
    accentColor: '#3b82f6'
  },
  green: { 
    mode: 'light', 
    primaryColor: '#10b981',
    secondaryColor: '#6c757d',
    accentColor: '#059669'
  },
  purple: { 
    mode: 'light', 
    primaryColor: '#8b5cf6',
    secondaryColor: '#6c757d',
    accentColor: '#7c3aed'
  },
  orange: { 
    mode: 'light', 
    primaryColor: '#f97316',
    secondaryColor: '#6c757d',
    accentColor: '#ea580c'
  }
};