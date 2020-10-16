let utils = {
  checkPhone (phone) {
    if(!(/^1[3456789]\d{9}$/.test(phone))){
      return false
    }else{
      return true
    }
  },
  checkEmail (email) {
    if(!(/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/).test(email)){
      return false
    }else{
      return true
    }
  }
}
export default utils