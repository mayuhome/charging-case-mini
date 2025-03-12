import { createStoreBindings } from "mobx-miniprogram-bindings";
import { userStore } from "../../stores/user-store";
import { POST } from "../../utils/request";
import { setStorage } from "../../utils/storage";

Page({
  data: {
    phone: '', // 用户手机号
    password: '', // 用户密码
  },
onLoad(){
  this.storeBindings = createStoreBindings(this, {
    store: userStore,
    fields: ['userInfo', 'isAuthenticated'],
    actions: ['updateUserInfo', 'logout']
  });
},

onUnload(){
  this.storeBindings.destroyStoreBindings();
},
  // 监听手机号输入
  onPhoneInput(event) {
    this.setData({
      phone: event.detail.value,
    });
  },

  // 监听密码输入
  onPasswordInput(event) {
    this.setData({
      password: event.detail.value,
    });
  },

  // 登录逻辑
  onLogin() {
    const { phone, password } = this.data;

    // 基础校验
    if (!phone || !password) {
      this.showToast('手机号或密码不能为空', 'fail');
      return;
    }

    // if (!/^1[3-9]\d{9}$/.test(phone)) {
    //   this.showToast('请输入正确的手机号', 'fail');
    //   return;
    // }
    

    // 发起请求到后端登录接口
    POST(
      '/auth/login', // 后端登录接口
       {
        phone,
        password,
      }).then(res => {
        console.log('res:',res);
        this.updateUserInfo(res.userInfo);        
        setStorage('userInfo', res.userInfo);
        setStorage('token', res.accessToken);
        wx.switchTab({
          url: '/pages/home/home', // 跳转到首页
        });
      })
  },

  // 显示 Toast 提示
  showToast(message, theme) {
    const toast = this.selectComponent('#toast');
    toast.show({
      message,
      theme,
    });
  },
});
