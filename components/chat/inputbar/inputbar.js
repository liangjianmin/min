
let msgType = require("../msgtype");

Component({
	properties: {
		username: {
			type: Object,
			value: {}
		},
		chatType: {
			type: String,
			value: msgType.chatType.SINGLE_CHAT,
		},
    isTopic:{
      type:String,
      value:""
    }
	},
	data: {
		__comps__: {
			main: null,
			emoji: null,
			image: null,
		
		},
	},
	methods: {
		// 事件有长度限制：仅限 26 字符
		openEmoji(){
			this.data.__comps__.emoji.openEmoji();
		},

		cancelEmoji(){
			this.data.__comps__.emoji.cancelEmoji();
		},

		sendImage(){
			this.data.__comps__.image.sendImage();
		},

		
		emojiAction(evt){
			this.data.__comps__.main.emojiAction(evt.detail.msg);
		},
	},

	// lifetimes
	created(){},
	attached(){},
	moved(){},
	detached(){},
  ready() {
    this.setData({
      isIPX: getApp().globalData.isIPX
    })
    let comps = this.data.__comps__;
    comps.main = this.selectComponent("#chat-suit-main");
    comps.emoji = this.selectComponent("#chat-suit-emoji");
    comps.image = this.selectComponent("#chat-suit-image");
  },
});
