import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './Sidebar.scss';

// 菜单项接口
interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  children?: MenuItem[];
}

interface SidebarProps {
  collapsed: boolean;
  onMenuClick: (path: string[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onMenuClick }) => {
  const { theme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  
  // 示例菜单数据
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: '仪表盘',
      icon: 'dashboard',
      path: '/dashboard'
    },
    {
      id: 'analytics',
      title: '数据分析',
      icon: 'chart-line',
      path: '/analytics',
      children: [
        {
          id: 'reports',
          title: '报表中心',
          icon: 'file-chart',
          path: '/analytics/reports'
        },
        {
          id: 'statistics',
          title: '统计数据',
          icon: 'chart-bar',
          path: '/analytics/statistics'
        }
      ]
    },
    {
      id: 'users',
      title: '用户管理',
      icon: 'users',
      path: '/users'
    },
    {
      id: 'settings',
      title: '系统设置',
      icon: 'cog',
      path: '/settings',
      children: [
        {
          id: 'profile',
          title: '个人资料',
          icon: 'user',
          path: '/settings/profile'
        },
        {
          id: 'security',
          title: '安全设置',
          icon: 'shield',
          path: '/settings/security'
        },
        {
          id: 'preferences',
          title: '偏好设置',
          icon: 'sliders',
          path: '/settings/preferences'
        }
      ]
    }
  ];
  
  const toggleSubMenu = (menuId: string) => {
    if (expandedMenus.includes(menuId)) {
      setExpandedMenus(expandedMenus.filter(id => id !== menuId));
    } else {
      setExpandedMenus([...expandedMenus, menuId]);
    }
  };
  
  const handleMenuClick = (menu: MenuItem, parentTitles: string[] = []) => {
    setActiveMenu(menu.id);
    const path = [...parentTitles, menu.title];
    onMenuClick(path);
  };
  
  const renderMenuItems = (items: MenuItem[], parentTitles: string[] = []) => {
    return items.map(item => (
      <div key={item.id} className="menu-item-container">
        <div 
          className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
          onClick={() => {
            if (item.children && item.children.length > 0) {
              toggleSubMenu(item.id);
            } else {
              handleMenuClick(item, parentTitles);
            }
          }}
        >
          <div className="menu-icon">
            <i className={`icon-${item.icon}`}></i>
          </div>
          {!collapsed && (
            <>
              <div className="menu-title">{item.title}</div>
              {item.children && item.children.length > 0 && (
                <div className={`menu-arrow ${expandedMenus.includes(item.id) ? 'expanded' : ''}`}>
                  <i className="icon-chevron-down"></i>
                </div>
              )}
            </>
          )}
        </div>
        
        {item.children && item.children.length > 0 && expandedMenus.includes(item.id) && !collapsed && (
          <div className="submenu">
            {renderMenuItems(item.children, [...parentTitles, item.title])}
          </div>
        )}
      </div>
    ));
  };
  
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-circle"></div>
          {!collapsed && <h1>MATRIX<span>ADMIN</span></h1>}
        </div>
      </div>
      
      <div className="sidebar-menu">
        {renderMenuItems(menuItems)}
      </div>
      
      <div className="sidebar-footer">
        {!collapsed && <p>© 2023 Matrix Admin</p>}
      </div>
    </div>
  );
};