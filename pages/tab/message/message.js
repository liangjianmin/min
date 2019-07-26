// pages/tab/message/message.js
let disp = require("../../../utils/broadcast");
var WebIM = require("../../../utils/WebIM")["default"];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unReadSpotNum: 0,
    arr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let me = this;
    //监听未读消息数
    disp.on("em.xmpp.unreadspot", function (message) {
      console.log(111)
      me.setData({
        arr: me.getChatList(),
        unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
      });
    });
  },
  getChatList() {
    let array = [];
    let member = wx.getStorageSync("member");
    let myName = wx.getStorageSync("myUsername");
    for (let i = 0; i < member.length; i++) {
      let newChatMsgs = wx.getStorageSync(member[i] + myName) || [];
      let historyChatMsgs = wx.getStorageSync("rendered_" + member[i] + myName) || [];
      let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
      if (curChatMsgs.length) {
        let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
        lastChatMsg.unReadCount = newChatMsgs.length;
        if (lastChatMsg.unReadCount > 99) {
          lastChatMsg.unReadCount = "99+";
        }
        let dateArr = lastChatMsg.time.split(' ')[0].split('-')
        let timeArr = lastChatMsg.time.split(' ')[1].split(':')
        let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
        lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
        lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
        array.push(lastChatMsg);
      }
    }
    array.sort((a, b) => {
      return b.dateTimeNum - a.dateTimeNum
    })

    return array;
  },

  into_singleChatRoom: function (detail) {
    var my = wx.getStorageSync("myUsername");
    var nameList = {
      myName: my,
      your: detail.username
    };
    wx.navigateTo({
      url: "/pages/detail/chat/index?username=" + JSON.stringify(nameList)
    });
  },
  into_chatRoom: function (event) {
    let detail = event.currentTarget.dataset.item;
      this.into_singleChatRoom(detail)
    
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
    this.setData({
      arr: this.getChatList(),
      unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
    });
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