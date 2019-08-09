let WebIM = require("../../utils/WebIM")["default"];
let msgType = require("msgtype");

module.exports = function (sendableMsg, type, myName) {
	var time = WebIM.time();
	var renderableMsg = {
		info: {
			from: sendableMsg.body.from,
			to: sendableMsg.body.to
		},
		username: sendableMsg.body.from == myName ? sendableMsg.body.to : sendableMsg.body.from,
		yourname: sendableMsg.body.from,
		name:sendableMsg.body.from == myName ? sendableMsg.body.ext.name1: sendableMsg.body.ext.name,
    img: sendableMsg.body.from == myName ? sendableMsg.body.ext.img1: sendableMsg.body.ext.img,
		msg: {
			type: type,
			url: sendableMsg.body.body.url,
			data: getMsgData(sendableMsg, type),
		},
		ext:sendableMsg.body.ext,
		style: sendableMsg.body.from == myName ? "self" : "",
		time: time,
		mid: sendableMsg.type + sendableMsg.id,
		chatType: sendableMsg.body.chatType
	};
	if (type == msgType.IMAGE) {
		renderableMsg.msg.size = {
			width: sendableMsg.body.body.size.width,
			height: sendableMsg.body.body.size.height,
		};
	}
	return renderableMsg;

	function getMsgData(sendableMsg, type) {
		if (type == msgType.TEXT) {
			return WebIM.parseEmoji(sendableMsg.value.replace(/\n/mg, ""));
		} else if (type == msgType.EMOJI) {
			return sendableMsg.value;
		} else if (type == msgType.IMAGE) {
			return sendableMsg.body.body.url;
		}
		return "";
	}
};