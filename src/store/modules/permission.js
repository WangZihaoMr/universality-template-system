import { publicRoutes, privateRoutes } from '../../router'

export default {
  namespaced: true,
  state: {
    routes: publicRoutes
  },
  mutations: {
    setRoutes(status, newRoutes) {
      console.log('newRoutes===》', newRoutes)
      status.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    filterRoutes({ commit }, menus) {
      console.log('menus===>', menus)
      // 当用户登录之后是加载所有的私有路由表还是加载他所拥有的私有表
      // menus 登录之后后台所返回的用户所有的路由权限数据
      // privateRoutes 自定义的所有私有路由表
      const routes = []
      // 过滤出用户所拥有的私有路由表
      // 为什么要过滤呀？直接存数组不行吗？
      menus.forEach((name) => {
        let data = privateRoutes.filter((item) => item.name === name)
        routes.push(...data)
      })
      // 添加 重定向 404 路由
      /* routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      }) */
      commit('setRoutes', routes)
      // console.log('modlues====>', routes);
      // 为何要返回数据？？？
      return routes
    }
  }
}
