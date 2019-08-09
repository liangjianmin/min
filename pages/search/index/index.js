// pages/search/index/index.js
import {
  getData,
  dataEncryption
} from '../../../utils/util.js';
import {
  apis
} from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: "",
    historyList: [],
    rmList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHotGoods()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let storageKeys = wx.getStorageSync('storageKeys') || [];
    this.setData({
      historyList: storageKeys
    })
  },
  getHotGoods: function() {
    let obj = dataEncryption();
    let me = this;
    getData(apis.hotgoods, 'get', {
      timestamp: obj.timestampStr,
      random: obj.randomStr,
      signature: obj.singnatrueStr
    }, function(res) {
      if (res.err_code === 0) {
        if (res.data.length) {
          me.setData({
            rmList: res.data
          })
        } else {
          me.setData({
            rmList: []
          })
        }
      } else {
        me.setData({
          rmList: []
        })
      }
    }, true)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindKeyInput: function(e) {
    this.setData({
      key: e.detail.value
    })
  },
  confirmTap: function() {
    let val = this.data.key;
    if (!val.length) {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 2000
      });
    } else if (val.length < 3) {
      wx.showToast({
        title: '请至少输入3个字符',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: "/pages/search/result/index?key=" + val
      })
    }

  },
  deleteHistory: function() {
    this.setData({
      historyList: []
    });
    wx.removeStorageSync('storageKeys')
  },
  toSearch:function(e){
   let title = e.target.dataset.title;
    wx.navigateTo({
      url: "/pages/search/result/index?key=" + title
    })
  }
})