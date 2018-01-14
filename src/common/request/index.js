import axios from 'axios'

let instance = axios.create()

instance.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'User-uin': 100000
}

instance.interceptors.response.use(function (response) {
  // filter all response
  console.log(response)
  if (response.status === 200) {
    if (response.data.ret === 0) {
      return response.data
    } else if (response.data.ret === -302) {
      window.location.href = response.data.err
    } else {
      return Promise.reject(response.data)
    }
  } else {
    // system error. such as 500 etc...
    let fmtError = {
      ret: -999,
      data: [],
      err: '系统错误请联系管理员'
    }
    return Promise.reject(fmtError)
  }
}, function (error) {
  let fmtError = {
    ret: -999,
    data: [],
    err: error.message
  }
  return Promise.reject(fmtError)
})

export default instance
