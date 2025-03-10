import { themes } from '../contexts/ThemeContext';

// 生产环境配置
const config = {
  apiBaseUrl: 'https://api.example.com',
  defaultLanguage: 'zh',
  theme: themes.green, // 生产环境使用绿色主题
  supportedLanguages: [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' }
  ],
  // 其他生产环境特定配置
};

export default config;