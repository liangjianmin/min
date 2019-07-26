// pages/list/bj/index.js
import { getData } from '../../../utils/util.js';
import { apis } from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceList: null,
    topInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let inquiryItemsId = options.inquiryItemsId;
    this.getTopInfo(inquiryItemsId)
  },
  getTopInfo: function (id) {
    let me = this;
    getData(apis.inquirySearch, 'get', { "inquiry_items_id/eq": id }, function (res) {
      if (res.errcode === 0) {
        me.setData({
          topInfo: res.inquiry_list[id]
        })
      } else {
        me.setData({
          topInfo: null
        })
      }
    }, true)
  },
  getList:function(){

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goBj: function () {
    wx.navigateTo({
      url: "/pages/form/bj/index",
    })
  }
})