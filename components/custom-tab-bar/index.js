Component({
  data: {
    
    tabName: '/pages/home/home',
    tabList: [
      { value: '/pages/home/home', label: '首页', icon: 'home-o' },
      { value: '/pages/report/report', label: '数据', icon: 'points' },
      { value: '/pages/usercenter/index', label: '我的', icon: 'user-o' },
    ],
  },

  properties: {
    active: 0,
  },

  methods: {
    onChange(e) {
      // this.setData({ active: event.detail.value });
      // wx.switchTab({
      //   url: this.data.list[event.detail.value].url.startsWith('/')
      //     ? this.data.list[event.detail.value].url
      //     : `/${this.data.list[event.detail.value].url}`,
      // });
      console.log('e:', e.detail);
      
      // this.setData({
      //   active: e.detail
      // })
      wx.switchTab({
        url: this.data.tabList[e.detail].value,
      })
    },

    // init() {
    //   const page = getCurrentPages().pop();
    //   const route = page ? page.route.split('?')[0] : '';
    //   const active = this.data.list.findIndex(
    //     (item) =>
    //       (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
    //       `${route}`,
    //   );
    //   this.setData({ active });
    // },
  },
});
