// pages/list/bj/index.js
let arr = [
  {
    name: "STM32F407ZGT6",
    price: "100.012",
    brand: "Texas InstrumentsTexas",
    num: "100,000",
    desc: "深圳地区原装现货深圳地区原装现货",
    time: "05-10 10:15",
    company: "朗新科技股份有限公司",
    fz:"LQFP-144",
    hq:"现货"

  },
  {
    name: "STM32F407ZGT6",
    price: "100.012",
    brand: "Texas InstrumentsTexas",
    num: "100,000",
    desc: "深圳地区原装现货深圳地区原装现货",
    time: "05-10 10:15",
    company: "朗新科技股份有限公司",
    fz: "LQFP-144",
    hq: "现货"

  },
  {
    name: "STM32F407ZGT6",
    price: "100.012",
    brand: "Texas InstrumentsTexas",
    num: "100,000",
    desc: "深圳地区原装现货深圳地区原装现货",
    time: "05-10 10:15",
    company: "朗新科技股份有限公司",
    fz: "LQFP-144",
    hq: "现货"

  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceList: undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let seft = this;

    wx.showLoading({
      title: '加载中',
    })



    setTimeout(() => {
      wx.hideLoading()
      seft.setData({ priceList: arr })
    }, 2000)
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
  goBj:function(){
    wx.navigateTo({
      url: "/pages/form/bj/index",
    })
  }
})