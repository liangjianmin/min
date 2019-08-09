// pages/searchresult/index.js
import { getData } from '../../../utils/util.js';
import { apis } from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceList: null,
    tabIndex: 1,
    type: 2,
    limit: 10,//每页的条数
    p: 1,//当前页面
    total: 1,
    key: "",
    confirmKey: "",
    isShowBottom: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let key = options.key;
    this.setData({
      key: key,
      confirmKey: key
    });
    this.storageKey(key)
    this.getData();
  },
  bindKeyInput: function (e) {
    this.setData({
      key: e.detail.value
    })
  },
  storageKey: function (key) {
    let storageKeys = wx.getStorageSync('storageKeys') || [];
    if (!storageKeys.length) {
      storageKeys.push(key);
    } else {
      let index = storageKeys.indexOf(key);
      if (index == -1) {
        if (storageKeys.length > 9) {
          storageKeys.pop()
        }
        storageKeys.unshift(key)
      } else {
        storageKeys.splice(index, 1);
        storageKeys.unshift(key)
      }
    }
    wx.setStorageSync('storageKeys', storageKeys)
  },
  bindKeyConfirm: function () {
    let val = this.data.key;
    if (!val.length) {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 2000
      });
    } else if (val.length < 3) {
      wx.showToast({
        title: '请至少输入3个字符',
        icon: 'none',
        duration: 2000
      });
    } else {
      this.setData({
        priceList: null,
        p: 1,
        total: 1,
        confirmKey: val,
        isShowBottom: false,
      });
      this.storageKey(val)
      this.getData()
    }
  },
  getData: function () {
    let me = this;
    let url, token = wx.getStorageSync('access_token');
    let str = "";
    let params = {
      offset: me.data.limit,
      p: me.data.p,
      "goods_name/like": me.data.confirmKey
    };
    if (me.data.tabIndex == 1) {
      url = apis.goodsSearch
      str = "goods_list"
    } else {
      url = apis.inquirySearch;
      str = "inquiry_list"
    }
    if (token) {
      params.token = token
    }
    getData(url, 'get', params, function (res) {
      if (res.errcode === 0) {
        let newArr = [];
        if (me.data.p > 1) {
          newArr = me.data.priceList;
        }
        for (let key in res[str]) {
          newArr.push(res[str][key])
        }
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
        priceList: null,
        p: 1,
        total: 1,
        tabIndex: i,
        isShowBottom: false,
      })
      if (i == 1) {
        this.setData({
          type: 2
        });
      } else {
        this.setData({
          type: 3,
        });
      }
      this.getData();

    }

  },
  toXj: function () {
    wx.navigateTo({
      url: "/pages/form/xj/index"
    })
  },
  toSp: function () {
    wx.navigateTo({
      url: "/pages/form/good/index"
    })
  },
  sendCustomer: function () {
    let my = wx.getStorageSync("myUsername");
    let companyName = wx.getStorageSync("company_name");
    let userId = wx.getStorageSync("user_id");
    let avatar = wx.getStorageSync("avatar");
    let queryObj = {
      myName: my,
      your: getApp().globalData.customerNum,
      name: getApp().globalData.customerName,
      name1: companyName,
      id: userId,
      touserid:'',
      title: getApp().globalData.customerName,
      img:'',
      img1: avatar
    };
    wx.setStorageSync('customer', this.data.confirmKey);
    wx.navigateTo({
      url: "/pages/detail/chat/index?username=" + JSON.stringify(queryObj)
    })
  },
})