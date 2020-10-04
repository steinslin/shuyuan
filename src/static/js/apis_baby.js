
import Api from  "./base";
let apis_baby = {
  // 登录接口
  async banner (data) {
    return await new Api({
      url:"/sys/ads/web/list",
      method:"GET",
      data
    }).getData()
  },
};
module.exports = apis_baby;