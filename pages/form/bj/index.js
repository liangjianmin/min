// pages/form/bj/index.js
import { getData, tips } from '../../../utils/util.js';
import { apis } from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inquiryItemsId: "",
    offerId: "",
    type: "",
    isShowSwitch: false,
    isShowTime: false,
    currency: 1,
    isClick: true,
    isShowTip: true
  },
  formSubmit: function (e) {
    let obj = e.detail.value;
    if (!obj.goods_name) {
      tips('请填写型号');
      return
    } else if (!obj.brand_name) {
      tips('请填写品牌');
      return
    } else if (!obj.number) {
      tips('请填写数量');
      return
    } else if (!obj.price) {
      tips('请填写价格');
      return
    } else {
      if (obj.hq == 2) {//期货
        if (!obj.day) {
          tips('请填写货期');
          return
        }
      }
    }
    this.postData(obj);
  },
  postData: function (obj) {
    let me = this;
    let token = wx.getStorageSync('access_token');
    let url;
    obj.hq == 1 ? obj.delivery_time = '现货' : obj.delivery_time = obj.day + '天';
    obj.currency = this.data.currency;
    obj.token = token;
    if (me.data.type == 1) {
      obj.inquiry_items_id = me.data.inquiryItemsId;
      url = apis.offeradd;
    } else {
      obj.offer_id = me.data.offerId;
      url = apis.offercontinue;
    }
    delete obj.day;
    delete obj.hq;
    if (me.data.isClick) {
      me.setData({
        isClick: false
      })
      getData(url, 'get', obj, function (res) {
        if (res.errcode == 0) {
          tips('提交成功')
          // wx.showToast({
          //   title: '提交成功',
          //   icon: 'none',
          //   duration: 2000,
          //   success: function () {
          //     wx.navigateBack()
          //   }

          // })

          me.setData({
            isClick: true
          });


        } else {
          tips('提交失败')
          me.setData({
            isClick: true
          })
        }
      }, true)
    }

  },
  radioChange(e) {
    let val = e.detail.value;
    this.setData({
      isShowTime: val == 1 ? false : true
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      inquiryItemsId: options.inquiryItemsId || "",
      offerId: options.offerId || "",
      type: options.type || ""
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

  },
  changePrice: function (e) {
    let type = e.target.dataset.pricetype;
    this.setData({
      currency: type,
      isShowSwitch: false
    })
  },
  switchPrice: function () {
    this.setData({
      isShowSwitch: !this.data.isShowSwitch
    })
  },
  closeTip: function () {
    this.setData({
      isShowTip: false
    })
  }
})