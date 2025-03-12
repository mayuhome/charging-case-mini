// components/custom-navbar/index.js
Component({
  properties: {
    title: String,
    backVisible: {
      type: Boolean,
      value: false
    },
    backIconPath: String,
    backgroundColor: {
      type: String,
      value: '#ffffff'
    },
    color: {
      type: String,
      value: '#000000'
    }
  },

  data: {
    statusBarHeight: 20,
    navBarHeight: 44
  },

  lifetimes: {
    attached() {
      this.calculateHeight()
    }
  },

  methods: {
    calculateHeight() {
      try {
        const systemInfo = wx.getSystemInfoSync()
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
        
        // 计算导航栏高度
        const statusBarHeight = systemInfo.statusBarHeight
        const navBarHeight = (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height

        this.setData({
          statusBarHeight,
          navBarHeight: Math.ceil(navBarHeight)
        })
      } catch (err) {
        console.error('导航栏高度计算失败', err)
      }
    },

    handleBack() {
      this.triggerEvent('back')
      wx.navigateBack()
    }
  }
})