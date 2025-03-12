import React from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined, InfoCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './Dialog.scss';

export type DialogType = 'info' | 'success' | 'warning' | 'error' | 'confirm';

// 明确定义 Dialog 组件的 props 接口
export interface DialogProps {
  visible: boolean;
  title: React.ReactNode;
  content: React.ReactNode;
  type?: DialogType;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  width?: number;
  centered?: boolean;
  maskClosable?: boolean;
  footer?: React.ReactNode;
  closable?: boolean;
}

// 导出 Dialog 组件
export const Dialog: React.FC<DialogProps> = ({
  visible,
  title,
  content,
  type = 'info',
  okText = '确定',
  cancelText = '取消',
  onOk,
  onCancel,
  width = 420,
  centered = true,
  maskClosable = false,
  footer,
  closable = true,
}) => {
  // 根据类型获取图标
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlined className="dialog-icon success" />;
      case 'warning':
        return <ExclamationCircleOutlined className="dialog-icon warning" />;
      case 'error':
        return <CloseCircleOutlined className="dialog-icon error" />;
      case 'confirm':
        return <ExclamationCircleOutlined className="dialog-icon warning" />;
      case 'info':
      default:
        return <InfoCircleOutlined className="dialog-icon info" />;
    }
  };

  // 默认页脚
  const defaultFooter = (
    <Space>
      {type === 'confirm' && (
        <Button onClick={onCancel}>{cancelText}</Button>
      )}
      <Button type="primary" onClick={onOk}>
        {okText}
      </Button>
    </Space>
  );

  return (
    <Modal
      open={visible}
      title={
        <div className="dialog-title">
          {getIcon()}
          <span>{title}</span>
        </div>
      }
      onOk={onOk}
      onCancel={onCancel}
      footer={footer === undefined ? defaultFooter : footer}
      width={width}
      centered={centered}
      maskClosable={maskClosable} // 确保这个属性被正确传递给 Modal
      closable={closable}
      className={`custom-dialog ${type}-dialog`}
    >
      <div className="dialog-content">{content}</div>
    </Modal>
  );
};