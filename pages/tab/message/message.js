// pages/tab/message/message.js
let disp = require("../../../utils/broadcast");
let WebIM = require("../../../utils/WebIM")["default"];
import {
  judgeToken
} from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unReadSpotNum: 0,
    arr: null,
    userId: "",
    customer: {},
    isCustomer: true,
    isShowTip: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (judgeToken(true)) {
      let me = this;
      let my = wx.getStorageSync("myUsername");
      //监听未读消息数
      disp.on("em.xmpp.unreadspot", function(message) {
        if (getApp().globalData.customerNum != my) {
          me.getCustom();
        }
        me.setData({
          arr: me.getChatList(),
          unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
        });
      });
    }

  },
  getCustom: function() {
    let my = wx.getStorageSync("myUsername");
    let companyName = wx.getStorageSync("company_name") || '';
    let userId = wx.getStorageSync("user_id") || '';
    let avatar = wx.getStorageSync("avatar") || '';
    let newChatMsgs = wx.getStorageSync(getApp().globalData.customerNum + my) || [];
    let historyChatMsgs = wx.getStorageSync("rendered_" + getApp().globalData.customerNum + my) || [];
    let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
    if (curChatMsgs.length) {
      let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
      let dateArr = lastChatMsg.time.split(' ')[0].split('-')
      let timeArr = lastChatMsg.time.split(' ')[1].split(':')
      let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2];
      lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`;
      lastChatMsg.unReadCount = newChatMsgs.length;
      if (lastChatMsg.unReadCount > 99) {
        lastChatMsg.unReadCount = "99+";
      }
      this.setData({
        customer: lastChatMsg
      })
    } else {
      this.setData({
        customer: {
          username: getApp().globalData.customerNum,
          ext: {
            name: getApp().globalData.customerName,
            name1: companyName,
            id: userId,
            touserid: '',
            img: '',
            img1: avatar
          },
          name: getApp().globalData.customerName,
          unReadCount: 0

        }
      })
    }

  },
  getChatList() {
    let array = [];
    let member = wx.getStorageSync("member");
    let myName = wx.getStorageSync("myUsername");
    for (let i = 0; i < member.length; i++) {
      if (member[i] !== getApp().globalData.customerNum) {
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
    }

    array.sort((a, b) => {
      return b.dateTimeNum - a.dateTimeNum
    })
    console.log(array)
    return array;
  },

  into_singleChatRoom: function(detail) {
    let my = wx.getStorageSync("myUsername");
    let nameList = {
      myName: my,
      your: detail.username,
      name: detail.ext.name,
      name1: detail.ext.name1,
      id: detail.ext.id,
      touserid: detail.ext.touserid,
      title: detail.name,
      img: detail.ext.img,
      img1: detail.ext.img1
    };
    wx.navigateTo({
      url: "/pages/detail/chat/index?username=" + JSON.stringify(nameList)
    });
  },
  into_chatRoom: function(event) {
    let detail = event.currentTarget.dataset.item;
    this.into_singleChatRoom(detail)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function() {
    let my = wx.getStorageSync("myUsername");
    if (getApp().globalData.customerNum != my) {
      this.getCustom();
      this.setData({
        isCustomer: false
      })
    } else {
      this.setData({
        isCustomer: true
      })
    }
    this.setData({
      arr: this.getChatList(),
      userId: wx.getStorageSync('user_id'),
      unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
    });
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
  deleteChatItem: function(e) { //拉黑
    this.del_chat(e, 2)
  },
  deleteChat: function(e) { //删除记录
    this.del_chat(e, 1)
  },
  del_chat: function(event, type) {
    let detail = event.currentTarget.dataset.item;
    let your = detail.username;
    let myName = wx.getStorageSync("myUsername");
    let currentPage = getCurrentPages();
    let title = type == 1 ? '是否删除记录' : '是否加入黑名单？'
    wx.showModal({
      title: title,
      confirmText: "确定",
      success: function(res) {
        if (res.confirm) {
          if (type == 1) {
            let member = wx.getStorageSync('member');
            let index = member.indexOf(your);
            member.splice(index, 1);
            wx.setStorageSync('member', member)
            wx.removeStorageSync(your + myName);
            wx.removeStorageSync("rendered_" + your + myName);
            if (currentPage[0]) {
              currentPage[0].onShow();
            }
            disp.fire("em.chat.session.remove");
          } else {
            let list = {
              your: {
                jid: WebIM.config.appkey + '_' + your + '@easemob.com',
                name: your,
                order: 1,
              },
            };
            WebIM.conn.addToBlackList({
              list: list,
              type: 'jid',
              success: function() {
                let member = wx.getStorageSync('member');
                let index = member.indexOf(your);
                member.splice(index, 1);
                wx.setStorageSync('member', member)
                wx.removeStorageSync(your + myName);
                wx.removeStorageSync("rendered_" + your + myName);
                if (currentPage[0]) {
                  currentPage[0].onShow();
                }
                disp.fire("em.chat.session.remove");
              },
              error: function() {
                wx.showToast({
                  title: '加入黑名单失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            });
          }


        }
      },
      fail: function(err) {}
    });
  },
  closeTip: function() {
    this.setData({
      isShowTip: false
    })
  }
})