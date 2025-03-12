import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { messageService } from './messageService';

// 创建 axios 实例
const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从本地存储获取 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果响应包含自定义成功消息，显示它
    if (response.data && response.data.message) {
      messageService.success(response.data.message);
    }
    return response;
  },
  (error: AxiosError) => {
    // 处理错误响应
    handleHttpError(error);
    return Promise.reject(error);
  }
);

/**
 * 处理 HTTP 错误
 * @param error Axios 错误对象
 */
const handleHttpError = (error: AxiosError) => {
  if (error.response) {
    // 服务器返回了错误状态码
    const { status } = error.response;
    
    // 将 data 明确类型化为包含可选 message 属性的对象
    const data = error.response.data as { message?: string };
    
    // 处理不同的状态码
    switch (status) {
      case 400:
        messageService.error(data.message || '请求参数错误');
        break;
      case 401:
        messageService.error('登录已过期，请重新登录');
        // 可以在这里处理登出逻辑
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
        break;
      case 403:
        messageService.error('没有权限执行此操作');
        break;
      case 404:
        messageService.error('请求的资源不存在');
        break;
      case 500:
        messageService.error('服务器内部错误');
        break;
      default:
        messageService.error(`请求失败 (${status}): ${data.message || '未知错误'}`);
    }
  } else if (error.request) {
    // 请求已发送但没有收到响应
    messageService.error('服务器无响应，请检查网络连接');
  } else {
    // 请求配置出错
    messageService.error(`请求错误: ${error.message}`);
  }
};

/**
 * HTTP 服务类
 */
class HttpService {
  /**
   * 发送 GET 请求
   * @param url 请求 URL
   * @param params 查询参数
   * @param config Axios 配置
   */
  async get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await http.get<T>(url, { params, ...config });
    return response.data;
  }

  /**
   * 发送 POST 请求
   * @param url 请求 URL
   * @param data 请求体数据
   * @param config Axios 配置
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await http.post<T>(url, data, config);
    return response.data;
  }

  /**
   * 发送 PUT 请求
   * @param url 请求 URL
   * @param data 请求体数据
   * @param config Axios 配置
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await http.put<T>(url, data, config);
    return response.data;
  }

  /**
   * 发送 DELETE 请求
   * @param url 请求 URL
   * @param config Axios 配置
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await http.delete<T>(url, config);
    return response.data;
  }

  /**
   * 发送 PATCH 请求
   * @param url 请求 URL
   * @param data 请求体数据
   * @param config Axios 配置
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await http.patch<T>(url, data, config);
    return response.data;
  }
}

// 导出 HTTP 服务实例
export const httpService = new HttpService();