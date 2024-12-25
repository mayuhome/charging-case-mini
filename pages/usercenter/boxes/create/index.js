import { BoxAPI } from '../../../../utils/api';

// pages/usercenter/boxes/create/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    address: '',
    profitShare: '',
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

  onInput(e) {
    this.setData({
      [e.currentTarget.dataset.field]: e.detail
    });
  },

  onSubmit() {
   if(!this.data.code){
     wx.showToast({
       title: '请输入设备编号',
       icon: 'none'
     });
     return
   }
   const { code, address, profitShare } = this.data;
   BoxAPI.createBox({ code, address, profitShare }).then((res) => {
     wx.showToast({
       title: '创建成功',
       icon: 'success'
     });
     wx.navigateBack();
   })
  },

})