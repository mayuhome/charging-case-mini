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
      const totalAmount = res.map(m => m.amount).reduce((total, item) => parseFloat(item) + parseFloat(total), 0);
      const currentAmount = res.map(m => m.currentAmount).reduce((total, item) => parseFloat(item) + parseFloat(total), 0);
      this.setData({
        incomes: res,
        totalAmount: totalAmount.toFixed(2),
        currentAmount: currentAmount.toFixed(2)
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
