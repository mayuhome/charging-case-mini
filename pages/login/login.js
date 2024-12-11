Page({
  data: {
    phone: '', // 用户手机号
    password: '', // 用户密码
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
    wx.request({
      url: 'http://166.108.193.190:3002/auth/login', // 后端登录接口
      method: 'POST',
      data: {
        phone,
        password,
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: (res) => {
        if (res.data && res.data.code === 200) {
          // 登录成功，保存 token
          wx.setStorageSync('token', res.data.data.accessToken);
          this.showToast('登录成功2', 'success');
          console.log('tiaozhuan');
          wx.switchTab({
            url: '/pages/usercenter/index', // 跳转到首页
          });
          console.log('tianzhuang 2');
        } else {
          // 登录失败提示
          this.showToast(res.data.message || '登录失败', 'fail');
        }
      },
      fail: (err) => {
        console.error('登录请求失败', err);
        this.showToast('网络错误，请稍后再试', 'fail');
      },
    });
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
