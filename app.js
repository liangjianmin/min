const WebIM = require("utils/WebIM")["default"];
const chat = require('utils/chat.js');
import {
  getData,
  judgeToken
} from './utils/util.js';
import {
  apis
} from './utils/api.js';


App({
  globalData: {
    unReadMessageNum: 0,
    auth: wx.getStorageSync('auth'),
    token: wx.getStorageSync('access_token'),
    isIPX: false, //是否为iphone X
    customerNum: "001",
    customerName: "IC助手客服"
  },
  getImUser: chat.getImUser,
  addChatMember: function (id) {

    let token = wx.getStorageSync('access_token') || '';
    this.addChatMemberStorage(id);

    getData(apis.addrecord, 'GET', {
      "token": token,
      "user_id": id
    }, function (res) {
      if (res.errcode === 0) {

      } else {
        console.log('添加聊天成员失败')
      }
    }, false);
  },
  addChatMemberStorage: function (id) {

    let member = wx.getStorageSync("member") || [];
    let index = member.indexOf(id);

    if (index == -1) {
      member.push(id)
    }

    wx.setStorage({
      key: "member",
      data: member
    });
  },
  onLaunch() {

    //验证是否授权
    if (this.globalData.auth) {
      //是否登录
      if (this.globalData.token) {
        // wx.switchTab({
        //   url: '/pages/tab/home/home'
        // });
      } else {
        wx.redirectTo({
          url: '/pages/person/login/index'
        });
      }
    } else {
      wx.redirectTo({
        url: '/pages/person/auth/index'
      });
    }


    if (judgeToken()) {
      this.getImUser();
    }

    chat.webimListen();
    this.checkIsIPhoneX();
  },
  checkIsIPhoneX: function () {
    const me = this
    wx.getSystemInfo({
      success: function (res) {
        // 根据 model 进行判断
        if (res.model.search('iPhone X') != -1) {
          me.globalData.isIPX = true
        }
      }
    })
  }

});