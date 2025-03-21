import { IncomeAPI } from '../../utils/api';
Page({
  data: {
    keyword: '',
    incomes: [],
    filterIncomes: [],
    totalAmount: 0,
    // currentAmount: 0,
    tabName: '/pages/report/report',
    tabList: [
      { value: '/pages/home/home', label: '首页', icon: 'home' },
      { value: '/pages/report/report', label: '数据', icon: 'app' },
      { value: '/pages/usercenter/index', label: '我的', icon: 'user' },
    ],
  },

  onShow() {
    console.log('show');
    IncomeAPI.getIncomeList().then(res => {
      const totalAmount = res.map(m => m.amount).reduce((total, item) => parseFloat(item) + parseFloat(total), 0);
      // const currentAmount = res.map(m => m.currentAmount).reduce((total, item) => parseFloat(item) + parseFloat(total), 0);      
      this.setData({
        incomes: [...res],
        filterIncomes: [...res],
        totalAmount: totalAmount.toFixed(2),
        // currentAmount: currentAmount.toFixed(2)
      })
    })
  },

  handleSearch(e) {
    this.setData({ 
      keyword: e.detail || '',
      filterIncomes: this.data.incomes.filter(item => item.code.includes(e.detail))
     });
  },

  // 显示 Toast 提示
  showToast(message, theme) {
    const toast = this.selectComponent('#toast');
    toast.show({
      message,
      theme,
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
});
