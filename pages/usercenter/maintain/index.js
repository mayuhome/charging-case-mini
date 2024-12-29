import { BoxAPI } from '../../../utils/api';
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
    this.setData({ inputType: e.detail.value });
  },
  onBoxPicker() {
    console.log('onBoxPicker');
    
    this.setData({
      boxVisible: true,
    });
    console.log('boxList', this.data.boxList);
    
  },
  handleAddBox() {
    const { formList } = this.data;
    formList.push({
      id: formList.length,
      value: '',
      label: `箱${formList.length + 1}`,
    });
    this.setData({ formList });
  },
  getBoxList() {  
    BoxAPI.getBoxList().then(res => {
      this.setData({ boxList: [...res] });
    });
  },
})