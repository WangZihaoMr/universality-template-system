// 导入axios实例 --->   request
import request from '../utils/request'

// 登录获取token接口
const login = (data = {}) => {
  console.log(data)
  return request({ url: '/sys/login', method: 'POST', data })
}
// 获取用户信息
const getUserInfo = () => {
  return request({ url: '/sys/profile', method: 'GET' })
}

export default {
  login,
  getUserInfo
}
