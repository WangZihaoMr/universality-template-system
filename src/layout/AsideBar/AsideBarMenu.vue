<template>
  <div class="aside-wrapper">
    <div class="aside-title">
      <el-avatar shape="square" :size="44" :src="avatarUrl" />
      <span class="loginTxt">admin-system</span>
    </div>
    <el-menu
      background-color="#304156"
      class="el-menu-vertical-demo"
      :default-active="$route.path"
      text-color="#BFCBD9"
      active-text-color="#FFF"
      unique-opened
      router
    >
      <AsideBarMenuItem
        v-for="(item, index) in menuList"
        :key="index"
        :menuList="item"
      ></AsideBarMenuItem>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
// import SvgIcon from '../../components/SvgIcon'
import AsideBarMenuItem from '../AsideBar/AsideBarMenuItem'
import { filterMenuData } from '../../utils/menu'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '../../utils/router'
const store = useStore()
const router = useRouter()

// 数据来源有三种：写死的数据   2、模拟的数据   3、后台返回的数据
// 1、定义递归组件所需要的数据
// 2、通过递归组件动态渲染菜单的数据
// 3、获取到路由表的所有数据
// 4、将路由表的数据过滤最终所需要的数据
/* const data = reactive([
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: '个人中心',
      icon: 'personnel'
    },
    childern: []
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/manage',
    meta: {
      title: '用户',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        name: 'userManage',
        meta: {
          title: '员工管理',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        name: 'userRole',
        meta: {
          title: '角色列表',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        name: 'userPermission',
        meta: {
          title: '权限列表',
          icon: 'permission'
        }
      }
    ]
  },
  {
    path: '/article',
    redirect: '/article/ranking',
    meta: {
      title: '文章',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        name: 'articleRanking',
        meta: {
          title: '文章排名',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/create',
        name: 'articleCreate',
        meta: {
          title: '文章创建',
          icon: 'article-create'
        }
      }
    ]
  }
]) */

// 获取用户头像信息
const avatarUrl = computed(() => {
  return store.getters.userInfo.avatar
})

const menuList = computed(() => {
  const routes = filterRoutes(router.getRoutes())
  return filterMenuData(generateMenus(routes))
})
</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;
}
.aside-title {
  width: 210px;
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}
.loginTxt {
  padding-left: 8px;
}
::v-deep .el-avatar {
  background: #304156 !important;
}
</style>
