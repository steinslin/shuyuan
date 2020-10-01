
import Api from  "./base";
let apis_baby = {
  // 登录接口
  async login (data) {
    return await new Api({
      url:"/check/login",
      method:"POST",
      data
    }).getData()
  },
  // 获取手机验证码
  async getPhoneCode (data) {
    return await new Api({
      url:"/check/getCode",
      method:"POST",
      data
    }).getData()
  },
  // 获取待核销的订单
  async getCheckOrder (data) {
    return await new Api({
      url:"/checker/getCheckOrder",
      method:"POST",
      data
    }).getData()
  },
  // 核销订单
  async checkOrder (data) {
    return await new Api({
      url:"/checker/checkOrder",
      method:"POST",
      data
    }).getData()
  },
  // 核销记录
  async getCheckLogList (data) {
    return await new Api({
      url:"/checkLog/getPageList",
      method:"POST",
      data,
      msg:""
    }).getData()
  },
  // 验票员注销接口
  async checkQuit () {
    return await new Api({
      url:"/checker/quit",
      method:"POST",
      msg:""
    }).getData()
  },
  // 验票员开关消息接收
  async checkMessage () {
    return await new Api({
      url:"/checker/message",
      method:"POST",
      msg:""
    }).getData()
  },
  // 获取个人信息接口
  async getUserInfo () {
    return await new Api({
      url:"/checker/userInfo",
      method:"POST",
      msg:""
    }).getData()
  }
};
module.exports = apis_baby;