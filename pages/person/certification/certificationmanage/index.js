const http = require('../../../../utils/util.js');
import {
  apis
} from '../../../../utils/api.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    authinfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    http.getData(apis.authInfo, 'GET', null, (res) => {
    
      if (res.errcode == 0) {
        
        this.setData({
          authInfo: res.data
        });
      }

    }, false, false, true);

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
   * 跳转认证信息
   */
  toUrl: function (e) {
   
    if(e.target.dataset.type == 1){
      wx.navigateTo({
        url: e.target.dataset.url+'?id='+e.target.dataset.id,
        success: (result)=>{
          
        }
      });
    }else if(e.target.dataset.type == 2){
      wx.navigateTo({
        url: e.target.dataset.url,
        success: (result)=>{
          
        }
      });
    }else if(e.target.dataset.type == 3){
      wx.switchTab({
        url:e.target.dataset.url
      });
    }
  }
})