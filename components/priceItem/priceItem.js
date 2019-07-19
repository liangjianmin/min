// components/priceItem/priceItem.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    priceList:{
      type:Array//数据
    },
    priceType:{
      type:Number//展示类型
    },
    xb:{
      type:Number // 询报价类型 1询价 2报价
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
    emitevent:function(){
      this.triggerEvent('emitevent')
    }
  }
})
