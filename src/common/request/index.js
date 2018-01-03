import axios from 'axios'

let instance = axios.create()

instance.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'User-uin': 100000
}

instance.interceptors.request.use(function (config) {
  // append api for dev server proxy
  config.url = '/api' + config.url
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  // filter all response
  if (response.status === 200) {
    if (response.data.ret === 0) {
      return response.data
    } else if (response.data.errno === -302) {
      window.location.href = response.data.error
    } else {
      return Promise.reject(response.data)
    }
  } else {
    // system error. such as 500 etc...
    let fmtError = {
      code: -999,
      data: [],
      error: '系统错误请联系管理员'
    }
    return Promise.reject(fmtError)
  }
}, function (error) {
  let fmtError = {
    code: -999,
    data: [],
    error: error.message
  }
  return Promise.reject(fmtError)
})

export default instance
