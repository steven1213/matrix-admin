import { themes } from '../config/themes';

// Development environment config
const config = {
  env: 'development',
  apiBaseUrl: 'https://dev-api.example.com',
  defaultLanguage: 'zh',
  theme: themes.blue, // Development uses blue theme
  supportedLanguages: [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' }
  ],
  // Other development-specific config
};

export default config;