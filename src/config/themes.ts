// 定义主题配置接口
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

// 预定义主题配置
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

// 默认主题
export const defaultTheme = themes.blue;