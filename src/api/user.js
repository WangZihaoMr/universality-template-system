// 导入axios实例 --->   request
import request from '../utils/request'

// 登录获取token接口
const login = (data = {}) => {
  console.log(data)
  return request({ url: '/sys/login', method: 'POST', data })
}

export default {
  login
}
