import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeSelector } from '../ThemeSelector/ThemeSelector';
import './Header.scss';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarCollapsed }) => {
  const { theme } = useTheme();
  // 移除 showUserMenu 状态，我们将使用 CSS 悬停效果代替
  
  return (
    <header className="main-header">
      <div className="header-left">
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          <i className={`icon-${sidebarCollapsed ? 'menu' : 'chevron-left'}`}></i>
        </button>
        <div className="search-bar">
          <i className="icon-search"></i>
          <input type="text" placeholder="搜索..." />
        </div>
      </div>
      
      <div className="header-right">
        <div className="header-actions">
          <ThemeSelector label="主题" />
          
          <button className="action-button">
            <i className="icon-bell"></i>
            <span className="badge">3</span>
          </button>
          
          <div className="user-profile">
            <div className="avatar">
              <img src="/assets/avatar.png" alt="用户头像" onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="%23ffffff"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
              }} />
            </div>
            <div className="user-info">
              <span className="user-name">管理员</span>
              <span className="user-role">系统管理员</span>
            </div>
            <i className="icon-chevron-down"></i>
            
            {/* 移除条件渲染，始终渲染下拉菜单，通过CSS控制显示/隐藏 */}
            <div className="user-dropdown">
              <ul>
                <li><i className="icon-user"></i> 个人资料</li>
                <li><i className="icon-settings"></i> 账户设置</li>
                <li className="divider"></li>
                <li><i className="icon-log-out"></i> 退出登录</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};