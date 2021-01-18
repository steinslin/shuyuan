
import Api from  "./base";
let apis_baby = {
  // 登录接口
  async banner (data) {
    return await new Api({
      url:"/sys/ads/web/list",
      method:"GET",
      data,
      msg:"加载中.."
    }).getData()
  },
  // 活动现场
  async actPhotoList (data) {
    return await new Api({
      url:"/sys/actPhoto/list",
      method:"POST",
      data,
      msg:"加载中.."
    }).getData()
  },
  // 书院档案
  async agreementView (data) {
    return await new Api({
      url:"/sys/agreement/web/getCanteenAgreementView",
      method:"POST",
      data,
      msg:"加载中.."
    }).getData()
  },
  // 公告列表
  async noticeList (data) {
    return await new Api({
      url:"/system/notice/web/list",
      method:"POST",
      data,
      msg:"加载中.."
    }).getData()
  },
  // 公告详情
  async noticeSel (noticeId) {
    return await new Api({
      url:`/system/notice/web/sel/${noticeId}`,
      method:"GET",
      msg:"加载中.."
    }).getData()
  },
  // 活动导航
  async navigaInfoList (data) {
    return await new Api({
      url:"/linli/navigaInfo/list",
      method:"GET",
      data,
      msg:"加载中.."
    }).getData()
  },
  // 活动列表
  async activityInfoList (data) {
    return await new Api({
      url:"/activity/activityInfo/web/list",
      method:"POST",
      data,
      msg:"加载中.."
    }).getData()
  },
  // 活动详情
  async activityInfoSel (activityId) {
    return await new Api({
      url:`/activity/activityInfo/web/sel/${activityId}`,
      method:"GET",
      msg:"加载中.."
    }).getData()
  },
  // 订单列表
  async orderList (data) {
    return await new Api({
      url:"/order/web/list",
      method:"POST",
      data,
      msg:"加载中.."
    }).getData()
  },
  // 预约报名
  async orderActivityAdd (data) {
    return await new Api({
      url:`/activity/orderActivity/web/add`,
      method:"POST",
      msg:"加载中..",
      data
    }).getData()
  },
  // 查询二维码预约时间信息
  async getCodeInfo (orderId) {
    return await new Api({
      url:`/activity/orderActivity/web/getCodeInfo/${orderId}`,
      method:"GET",
    }).getData()
  },
  // 时间点活动显示
  async activityInfoDateList (data) {
    return await new Api({
      url:"/activity/activityInfo/web/date/list",
      method:"POST",
      msg:"加载中..",
      data
    }).getData()
  },
  // 进行签到
  async activitySign (data) {
    return await new Api({
      url:"/order/web/activity/sign",
      method:"POST",
      msg:"加载中..",
      data
    }).getData()
  },
  // 查看签到
  async activitySignSel (data) {
    return await new Api({
      url:"/order/web/activity/sel/sign",
      method:"POST",
      msg:"加载中..",
      data
    }).getData()
  },
  // 导航详情
  async navigaInfoSel (id) {
    return await new Api({
      url:`/linli/navigaInfo/web/sel/${id}`,
      method:"GET",
      msg:"加载中.."
    }).getData()
  },
  // 新增问卷
  async feedBackAdd (data) {
    return await new Api({
      url:`/activity/orderActivity/web/add/feedBack`,
      method:"POST",
      msg:"加载中..",
      data
    }).getData()
  },
  // 问卷详情
  async feedBackSel (data) {
    return await new Api({
      url:`/activity/orderActivity/web/sel/feedBack`,
      method:"GET",
      msg:"加载中..",
      data
    }).getData()
  },
  // 用户信息
  async userInfo (data) {
    return await new Api({
      url:`/linli/user/getVipInfo`,
      method:"GET",
      msg:"加载中..",
      data
    }).getData()
  },
  // 支付
  async wxPay(param, type) {
    // console.log(param)
    const prepay_id = (await new Api({
      data:param,
      url:`/weixinpay/Xiadan${type}`,
      method: "post",
      msg: "正在请求微信支付..."
    }).getData());
    console.log(prepay_id)
    const res = (await new Api({
      data:prepay_id,
      url:"/weixinpay/Sign",
      method: "post",
      msg: "正在请求微信支付..."
    }).getData());

    return new Promise((resolve,reject) => {
      wx.requestPayment({
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        signType: res.signType,
        paySign: res.paySign,
        success(res) {
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
    })
  },
  // 下单token
  async getToken () {
    return await new Api({
      url:`/sys/ads/getToken`,
      method:"GET",
    }).getData()
  },
  async getOpenId () {
    return await new Api().getToken()
  }
  
};
module.exports = apis_baby;