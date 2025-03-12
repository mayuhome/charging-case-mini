const NAVBAR_HEIGHT = 44 // 导航栏内容区域高度（不包括状态栏）
const TABBAR_HEIGHT = 50 // 与自定义 TabBar 组件高度一致
Page({
  data: {
    activeTab: 0,
    contentHeight: 0,
    tabbarHeight: 50, // 与 CSS 中高度一致（单位：px）
    tabbarSafeHeight: 0
  },

  onLoad() {
    this.calculateLayout();
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

  calculateLayout() {
    try {
      const systemInfo = wx.getWindowInfo();
    
      // 计算内容区域高度
      const contentHeight = systemInfo.windowHeight - this.data.tabbarHeight
      
      // 计算安全区域高度（全面屏设备）
      const safeAreaBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom
      const tabbarSafeHeight = this.data.tabbarHeight + safeAreaBottom
  
      this.setData({
        contentHeight,
        tabbarSafeHeight: Math.ceil(tabbarSafeHeight)
      })

    } catch (err) {
      console.error('布局计算失败:', err)
      // 设置默认值防止页面空白
      this.setData({
        contentHeight: 500,
        contentPadding: '0 0 34px 0'
      })
    }
  }
});
