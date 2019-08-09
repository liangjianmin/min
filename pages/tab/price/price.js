// pages/tab/price/price.js
import { getData, judgeToken} from '../../../utils/util.js';
import { apis } from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,//导航初始化
    xb: 1,//1表示询价 2表示报价
    priceList: null,//商品数据
    limit:10,//每页的条数
    p:1,//当前页面
    total:1,
    isShowBottom:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (judgeToken(true)) {
      this.getData();
    }
  },
  getData:function(){
    let me = this;
    let url, token = wx.getStorageSync('access_token')
    if(me.data.xb == 1){
      url = apis.inquiryInfo
    }else{
      url = apis.offerinfo
    }
    getData(url,'get',{ offset:me.data.limit, p:me.data.p, token: token},function(res){
      if(res.errcode === 0){
        let newArr = [];
        if(me.data.p > 1 ){
          newArr = me.data.priceList;
        }
        if (me.data.xb == 1){
            for(let key in res.inquiry_list){
              newArr.push(res.inquiry_list[key])
            }
        }else{
          newArr = newArr.concat(res.data);
        };
        me.setData({
          priceList: newArr,
          total:res.total,
        });
      }else{
        if ((me.data.p == 1) && (res.errcode == (105001 || 105015))){
          me.setData({
            priceList: []
          })
        }
       
      }
    },true)
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
      let allPage = Math.ceil(this.data.total/this.data.limit);
      let p = this.data.p;
      if(p == allPage){
        this.setData({
          isShowBottom: true
        });
        return 
      }else{
        this.setData({
          p:p+1
        });
        console.log(this.data.p)
        this.getData();
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  switchTab: function (e) {
    let i = e.currentTarget.dataset.index;
    if (i == this.data.tabIndex) {
      return
    } else {
      this.setData({
        priceList:null,
        p: 1,
        total: 1,
        tabIndex: i,
        isShowBottom: false
      })
      if (i == 1) {
        this.setData({
          xb:1
        });
      } else {
        this.setData({
          xb: 2,
        });
      }
      this.getData();

    }


  },
  toXj: function () {
    wx.navigateTo({
      url: "/pages/form/xj/index"
    })
  }
})