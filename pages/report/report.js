import { IncomeAPI } from '../../utils/api';
Page({
  data: {
    keyword: '',
    incomes: [],
    totalAmount: 0,
    currentAmount: 0
  },

  onLoad() {
    IncomeAPI.getIncomeList().then(res => {
      const totalAmount = res.reduce((total, item) => total + item.amount, 0);
      const currentAmount = res.reduce((total, item) => total + item.currentAmount, 0);
      this.setData({
        incomes: res,
        totalAmount,
        currentAmount
      })
    })
  },

  handleSearch(e) {
    console.log('e:',e);
    this.setData({ keyword: e.detail || '' });
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
