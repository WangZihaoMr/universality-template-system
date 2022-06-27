// 导入axios
import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '',
  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 导出axios实例
export default service
