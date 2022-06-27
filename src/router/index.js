import { createRouter, createWebHashHistory } from 'vue-router'

// 公开路由表
const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
  // {
  //   path: '/layout',
  //   name: 'layout',
  //   component: () => import('../views/layout/index.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
