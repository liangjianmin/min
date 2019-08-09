let Disp = require("../../utils/Dispatcher");
let msgPackager = require("msgpackager");
let msgType = require("msgtype");
let msgStorage = new Disp();
msgStorage.saveReceiveMsg = function (receiveMsg, type) {
	let sendableMsg;
	if (type == msgType.IMAGE) {
		sendableMsg = {
			id: receiveMsg.id,
			type: type,
			body: {
				id: receiveMsg.id,
				from: receiveMsg.from,
				to: receiveMsg.to,
				type: receiveMsg.type,
				ext: receiveMsg.ext,
				chatType: receiveMsg.type,
				body: {
					type: type,
					url: receiveMsg.url,
					filename: receiveMsg.filename,
					filetype: receiveMsg.filetype,
					size: {
						width: receiveMsg.width,
						height: receiveMsg.height
					},
				},
			},
		};
  } else if (type == msgType.TEXT || type == msgType.EMOJI || type == msgType.CMD) {
		sendableMsg = {
			id: receiveMsg.id,
			type: type,
			body: {
				id: receiveMsg.id,
				from: receiveMsg.from,
				to: receiveMsg.to,
				type: receiveMsg.type,
				ext: receiveMsg.ext,
				chatType: receiveMsg.type,
				body: {
					type: type,
					msg: receiveMsg.data,
				},
			},
			value: receiveMsg.data
		};
	} else {
		return;
	}
	this.saveMsg(sendableMsg, type);
};
msgStorage.saveMsg = function (sendableMsg, type) {
	let me = this;
	let myName = wx.getStorageSync("myUsername");
	let sessionKey;
	sessionKey = sendableMsg.body.from == myName ?
	sendableMsg.body.to + myName :
	sendableMsg.body.from + myName;
	let curChatMsg = wx.getStorageSync(sessionKey) || [];
	let renderableMsg = msgPackager(sendableMsg, type, myName);
	curChatMsg.push(renderableMsg);
	save();

	function save() {
		wx.setStorage({
			key: sessionKey,
			data: curChatMsg,
			success() {
				me.fire("newChatMsg", renderableMsg, type, curChatMsg, sessionKey);
			}
		});
	}
};

module.exports = msgStorage;