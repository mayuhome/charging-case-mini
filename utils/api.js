// utils/api.js
import { GET, POST } from './request';

// 用户相关接口
export const UserAPI = {
  createUser: (data) => POST('/users', data), // 创建用户
  getUserList: (params) => GET('/users', params), // 获取用户列表
  updateUser: (id, data) => PUT(`/users/${id}`, data), // 更新用户
  deleteUser: (id) => DELETE(`/users/${id}`), // 删除用户
};

// 其他模块接口可以继续添加，例如设备管理
export const DeviceAPI = {
  getDeviceList: (params) => GET('/devices', params),
  bindDevice: (data) => POST('/devices/bind', data),
};
