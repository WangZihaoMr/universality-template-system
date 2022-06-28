import router from './router'
import store from './store'

// 白名单：未登录状态下可以进入的页面
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  /// 获取token
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
