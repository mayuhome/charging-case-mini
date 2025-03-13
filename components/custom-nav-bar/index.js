Component({
  properties: {
    title: String,
    showBackArrow: {
      type: Boolean,
      value: true
    },
    leftIcon: String
  },

  data: {
    statusBarHeight: 0,
    navBarHeight: 44 // 与 CSS 中高度一致
  },

  lifetimes: {
    attached() {
      const systemInfo = wx.getWindowInfo();
      const deviceInfo = wx.getDeviceInfo();
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
      
      // 动态计算状态栏高度
      const statusBarHeight = systemInfo.statusBarHeight;  
            
      // 安卓特殊处理
      const isAndroid = deviceInfo.system.toLowerCase().includes('android')
      const androidPadding = isAndroid ? 8 : 0

      this.setData({
        statusBarHeight: statusBarHeight + androidPadding,
        navBarHeight: menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) * 2
      })
    }
  },

  methods: {
    onBack() {
      this.triggerEvent('back')
      wx.navigateBack()
    }
  }
})