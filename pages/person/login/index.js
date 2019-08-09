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
      mobile: '',
      password: ''
    }
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
   * 校验字段
   */
  calcForm: function (val, type) {

    let mobile = val.mobile;
    let password = val.password;
    let reg_mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    let reg_pwd = /^[0-9A-Za-z]{6,}$/;


    if (!mobile) {

      this.setData({
        error: true,
        errorText: '手机号不能为空',
        mobileFlag: true
      });
      return false;
    }

    if (!reg_mobile.test(mobile)) {

      this.setData({
        error: true,
        errorText: '请填写正确的手机号',
        mobileFlag: true
      });
      return false;
    }


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
      passwordFlag: false,
      mobileFlag: false
    });

    return true;
  },
  /**
   * 校验字段
   */
  bindinputFn: function (e) {
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
          wx.hideKeyboard();
          this.setData({
            error: false,
            errorText: '',
            mobileFlag: false
          });

        }
      }

    } else {

      if (value) {

        this.setData({
          error: true,
          errorText: '密码由字母和数字组成，且不能少于6位',
          passwordFlag: true
        });

        if (reg_pwd.test(value)) {

          this.setData({
            error: false,
            errorText: '',
            passwordFlag: false
          });

        }

      }
    }

  },
  /**
   * 登录
   */
  formSubmit: function (e) {

    var self = this;

    if (this.calcForm(e.detail.value)) {

      self.setData({
        disabled: true,
        loading: true
      });

      http.getData(apis.authlogin, 'POST', e.detail.value, function (res) {

        if (res.err_code === 0) {

          //注入token
          wx.setStorage({
            key: "access_token",
            data: res.data.access_token
          });

          //注入用户id
          wx.setStorage({
            key: "user_id",
            data: res.data.user_id
          });


          //登录环信帐号
          getApp().getImUser();


          wx.switchTab({
            url: '/pages/tab/home/home'
          })

        } else {

          wx.showToast({
            title: res.err_msg,
            icon: 'none',
            duration: 2000
          });
        }

        self.setData({
          disabled: false,
          loading: false
        });

      });

    }

  },
  /**
   * 密码是否可见
   */
  toggleFn: function (e) {

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