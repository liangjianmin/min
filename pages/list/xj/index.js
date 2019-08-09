// pages/list/xj/index.js
import { getData } from '../../../utils/util.js';
import { apis } from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceList: null,
    topInfo: null,
    limit: 10,//每页的条数
    p: 1,//当前页面
    total: 0,
    id: "",
    isShowBottom: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.inquiryItemsId || ''
    })
    this.getTopInfo();
    this.getBjData();
  },
  getTopInfo: function () {
    let me = this;
    let token = wx.getStorageSync('access_token');
    getData(apis.inquiryInfo, 'get', { "inquiry_items_id/eq": me.data.id, token: token }, function (res) {
      if (res.errcode == 0) {
        me.setData({
          topInfo: res.inquiry_list[me.data.id]
        })
      } else if (res.errcode == 105001) {
        me.setData({
          topInfo: null
        })
      }
    }, false)
  },
  getBjData: function () {
    let me = this;
    let token = wx.getStorageSync('access_token');
    getData(apis.inquiryMyOffer, 'get', { "inquiry_items_id/eq": me.data.id, offset: me.data.limit, p: me.data.p, token: token }, function (res) {
      if (res.errcode === 0) {
        let newArr = [];
        if (me.data.p > 1) {
          newArr = me.data.priceList;
        }
        newArr = newArr.concat(res.data);
        me.setData({
          priceList: newArr,
          total: res.total,
        });
      } else {
        if (me.data.p == 1) {
          me.setData({
            priceList: []
          })
        }
      }
    }, true)
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
    let allPage = Math.ceil(this.data.total / this.data.limit);
    let p = this.data.p;
    if (p == allPage) {
      this.setData({
        isShowBottom: true
      });
      return
    } else {
      this.setData({
        p: p + 1
      });
      this.getBjData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})