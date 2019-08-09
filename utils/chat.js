import {
  getData
} from '../utils/util.js';
import {
  apis
} from '../utils/api.js';
const WebIM = require("./WebIM")["default"];
let msgStorage = require("../components/chat/msgstorage");
let msgType = require("../components/chat/msgtype");
let disp = require("./broadcast");
let conn = {
  closed: false,
  curOpenOpt: {},
  open(opt) {
    this.curOpenOpt = opt;
    WebIM.conn.open(opt);
    this.closed = false;
  },
  reopen() {
    if (this.closed) {
      WebIM.conn.open(this.curOpenOpt);
      this.closed = false;
    }
  }
};
const calcUnReadSpot = (message) => {
  let myName = wx.getStorageSync("myUsername");
  let allMembers = wx.getStorageSync("member") || []; //好友
  let count = allMembers.reduce(function(result, curMember, idx) {
    let chatMsgs = wx.getStorageSync(curMember.toLowerCase() + myName.toLowerCase()) || [];
    return result + chatMsgs.length;
  }, 0);
  getApp().globalData.unReadMessageNum = count;
  disp.fire("em.xmpp.unreadspot", message);
}
const onMessageError = (err) => {
  if (err.type === "error") {
    wx.showToast({
      title: err.errorText
    });
    return false;
  }
  return true;
}
const getImUser = () => {
  let token = wx.getStorageSync('access_token') || ''
  getData(apis.authme, 'get', {
    "token": token,
  }, function(res) {
    if (res.err_code == 0) {
      wx.setStorageSync('user_id', res.data.user_id + '');
      wx.setStorageSync('avatar', res.data.avatar);
      wx.setStorageSync('company_name', res.data.company_name);
      wx.setStorageSync("myUsername", res.data.im_username);
      conn.open({
        apiUrl: WebIM.config.apiURL,
        user: res.data.im_username,
        pwd: res.data.im_password,
        appKey: WebIM.config.appkey
      })

    } else {
      console.log('获取环信账号失败')
    }
  }, false)
};
const webimListen = () => {
  let my = wx.getStorageSync('myUsername') || '';
  WebIM.conn.listen({
    onOpened(message) {
      WebIM.conn.setPresence();
    },
    onReconnect() {
      // wx.showToast({
      //   title: "重连中...",
      //   duration: 2000
      // });
    },
    onSocketConnected() {
      /* wx.showToast({
         title: "socket连接成功",
         duration: 2000
       }); */
    },
    onClosed() {
      // wx.showToast({
      //   title: "网络已断开",
      //   icon: 'none',
      //   duration: 2000
      // });
      me.conn.closed = true;
      WebIM.conn.close();
    },
    onCmdMessage(message) {
      if (message) {
        if (onMessageError(message)) {
          getApp().addChatMember(message.from);
          msgStorage.saveReceiveMsg(message, msgType.CMD);
        }
        calcUnReadSpot(message);
      }
    },
    onTextMessage(message) {
      if (message) {
        if (onMessageError(message)) {
          if (getApp().globalData.customerNum != my) {
            getApp().addChatMemberStorage(message.from);
          } else {
            getApp().addChatMember(message.from);
          }
          msgStorage.saveReceiveMsg(message, msgType.TEXT);
        }
        calcUnReadSpot(message);
      }


    },
    onEmojiMessage(message) {
      if (message) {
        if (onMessageError(message)) {
          if (getApp().globalData.customerNum != my) {
            getApp().addChatMemberStorage(message.from);
          } else {
            getApp().addChatMember(message.from);
          }
          msgStorage.saveReceiveMsg(message, msgType.EMOJI);
        }
        calcUnReadSpot(message);
      }
    },
    onPictureMessage(message) {
      if (message) {
        if (onMessageError(message)) {
          if (getApp().globalData.customerNum != my) {
            getApp().addChatMemberStorage(message.from);
          } else {
            getApp().addChatMember(message.from);
          }
          msgStorage.saveReceiveMsg(message, msgType.IMAGE);
        }
        calcUnReadSpot(message);
      }
    },
    // 各种异常
    onError(error) {
      if (error.type == 8) {
        wx.showModal({
          title: '提示',
          content: '您的聊天账号被迫下线!',
          showCancel: false
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '聊天系统出现异常!',
          showCancel: false
        })
      }
    },
  });
};
module.exports = {
  webimListen: webimListen,
  conn: conn,
  getImUser: getImUser
}