// pages/form/good/index.js
import { getData, chooseImg, tips } from '../../../utils/util.js';
import { apis } from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowSwitch: false,
    isShowTime: false,
    imgUrl: null,
    currency: 1,
    isClick: true,
    goodsName: "",
    brandName: "",
    encap: "",
    stock: "",
    price: "",
    day: "",
    goodId: "",
    hq:"1",
    isShowTip: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodId: options.goodId || "",
    });
    if (this.data.goodId) {
      wx.setNavigationBarTitle({
        title: '编辑商品'
      })
      this.getGoodData();
    } else {
      wx.setNavigationBarTitle({
        title: '新增商品'
      })
    }
    
  },
  getGoodData: function () {
    let me = this;
    let token = wx.getStorageSync('access_token');
    let goodId = me.data.goodId;
    getData(apis.goodsInfo, 'get', {
      "goods_id/eq": goodId,
      "token": token,
    }, function (res) {
      if (res.errcode == 0) {
        if (res.total == 0) {
          return
        } else {
          let infoObj = res.goods_list[me.data.goodId]
          me.renderForm(infoObj)
        }

      } else {
        tips('获取商品详情失败');
      }
    }, true)
  },
  renderForm: function (infoObj) {
    this.setData({
      goodsName:infoObj.goods_name,
      brandName: infoObj.brand_name,
      encap: infoObj.encap,
      stock: infoObj.stock,
      price: infoObj.price,
      currency: infoObj.currency,
      imgUrl:infoObj.goods_images
    });
    if(infoObj.delivery_time !== '现货'){
      let day = infoObj.delivery_time.replace('天','');
      console.log(day)
        this.setData({
          isShowTime:2,
          hq:2,
          day:day
        });

    }
  },
  formSubmit: function (e) {
    let obj = e.detail.value;
    if (!obj.goods_name) {
      tips('请填写型号');
      return
    } else if (!obj.brand_name) {
      tips('请填写品牌');
      return
    } else if (!obj.stock) {
      tips('请填写库存');
      return
    } else if (!obj.price) {
      tips('请填写价格');
      return
    } else {
      if (obj.hq == 2) {//期货
        if (!obj.day) {
          tips('请填写货期');
          return
        }
      }
    }
    this.postData(obj);
  },
  postData: function (obj) {
    let me = this;
    let token = wx.getStorageSync('access_token');
    let url = "";
    obj.hq == 1 ? obj.delivery_time = '现货' : obj.delivery_time = obj.day + '天';
    obj.currency = this.data.currency;
    obj.goods_images = this.data.imgUrl || '';
    obj.token = token;
    if (me.data.goodId) {
      obj.goods_id = me.data.goodId;
      url = apis.goodsSave
    } else {
      url = apis.goodsAdd;
    }
    delete obj.day;
    delete obj.hq;
    if (me.data.isClick) {
      me.setData({
        isClick: false
      })
      getData(url, 'get', obj, function (res) {
        if (res.errcode == 0) {
          tips('操作成功')
          me.setData({
            isClick: true
          });
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)

        } else {
          tips('操作失败')
          me.setData({
            isClick: true
          })
        }
      }, true)
    }

  },
  radioChange(e) {
    let val = e.detail.value;
    this.setData({
      isShowTime: val == 1 ? false : true,
      hq:val
    })

  },
  uploadImg: function () {
    let me = this;
    chooseImg(apis.ossupload, 1, function (url) {
      me.setData({
        imgUrl: url
      })
    })

  },
  deleteImg: function () {
    this.setData({
      imgUrl: null
    })
  },
  deleteGood:function(){

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
  changePrice: function (e) {
    let type = e.target.dataset.pricetype;
    this.setData({
      currency: type,
      isShowSwitch: false
    })
  },
  switchPrice: function () {
    this.setData({
      isShowSwitch: !this.data.isShowSwitch
    })
  },
  closeTip: function () {
    this.setData({
      isShowTip: false
    })
  }
})