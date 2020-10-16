export default class Api {
  constructor(obj) {
    // this.host = '192.168.0.199';
    this.host = '120.79.41.141'
    // this.host = "app.pm.yinsitan.cn";
    // this.host = 'app.meisha.yinsitan.cn'
    this.port = "8586";
    this.baseUrl = "http://" + this.host + (this.port ? (":" + this.port) : "");
    // this.baseUrl = "https://" + this.host + (this.port ? (":" + this.port) : "");
    this.appid =  "wx2a1b10b5cf6adaff";
    this.limit = 10000;
    this.url = "";
    this.data = "";
    this.method = "POST";
    this.msg = "";
    this.page = {
      /**
       * @description: 页面刷新
       */
      reload: () => {
        let pages = getCurrentPages(),          //获取加载的页面栈
        currentPage = pages[pages.length - 1]    //获取当前页面的对象
        currentPage.onShow()                    //重新加载生命周期onShow
        currentPage.onLoad()                    //重新加载生命周期onLoad
        currentPage.onReady()                   //重新加载生命周期onReady
      }
    }
    //默认参数

    //传入参数
    for (let key in obj){
        this[key] = obj[key]
    }
    //传入参数
    // console.log(this);
  }
  //基础请求方法,返回请求到的数据
  async ajax() {
    let token = wx.getStorageSync('token') || await this.getToken()
    wx.setStorageSync('token', token);
    // console.log("本次的请求链接", this.baseUrl + this.url) 
    // console.log(token) 
    
    let result = await new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + this.url,
        data: this.data,
        header: {
          'content-type':'application/x-www-form-urlencoded', // 默认值
          'Cookie':'JSESSIONID='+token,
          'requestType':'wachat'
        },
        method: this.method.toUpperCase(),
        success: async (res) => {
          if(res && res.data.code != "40008"){
            console.log("请求成功")
            resolve(res)
          }else{
            console.log("请求失败",await this.getToken())
            // wx.showToast({
            //   title: '登录失败',
            //   icon: 'none',
            //   duration: 2000
            // })
            token = await this.getToken()
            wx.setStorageSync('token', token);
            this.page.reload()
            reject("请求错误",res)
          }
        },
        fail(err) {
          console.log('请求无响应:'+err)
          reject("请求无响应:",err)
        }
      })
    })
    return result
  }
  async getData() {
    wx.showNavigationBarLoading()
    this.msg && wx.showLoading({
      title: this.msg
    })

    let timer = ""

    let result = (await this.ajax()).data;
    if (result) {
      this.msg && wx.hideLoading()
      wx.hideNavigationBarLoading()
      clearTimeout(timer);
      return result;
    }else{
      timer = setTimeout(() => {
        wx.showToast({
          title: '请求超时!',
          icon: 'none',
          duration: 2000
        })
        this.msg && wx.hideLoading()
        wx.hideNavigationBarLoading()
        return
      }, this.limit)
    }


  }
  //微信登录接口
  async getToken() {
    let _this = this;
    let result =  await new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          let {code} = res;
          wx.request({
            url : `${_this.baseUrl}/weixinpay/GetOpenId`,
            data : {code:code},
            header : {
              'content-type':'application/x-www-form-urlencoded', // 默认值
              'Cookie':'JSESSIONID=',
              'requestType':'wachat'
            },
            method : "POST",
            success(res){
              let token = res.data.sessionid;
              console.log("getToken",res)
              resolve(token)
            },
            fail(err){reject("微信请求失败:",err)},
          })
        },
        fail(err) {
          reject("微信登录失败!",err)
        }
      })
    })
    return result;
  }
}






// const baseUrl = `${config.host}:${config.port}`
// var sessionid = ""

// // 页面相关函数
// let page = {
//   /**
//    * @description: 页面刷新
//    */
//   reload: () => {
//     let pages = getCurrentPages(),          //获取加载的页面栈
//     currentPage = pages[pages.length - 1]     //获取当前页面的对象
//     currentPage.onShow()                    //重新加载生命周期onShow
//     currentPage.onLoad()                    //重新加载生命周期onLoad
//     currentPage.onReady()                   //重新加载生命周期onReady
//   }
// }
// /**
//  * @method 自定义加载请求
//  * @param {String} url 网络请求的url
//  * @param {Object} data 请求参数
//  * @param {Object} method 请求方式
//  * @param {Object} header 请求头
//  * @param {String} message 进度条的提示信息
//  */
// const ajax = (obj) => {
//   let { url, data, header, method, message}  = obj;
//   wx.showNavigationBarLoading()//导航栏转圈
//   message && wx.showLoading({title: message})//遮罩层转圈

//   return new Promise((resolve,reject) => {
//     wx.request({
//       url: url,
//       data: data,
//       header: header,
//       method: method,
//       success: async (res) => {
//         wx.hideNavigationBarLoading()//导航栏转圈
//         message && setTimeout(()=>{wx.hideLoading()},100)//遮罩层转圈结束
//         resolve(res.data)
//         // 登录失败或超时
//         if(res.data.code == 1 && res.data.msg == "未登录或登录超时。请重新登录"){
//           // setTimeout(()=>{
//           //   wx.hideLoading()
//           // },100)
//           // sessionid = await getSessionId();       //重新获取sessionid
//           // page.reload()                           //页面刷新
//           console.log("未登录")
//         }
//       },
//       fail: function (err) {
//         wx.hideNavigationBarLoading()
//         wx.showToast({
//           title: '系统繁忙',
//           icon: 'none',
//           duration: 2000
//         })
//         message && setTimeout(()=>{ wx.hideLoading()}, 100)
//         reject(err)
//       }
//     })
//   })
// }


// /**
//  * @method 自定义加载请求
//  * @param {String} url 网络请求的url
//  * @param {Object} params 请求参数
//  * @param {Object} method 请求方式
//  * @param {String} message 进度条的提示信息
//  */

// const wxRequest = async (url, params, method, message) => {
//   if(!sessionid){
//     sessionid = await getSessionId();
//   }
//   return new Promise((resolve, reject) => {
//     if(message == ""){
//       request(url, params,{
//         'Cookie':'JSESSIONID='+sessionid,
//         'Content-type':'application/x-www-form-urlencoded'
//       },method).then((res)=>{
//         resolve(res)
//       }).then((err)=>{
//         reject(err)
//       })
//     }else{
//       requestLoading(url, params,{
//         'Cookie':'JSESSIONID='+sessionid,
//         'Content-type':'application/x-www-form-urlencoded'
//       },method, message).then((res)=>{
//         resolve(res)
//       }).then((err) => {
//         reject(err)
//       })
//     }
//   })
// }


// /**
//  * @description: 获取SessionId
//  */
// const getSessionId = () => {
//   return new Promise((resolve,reject) => {
//     wx.login({
//       success (res){ 
//         const {code} = res;//获取到的code
//         ajax({
//           url : `${baseUrl}/weixinpay/GetOpenId`,
//           data : {code:code},
//           header : {'content-type':'application/x-www-form-urlencoded', 'Cookie':'jsessionid:'},
//           method : "POST",
//           message : "正在获取sessionId"
//         })
//         .then( res => { 
//           resolve(res)} //输出登录结果
//         )
//       },
//       fail (err) {
//         reject(err)
//       }
//     })
//   })
// }

/**
 * @description: 微信支付
 * @param {Object} param 参数对象
 * @param {String} type 下单类型
 * @return: 
 */
const wxPay = async (param, type) => {
  const prepay_id = await wxRequest(`${baseUrl}/weixinpay/Xiadan${type}`,param,"POST","")
  const res = await wxRequest(`${baseUrl}/weixinpay/Sign`,prepay_id,"POST","")
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: res.timeStamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: res.signType,
      paySign: res.paySign,
      success(res) {
        if(res.errMsg.indexOf('ok') !== -1){
          resolve()
        }
      },
      fail(err){
        reject(err)
      }
    })
  })
}

// const uploadImg = (message) => {
//   return new Promise((resolve, reject)=>{
//     wx.chooseImage({
//       count: 9,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success(res){
//         // tempFilePath可以作为img标签的src属性显示图片
//         const tempFilePaths = res.tempFilePaths
//         wx.showLoading({
//           title: message
//         })
//          wx.uploadFile({
//           url: `${baseUrl}/common/upload`,
//           filePath: tempFilePaths[0],
//           name: 'file',
//           header: {  
//             "Content-Type": "multipart/form-data"  
//           }, 
//           success(res){
//             if(message !== ""){
//               setTimeout(()=>{
//                 wx.hideLoading()
//               },100)
//             }
//             let data = JSON.parse(res.data)
//             resolve(data)
//           },
//           fail(err){
//             if(message !== ""){
//               setTimeout(()=>{
//                 wx.hideLoading()
//               },100)
//             }
//             reject(err)
//           }
//         })
//       }
//     })
//   })
// }

