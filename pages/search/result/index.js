// pages/searchresult/index.js
let arr = [
  {
    type: 2,
    name: "STM32F407ZGT6",
    price: "100.012",
    brand: "Texas InstrumentsTexas",
    num: "100,000",
    desc: "深圳地区原装现货深圳地区原装现货",
    time: "05-10 10:15",
    company:"深圳市猎芯科技有限公司"
  },
  {
    type: 1,
    name: "STM32F407ZGT6",
    price: "100.012",
    brand: "Texas InstrumentsTexas",
    num: "100,000",
    desc: "深圳地区原装现货深圳地区原装现货",
    time: "05-10 10:15",
    company: "朗新科技股份有限公司"
  },
  {
    type: 3,
    name: "STM32F407ZGT6",
    price: "100.012",
    brand: "Texas InstrumentsTexas",
    num: "100,000",
    desc: "深圳地区原装现货深圳地区原装现货",
    time: "05-10 10:15",
    company: "深圳邦马特科技有限公司"
  }
];
let arr1 = [{
  company: "深圳邦马特科技有限公司深圳邦马特科技有限公司深圳邦马特科技有限公司",
  time: "05-10 10:15",
  name: "STM32F407ZGT6",
  count:5,
  brand: "Texas InstrumentsTexasInstrumentsTexasInstrumentsTexasInstrumentsTexas",
  num: "100,00000",
  desc: "深圳地区原装现货深圳地区原装现货深圳地区原装现货深圳地区原装现货",
}, {
    company: "深圳邦马特科技有限公司",
    time: "05-10 10:15",
    name: "STM32F407ZGT6",
    count: 5,
    brand: "Texas InstrumentsTexas",
    num: "100,000",
    desc: "深圳地区原装现货深圳地区原装现货",
  }, {
    company: "深圳邦马特科技有限公司",
    time: "05-10 10:15",
    name: "STM32F407ZGT6",
    count: 5,
    brand: "Texas InstrumentsTexas",
    num: "100,000",
    desc: "深圳地区原装现货深圳地区原装现货",
  }, {
    company: "深圳邦马特科技有限公司",
    time: "05-10 10:15",
    name: "STM32F407ZGT6",
    count: 5,
    brand: "Texas InstrumentsTexas",
    num: "100,000",
    desc: "深圳地区原装现货深圳地区原装现货",
  }]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceList: undefined,
    isGet: false,
    tabIndex:1,
    type:2
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
      seft.setData({ priceList: [] })
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
    if (this.data.isGet) {
      return
    } else {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({ isGet: true });
      let arr = this.data.priceList.concat(this.data.priceList);
      let seft = this;
      setTimeout(() => {
        wx.hideLoading();
        seft.setData({ priceList: arr, isBottom: false, isGet: false })
      }, 2000)

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  switchTab:function(e){
    let i = e.currentTarget.dataset.index;
    if(i == this.data.tabIndex){
      return
    }else{
      if(i == 1){
        this.setData({
          tabIndex: i,
          priceList: arr,
          type: 2
        });
      }else{
        this.setData({
          tabIndex: i,
          priceList: arr1,
          type: 3
        });
      }
     
      
    }
   

  },
  toXj:function(){
    wx.navigateTo({
      url: "/pages/form/xj/index"
    })
  }
})