const http = require('../../../utils/util.js');
import {
  apis
} from '../../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    userInfo: {
      avatar: '',
      mobile: ''
    },
    business: {
      goods: '',
      inquiry: '',
      offer: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!http.judgeToken(true)) {
      return
    }


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

    //获取数量统计
    http.getData(apis.countBusiness, 'GET', {
      token: wx.getStorageSync('access_token')
    }, (res) => {
      if (res.errcode === 0) {
        this.setData({
          business: res.data
        });
      }
    }, true);

    //获取用户信息
    http.getData(apis.userInfo, 'GET', {
      token: wx.getStorageSync('access_token')
    }, (res) => {
      if (res.errcode === 0) {
        this.setData({
          userInfo: res.data
        });
      }
    }, true);
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

    //认证管理
    if (e.currentTarget.dataset.type == 'certification') {

      console.log(e.currentTarget.dataset.status)
      if (e.currentTarget.dataset.status == null) {
        wx.navigateTo({
          url: "/pages/person/certification/addcertification/index"
        });
      } else {
        wx.navigateTo({
          url: "/pages/person/certification/addcertification/index"
        });
      }

    }


    //普通跳转
    if (e.currentTarget.dataset.url) {

      wx.navigateTo({
        url: e.currentTarget.dataset.url
      });

    }

  }
})