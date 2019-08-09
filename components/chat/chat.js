let msgStorage = require("msgstorage");
let msgType = require("msgtype");

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
	},
	data: {
		__comps__: {
			msglist: null,
			inputbar: null
		},
	},
	methods: {
		normalScroll(){
			this.data.__comps__.msglist.normalScroll();
			this.data.__comps__.inputbar.cancelEmoji();
		},

		shortScroll(){
			this.data.__comps__.msglist.shortScroll();
		},

		saveSendMsg(evt){
      msgStorage.saveMsg(evt.detail.msg, evt.detail.type);
      if ((evt.detail.type !== 'cmd') && (!evt.detail.customer)){
        this.data.__comps__.inputbar.cancelEmoji();
      }
		}
  	},

	// lifetimes
	created(){},
	attached(){},
	ready(){
		this.data.__comps__.inputbar = this.selectComponent("#chat-inputbar");
		this.data.__comps__.msglist = this.selectComponent("#chat-msglist");
    
	},
	moved(){},
	detached(){
	},

});
