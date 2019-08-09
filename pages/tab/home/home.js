// pages/tab/home/home.js
import {
  getData,
  judgeToken
} from '../../../utils/util.js';
import {
  apis
} from '../../../utils/api.js';
let timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceList: null,
    xjList: [],
    animation: {},
    translateY: 0,
    tabIndex: 1,
    xb: 1, //1表示询价 2表示报价
    limit: 10, //每页的条数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.removeStorageSync('homeToken')
    this.getData();
    if (!judgeToken()) {
      wx.setStorageSync('homeToken', 1)
    }
  },
  getTopData: function() {
    let me = this;
    let token = wx.getStorageSync('access_token') || '';
    this.setData({
      xjList: [],
      translateY: 0,
      animation: {},
    })
    if (timer) {
      clearInterval(timer)
    }
    getData(apis.inquirySearch, 'get', {
      "offset": 10,
      "p": 1,
      "add_time/order": "desc",
      "token": token
    }, function(res) {
      let newArr = [];
      if (res.errcode === 0) {
        if (res.total == 0) {
          me.setData({
            xjList: []
          })
        } else {
          for (let key in res.inquiry_list) {
            newArr.push(res.inquiry_list[key])
          };
          let nowDate = Date.parse(new Date());
          for (let i = 0; i < newArr.length; i++) {
            let etime = newArr[i].add_time * 1000;
            let usedTime = me.interval(nowDate - etime);
            newArr[i].usedTime = usedTime
          }
          me.setData({
            xjList: newArr
          });
          let arrLen = newArr.length;
          if (!arrLen || arrLen < 3) {
            me.setData({
              animation: {}
            })
          } else {
            let allHeight = (arrLen - 2) * 30;
            timer = setInterval(() => {
              let translateY = me.data.translateY;
              if (translateY + allHeight == 0) {
                me.setData({
                  translateY: 0
                })
                me.translateYAnimation();
              } else {
                me.setData({
                  translateY: translateY - 30
                });
                me.translateYAnimation();

              }

            }, 2000)
          }
        }
      } else {
        me.setData({
          xjList: []
        })

      }
    }, false)
  },
  getData: function() {
    let me = this;
    let url, token = wx.getStorageSync('access_token')
    if (!token) {
      this.setData({
        priceList: []
      });
      return
    } else {
      if (me.data.xb == 1) {
        url = apis.inquiryInfo
      } else {
        url = apis.offerinfo
      }
      getData(url, 'get', {
        offset: me.data.limit,
        p: 1,
        token: token
      }, function(res) {
        if (res.errcode === 0) {
          let newArr = [];
          if (me.data.xb == 1) {
            for (let key in res.inquiry_list) {
              newArr.push(res.inquiry_list[key])
            }
          } else {
            newArr = newArr.concat(res.data);
          };
          me.setData({
            priceList: newArr,
          });
        } else {
          me.setData({
            priceList: []
          })
        }
      }, true)
    }
  },
  interval: function(usedTime) {
    let days = Math.floor(usedTime / (24 * 3600 * 1000));
    //计算出小时数
    let leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000));
    if (days) {
      return days + "天前";
    } else {
      if (hours) {
        if (minutes) {
          return hours + "小时" + minutes + "分钟前";
        } else {
          return hours + "小时前";
        }
      } else {
        if (minutes) {
          return minutes + "分钟前";
        } else {
          return '刚刚';
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  translateYAnimation: function() {
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 1000
    });
    animation.translateY(this.data.translateY).step();
    this.setData({
      animation: animation.export()
    });
  },
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getTopData();
    if (judgeToken()) {
      if (wx.getStorageSync('homeToken')) {
        this.getData();
        wx.removeStorageSync('homeToken')
      }

    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  switchTab: function(e) {
    let i = e.currentTarget.dataset.index;
    if (i == this.data.tabIndex) {
      return
    } else {
      this.setData({
        priceList: null,
        tabIndex: i,
      })
      if (i == 1) {
        this.setData({
          xb: 1
        });
      } else {
        this.setData({
          xb: 2,
        });
      }
      this.getData();

    }


  },
  toSearch: function() {
    wx.navigateTo({
      url: '/pages/search/index/index',
    })
  },
  toXj: function() {
    if (judgeToken(true)) {
      wx.navigateTo({
        url: "/pages/form/xj/index"
      })
    }

  },
  fbGood: function() {
    if (judgeToken(true)) {
      wx.navigateTo({
        url: "/pages/form/good/index",
      })
    }
  },
  toQd: function() {
    if (judgeToken(true)) {
      wx.navigateTo({
        url: "/pages/list/qd/index"
      })
    }
  }
})