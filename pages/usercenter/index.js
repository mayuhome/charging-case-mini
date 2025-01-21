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

const orderTagInfos = [
  {
    title: '待提款',
    iconName: 'wallet',
    orderNum: 0,
    tabType: 5,
    status: 1,
  },
  {
    title: '已收款',
    iconName: 'exchange',
    orderNum: 0,
    tabType: 10,
    status: 1,
  },
];

const getDefaultData = () => ({
  showMakePhone: false,
  menuData,
  orderTagInfos,
  customerServiceInfo: {},
  currAuthStep: 1,
  showKefu: true,
  versionNo: '0.1.0',
  tabName: '/pages/usercenter/index',
  tabList: [
    { value: '/pages/home/home', label: '首页', icon: 'home' },
    { value: '/pages/report/report', label: '应用', icon: 'app' },
    { value: '/pages/usercenter/index', label: '我的', icon: 'user' },
  ],
});

Page({
  data: getDefaultData(),
  onClickLeft() {
    // 返回上一页或自定义逻辑
    wx.navigateBack();
  },
  

  onLoad() {
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
        orderTagInfos: orderInfo,
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
        const info = orderTagInfos.map((v, index) => ({
          ...v,
          ...orderInfo[index],
        }));
        console.log('userinfo:', userInfo);
        this.setData({
          userInfo,
          menuData,
          orderTagInfos: info,
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

  gotoUserEditPage() {
    const { currAuthStep } = this.data;
    if (currAuthStep === 2) {
      wx.navigateTo({ url: '/pages/usercenter/person-info/index' });
    } else {
      this.fetUserInfoHandle();
    }
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },
});
