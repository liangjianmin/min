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
    total: 0,
    inquiryItemsId: "",
    offerId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let inquiryItemsId = options.inquiryItemsId || '';
    let offerId = options.offerId || '';
    this.setData({
      inquiryItemsId: inquiryItemsId,
      offerId: offerId
    });
  
  },
  getTopInfo: function () {
    let me = this;
    let id = me.data.inquiryItemsId;
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
    }, false)
  },
  getList: function () {
    let me = this;
    let inquiryItemsId = me.data.inquiryItemsId;
    let offerId = me.data.offerId;
    let token = wx.getStorageSync('access_token');
    let params = { token: token };
    if (offerId) {
      params["offer_id/eq"] = offerId;
    } else {
      params["inquiry_items_id/eq"] = inquiryItemsId;
    }
    getData(apis.offerinfo, 'get', params, function (res) {
      if (res.errcode == 0) {
        if (res.total == 0) {
          me.setData({
            priceList: [],
            total: 0
          })
        } else {
          let arr = res.data[0].items || [];
          for (let i = 0; i < arr.length; i++) {
            arr[i].company_name = res.data[0].company_name || ''
          }
          me.setData({
            priceList: arr,
            total: arr.length,
          })
        }

      } else {
        me.setData({
          total: 0,
          priceList: [],
        })
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
    this.setData({
      priceList: null,
      topInfo: null,
      total: 0,

    })
    this.getTopInfo();
    this.getList()
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
    if (this.data.total == 3) {
      wx.showToast({
        title: '报价次数为0',
        icon: 'none',
        duration: 2000
      });
    } else {
      if (this.data.total == 0) {
        wx.navigateTo({
          url: "/pages/form/bj/index?type=1&inquiryItemsId=" + this.data.inquiryItemsId,
        })
      } else {
        let offerId = this.data.priceList[0].offer_id || ''
        wx.navigateTo({
          url: "/pages/form/bj/index?type=2&offerId=" + offerId,
        })
      }

    }

  }
})