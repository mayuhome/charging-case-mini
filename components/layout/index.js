// components/layout/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    navbarTitle: String,
    showBackArrow: {
      type: Boolean,
      value: true
    },
    leftIcon: String,
    active: 0,
    // 导航栏高度（支持自定义，默认自动计算系统导航栏高度）
    navbarHeight: {
    type: Number,
    value: -1 // -1 表示使用默认计算
    },
    // 标签栏高度（支持自定义）
    tabbarHeight: {
      type: Number,
      value: 50 // 默认 50px
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    contentHeight: 0, // 内容区域高度
    tabbarSafeHeight: 0, // 安全区域高度
    finalNavbarHeight: 0, // 最终导航栏高度
    tabName: '/pages/home/home',
    tabList: [
      { value: '/pages/home/home', label: '首页', icon: 'home-o' },
      { value: '/pages/report/report', label: '数据', icon: 'points' },
      { value: '/pages/usercenter/index', label: '我的', icon: 'user-o' },
    ],
  },

  // 在组件中
lifetimes: {
  attached() {
    // 动态计算高度
    const systemInfo = wx.getWindowInfo();
    const { windowHeight } = systemInfo;

    const deviceInfo = wx.getDeviceInfo();

    // 计算默认导航栏高度（状态栏 + 标题栏）
    let defaultNavbarHeight = 44; // 标题栏默认高度（iOS）
    if (deviceInfo.platform === 'android') defaultNavbarHeight = 48;
    const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
    console.log('statusBarHeight:', statusBarHeight);
    
    const finalNavbarHeight = this.properties.navbarHeight === -1 
      ? statusBarHeight + defaultNavbarHeight
      : this.properties.navbarHeight;
    console.log('finalNavbarHeight:', finalNavbarHeight);

    // 计算安全区域高度（全面屏设备）
    const safeAreaBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom;
    console.log('safeAreaBottom:', safeAreaBottom);
    
    console.log('tabbarHeight:', this.properties['tabbarHeight']);
    
    
      const tabbarSafeHeight = this.properties['tabbarHeight'] +  safeAreaBottom;
    console.log('tabbarSafeHeight:', tabbarSafeHeight);
    

    // 计算内容区域高度
    const contentHeight = windowHeight - finalNavbarHeight - tabbarSafeHeight;

    console.log('windowHeight:', windowHeight);
    

    console.log('contentHeight:', contentHeight);
    

    // 更新数据
    this.setData({
      navbarHeight: finalNavbarHeight - statusBarHeight,
      finalNavbarHeight: Math.ceil(finalNavbarHeight),
      contentHeight: contentHeight,
      tabbarSafeHeight: Math.ceil(tabbarSafeHeight)
    });
  }
},

  /**
   * 组件的方法列表
   */
  methods: {
    onBack() {
      this.triggerEvent('back');
      wx.navigateBack();
    },
    onTabChange(e) {
      console.log('e:', e.detail);
      wx.switchTab({
        url: this.data.tabList[e.detail].value,
      })
    }
  }
})