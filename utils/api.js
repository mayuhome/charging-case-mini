// utils/api.js
import { get } from 'mobx-miniprogram';
import { GET, POST } from './request';

// 用户相关接口
export const UserAPI = {
  createUser: (data) => POST('/user', data), // 创建用户
  getUserList: (params) => GET('/user', params), // 获取用户列表
  updateUser: (data) => POST(`/user/update`, data), // 更新用户
  deleteUser: (id) => DELETE(`/user/${id}`), // 删除用户
};

// 其他模块接口可以继续添加，例如设备管理
export const BoxAPI = {
  getBoxList: (params) => GET('/box', params), // 获取设备列表
  createBox: (data) => POST('/box', data), // 创建设备
  updateBox: (data) => POST('/box/update', data), // 更新设备
  deleteBox: (id) => DELETE(`/box/${id}`), // 删除设备
  bindUser: (data) => POST('/box/bind', data), // 绑定用户
  unbindUser: (id) => POST(`/box/unbind/${id}`, {}), // 解绑用户
};

export const IncomeAPI = {
  createByManual: (data) => POST('/income/create-by-manual', data),
  getIncomeList: () => GET('/income/box-income'),
}