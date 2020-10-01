let utils = {
  checkPhone (phone) {
    if(!(/^1[3456789]\d{9}$/.test(phone))){
      return false
    }else{
      return true
    }
  }
}
export default utils