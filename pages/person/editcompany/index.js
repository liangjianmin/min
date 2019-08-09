const http = require('../../../utils/util.js');
import {
  chooseImg
} from '../../../utils/util.js';
import {
  apis
} from '../../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: true,
    imgSrc: ''
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
   * 上传企业形象
   */
  uploadImg: function () {

    chooseImg(apis.ossupload, 1, (res) => {
      if (res) {
        this.setData({
          imgSrc: res,
          status: false
        });
      }
    });
  },
  /**
   * 删除企业形象
   */
  deleteImg: function () {
    this.setData({
      imgSrc: '',
      status: true
    })
  },
  /**
   * 
   * 企业提交
   */
  formSubmit: function (e) {

  }
})