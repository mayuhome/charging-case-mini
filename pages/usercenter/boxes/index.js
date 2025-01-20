import { BoxAPI, UserAPI } from '../../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    boxList: [],
    userList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onLoad');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('onReady');
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('onShow');
    this.getBoxes();
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
  onClickLeft() {
    // 返回上一页或自定义逻辑
    wx.navigateBack();
  },

  getBoxes() {
    BoxAPI.getBoxList().then(res => {
      this.setData({
        boxList: [...res] || [] // 如果没有数据，就返回一个空数组
      })
    })
  },
  getUsers() {
    UserAPI.getUserList().then(res => {
      this.setData({
        userList: [...res]
      })
    })
  },
onCreateBox() {
    wx.navigateTo({
      url: '/pages/usercenter/boxes/create/index',
    })
  }


})