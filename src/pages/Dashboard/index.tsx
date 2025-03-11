import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout/Layout';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Layout>
      <div className="dashboard-container">
        <h1 className="page-title">仪表盘</h1>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>加载中...</p>
          </div>
        ) : (
          <div className="dashboard-content">
            <div className="dashboard-card">
              <h2>欢迎使用 Matrix Admin</h2>
              <p>这是一个响应式管理系统模板，您可以根据需要自定义内容。</p>
            </div>
            
            <div className="dashboard-card">
              <h2>系统概览</h2>
              <p>在这里您可以查看系统的各项指标和数据统计。</p>
            </div>
            
            <div className="dashboard-card">
              <h2>最近活动</h2>
              <p>显示系统中的最新活动和操作记录。</p>
            </div>
            
            <div className="dashboard-card">
              <h2>快速操作</h2>
              <p>提供常用功能的快速访问入口。</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;