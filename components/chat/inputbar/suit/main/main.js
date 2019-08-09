let WebIM = require("../../../../../utils/WebIM")["default"];
let msgType = require("../../../msgtype");
let disp = require("../../../../../utils/broadcast");
Component({
  properties: {
    username: {
      type: Object,
      value: {},
    },
    chatType: {
      type: String,
      value: msgType.chatType.SINGLE_CHAT,
    },
    isTopic: {
      type: String,
      value: ""
    }
  },
  data: {
    inputMessage: "", // render input 的值
    userMessage: "", // input 的实时值
    template: null,
  },

  methods: {
    focus() {
      this.triggerEvent("inputFocused", null, {
        bubbles: true
      });
    },

    blur() {
      this.triggerEvent("inputBlured", null, {
        bubbles: true
      });
    },
    // bindinput 不能打冒号！
    bindMessage(e) {
      this.setData({
        userMessage: e.detail.value
      });
    },

    emojiAction(emoji) {
      var str;
      var msglen = this.data.userMessage.length - 1;
      if (emoji && emoji != "[del]") {
        str = this.data.userMessage + emoji;
      }
      this.setData({
        userMessage: str,
        inputMessage: str
      });
    },

    sendMessage() {
      if (this.data.isTopic) {
        this.triggerEvent(
          "newTextMsg", {
            type: '1'
          }, {
            bubbles: true,
            composed: true
          }
        );
        this.setData({
          userMessage: "",
          inputMessage: "",
        });
        return
      };
      let me = this;
      let customer = wx.getStorageSync('customer') || '';
      if (customer) {
        wx.removeStorageSync('customer');
      }
      String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, '');
      }
      if (!this.data.userMessage.trim()) {
        return;
      }
      let id = WebIM.conn.getUniqueId();
      let msg = new WebIM.message(msgType.TEXT, id);
      let userId = wx.getStorageSync('user_id');
      let companyName = wx.getStorageSync('company_name');
      let avatar = wx.getStorageSync('avatar');
      msg.set({
        msg: this.data.userMessage,
        from: this.data.username.myName,
        to: this.data.username.your,
        ext: {
          id: userId,
          name: companyName,
          img: avatar,
          touserid: this.data.username.id == userId ? this.data.username.touserid : this.data.username.id,
          name1: this.data.username.name == companyName ? this.data.username.name1 : this.data.username.name,
          img1: this.data.username.name == companyName ? this.data.username.img1 : this.data.username.img,
          timer: WebIM.time()
        },
        roomType: false,
        chatType: this.data.chatType,
        success(id, serverMsgId) {
          console.log('发送消息成功')
          disp.fire('em.chat.sendSuccess', id, me.data.userMessage);
        },
        fail(id, serverMsgId) {
          console.log('发送消息失败')
        }
      });
      WebIM.conn.send(msg.body);
      this.triggerEvent(
        "newTextMsg", {
          msg: msg,
          type: msgType.TEXT,
          customer: customer ? true : false
        }, {
          bubbles: true,
          composed: true
        }
      );
      //
      this.setData({
        userMessage: "",
        inputMessage: "",
      });
    },
    sendCmd: function() {
      let me = this;
      let id = WebIM.conn.getUniqueId();
      let msg = new WebIM.message(msgType.CMD, id);
      let userId = wx.getStorageSync('user_id');
      let companyName = wx.getStorageSync('company_name');
      let avatar = wx.getStorageSync('avatar');
      let params = Object.assign({}, me.data.template, {
        id: userId,
        name: companyName,
        img: avatar,
        touserid: this.data.username.id == userId ? this.data.username.touserid : this.data.username.id,
        name1: this.data.username.name == companyName ? this.data.username.name1 : this.data.username.name,
        img1: this.data.username.name == companyName ? this.data.username.img1 : this.data.username.img,
        timer: WebIM.time()
      });
      msg.set({
        msg: 'template',
        from: me.data.username.myName,
        to: me.data.username.your,
        action: "template",
        ext: params,
        success: function() {
          console.log('发送模板成功')
          console.log(me.data.username.your)
          // getApp().addChatMember(me.data.username.your)
          disp.fire('em.chat.sendSuccess', id);
        },
        fail: function() {
          console.log('发送模板失败');
        }
      });
      getApp().addChatMember(me.data.username.your)
      WebIM.conn.send(msg.body);
      this.triggerEvent(
        "newTextMsg", {
          msg: msg,
          type: msgType.CMD,
        }, {
          bubbles: true,
          composed: true
        }
      );
    }
  },

  // lifetimes
  created() {

  },
  attached() {

  },
  moved() {

  },
  detached() {},
  ready() {
    let template = wx.getStorageSync('template') || '';
    let customer = wx.getStorageSync('customer') || '';
    if (template) {
      this.setData({
        template: template
      });
      wx.removeStorageSync('template');
      this.sendCmd();
    };
    if (customer) {
      this.setData({
        userMessage: customer
      });
      this.sendMessage();
    }
  },
});