import {
	apis
} from './api.js';


//数据请求(get,post)
const getData = (url, type, param, callBack, loading, isheader) => {
	wx.showNavigationBarLoading();

	//获取token
	var token, header;
	wx.getStorage({
		key: 'access_token',
		success(res) {
			if (res.data) {
				token = res.data;
			}
		}
	});

	//参数字段追加来源字段
	var params = Object.assign({}, param, {
		source: 1
	});

	//是否启用loading加载效果
	if (loading) {
		wx.showLoading();
	}

	//是否启用请求头token
	if (isheader) {
		header = {
			"Content-Type": "applciation/json",
			"Authorization": 'Bearer ' + token
		}
	} else {
		header = {
			"Content-Type": "applciation/json"
		}
	}

	wx.request({
		url: url,
		data: params,
		header: header,
		method: type,
		success: (res) => {

			//处理token失效的情况
			if (res.data.hasOwnProperty('data')) {
				if (res.data.data.err_code === 501 || res.data.data.errcode === 501) {
					wx.navigateTo({
						url: '/pages/person/login/index'
					});
				} else {
					typeof callBack == "function" && callBack(res.data, "");
				}
			} else {
				typeof callBack == "function" && callBack(res.data, "");
			}

			wx.hideNavigationBarLoading();

			wx.hideLoading();

		},
		fail: (err) => {

			typeof callBack == "function" && callBack(null, err.errMsg);

			console.log(err);

			wx.hideNavigationBarLoading();

			wx.hideLoading();

		}
	})
};

//上传文件
const uploadFile = (paths, callBack) => {
	let gUrl = getApp().globalUrl;
	showLoading('正在上传', true)
	for (var i = 0; i < paths.length; i++) {
		wx.uploadFile({
			url: gUrl.baseUrl + gUrl.uploadImg,
			filePath: paths[i],
			name: 'file',
			success: (res) => {
				var data = JSON.parse(res.data);
				if (data.suc == 'y') {
					callBack({
						imgSrc: data.data.file.url,
						image_id: data.data.file.image_id
					})
				} else {
					showModal(data.msg);
				}
			},
			fail: () => {
				showModal("上传图片失败！");
			},
			complete: () => {
				wx.hideLoading();
			}
		})
	}
};

const chooseImg = (num, callback) => {
	wx.chooseImage({
		count: num,
		success: (res) => {
			var arr = [];
			uploadFile(res.tempFilePaths, (rtn) => {
				arr.push(rtn)
				if (arr.length === res.tempFilePaths.length) {
					callback(arr)
				}
			})
		}
	})
};
module.exports = {
	getData: getData,
	chooseImg: chooseImg
}
