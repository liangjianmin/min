const auth_url = 'http://authapi.icsales.cc';
const so_url = 'http://soapi.icsales.cc';
const offer_url = "http://offerapi.icsales.cc";
const user_url = 'http://userapi.icsales.cc';
const goods_url = 'http://goodsapi.icsales.cc';
const home_url = 'http://home.icsales.cc';

const apis = {
  /**
   * 授权接口
   */
  getOpenId: auth_url + '/v1/getOpenId',
  /**
   * 刷新token
   */
  authRefresh: auth_url + '/auth/refresh',
  /**
   * 获取微信用户信息
   */
  getwxUserInfo: auth_url + '/v1/getwxUserInfo',
  /**
   * 用户注册
   */
  authRegister: auth_url + '/auth/register',
  /**
   * 账号密码登录
   */
  authlogin: auth_url + '/auth/login',
  /**
   * 重置密码
   */
  resetPassword: auth_url + '/auth/resetPassword',
  /**
   * 手机验证码快捷登录
   */
  authMobilelogin: auth_url + '/auth/mobile/login',
  /**
   * 获取图形验证码接口
   */
  captchaInfo: auth_url + '/captchaInfo/wx',
  /**
   * 注册获取短信验证码接口
   */
  getRegistCode: auth_url + '/v1/getRegistCode',
  /**
   * 微信验证码
   */
  getWxCode: auth_url + '/v1/getwxcode',
  /**
   * 小程序修改密码
   */
  editPwd: auth_url + '/auth/editPwd',
  /**
   * 退出
   */
  authLogout: auth_url + '/auth/logout',
  /***
   * 获取用户基本信息
   */
  authme: auth_url + '/auth/me',
  /***
   * 新增会员认证信息
   */
  addAuth: user_url + '/user/addauth',
  /***
   * 更新会员认证信息
   */
  editAuth: user_url + '/user/editauth',
  /***
   * 获取会员认证信息
   */
  authInfo: user_url + '/user/authinfo',
  /***
   * 上传文件的接口
   */
  ossupload: goods_url + '/oss/upload',
  /**
   * 商品列表
   */
  goodsInfo: goods_url + '/goods/info',
  /**
   * 商品搜索
   */
  goodsSearch: goods_url + '/goods/search',
  /**
   * 商品数量
   */
  goodsCount: goods_url + '/goods/count',
  /**
   * 商品新增
   */
  goodsAdd: goods_url + '/goods/add',
  /**
   * 批量上传
   */
  bulkupload: goods_url + '/goods/upload',
  /**
   * 商品修改
   */
  goodsSave: goods_url + '/goods/save',
  /***
   * 商品上下架
   */
  goodsStatus: goods_url + "/goods/status",
  /****
   * 询价搜索 不需要token
   */
  inquirySearch: offer_url + '/inquiry/search',
  /***
   * 会员中心询价列表 需要token
   */
  inquiryInfo: offer_url + "/inquiry/info",
  /***
   * 我的询价回复
   */
  inquiryMyOffer: offer_url + "/inquiry/my/offer",
  /***
   * 询价添加 需要token
   */
  inquiryadd: offer_url + "/inquiry/add",
  /***
   * 询价上下架
   */
  inquirystatussave: offer_url + "/inquiry/status/save",
  /***
   * 询价统计
   */
  inquirycount: offer_url + "/inquiry/count",

  /***
   * 报价统计
   */
  offercount: offer_url + "/offer/count",
  /***
   * 继续报价 and 回复报价
   */
  offercontinue: offer_url + "/offer/continue",
  /***
   * 新增报价
   */
  offeradd: offer_url + "/offer/add",
  /***
   * 价单列表(搜索)
   */
  offersearch: offer_url + "/offer/search",
  /***
   * 我的报价单列表
   */
  offerinfo: offer_url + "/offer/info",
  /***
   * 获取会员信息
   */
  userInfo: user_url + "/user/info",
  /***
   * 账户消息通知设置
   */
  userSetmsg: user_url + "/user/setmsg",
  /***
   * 账户设置
   */
  userAccount: user_url + "/user/account",
  /***
   * 获取省市区
   */
  regionPcd: user_url + "/region/pcd",
  /**
   * 批量上传商品列表
   */
  uploadList: goods_url + '/goods/upload/list',
  /**
   * 数量统计
   */
  countBusiness: user_url + '/count/business',
  /**
   * 获取会员系统通知
   */
  userSysmsg: user_url + '/user/sysmsg',
  /**
   * 获取会员活动通知
   */
  userActmsg: user_url + '/user/actmsg',
  /**
   * 标记会员通知（已读）
   */
  userMarkmsg: user_url + '/user/markmsg',
  /**
 * 环信通讯记录添加
 */
  addrecord: user_url + '/im/add/record',
  /**
   * 环信通讯记录列表（最多显示30条最新的聊天记录）
   */
  listrecord: user_url + '/im/list/record',
  /***
   * 获取热门搜索商品
   */
  hotgoods: home_url + '/hotgoods',

}


module.exports = {
  apis: apis
}