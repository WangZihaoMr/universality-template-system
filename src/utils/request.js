// 导入axios
import axios from 'axios'
// 导入md5进行加密
import md5 from 'md5'

// 引入loading加载组件
import { ElLoading } from 'element-plus'

const loading = {
  loadingInstance: null,
  // 开启loading加载
  open() {
    this.loadingInstance = ElLoading.service({
      target: 'body',
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.4)'
    })
  },
  close() {
    this.loadingInstance.close()
    this.loadingInstance = null
  }
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    loading.open()
    const { icode, time } = getTestICode()
    config.headers.icode = icode
    config.headers.codeType = time
    return config
  },
  function (error) {
    loading.close()
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    loading.close()
    return response
  },
  function (error) {
    loading.close()
    return Promise.reject(error)
  }
)

// 实现code
function getTestICode() {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991'
  return {
    icode: md5(code),
    time: now
  }
}

// 统一传参方式
function request(options) {
  options.method = options.method || 'GET'
  if (options.method.toLocaleUpperCase()) {
    options.params = options.data
  }
  service(options)
}

// 导出axios实例
export default request
