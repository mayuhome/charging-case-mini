Page({
  data: {
    statusBarHeight: 20, // 状态栏高度（默认值）
    navBarHeight: 60,    // 导航栏总高度（默认值）
    safeAreaBottom: 0,   // 底部安全区域高度
    contentHeight: 0,     // 内容区域高度
    tabName: '/pages/home/home',
    tabList: [
      { value: '/pages/home/home', label: '首页', icon: 'home' },
      { value: '/pages/report/report', label: '数据', icon: 'app' },
      { value: '/pages/usercenter/index', label: '我的', icon: 'user' },
    ],

  },

  onLoad() {
    // 获取系统信息
    const systemInfo = wx.getWindowInfo();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();

    // 计算导航栏高度（状态栏高度 + 胶囊按钮高度 + 间距）
    const statusBarHeight = systemInfo.statusBarHeight;
    const navBarHeight = (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height;

    // 计算安全区域
    const safeAreaBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom;

    // 计算内容区域高度
    const contentHeight = systemInfo.windowHeight - navBarHeight - 100; // 100是底部TabBar高度

    console.log(      statusBarHeight,
      navBarHeight,
      safeAreaBottom,
      contentHeight);
    

    this.setData({
      statusBarHeight,
      navBarHeight,
      safeAreaBottom,
      contentHeight
    });
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
