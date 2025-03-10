// 本地环境配置示例（复制为config.local.ts使用）
const config = {
  apiBaseUrl: 'http://localhost:3001',
  defaultLanguage: 'zh',
  supportedLanguages: [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ],
  // 其他本地环境特定配置
};

export default config;