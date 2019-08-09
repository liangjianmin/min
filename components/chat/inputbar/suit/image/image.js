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
	},
	data: {

	},
	methods: {
		sendImage(){
			let me = this;
			wx.chooseImage({
				count: 1,
				sizeType: ["original", "compressed"],
				sourceType: ["album"],
				success(res){
					me.upLoadImage(res);
				},
			});
		},

		isGroupChat(){
			return this.data.chatType == msgType.chatType.CHAT_ROOM;
		},

		getSendToParam(){
			return this.isGroupChat() ? this.data.username.groupId : this.data.username.your;
		},

		upLoadImage(res){
			let me = this;
			let tempFilePaths = res.tempFilePaths;
			let token = WebIM.conn.context.accessToken
			wx.getImageInfo({
				src: res.tempFilePaths[0],
				success(res){
					let allowType = {
						jpg: true,
						gif: true,
						png: true,
						bmp: true
					};
					let str = WebIM.config.appkey.split("#");
					let width = res.width;
					let height = res.height;
					let index = res.path.lastIndexOf(".");
					let filetype = (~index && res.path.slice(index + 1)) || "";
					if(filetype.toLowerCase() in allowType){
						wx.uploadFile({
							url: "https://a1.easemob.com/" + str[0] + "/" + str[1] + "/chatfiles",
							filePath: tempFilePaths[0],
							name: "file",
							header: {
								"Content-Type": "multipart/form-data",
								Authorization: "Bearer " + token
							},
							success(res){
								let data = res.data;
								let dataObj = JSON.parse(data);
								let id = WebIM.conn.getUniqueId();		// 生成本地消息 id
								let msg = new WebIM.message(msgType.IMAGE, id);
								let file = {
									type: msgType.IMAGE,
									size: {
										width: width,
										height: height
									},
									url: dataObj.uri + "/" + dataObj.entities[0].uuid,
									filetype: filetype,
									filename: tempFilePaths[0]
								};
                let userId = wx.getStorageSync('user_id');
                let companyName = wx.getStorageSync('company_name');
                let avatar = wx.getStorageSync('avatar');
								msg.set({
									apiUrl: WebIM.config.apiURL,
									body: file,
									from: me.data.username.myName,
									to: me.getSendToParam(),
                  ext: {
                    id: userId,
                    name: companyName,
                    img: avatar,
                    touserid: me.data.username.id == userId ? me.data.username.touserid : me.data.username.id,
                    name1: me.data.username.name == companyName ? me.data.username.name1 : me.data.username.name,
                    img1: me.data.username.name == companyName ? me.data.username.img1 : me.data.username.img,
                    timer: WebIM.time()
                  },
									roomType: false,
									chatType: me.data.chatType,
									success: function (argument) {
                    console.log('发送图片成功')
										disp.fire('em.chat.sendSuccess', id);
									},
                  fail:function(){
                    console.log('发送图片失败')
                  }
								});
								if(me.data.chatType == msgType.chatType.CHAT_ROOM){
									msg.setGroup("groupchat");
								}
								WebIM.conn.send(msg.body);
								me.triggerEvent(
									"newImageMsg",
									{
										msg: msg,
										type: msgType.IMAGE
									},
									{
										bubbles: true,
										composed: true
									}
								);
							}
						});
					}
				}
			});
		},
	},
});
