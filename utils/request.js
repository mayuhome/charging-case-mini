// utils/request.js

const baseURL = 'https://www.chargingcase.cloud/api'; // 后端接口基础 URL
// const baseURL = 'http://127.0.0.1:3002/api'; // 后端接口基础 URL

const request = (url, method = 'GET', data = {}, options = {}) => {
  const token = wx.getStorageSync('token'); // 从缓存中获取 token
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseURL}${url}`,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        ...options.headers, // 支持自定义 Header
      },
      success: (res) => {
        console.log('success:', res.data.code);
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else if (res.data.code === 401) {
          console.log('token 失效');
          // token 失效
          wx.clearStorageSync();
          wx.reLaunch({
            url: '/pages/login/login',
          });
        } else {
          // 自定义处理错误
          wx.showToast({
            title: res.data.message || '请求失败',
            icon: 'none',
          });
          reject(res);
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络异常，请稍后再试',
          icon: 'none',
        });
        reject(err);
      },
    });
  });
};

// 导出封装的 GET/POST 方法
export const GET = (url, params = {}, options = {}) =>
  request(url, 'GET', params, options);
export const POST = (url, data = {}, options = {}) =>
  request(url, 'POST', data, options);
export const PUT = (url, data = {}, options = {}) =>
  request(url, 'PUT', data, options);
export const DELETE = (url, data = {}, options = {}) =>
  request(url, 'DELETE', data, options);
