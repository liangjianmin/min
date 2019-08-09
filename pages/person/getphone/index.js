const http = require('../../../utils/util.js');
import {
	apis
} from '../../../utils/api.js';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
	/**
	 * 一键获取手机号
	 */
	getPhoneNumber(e) {
		if (e.detail.errMsg == 'getPhoneNumber:ok') {

			http.getData(apis.getwxUserInfo, 'GET', {
				openid: wx.getStorageSync('openid'),
				session_key: wx.getStorageSync('session_key'),
				encryptedData: e.detail.encryptedData,
				iv: e.detail.iv
			}, (res) => {
				if (res.err_code === 0) {
					//注入token
					wx.setStorage({
						key: "access_token",
						data: res.data.access_token
					});

					//登录环信帐号
					getApp().getImUser();

					wx.switchTab({
						url: '/pages/tab/home/home'
					});
				}
			}, true);

		} else {
			//用户拒绝获取手机
			wx.navigateTo({
				url: '/pages/person/login/index'
			});
		}
	}
})