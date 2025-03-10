import React, { useState } from 'react';
import './LoginForm.scss';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  isLoading: boolean;
  labels?: {
    username: string;
    password: string;
    rememberMe: string;
    forgotPassword: string;
    loginButton: string;
  };
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  isLoading,
  labels = {
    username: '用户名',
    password: '密码',
    rememberMe: '记住我',
    forgotPassword: '忘记密码?',
    loginButton: '登 录'
  }
}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onSubmit(username, password);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">
          <span className="label-text">{labels.username}</span>
          <div className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={labels.username}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">
          <span className="label-text">{labels.password}</span>
          <div className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={labels.password}
          required
        />
      </div>

      <div className="form-options">
        <div className="remember-me">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="checkmark"></span>
            <span className="checkbox-text">{labels.rememberMe}</span>
          </label>
        </div>
        <a href="#" className="forgot-password">{labels.forgotPassword}</a>
      </div>

      <button 
        type="submit" 
        className={`login-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : labels.loginButton}
      </button>
    </form>
  );
};