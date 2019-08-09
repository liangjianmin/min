// pages/detail/good/index.js
import { getData, changeTime  } from '../../../utils/util.js';
import { apis } from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    editOrShow:-1,//1编辑 2在线沟通
    goodId:"",
    type:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodId: options.goodId || '',
      type: options.type || ''
    })
    
  },
  getData: function () {
    let me = this;
    let token = wx.getStorageSync('access_token');
    let url = "";
    let goodId = me.data.goodId;
    let type = me.data.type;
    if (type == 1) {
      url = apis.goodsInfo;
    } else if (type == 2) {
      url = apis.goodsSearch;
    } else {
      return;
      
    }
    getData(url, 'get', {
      "goods_id/eq": goodId,
      "token": token,
    }, function (res) {
      if (res.errcode == 0) {
        if (res.total == 0) {
          me.setData({
            info: {}
          })
        } else {
          let userId = wx.getStorageSync('user_id');
          let targetId = res.goods_list[goodId]['user_id'];
          if(type == 1){
            me.setData({
              editOrShow: 1
            })
          }else if(type == 2){
            if (userId == targetId) {
              me.setData({
                editOrShow: 1
              })
            } else {
              me.setData({
                editOrShow: 2
              })
            }
          }

          me.setData({
            info: res.goods_list[goodId]
          })
        }

      } else {
        me.setData({
          info: {}
        })
      }
    }, true)
  },
  editGood:function(){
    wx.navigateTo({
      url: "/pages/form/good/index?goodId="+this.data.goodId,
    })
  },
  sendTemplate:function(){
    let data = this.data.info;
    let my = wx.getStorageSync("myUsername");
    let companyName = wx.getStorageSync("company_name");
    let userId = wx.getStorageSync("user_id");
    let avatar = wx.getStorageSync("avatar");
    let obj = {
      userId: data.im_username,
      type: data.goods_name,
      price: data.currency == 1 ? '￥' + data.price : '$' + data.price,
      brand: data.brand_name,
      fz: data.encap,
      num: data.stock + '',
      hq: data.delivery_time,
      time: changeTime(data.add_time * 1000),
      goodImage: data.goods_images,
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
    this.getData()
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