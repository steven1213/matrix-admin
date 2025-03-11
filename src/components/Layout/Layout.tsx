import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState<string[]>(['仪表盘']);
  
  // 监听窗口大小变化，在小屏幕上自动折叠侧边栏
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化时执行一次
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  const handleMenuClick = (path: string[]) => {
    setCurrentPath(path);
  };
  
  return (
    <div className="layout">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onMenuClick={handleMenuClick}
      />
      
      <div className={`content-area ${sidebarCollapsed ? 'expanded' : ''}`}>
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="main-content">
          <Breadcrumb path={currentPath} />
          <div className="page-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};