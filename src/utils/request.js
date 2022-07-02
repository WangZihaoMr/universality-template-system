// 导入axios
import axios from 'axios'
// 导入md5进行加密
import md5 from 'md5'
// 导入loading模块
import loading from './loading'
// 导入弹框信息提示组件
import { ElMessage } from 'element-plus'
// 获取token
import store from '../store'
import router from '../router'
// 导入时效性
import { isCheckTimeout } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 开启loading加载
    loading.open()
    const { icode, time } = getTestICode()
    const token = store.getters.token
    config.headers.authorization = 'Bearer ' + token
    config.headers.icode = icode
    config.headers.codeType = time
    // 时效性：token过期，强制退出
    var timer
    if (token) {
      timer = setInterval(function () {
        if (isCheckTimeout()) {
          // 清除定时器
          clearInterval(timer)
          store.dispatch('user/loginOut')
          router.push('/login')
        }
      }, 1000)
      console.log(isCheckTimeout())
      // if (isCheckTimeout()) {
      //   store.dispatch('user/loginOut')
      //   router.push('/login')
      // }
    }
    return config
  },
  function (error) {
    // 关闭loading加载
    loading.close()
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 关闭loading加载
    loading.close()
    // token过期处理    无感知登录   无感知刷新
    // 全局数据的处理
    const { data, success, message } = response.data
    if (success) {
      ElMessage.success(message)
      return data
    } else {
      _showError(message)
      return Promise.reject(new Error(message))
    }
  },
  function (error) {
    // 关闭loading加载
    loading.close()
    // 被动退出登录的两种情况
    // 1、token失效：后端返回code === 1
    if (
      error.response &&
      error.reponse.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/loginOut')
      router.push('/login')
    }
    _showError(error.message)
    return Promise.reject(error)
  }
)

// 响应提示信息
const _showError = (message) => {
  const errorInfo = message || '发生未知错误'
  ElMessage.error(errorInfo)
}

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
    options.params = options.data || {}
  }
  return service(options)
}

// 导出axios实例
export default request
