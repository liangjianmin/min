const http = require('../../../utils/util.js');
import {
  apis
} from '../../../utils/api.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: false,
    errorText: '',
    visiblePwd: false,
    passwordType: true,
    mobileFlag: false,
    passwordFlag: false,
    disabled: false,
    loading: false,
    formData: {
      password: ''
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
   * 校验字段
   */
  bindinputFn: function(e) {
    let value = e.detail.value
    let reg_pwd = /^[0-9A-Za-z]{6,}$/;

    if (e.currentTarget.dataset.type == 4) {

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
    let password = val.password;
    let reg_pwd = /^[0-9A-Za-z]{6,}$/;

    if (!password) {

      this.setData({
        error: true,
        errorText: '密码不能为空',
        mobileFlag: false,
        passwordFlag: true
      });
      return false;
    }

    if (!reg_pwd.test(password)) {

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
   *设置密码
   */
  formSubmit: function(e) {
    if (this.calcForm(e.detail.value)) {

      this.setData({
        disabled: true,
        loading: true
      });

      http.getData(apis.editPwd, 'POST', e.detail.value, (res) => {
        if (res.err_code === 0) {
          wx.navigateBack({
            delta: 2
          });
        } else {
          this.setData({
            disabled: false,
            loading: false
          });

          wx.showToast({
            title: res.err_msg,
            icon: 'none',
            duration: 2000
          });
        }
      },true,true);

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