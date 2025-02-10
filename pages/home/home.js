Page({
  data: {
    tabName: '/pages/home/home',
    tabList: [
      { value: '/pages/home/home', label: '首页', icon: 'home' },
      { value: '/pages/report/report', label: '数据', icon: 'app' },
      { value: '/pages/usercenter/index', label: '我的', icon: 'user' },
    ],
  },

  onChange(e) {
    this.setData({
      tabName: e.detail.value
    })
    wx.redirectTo({
      url: e.detail.value,
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
