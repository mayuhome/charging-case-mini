import { BoxAPI, IncomeAPI } from '../../../utils/api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: '',
    monthVisible: false,
    month: '2021-09',
    monthText: '',

    // 指定选择区间起始值
    start: '2000-01-01 00:00:00',
    end: '2030-09-09 12:12:12',
    inputTypeVisible: false,
    inputType: '上传文件', // '上传文件', '手动输入'
    boxList: [],
    boxVisible: false,
    formList: [],
    pickerIndex: -1,
    options: [
      { label: '上传文件', value: 'upload', checked: false },
      { label: '手动输入', value: 'manual', checked: false }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getBoxList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  showPicker(e) {
    const { mode } = e.currentTarget.dataset;
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },
  hidePicker() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },
  onConfirm(e) {
    const { value } = e.detail;
    const { mode } = this.data;

    console.log('confirm', value);

    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
    });

    this.hidePicker();
  },
  onColumnChange(e) {
    console.log('pick', e.detail.value);
  },
  onInputTypePicker() {
    this.setData({
      inputTypeVisible: true,
    });
  },
  onChange(e) {
    this.setData({ value: e.detail.value });
  },
  onInputTypeChange(e) {
    console.log('onInputTypeChange:', e);
    this.setData({ inputType: e.target.dataset.value });
  },
  onBoxPicker(e) {
    console.log('onBoxPicker:',e);
    const index = e.currentTarget.dataset.index;
    this.setData({
      boxVisible: true,
      pickerIndex: index,
    });
  },
  handleAddBox() {
    const { formList } = this.data;
    formList.push({
      amount: 0,
      boxId: null,
      code: ''
    });
    this.setData({ formList });
  },
  onPickerCancel() {
    this.setData({
      boxVisible: false,
    });
  },
  onPickerChange(e) {
    console.log('onPickerChange', e);
  },
  onPickerConfirm(e) {
    console.log('onPickerConfirm:', e);

    this.setData({
      [`formList[${this.data.pickerIndex}].code`]: e.detail.label[0],
      [`formList[${this.data.pickerIndex}].boxId`]: e.detail.value[0],
      boxVisible: false,
    })
  },
  onInputChange(e) {

    console.log('e0:',e);
    const { index } = e.currentTarget.dataset;
    const reg = /^\d+(\.\d+)?$/;



      if (!reg.test(e.detail)) {
        wx.showToast({
          title: '请输入数字',
          icon: 'none'
        });
        this.setData({
          [`formList[${index}].amount`]: 0
        });
        return;
      }
      this.setData({
        [`formList[${index}].amount`]: e.detail || 0
      });
  },
  onSubmit() {
    const { formList, monthText } = this.data;
    const data = {
      date: monthText + '-01',
      incomes: formList
    }
    console.log('data:', data);
    IncomeAPI.createByManual(data).then(res => {
      wx.showToast({
        title: '创建成功',
        icon: 'success'
      })
    })
  },
  getBoxList() {  
    BoxAPI.getBoxList().then(res => {
      const list = res.map(item => {
        return {
          value: item.id,
          label: item.code,
        };
      })
      this.setData({ boxList: [...list] });
    });
  },
  onClickLeft() {
    // 返回上一页或自定义逻辑
    wx.navigateBack();
  },

  radioChange: function (e) {
    console.log('radioChange:', e);
    
    const value = e.detail.value;
    const options = this.data.options.map(option => {
      option.checked = option.value === value;
      return option;
    });
    this.setData({ options });
  }
})