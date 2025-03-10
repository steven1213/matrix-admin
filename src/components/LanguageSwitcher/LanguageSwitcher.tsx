import React from 'react';
import './LanguageSwitcher.scss';

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  languages: { code: string; name: string }[];
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  currentLanguage, 
  onLanguageChange,
  languages
}) => {
  return (
    <div className="language-switcher">
      {languages.map(lang => (
        <button
          key={lang.code}
          className={`language-btn ${currentLanguage === lang.code ? 'active' : ''}`}
          onClick={() => onLanguageChange(lang.code)}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};