const WebIM = require("utils/WebIM")["default"];
let msgStorage = require("components/chat/msgstorage");
let msgType = require("components/chat/msgtype");
let disp = require("utils/broadcast");
function calcUnReadSpot(message) {
  let myName = wx.getStorageSync("myUsername");
  let allMembers = wx.getStorageSync("member") || []; //好友
  let count = allMembers.reduce(function (result, curMember, idx) {
    let chatMsgs = wx.getStorageSync(curMember.toLowerCase() + myName.toLowerCase()) || [];

    return result + chatMsgs.length;
  }, 0);
  getApp().globalData.unReadMessageNum = count;
  disp.fire("em.xmpp.unreadspot", message);
}
function onMessageError(err) {
  if (err.type === "error") {
    wx.showToast({
      title: err.errorText
    });
    return false;
  }
  return true;
}
function addMember(id) {
  let member = wx.getStorageSync("member") || [];
  let index = member.indexOf(id);
  if (index == -1) {
    member.push(id)
  }
  wx.setStorage({
    key: "member",
    data: member
  });
}

App({
  globalData: {
    unReadMessageNum: 0,
    isIPX: false //是否为iphone X
  },
  conn: {
    closed: false,
    curOpenOpt: {},
    open(opt) {
     /* wx.showLoading({
        title: '正在初始化客户端...',
        mask: true
      }) */
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
  },
  onLaunch() {
    let me = this;

    //验证用户是否登录状态
    wx.getStorage({
      key: 'access_token',
      success(res) {
        if(res.data){

          // wx.switchTab({
          //   url: '/pages/tab/home/home'
          // });

        }
      }
    })


    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权
          // wx.switchTab({
          //   url: '/pages/tab/home/home'
          // })
        }
      }
    })


    wx.setStorage({
      key: "myUsername",
      data: '18271408717'
    });

    this.conn.open({
      apiUrl: WebIM.config.apiURL,
      user: '18271408717',
      pwd: '123456',
      appKey: WebIM.config.appkey
    });


    WebIM.conn.listen({
      onOpened(message) {

      },
      onReconnect() {
        wx.showToast({
          title: "重连中...",
          duration: 2000
        });
      },
      onSocketConnected() {
       /* wx.showToast({
          title: "socket连接成功",
          duration: 2000
        }); */
      },
      onClosed() {
        wx.showToast({
          title: "网络已断开",
          icon: 'none',
          duration: 2000
        });
        me.conn.closed = true;
        WebIM.conn.close();
      },
      onCmdMessage(message) {

      },
      onTextMessage(message) {
        addMember(message.from)
        if (message) {
          if (onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.TEXT);
          }
          calcUnReadSpot(message);
        }


      },
      onPictureMessage(message) {

      },
      // 各种异常
      onError(error) {
        console.log(error)
      },
    });
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
  },

});

