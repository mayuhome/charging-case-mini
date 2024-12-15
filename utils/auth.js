// utils/auth.js

import { POST } from './request';

export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        POST('/auth/login', { code: res.code })
          .then((data) => {
            wx.setStorageSync('token', data.token); // 保存 token
            resolve(data);
          })
          .catch((err) => reject(err));
      },
      fail: (err) => reject(err),
    });
  });
};

export const checkToken = () => {
  const token = wx.getStorageSync('token');
  if (!token) return false;
  // 可添加进一步 token 校验逻辑，例如请求后端检查有效性
  return true;
};
