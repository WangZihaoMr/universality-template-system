import router from './router'
import store from './store'

// 白名单：未登录状态下可以进入的页面
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 获取token
  const token = store.getters.token
  // 获取用户信息
  // const userInfoData = store.getters.userInfo
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      // if (userInfoData) {
      //   next()
      // } else {
      //   const response = store.dispatch('user/userInfo')
      //   if (response) {
      //     next()
      //   } else {
      //     next('/login')
      //   }
      // }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
