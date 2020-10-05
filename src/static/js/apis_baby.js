
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
  // 活动现场
  async actPhotoList (data) {
    return await new Api({
      url:"/sys/actPhoto/list",
      method:"POST",
      data
    }).getData()
  },
  // 书院档案
  async agreementView (data) {
    return await new Api({
      url:"/sys/agreement/web/getCanteenAgreementView",
      method:"POST",
      data
    }).getData()
  },
  // 公告列表
  async noticeList (data) {
    return await new Api({
      url:"/system/notice/web/list",
      method:"POST",
      data
    }).getData()
  },
  // 公告详情
  async noticeSel (noticeId) {
    return await new Api({
      url:`/system/notice/web/sel/${noticeId}`,
      method:"GET"
    }).getData()
  },
};
module.exports = apis_baby;