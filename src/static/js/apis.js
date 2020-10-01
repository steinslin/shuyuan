
import Api from  "./base";
import apis_baby from './apis_baby'
let apis = {
  //票券列表
  async ticketList(){
    return (await new Api({
      url:"/api/ticket/list",
      method:"get",
      msg:"正在获取票券列表..."
    }).getData()).data.list
  },
  //票券详情
  async ticketInfo(ticketId){
    return (await new Api({
      data:{ticketId:ticketId},
      url:"/api/ticket/info",
      method:"get",
      msg:"正在获取票券信息..."
    }).getData()).data.ticket
  },
  //票券某一时间库存
  async ticketStock(time="2019-12-15-12-30"){
    return (await new Api({
      data:{time:time},
      url:"/api/ticket/stock",
      method:"get",
      msg:"正在获取本时间段余票信息..."
    }).getData()).data.num
  },
  //我的订单(票券)接口
  async myTickets(data){
    return (await new Api({
      data:data,
      url:"/userTicket/getPageList",
      method:"post",
      msg:"正在获取订单信息"
    }).getData()).data.records
  },

  async getToken(){
      return await new Api({}).getToken()
  }
};
module.exports = {...apis,...apis_baby};