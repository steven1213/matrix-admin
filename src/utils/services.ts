import { httpService } from './httpService';
import { messageService } from './messageService';
import { dialogService } from './dialogService';

export { httpService } from './httpService';
export { messageService } from './messageService';
export { dialogService } from './dialogService';

// 统一导出所有服务
const services = {
  http: httpService,
  message: messageService,
  dialog: dialogService
};

export default services;