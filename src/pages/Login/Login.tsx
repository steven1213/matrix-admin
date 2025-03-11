import React, { useState, useEffect } from 'react';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { ParticleBackground } from '../../components/ParticleBackground/ParticleBackground';
import { LanguageDropdown, Language } from '../../components/LanguageDropdown/LanguageDropdown';
import { ThemeSelector } from '../../components/ThemeSelector/ThemeSelector';
import { useTheme } from '../../contexts/ThemeContext';
import { themes } from '../../config/themes';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './Login.scss';
import { ThemeMode } from '../../contexts/ThemeContext';

// 定义登录组件的属性接口
interface LoginProps {
  onLogin?: (username: string) => void;
}

// 定义多语言文本接口
interface Translations {
  title: string;
  tagline: string;
  username: string;
  password: string;
  rememberMe: string;
  forgotPassword: string;
  loginButton: string;
  copyright: string;
  themeSelector: string; // 添加主题选择器标签
}

// 默认语言包
const defaultTranslations: Record<string, Translations> = {
  zh: {
    title: 'MATRIX',
    tagline: '未来科技管理系统',
    username: '用户名',
    password: '密码',
    rememberMe: '记住我',
    forgotPassword: '忘记密码?',
    loginButton: '登 录',
    copyright: '© 2023 Matrix Admin System',
    themeSelector: '主题' // 添加主题选择器标签
  },
  en: {
    title: 'MATRIX',
    tagline: 'Future Tech Management System',
    username: 'Username',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    loginButton: 'LOGIN',
    copyright: '© 2023 Matrix Admin System',
    themeSelector: 'Theme' // 添加主题选择器标签
  }
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('zh');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [systemTitle, setSystemTitle] = useState<string | null>(null);
  const navigate = useNavigate(); // 添加导航钩子
  const [languages, setLanguages] = useState<Language[]>([
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' }
  ]);
  const [translations, setTranslations] = useState<Record<string, Translations>>(defaultTranslations);
  
  // 获取当前语言的文本
  const t = translations[language] || translations['zh'];
  
  // 从后端获取系统信息和支持的语言
  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        // 模拟 API 请求
        setTimeout(() => {
          // 模拟从后端获取的数据
          // 实际项目中应该替换为真实的 API 调用
          const mockResponse = {
            logo: null, // 如果有值，则使用后端返回的 logo
            title: null, // 如果有值，则使用后端返回的标题
            supportedLanguages: [
              { code: 'zh', name: '中文' },
              { code: 'en', name: 'English' },
              { code: 'ja', name: '日本語' },
              { code: 'ko', name: '한국어' }
            ],
            translations: {
              ...defaultTranslations,
              // 可以添加其他语言的翻译
              ja: {
                title: 'MATRIX',
                tagline: '未来技術管理システム',
                username: 'ユーザー名',
                password: 'パスワード',
                rememberMe: '記憶する',
                forgotPassword: 'パスワードをお忘れですか?',
                loginButton: 'ログイン',
                copyright: '© 2023 Matrix Admin System',
                themeSelector: 'テーマ' // 添加日语的主题选择器标签
              },
              ko: {
                title: 'MATRIX',
                tagline: '미래 기술 관리 시스템',
                username: '사용자 이름',
                password: '비밀번호',
                rememberMe: '기억하기',
                forgotPassword: '비밀번호를 잊으셨나요?',
                loginButton: '로그인',
                copyright: '© 2023 Matrix Admin System',
                themeSelector: '테마' // 添加韩语的主题选择器标签
              }
            }
          };
          
          // 更新状态
          setLogoUrl(mockResponse.logo);
          setSystemTitle(mockResponse.title);
          setLanguages(mockResponse.supportedLanguages);
          setTranslations({
            ...defaultTranslations,
            ...mockResponse.translations
          });
        }, 1000);
      } catch (error) {
        console.error('获取系统信息失败:', error);
      }
    };
    
    fetchSystemInfo();
  }, []);
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const handleSubmit = async (username: string, password: string) => {
    setIsLoading(true);
    
    // 对密码进行加密
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      'your-secret-key' // 在实际应用中，这个密钥应该从环境变量或配置中获取
    ).toString();
    
    // 模拟API调用，发送加密后的密码
    try {
      // 实际项目中，这里应该是真实的API调用
      // const response = await api.login(username, encryptedPassword);
      
      // 模拟API调用
      setTimeout(() => {
        setIsLoading(false);
        
        // 登录成功后保存用户信息到本地存储
        localStorage.setItem('user', JSON.stringify({ username, isLoggedIn: true }));
        
        // 调用父组件的onLogin回调（如果有）
        if (onLogin) {
          onLogin(username);
        }
        
        // 跳转到仪表盘页面
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      console.error('登录失败:', error);
      // 这里可以添加错误处理逻辑
    }
  };
  
  // 添加主题切换功能（可选）
  const handleThemeChange = (themeId: string) => {
    // 确保 themeId 是有效的 ThemeMode 类型
    if (themeId === 'light' || themeId === 'dark' || themeId === 'system') {
      setTheme(themeId as ThemeMode);
    }
  };

  return (
    <div className="login-container">
      <ParticleBackground />
      
      <div className="top-controls">
        <ThemeSelector label={t.themeSelector} />
        <LanguageDropdown 
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
          languages={languages}
        />
      </div>
      
      <div className="login-content">
        <div className="login-header">
          <div className="logo-container">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="custom-logo" />
            ) : (
              <div className="logo-circle"></div>
            )}
            <h1>{systemTitle || t.title}<span>ADMIN</span></h1>
          </div>
          <p className="tagline">{t.tagline}</p>
        </div>
        
        <LoginForm 
          onSubmit={handleSubmit} 
          isLoading={isLoading}
          labels={{
            username: t.username,
            password: t.password,
            rememberMe: t.rememberMe,
            forgotPassword: t.forgotPassword,
            loginButton: t.loginButton
          }}
        />
        
        <div className="login-footer">
          <div className="tech-line"></div>
          <p>{t.copyright}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;