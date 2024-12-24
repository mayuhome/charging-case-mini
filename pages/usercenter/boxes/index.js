import { BoxAPI } from '../../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    boxList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBoxes();
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

  getBoxes() {
    BoxAPI.getBoxList().then(res => {
      console.log('res:', res);
      this.setData({
        boxList: res || [] // 如果没有数据，就返回一个空数组
    })
  })
},
onCreateBox() {
    wx.navigateTo({
      url: '/pages/usercenter/boxes/create/index',
    })
  }
})