const http = require('../../../utils/util.js');
import {
	apis
} from '../../../utils/api.js';


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		type: 1,
		btnText: '下一步',
		error: false,
		errorText: '',
		visiblePwd: false,
		passwordType: true,
		mobileFlag: false,
		passwordFlag: false,
		codeFlag: false,
		disabled: false,
		disabledBtn: false,
		loading: false,
		currentTime: 61,
		vcode: false,
		vcodeFlag: false,
		timeText: '发送验证码',
		captchaUrl: '',
		captchaUuid: '',
		captcha: '',
		formData: {
			mobile: '',
			password: '',
			code: ''
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

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
	/**
	 * 获取验证码
	 */
	getCode: function() {

		let self = this;
		let currentTime = this.data.currentTime;

		let interval = setInterval(function() {

			currentTime--;

			self.setData({
				timeText: currentTime + 's'
			});


			if (currentTime <= 0) {

				clearInterval(interval);
				self.setData({
					timeText: '重新发送',
					currentTime: 61,
					disabled: false
				});

			}
		}, 1000)
	},
	/**
	 * 发送验证码
	 */
	getVerificationCode: function(e) {

		//验证必填手机号
		if (this.data.formData.mobile) {

			//验证是否发送了验证码
			if (this.data.captchaUuid) {

				//是否填写了验证码
				if (this.data.captcha) {
					http.getData(apis.getRegistCode, 'GET', {
						captchaUuid: this.data.captchaUuid,
						captcha: this.data.captcha,
						mobile: this.data.formData.mobile,
						code_type: 3
					}, (res) => {
						if (res.err_code === 0) {
							this.getCode();
							this.setData({
								disabled: true
							});
						} else if (res.err_code === 500) {
							//图形验证码不正确的时候
							this.refreshVerification();
							wx.showToast({
								title: res.err_msg,
								icon: 'none',
								duration: 2000
							});
						} else {
							wx.showToast({
								title: res.err_msg,
								icon: 'none',
								duration: 2000
							});
						}
					}, true);
				} else {
					this.setData({
						error: true,
						errorText: '图形验证码不能为空',
						vcodeFlag: true
					});
				}

			} else {
				this.refreshVerification();
			}
		} else {
			this.setData({
				error: true,
				errorText: '手机号不能为空',
				mobileFlag: true
			});
		}

	},
	/**
	 * 刷新图形验证码
	 */
	refreshVerification: function() {

		this.setData({
			vcode: true
		});

		http.getData(apis.captchaInfo, 'GET', null, (res) => {
			this.setData({
				captchaUrl: res.captchaUrl,
				captchaUuid: res.captchaUuid
			});
		});
	},
	/**
	 * 校验字段
	 */
	bindinputFn: function(e) {
		let value = e.detail.value
		let reg_mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
		let reg_pwd = /^[0-9A-Za-z]{6,}$/;

		if (e.currentTarget.dataset.type == 1) {

			if (value) {

				this.setData({
					error: true,
					errorText: '请填写正确的手机号',
					mobileFlag: true
				});

				if (reg_mobile.test(value)) {

					this.setData({
						'formData.mobile': value,
						error: false,
						errorText: '',
						mobileFlag: false
					});
				}
			}

		} else if (e.currentTarget.dataset.type == 2) {

			if (value) {
				this.setData({
					'formData.code': value,
					error: false,
					errorText: '',
					codeFlag: false
				});
			}

		} else if (e.currentTarget.dataset.type == 3) {

			if (value) {
				this.setData({
					captcha: value
				});
				this.setData({
					error: false,
					errorText: '',
					vcodeFlag: false
				});
			}

		} else if (e.currentTarget.dataset.type == 4) {

			if (value) {
				this.setData({
					error: true,
					errorText: '密码由字母和数字组成，且不能少于6位',
					passwordFlag: true
				});

				if (reg_pwd.test(value)) {

					this.setData({
						'formData.password': value,
						error: false,
						errorText: '',
						passwordFlag: false
					});

				}
			}

		}

	},
	/**
	 * 校验字段
	 */
	calcForm: function(val, type) {
		let mobile = val.mobile;
		let code = val.code;
		let password = val.password;
		let reg_mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
		let reg_pwd = /^[0-9A-Za-z]{6,}$/;

		if (!mobile && type == 1) {

			this.setData({
				error: true,
				errorText: '手机号不能为空',
				mobileFlag: true
			});
			return false;
		}

		if (!reg_mobile.test(mobile) && type == 1) {

			this.setData({
				error: true,
				errorText: '请填写正确的手机号',
				mobileFlag: true
			});
			return false;
		}


		if (!code && type == 1) {

			this.setData({
				error: true,
				errorText: '验证码不能为空',
				codeFlag: true
			});
			return false;
		}

		if (!password && type == 2) {

			this.setData({
				error: true,
				errorText: '密码不能为空',
				mobileFlag: false,
				passwordFlag: true
			});
			return false;
		}

		if (!reg_pwd.test(password) && type == 2) {

			this.setData({
				error: true,
				errorText: '密码由字母和数字组成，且不能少于6位',
				mobileFlag: false,
				passwordFlag: true
			});
			return false;
		}

		this.setData({
			error: false,
			errorText: '',
			codeFlag: false,
			mobileFlag: false
		});

		return true;
	},
	/**
	 *忘记密码
	 */
	formSubmit: function(e) {

		if (this.data.type == 1) {

			//第一步
			if (this.calcForm(e.detail.value, 1)) {

				this.setData({
					type: 2,
					btnText: '设置密码'
				});

			}

		} else if (this.data.type == 2) {

			//第二步
			if (this.calcForm(e.detail.value, 2)) {
				let params = {
					mobile: this.data.formData.mobile,
					code: this.data.formData.code,
					password: this.data.formData.password
				}

				http.getData(apis.resetPassword, 'POST', params, (res) => {
					if (res.err_code === 0) {
						this.setData({
							type: 3
						});
					} else {
						wx.showToast({
							title: res.err_msg,
							icon: 'none',
							duration: 2000
						});
						this.refreshVerification();
						this.setData({
							type: 1,
							btnText: '下一步'
						});
					}
				});

			}
		}

	},
	/**
	 * 密码是否可见
	 */
	toggleFn: function(e) {

		if (this.data['visiblePwd']) {

			this.setData({
				visiblePwd: false,
				passwordType: true
			});

		} else {

			this.setData({
				visiblePwd: true,
				passwordType: false
			});

		}
	}
})
