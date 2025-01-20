import { UserAPI } from '../../../../utils/api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
    confirmPassword: '',
    confirmPasswordErrorMsg: '',
    name: '',
    isActive: true,
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

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail,
    });
  },
  onConfirmPasswordInput(e) {    
    const timer = setTimeout(() => {
      clearTimeout(timer);
      const confirmPassword = e.detail;
      const msg = confirmPassword !== this.data.password ? '两次输入的密码不一致' : '';
      this.setData({
        confirmPasswordErrorMsg: msg,
      });
    }, 500);
  },
  onSubmit(event) {
    const { phone, password, confirmPasswordErrorMsg, name, isActive } = this.data;
    // 验证必填项
    if (!phone) {
      wx.showToast({ title: '手机号不能为空', icon: 'none' });
      return;
    }
    if (!password) {
      wx.showToast({ title: '密码不能为空', icon: 'none' });
      return;
    }
    if (confirmPasswordErrorMsg) {
      wx.showToast({ title: '两次输入的密码不一致', icon: 'none' });
      return;
    }
    UserAPI.createUser({
      phone,
      password,
      name,
      isActive,
    }).then(res => {
      wx.showToast({ title: '用户创建成功', icon: 'success' });
      wx.navigateBack();
    });
  },
  onClickLeft() {
    // 返回上一页或自定义逻辑
    wx.navigateBack();
  },



})