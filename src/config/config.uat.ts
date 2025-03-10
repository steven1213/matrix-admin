import { themes } from './themes';

// UAT环境配置
const config = {
  apiBaseUrl: 'https://uat-api.example.com',
  defaultLanguage: 'zh',
  theme: themes.purple, // UAT环境使用紫色主题
  supportedLanguages: [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' }
  ],
  // 其他UAT环境特定配置
};

export default config;