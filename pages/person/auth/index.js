const http = require('../../../utils/util.js');
import {
  apis
} from '../../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userinfo: []
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
   * 授权用户信息
   */
  bindGetUserInfo(e) {
    let self = this;

    if (e.detail.errMsg == 'getUserInfo:ok') {
      wx.login({
        success(res) {
          if (res.code) {

            //存储用户资料
            self.setData({
              userinfo: e.detail.userInfo
            });

            //获取openId
            http.getData(apis.getOpenId, 'GET', {
              code: res.code,
              'userinfo[avatarUrl]': self.data.userinfo.avatarUrl,
              'userinfo[nickName]': self.data.userinfo.nickName
            }, function (res) {

              if (res.err_code === 0) {

                wx.setStorage({
                  key: "openid",
                  data: res.data.openid
                });

                wx.setStorage({
                  key: "session_key",
                  data: res.data.session_key
                });

                //存储用户已经授权
                wx.setStorage({
                  key: "auth",
                  data: true
                });


                //授权成功跳转一键获取手机号
                wx.navigateTo({
                  url: '/pages/person/getphone/index'
                });

              }
            }, true);
          } else {
            console.log('登录失败！' + res.errMsg);
          }
        },
        fail(res) {

        }
      })
    } else {

      //用户拒绝获取资料
      wx.navigateTo({
        url: '/pages/person/login/index'
      });

    }
  },
  /**
   * 暂不注册
   */
  toUrl: function () {
    wx.switchTab({
      url: '/pages/tab/home/home'
    })
  }
})