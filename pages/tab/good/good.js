// pages/tab/good/good.js
import { getData, judgeToken } from '../../../utils/util.js';
import { apis } from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceList: null,//商品数据
    limit: 10,//每页的条数
    p: 1,//当前页面
    total: 0,
    time: "",
    key: "",
    confirmKey: "",
    isShowBottom:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (judgeToken(true)) {
      this.getData();
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      key: e.detail.value
    })
  },
  bindKeyConfirm: function () {
    let key = this.data.key;
    this.setData({
      confirmKey: key,
      priceList: null,
      p: 1,
      total: 0,
      time: "",
      isShowBottom:false
    });
    this.getData();

  },
  getData: function () {
    let me = this;
    let token = wx.getStorageSync('access_token')
    getData(apis.goodsInfo,'get', {
      offset: me.data.limit, p: me.data.p, token: token, 'goods_name/like': me.data.confirmKey
    }, function (res) {
      if (res.errcode === 0) {
        let newArr = [];
        if (me.data.p > 1) {
          newArr = me.data.priceList;
        }
        for (let key in res.goods_list) {
          newArr.push(res.goods_list[key])
        }
        if (me.data.p == 1) {
          me.setData({
            time: newArr[0].update_time
          })
        }
        me.setData({
          priceList: newArr,
          total: res.total,
        });
      } else if (res.errcode === 110001 || res.errcode === 103001) {
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
    console.log(111)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let allPage = Math.ceil(this.data.total / this.data.limit);
    let p = this.data.p;
    if (p == allPage) {
      this.setData({
        isShowBottom:true
      });
      return
    } else {
      this.setData({
        p: p + 1
      });
      this.getData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  fbGood: function () {
    wx.navigateTo({
      url: "/pages/form/good/index",
    })
  }
})