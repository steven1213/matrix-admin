import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/index';
import { ThemeProvider } from './contexts/ThemeContext';

// 受保护的路由组件
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // 检查用户是否已登录
  const isLoggedIn = localStorage.getItem('user') ? 
    JSON.parse(localStorage.getItem('user') || '{}').isLoggedIn : false;
  
  if (!isLoggedIn) {
    // 如果未登录，重定向到登录页
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          {/* 默认路由 - 重定向到仪表盘或登录页 */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {/* 404页面 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;