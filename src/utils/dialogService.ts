import React from 'react';
import { createRoot } from 'react-dom/client';
// 修改导入方式
import { Dialog, DialogType } from '../components/Dialog/Dialog';

interface DialogOptions {
  title?: React.ReactNode;
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

class DialogService {
  /**
   * 打开对话框
   * @param options 对话框选项
   */
  open(options: DialogOptions): { close: () => void } {
    const div = document.createElement('div');
    document.body.appendChild(div);
    
    const root = createRoot(div);
    let visible = true;
    
    const close = () => {
      visible = false;
      render();
      setTimeout(() => {
        root.unmount();
        document.body.removeChild(div);
      }, 300);
    };
    
    const onOk = () => {
      if (options.onOk) {
        options.onOk();
      }
      close();
    };
    
    const onCancel = () => {
      if (options.onCancel) {
        options.onCancel();
      }
      close();
    };
    
    // 修改渲染方法，使用正确的 JSX 语法
    const render = () => {
      root.render(
        React.createElement(Dialog, {
          visible: visible,
          title: options.title || '提示',
          content: options.content,
          type: options.type || 'info',
          okText: options.okText,
          cancelText: options.cancelText,
          onOk: onOk,
          onCancel: onCancel,
          width: options.width,
          centered: options.centered,
          maskClosable: options.maskClosable,
          footer: options.footer,
          closable: options.closable
        })
      );
    };
    
    render();
    
    return { close };
  }
  
  /**
   * 显示信息对话框
   * @param content 内容
   * @param title 标题
   * @param options 其他选项
   */
  info(content: React.ReactNode, title: React.ReactNode = '信息', options?: Omit<DialogOptions, 'content' | 'title' | 'type'>) {
    return this.open({
      content,
      title,
      type: 'info',
      ...options
    });
  }
  
  /**
   * 显示成功对话框
   * @param content 内容
   * @param title 标题
   * @param options 其他选项
   */
  success(content: React.ReactNode, title: React.ReactNode = '成功', options?: Omit<DialogOptions, 'content' | 'title' | 'type'>) {
    return this.open({
      content,
      title,
      type: 'success',
      ...options
    });
  }
  
  /**
   * 显示警告对话框
   * @param content 内容
   * @param title 标题
   * @param options 其他选项
   */
  warning(content: React.ReactNode, title: React.ReactNode = '警告', options?: Omit<DialogOptions, 'content' | 'title' | 'type'>) {
    return this.open({
      content,
      title,
      type: 'warning',
      ...options
    });
  }
  
  /**
   * 显示错误对话框
   * @param content 内容
   * @param title 标题
   * @param options 其他选项
   */
  error(content: React.ReactNode, title: React.ReactNode = '错误', options?: Omit<DialogOptions, 'content' | 'title' | 'type'>) {
    return this.open({
      content,
      title,
      type: 'error',
      ...options
    });
  }
  
  /**
   * 显示确认对话框
   * @param content 内容
   * @param title 标题
   * @param options 其他选项
   */
  confirm(content: React.ReactNode, title: React.ReactNode = '确认', options?: Omit<DialogOptions, 'content' | 'title' | 'type'>) {
    return this.open({
      content,
      title,
      type: 'confirm',
      ...options
    });
  }
}

export const dialogService = new DialogService();