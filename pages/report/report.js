import { IncomeAPI } from '../../utils/api';
Page({
  data: {
    keyword: '',
    incomes: [],
  },

  onLoad() {
    IncomeAPI.getIncomeList().then(res => {
      this.setData({
        incomes: res
      })
    })
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
