import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeConfig } from '../../contexts/ThemeContext';
import './ThemeSelector.scss';

interface ThemeSelectorProps {
  label: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ label }) => {
  const { theme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeSelect = (selectedTheme: ThemeConfig) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="theme-selector" ref={dropdownRef}>
      <button className="theme-toggle" onClick={toggleDropdown}>
        <span className="theme-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
          </svg>
        </span>
        <span className="selected-theme">{label}</span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`} 
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path d="M7 10l5 5 5-5z" fill="currentColor" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="theme-menu">
          {availableThemes.map(themeOption => (
            <button
              key={themeOption.id}
              className={`theme-item ${themeOption.id === theme.id ? 'active' : ''}`}
              onClick={() => handleThemeSelect(themeOption)}
            >
              <span 
                className="theme-color" 
                style={{ 
                  background: themeOption.gradients.primary 
                }}
              ></span>
              <span className="theme-name">{themeOption.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};