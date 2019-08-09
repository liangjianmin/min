// components/priceItem/priceItem.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    priceList: {
      type: Array//数据
    },
    priceType: {
      type: Number//展示类型
    },
    xb: {
      type: Number // 询报价类型 1询价 2报价
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    emitevent: function (e) {
      let token = wx.getStorageSync('access_token');
      let inquiryItemsId = e.currentTarget.dataset.inquiryitemsid;
      let goodId = e.currentTarget.dataset.goodid;
      let offerId = e.currentTarget.dataset.offerid;
      let xb = e.currentTarget.dataset.xb;
      let type = e.currentTarget.dataset.type;//1代表询价 2代表报价 3代表商品
      let priceType = e.currentTarget.dataset.pricetype;
      if (token) {
        if (priceType == 1) {
          if (type == 1) {
            wx.navigateTo({
              url: "/pages/list/xj/index?inquiryItemsId=" + inquiryItemsId
            })
          } else if (type == 2) {
            wx.navigateTo({
              url: "/pages/list/bj/index?inquiryItemsId=" + inquiryItemsId + '&offerId=' + offerId
            })
          }

        } else if (priceType == 2){//搜索页面商品跳转
          wx.navigateTo({
            url: "/pages/detail/good/index?goodId=" + goodId + '&type=2'
          })
        } else if (priceType == 3) {
          if (type == 1) {
            wx.navigateTo({
              url: "/pages/list/bj/index?inquiryItemsId=" + inquiryItemsId
            })
          } else if (type == 2) {
            wx.navigateTo({
              url: "/pages/detail/xj/index?inquiryItemsId=" + inquiryItemsId + '&offerId=' + offerId
            })
          }
        }else if(priceType == 4){

        } else if (priceType ==5){//tab页商品跳转
          wx.navigateTo({
            url: "/pages/detail/good/index?goodId=" + goodId + '&type=1'
          })
        }
      } else {
        wx.showToast({
          title: '请先登入',
          icon: 'none',
          duration: 2000
        });
      }
    },
    previewImage: function (e) {
      let img = e.currentTarget.dataset.image;
      wx.previewImage({
        urls: [img]
      })
    }
  }
})
