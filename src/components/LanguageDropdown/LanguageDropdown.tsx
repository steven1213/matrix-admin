import React, { useState, useRef, useEffect } from 'react';
import './LanguageDropdown.scss';

export interface Language {
  code: string;
  name: string;
}

interface LanguageDropdownProps {
  languages: Language[];
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  languages,
  currentLanguage,
  onLanguageChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (code: string) => {
    onLanguageChange(code);
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
    <div className="language-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <span className="globe-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </span>
        <span className="selected-language">{currentLang.name}</span>
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
        <div className="dropdown-menu">
          {languages.map(language => (
            <button
              key={language.code}
              className={`dropdown-item ${language.code === currentLanguage ? 'active' : ''}`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};