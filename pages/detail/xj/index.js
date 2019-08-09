// pages/detail/xj/index.js
import { getData, changeTime } from '../../../utils/util.js';
import { apis } from '../../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    topInfo:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let inquiryItemsId = options.inquiryItemsId || '';
    let offerId = options.offerId || '';
    // this.getData(inquiryItemsId, offerId)
    this.getTopInfo(inquiryItemsId,offerId)

  },
  getTopInfo: function (inquiryItemsId, offerId) {
    let me = this;
    let token = wx.getStorageSync('access_token');
    getData(apis.inquiryInfo, 'get', { "inquiry_items_id/eq": inquiryItemsId, token: token }, function (res) {
      if (res.errcode == 0) {
        me.setData({
          topInfo: res.inquiry_list[inquiryItemsId]
        });
        console.log(me.data.topInfo)
        me.getData(inquiryItemsId, offerId,token)
      } else if (res.errcode == 105001) {
        me.setData({
          topInfo: ""
        })
      }
    }, true)
  },
  getData: function (inquiryItemsId, offerId, token) {
    let me = this;
    getData(apis.inquiryMyOffer, 'get', {
      "offer_id/eq": offerId,
      "inquiry_items_id/eq": inquiryItemsId,
      "token": token,
    }, function (res) {
      if (res.errcode == 0) {
        if (res.total == 0) {
          me.setData({
            info: {}
          })
        } else {
          me.setData({
            info: res.data[0]
          })
        }

      } else {
        me.setData({
          info: {}
        })
      }
    }, false)
  },
  sendTemplate:function(){
    let data = this.data.info;
    let my = wx.getStorageSync("myUsername");
    let companyName = wx.getStorageSync("company_name");
    let userId = wx.getStorageSync("user_id");
    let avatar = wx.getStorageSync("avatar");
    let img = "";
    if(this.data.topInfo){

      img = this.data.topInfo.goods_images||''
    }else{
      img = ""
    }
    let obj = {
      userId: data.im_username,
      type: data.goods_name,
      price: data.currency == 1?'￥'+data.price:'$'+data.price,
      brand: data.brand_name,
      fz: data.encap,
      num: data.number+'',
      hq: data.delivery_time,
      time: changeTime(data.add_time*1000),
      goodImage: img,
      userName: data.company_name,
      targetId: data.user_id,
      userImg: data.avatar,
    };
    let queryObj = {
      myName: my,
      your: data.im_username,
      name: data.company_name,
      name1: companyName,
      id: userId,
      touserid: data.user_id,
      title: data.company_name,
      img: data.avatar,
      img1: avatar
    };
    wx.setStorageSync('template', obj);
    wx.navigateTo({
      url: "/pages/detail/chat/index?username=" + JSON.stringify(queryObj)
    })
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

  }
})