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
      console.log(store.getters.hasUserInfo)
      if (!store.getters.hasUserInfo) {
        // 如果用户信息不存在，则调用用户接口
        const response = await store.dispatch('user/userInfo')
        // console.log(response);
        if (response) {
          const { permission } = response
          console.log('permission.menus===>', permission.menus)
          // 调用vuex里面filterRoutes 在这个方法里面过滤出当前用户所拥有的私有路由表数据
          // 获取到当前登录用户所拥有的私有路由表
          const filterRouters = await store.dispatch(
            'permission/filterRoutes',
            permission.menus
          )
          // 遍历用户所拥有的私有路由表, 并且将用户所拥有的私有路由表添加到完整的路由中
          console.log('filterRoutes===>', filterRouters)
          filterRouters.forEach((item) => {
            router.addRoute(item)
          })
          // 指定要进入的路由, 注意: next 里面一定要指定进入的路由, 如果不指定,就会出现白屏问题
          return next(to.path)
        } else {
          next('/login')
        }
      }
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
