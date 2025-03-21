import { UserAPI } from '../../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: []
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
    this.getUsers();
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

  getUsers() {
    UserAPI.getUserList().then(res => {
      console.log('user:',res);
      this.setData({
        userList: [...res] || [] // 如果没有数据，就返回一个空数组
      })
    })
  },

  onCreateUser() {
    wx.navigateTo({
      url: '/pages/usercenter/users/create/index',
  })
  },
  onClickLeft() {
    // 返回上一页或自定义逻辑
    wx.navigateBack();
  },
})