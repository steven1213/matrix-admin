import { message, notification, Modal } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

// 消息类型
export type MessageType = 'success' | 'error' | 'info' | 'warning' | 'loading';

// 通知位置
export type NotificationPosition = NotificationPlacement;

// 基础消息配置
interface MessageOptions {
  duration?: number;
  key?: string;
}

// 通知配置
interface NotificationOptions extends MessageOptions {
  placement?: NotificationPosition;
  description?: React.ReactNode;
  btn?: React.ReactNode;
  onClick?: () => void;
}

// 确认框配置
interface ConfirmOptions {
  title?: React.ReactNode;
  content?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  centered?: boolean;
  width?: number;
  maskClosable?: boolean;
}

/**
 * 消息服务
 */
class MessageService {
  /**
   * 显示消息提示
   * @param type 消息类型
   * @param content 消息内容
   * @param options 配置选项
   */
  showMessage(type: MessageType, content: React.ReactNode, options: MessageOptions = {}) {
    const { duration = 3, key } = options;
    message[type]({ content, duration, key });
  }

  /**
   * 显示通知
   * @param type 通知类型
   * @param title 通知标题
   * @param options 配置选项
   */
  showNotification(
    type: Exclude<MessageType, 'loading'>,
    title: React.ReactNode,
    options: NotificationOptions = {}
  ) {
    const { duration = 4.5, placement = 'topRight', description, btn, onClick, key } = options;
    notification[type]({
      message: title,
      description,
      placement,
      duration,
      btn,
      onClick,
      key,
    });
  }

  /**
   * 显示确认对话框
   * @param options 配置选项
   */
  showConfirm(options: ConfirmOptions = {}) {
    const {
      title = '确认',
      content = '确定要执行此操作吗？',
      okText = '确定',
      cancelText = '取消',
      onOk,
      onCancel,
      centered = true,
      width = 420,
      maskClosable = false,
    } = options;

    return Modal.confirm({
      title,
      content,
      okText,
      cancelText,
      onOk,
      onCancel,
      centered,
      width,
      maskClosable,
    });
  }

  /**
   * 显示成功消息
   * @param content 消息内容
   * @param options 配置选项
   */
  success(content: React.ReactNode, options?: MessageOptions) {
    this.showMessage('success', content, options);
  }

  /**
   * 显示错误消息
   * @param content 消息内容
   * @param options 配置选项
   */
  error(content: React.ReactNode, options?: MessageOptions) {
    this.showMessage('error', content, options);
  }

  /**
   * 显示警告消息
   * @param content 消息内容
   * @param options 配置选项
   */
  warning(content: React.ReactNode, options?: MessageOptions) {
    this.showMessage('warning', content, options);
  }

  /**
   * 显示信息消息
   * @param content 消息内容
   * @param options 配置选项
   */
  info(content: React.ReactNode, options?: MessageOptions) {
    this.showMessage('info', content, options);
  }

  /**
   * 显示加载消息
   * @param content 消息内容
   * @param options 配置选项
   */
  loading(content: React.ReactNode, options?: MessageOptions) {
    this.showMessage('loading', content, options);
  }

  /**
   * 显示成功通知
   * @param title 通知标题
   * @param options 配置选项
   */
  successNotification(title: React.ReactNode, options?: NotificationOptions) {
    this.showNotification('success', title, options);
  }

  /**
   * 显示错误通知
   * @param title 通知标题
   * @param options 配置选项
   */
  errorNotification(title: React.ReactNode, options?: NotificationOptions) {
    this.showNotification('error', title, options);
  }

  /**
   * 显示警告通知
   * @param title 通知标题
   * @param options 配置选项
   */
  warningNotification(title: React.ReactNode, options?: NotificationOptions) {
    this.showNotification('warning', title, options);
  }

  /**
   * 显示信息通知
   * @param title 通知标题
   * @param options 配置选项
   */
  infoNotification(title: React.ReactNode, options?: NotificationOptions) {
    this.showNotification('info', title, options);
  }
}

// 导出消息服务实例
export const messageService = new MessageService();