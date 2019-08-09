// pages/form/xj/index.js
import { getData, chooseImg, tips } from '../../../utils/util.js';
import { apis } from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowSwitch: false,
    isShowTime: false,
    imgUrl: null,
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
    obj.hq == 1 ? obj.delivery_time = '现货' : obj.delivery_time = obj.day + '天';
    obj.currency = this.data.currency;
    obj.goods_images = this.data.imgUrl || '';
    obj.token = token;
    delete obj.day;
    delete obj.hq;
    if (me.data.isClick) {
      me.setData({
        isClick: false
      })
      getData(apis.inquiryadd, 'get', obj, function (res) {
        if (res.errcode == 0) {
          tips('发布成功')
          me.setData({
            isClick: true
          })

        } else {
          tips('发布失败')
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
  uploadImg: function () {
    let me = this;
    chooseImg(apis.ossupload, 1, function (url) {
      me.setData({
        imgUrl: url
      })
    })

  },
  deleteImg: function () {
    this.setData({
      imgUrl: null
    })
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