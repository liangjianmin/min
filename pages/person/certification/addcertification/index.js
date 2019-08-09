const http = require('../../../../utils/util.js');
import {
  chooseImg
} from '../../../../utils/util.js';
import {
  apis
} from '../../../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authInfo: {},
    status: true,
    nameText: '公司名称',
    index: 0,
    companyType: [{
      id: 1,
      name: '贸易商'
    }, {
      id: 2,
      name: '代理商'
    }, {
      id: 3,
      name: '原厂'
    }, {
      id: 4,
      name: '制造商'
    }],
    companyTypeText: '请选择经营性质',
    placeholderText: '请输入公司名称',
    name: '',
    imgSrc: '',
    disabled: false,
    loading: false,
    checked: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //更新认证信息
    if (options.id) {

      http.getData(apis.authInfo, 'GET', null, (res) => {

        if (res.errcode === 0) {

          this.setData({
            status: false,
            name: res.data.company_type_val,
            imgSrc: res.data.auth_img,
            checked: res.data.auth_type,
            companyTypeText: res.data.company_type_val,
            placeholderText:res.data.auth_type == 1 ? '请输入个人名称':'请输入公司名称',
            nameText:res.data.auth_type == 1 ? '个人名称':'公司名称',
            authInfo: res.data
          });


          //选中经营性质
          for (let i = 0; i < this.data.companyType.length; i++) {

            if (res.data.company_type_val == this.data.companyType[i].name) {
              this.setData({
                index: i
              });
            }
          }

        }

      }, true, false, true);

    }
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
   * 认证类型
   */
  radioChange: function (e) {

    if (e.detail.value) {

      if (e.detail.value == 1) {
        this.setData({
          nameText: "个人名称",
          placeholderText: '请输入个人名称'
        });
      } else if (e.detail.value == 2) {
        this.setData({
          nameText: "公司名称",
          placeholderText: '请输入公司名称'
        });
      }
    }
  },
  /**
   * 上传资料
   */
  uploadImg: function () {

    chooseImg(apis.ossupload, 1, (res) => {
      if (res) {
        this.setData({
          imgSrc: res,
          status: false
        });
      }
    });
  },
  /**
   * 删除资料
   */
  deleteImg: function () {
    this.setData({
      imgSrc: '',
      status: true
    })
  },
  /**
   * 验证字段
   */
  calcForm: function (val) {
    let company_name = val.company_name;
    let company_type = val.company_type;
    let auth_img = this.data.imgSrc;

    if (!company_name) {

      wx.showToast({
        title: this.data.placeholderText,
        icon: 'none',
        duration: 2000
      });

      return false;
    }

    if (!company_type) {

      wx.showToast({
        title: '请选择经营性质',
        icon: 'none',
        duration: 2000
      });

      return false;
    }

    if (!auth_img) {

      wx.showToast({
        title: '请上传资料',
        icon: 'none',
        duration: 2000
      });

      return false;
    }

    return true;

  },
  /**
   * 认证提交
   */
  formSubmit: function (e) {

    if (this.calcForm(e.detail.value)) {

      this.setData({
        disabled: true,
        loading: true
      });

      let company_type = e.detail.value.company_type * 1 + 1;

      let params = Object.assign({}, e.detail.value, {
        company_type: company_type,
        auth_img: this.data.imgSrc
      });



      http.getData(apis.addAuth, 'GET', params, (res) => {

        if (res.errcode === 0) {

          wx.navigateTo({
            url: '/pages/person/certification/certificationmanage/index',
            success: (result) => {
              this.setData({
                disabled: false,
                loading: false
              });
            }
          });

        } else {

          this.setData({
            disabled: false,
            loading: false
          });

          wx.showToast({
            title: res.errmsg,
            icon: 'none',
            duration: 2000
          });
        }

      }, false, false, true);
    }
  },
  /**
   * 
   * 经营性质
   */
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      companyTypeText: this.data.companyType[e.detail.value].name
    })
  }
})