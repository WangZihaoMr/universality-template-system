import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  /// 获取token
  const token = store.getters.token
  console.log(token)
  next()
})
