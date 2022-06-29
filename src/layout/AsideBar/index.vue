<template>
  <div class="aside-wrapper">
    <div class="aside-title">imooc-admin</div>
    <el-menu
      background-color="#304156"
      class="el-menu-vertical-demo"
      default-active="1"
      text-color="#BFCBD9"
      active-text-color="#FFF"
      unique-opened
      router
    >
      <!-- 外层循环 -->
      <template v-for="item in menuList">
        <!-- 没有子菜单：使用el-menu-item -->
        <template v-if="item && !item.children">
          <el-menu-item :index="item.path" :key="item.path">
            <el-icon>
              <svg-icon :icon="item.meta.icon"></svg-icon>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
        <!-- 有子菜单：使用el-sub-menu -->
        <template v-if="item && item.children && item.children.length > 0">
          <el-sub-menu :index="item.path" :key="item.path">
            <template #title>
              <el-icon>
                <svg-icon :icon="item.meta.icon"></svg-icon>
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
          </el-sub-menu>
        </template>
      </template>
      <!-- <el-menu-item index="/profile">
        <el-icon><setting /></el-icon>
        <span>个人中心</span>
      </el-menu-item>

      <el-menu-item index="/chart">
        <el-icon><setting /></el-icon>
        <span>数据可视化</span>
      </el-menu-item>

      <el-sub-menu index="/user">
        <template #title>
          <el-icon><location /></el-icon>
          <span>用户</span>
        </template>
        <el-menu-item>
          <el-menu-item index="/user/manage">员工管理</el-menu-item>
        </el-menu-item>
        <el-menu-item>
          <el-menu-item index="/user/role">角色列表</el-menu-item>
        </el-menu-item>
        <el-menu-item>
          <el-menu-item index="/user/permission">权限列表</el-menu-item>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/article">
        <template #title>
          <el-icon><location /></el-icon>
          <span>文章</span>
        </template>
        <el-menu-item>
          <el-menu-item index="/article/ranking">文章排名</el-menu-item>
        </el-menu-item>
        <el-menu-item>
          <el-menu-item index="/article/create">创建文章</el-menu-item>
        </el-menu-item>
      </el-sub-menu> -->
    </el-menu>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import SvgIcon from '../../components/SvgIcon'

// 数据来源有三种：写死的数据   2、模拟的数据   3、后台返回的数据
// 1、定义递归组件所需要的数据
// 2、通过递归组件动态渲染菜单的数据
// 3、获取到路由表的所有数据
// 4、将路由表的数据过滤最终所需要的数据
const menuList = reactive([
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: '个人中心',
      icon: 'personnel'
    }
  },
  {
    path: '/user',
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
    props: {
      default: false
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
])
</script>

<style scoped lang="scss">
.aside-title {
  width: 210px;
  height: 82px;
  line-height: 82px;
  text-align: center;
  font-size: 22px;
  color: #fff;
}
</style>
