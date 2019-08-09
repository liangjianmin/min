// pages/detail/chat/index.js
let disp = require("../../../utils/broadcast");

Page({
  data: {
    isShowTip: true,
    username: {
      your: "",
    },
  },

  // options = 系统传入的 url 参数
  onLoad(options) {
    let username = JSON.parse(options.username);
    this.setData({ username: username });
    console.log(username)
    if (getApp().globalData.customerNum == username.your){
      wx.setNavigationBarTitle({
        title: 'IC助手客服'
      });
    }else{
      wx.setNavigationBarTitle({
        title: username.title
      });
    }
  
  },

  onUnload() {
    disp.fire("em.chatroom.leave");
  },
  closeTip: function () {
    this.setData({
      isShowTip: false
    })
  }

});
