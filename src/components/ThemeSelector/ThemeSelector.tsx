import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeSelector.scss';

interface ThemeSelectorProps {
  label?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ label = '主题' }) => {
  const { theme, setTheme } = useTheme();
  
  const themes = [
    { id: 'light', name: '浅色', icon: 'sun' },
    { id: 'dark', name: '深色', icon: 'moon' },
    { id: 'system', name: '跟随系统', icon: 'monitor' }
  ];
  
  // Helper function to get the current theme mode
  const getThemeMode = () => {
    if (typeof theme === 'string') {
      return theme;
    } else if (typeof theme === 'object' && theme !== null && 'mode' in theme) {
      return theme.mode;
    }
    return 'light'; // Default fallback
  };
  
  const currentTheme = getThemeMode();
  
  return (
    <div className="theme-selector">
      <button className="theme-button">
        <i className={`icon-${currentTheme === 'dark' ? 'moon' : 'sun'}`}></i>
        {label && <span className="theme-label">{label}</span>}
      </button>
      
      <div className="theme-dropdown">
        <ul>
          {themes.map(item => (
            <li 
              key={item.id} 
              className={currentTheme === item.id ? 'active' : ''}
              onClick={() => setTheme(item.id as any)}
            >
              <i className={`icon-${item.icon}`}></i>
              <span>{item.name}</span>
              {currentTheme === item.id && <i className="icon-check"></i>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};