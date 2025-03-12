import React from 'react';
import { Button, Space } from 'antd';
import { httpService, messageService, dialogService } from '../utils/services';

const ServicesExample: React.FC = () => {
  // 消息提示示例
  const showMessage = () => {
    messageService.success('操作成功完成');
  };
  
  const showErrorMessage = () => {
    messageService.error('操作失败，请重试');
  };
  
  const showWarningMessage = () => {
    messageService.warning('请注意，此操作不可逆');
  };
  
  // 通知示例
  const showNotification = () => {
    messageService.successNotification('操作成功', {
      description: '您的更改已成功保存到系统中'
    });
  };
  
  // 对话框示例
  const showInfoDialog = () => {
    dialogService.info('这是一条重要信息，请仔细阅读。');
  };
  
  const showConfirmDialog = () => {
    dialogService.confirm('确定要删除这条记录吗？此操作不可撤销。', '删除确认', {
      onOk: () => {
        messageService.success('记录已删除');
      }
    });
  };
  
  // API 请求示例
  const fetchData = async () => {
    try {
      messageService.loading('正在加载数据...');
      const data = await httpService.get('/api/example');
      messageService.success('数据加载成功');
      console.log(data);
    } catch (error) {
      // 错误已由 httpService 处理
      console.error(error);
    }
  };
  
  return (
    <div className="services-example">
      <h2>消息服务示例</h2>
      <Space>
        <Button type="primary" onClick={showMessage}>成功消息</Button>
        <Button danger onClick={showErrorMessage}>错误消息</Button>
        <Button onClick={showWarningMessage}>警告消息</Button>
        <Button onClick={showNotification}>成功通知</Button>
      </Space>
      
      <h2 style={{ marginTop: 20 }}>对话框示例</h2>
      <Space>
        <Button onClick={showInfoDialog}>信息对话框</Button>
        <Button danger onClick={showConfirmDialog}>确认对话框</Button>
      </Space>
      
      <h2 style={{ marginTop: 20 }}>API 请求示例</h2>
      <Button type="primary" onClick={fetchData}>加载数据</Button>
    </div>
  );
};

export default ServicesExample;