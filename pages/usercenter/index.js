import { fetchUserCenter } from '../../services/fetchUsercenter';
import Toast from 'tdesign-miniprogram/toast/index';
import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { userStore } from '../../stores/user-store';


const menuData = [
  [
    {
      title: '我的设备',
      tit: 'sheBei',
      url: '',
      type: 'boxes',
      hasArrow: true
    },
    {
      title: '我的商户',
      tit: '',
      url: '',
      type: 'users',
      hasArrow: true
    },
    {
      title: '数据维护',
      tit: 'weiHu',
      url: '',
      type: 'maintain',
      hasArrow: true
    },
    {
      title: '地址',
      tit: 'diZhi',
      url: '',
      type: 'address',
      hasArrow: false
    },
    {
      title: '设备编号',
      tit: 'bianHao',
      url: '',
      type: 'code',
      hasArrow: false
    },
    {
      title: '分成比例',
      tit: 'fenCheng',
      url: '',
      type: 'point',
      hasArrow: false
    },
  ],
  [
    {
      title: '帮助中心',
      tit: 'bangZhu',
      url: '',
      type: 'help-center',
      hasArrow: true
    },
    {
      title: '客服热线',
      tit: 'keFu',
      url: '',
      type: 'service',
      icon: 'service',
      hasArrow: false
    },
  ],
];

const getDefaultData = () => ({
  showMakePhone: false,
  menuData,
  customerServiceInfo: {},
  currAuthStep: 1,
  showKefu: true,
  versionNo: '0.1.0',
  activeTab: 0,
  contentHeight: 0,
  tabbarHeight: 50, // 与 CSS 中高度一致（单位：px）
  tabbarSafeHeight: 0
});

Page({
  data: getDefaultData(),
  onClickLeft() {
    // 返回上一页或自定义逻辑
    wx.navigateBack();
  },
  

  onLoad() {
    this.calculateLayout();
    this.getVersionInfo();
    this.storeBindings = createStoreBindings(this, {
      store: userStore,
      fields: ['userInfo', 'isAuthenticated'],
      actions: ['updateUserInfo', 'logout']
    });
    this.init();
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  onShow() {
    // this.getTabBar().init();
    // this.init();
  },
  onPullDownRefresh() {
    this.init();
  },

  init() {
    console.log('init');
    console.log('user center:',this.userInfo, this.data.userInfo);
    
  },

  onChange(e) {
    this.setData({
      tabName: e.detail.value
    }),
    wx.redirectTo({
      url: e.detail.value,
    })
  },



  fetUserInfoHandle() {
    fetchUserCenter().then(
      ({
        userInfo,
        countsData,
        customerServiceInfo,
      }) => {
        console.log("user");
        console.log(userInfo);
        // eslint-disable-next-line no-unused-expressions
        menuData?.[0].forEach((v) => {
          countsData.forEach((counts) => {
            if (counts.type === v.type) {
              // eslint-disable-next-line no-param-reassign
              v.tit = counts.num;
            }
          });
        });
        console.log('userinfo:', userInfo);
        this.setData({
          userInfo,
          menuData,
          customerServiceInfo,
          currAuthStep: 2,
        });
        wx.stopPullDownRefresh();
      },
    );
  },

  onClickCell({ currentTarget }) {
    console.log('currentTarget:', currentTarget);
    const { type } = currentTarget.dataset;

    switch (type) {
      case 'boxes': {
        wx.navigateTo({
          url: '/pages/usercenter/boxes/index',
        });
        break;
      }
      case 'users': {
        wx.navigateTo({
          url: '/pages/usercenter/users/index',
        });
        break;
      }
      case 'maintain': {
        wx.navigateTo({
          url: '/pages/usercenter/maintain/index',
        });
        break;
      }
      case 'address': {
        wx.navigateTo({ url: '/pages/usercenter/address/list/index' });
        break;
      }
      case 'service': {
        this.openMakePhone();
        break;
      }
      case 'help-center': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '帮助中心暂时不可用',
          icon: '',
          duration: 1000,
        });
        break;
      }
      default: {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '未知跳转',
          icon: '',
          duration: 1000,
        });
        break;
      }
    }
  },

  jumpNav(e) {
    const status = e.detail.tabType;

    if (status === 0) {
      wx.navigateTo({ url: '/pages/order/after-service-list/index' });
    } else {
      wx.navigateTo({ url: `/pages/order/order-list/index?status=${status}` });
    }
  },

  jumpAllOrder() {
    wx.navigateTo({ url: '/pages/order/order-list/index' });
  },

  jumpToBoxes(){
    wx.navigateTo({
      url: '/pages/usercenter/boxes/index',
    })
  },

  jumpToUsers(){    
    wx.navigateTo({
      url: '/pages/usercenter/users/index',
    })
  },

  jumpToMaintain(){    
    wx.navigateTo({
      url: '/pages/usercenter/maintain/index',
    })
  },

  helpCenter(){
    Toast({
      context: this,
      selector: '#t-toast',
      message: '帮助中心暂时不可用',
      icon: '',
      duration: 1000,
    });
  },

  openMakePhone() {
    this.setData({ showMakePhone: true });
  },

  closeMakePhone() {
    this.setData({ showMakePhone: false });
  },

  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    });
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },

  goLogin(){
    wx.clearStorage();
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  calculateLayout() {
    try {
      const systemInfo = wx.getWindowInfo();
    
      // 计算内容区域高度
      const contentHeight = systemInfo.windowHeight - this.data.tabbarHeight - systemInfo.safeArea.top;
      
      // 计算安全区域高度（全面屏设备）
      const safeAreaBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom;
      // const safeAreaTop = systemInfo.safeArea.top;
      const tabbarSafeHeight = this.data.tabbarHeight + safeAreaBottom;
  
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
