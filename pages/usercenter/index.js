import { fetchUserCenter } from '../../services/fetchUsercenter';
import Toast from 'tdesign-miniprogram/toast/index';
import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { userStore } from '../../stores/user-store';


const menuData = [
  [
    {
      title: '我的设备',
      tit: 'shebei',
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
      title: '地址',
      tit: 'qweqweqw',
      url: '',
      type: 'address',
      hasArrow: false
    },
    {
      title: '设备编号',
      tit: 'qweqweqwe123123',
      url: '',
      type: 'code',
      hasArrow: false
    },
    {
      title: '分成比例',
      tit: '',
      url: '',
      type: 'point',
      hasArrow: false
    },
  ],
  [
    {
      title: '帮助中心',
      tit: '',
      url: '',
      type: 'help-center',
      hasArrow: true
    },
    {
      title: '客服热线',
      tit: '',
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
  // {
  //   title: '待发货',
  //   iconName: 'deliver',
  //   orderNum: 0,
  //   tabType: 10,
  //   status: 1,
  // },
  // {
  //   title: '待收货',
  //   iconName: 'package',
  //   orderNum: 0,
  //   tabType: 40,
  //   status: 1,
  // },
  // {
  //   title: '待评价',
  //   iconName: 'comment',
  //   orderNum: 0,
  //   tabType: 60,
  //   status: 1,
  // },
  {
    title: '已收款',
    iconName: 'exchang',
    orderNum: 0,
    tabType: 10,
    status: 1,
  },
];

const getDefaultData = () => ({
  showMakePhone: false,
  // userInfo: {
  //   avatarUrl: '',
  //   nickName: '正在登录...',
  //   phoneNumber: '',
  // },
  menuData,
  orderTagInfos,
  customerServiceInfo: {},
  currAuthStep: 1,
  showKefu: true,
  versionNo: '',
});

Page({
  data: getDefaultData(),

  onLoad() {
    this.getVersionInfo();
    this.storeBindings = createStoreBindings(this, {
      store: userStore,
      fields: ['userInfo', 'isAuthenticated'],
    });
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
  onShow() {
    this.getTabBar().init();
    this.init();
  },
  onPullDownRefresh() {
    this.init();
  },

  init() {
    console.log('init');
    // this.fetUseriInfoHandle();
  },

  



  fetUseriInfoHandle() {
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
        })
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
      case 'point': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '你点击了积分菜单',
          icon: '',
          duration: 1000,
        });
        break;
      }
      case 'coupon': {
        wx.navigateTo({ url: '/pages/coupon/coupon-list/index' });
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
    console.log('jumpToUsers');
    
    wx.navigateTo({
      url: '/pages/usercenter/users/index',
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
      this.fetUseriInfoHandle();
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
