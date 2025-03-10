// 环境配置管理
import devConfig from './config.dev';
import uatConfig from './config.uat';
import prodConfig from './config.prod';

// 尝试导入本地配置（如果存在）
let localConfig = {};
try {
  // 使用require而不是import，因为本地配置文件可能不存在
  localConfig = require('./config.local').default;
} catch (e) {
  console.log('未找到本地配置文件，使用默认环境配置');
}

// 确定当前环境
const ENV = process.env.REACT_APP_ENV || 'local';

// 根据环境选择配置
const envConfigs: Record<string, any> = {
  dev: devConfig,
  uat: uatConfig,
  prod: prodConfig,
  local: { ...devConfig, ...localConfig } // 本地环境基于开发环境配置，并覆盖本地特定配置
};

// 导出当前环境的配置
const config = envConfigs[ENV] || envConfigs.local;

export default config;