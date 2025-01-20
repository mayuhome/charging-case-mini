// stores/user-store.js
import { observable, action } from 'mobx-miniprogram';

export const userStore = observable({
  // 定义全局状态
  userInfo: null, // 用户信息
  isAuthenticated: false, // 是否已登录

  // 定义修改状态的 Action
  updateUserInfo: action(function (info) {
    console.log('info:', info);
    
    this.userInfo = info;
    this.isAuthenticated = !!info; // 根据用户信息是否存在更新登录状态
  }),

  logout: action(function () {
    this.userInfo = null;
    this.isAuthenticated = false;
  }),
});
