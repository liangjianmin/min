const http = require('../../../utils/util.js');
import {
  apis
} from '../../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /**
   * 跳转地址
   */
  toUrl: function (e) {

    if (e.target.dataset.url) {
      wx.navigateTo({
        url: e.target.dataset.url
      })
    }

  },
  /**
   * 退出系统
   */
  logout: function (e) {

    wx.showModal({
      title: '提示',
      content: '您确定退出系统吗？',
      success(res) {
        if (res.confirm) {

          http.getData(apis.authLogout, 'POST', null, (res) => {

            if (res.err_code === 0) {
              wx.switchTab({
                url: '/pages/tab/home/home'
              });
            } else {
              wx.showToast({
                title: res.err_msg,
                icon: 'none',
                duration: 2000
              });
              
            }
          }, false, true);
        } else if (res.cancel) {

          console.log('用户点击取消')
        }
      }
    })

  }
})