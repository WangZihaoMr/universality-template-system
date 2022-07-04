<template>
  <div class="header-wrapper">
    <div class="hamburger-closed">
      <svg-icon icon="hamburger-closed"></svg-icon>
    </div>
    <div class="header-left">
      <!-- {{ $route.meta.title }} -->
      <!-- {{ $route.matched }} -->
      <!-- <span v-for="(item, index) in $route.matched" :key="index">
        {{ item.meta.title }} /</span
      > -->
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="header-right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar shape="square" :size="40" :src="avatarUrl" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="profile">课程主页</el-dropdown-item>
            <el-dropdown-item command="loginOut" divided
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import Breadcrumb from '../components/Breadcrumb'

const store = useStore()
const router = useRouter()
// 获取用户头像信息
const avatarUrl = computed(() => {
  return store.getters.userInfo.avatar
})
// 点击打开下拉框
const handleCommand = (command) => {
  console.log(command)
  switch (command) {
    case 'home':
      handleHome()
      break
    case 'loginOut':
      handleLoginOut()
      break
  }
}

// console.log($route.path)
// console.log($route)
// consloe.log()
// 主页
const handleHome = () => {
  router.push('/')
}
// 退出登录
const handleLoginOut = async () => {
  // 退出登录不是图标问题，而是请求数据前后顺序可能造成的问题
  try {
    await store.dispatch('user/loginOut')
    router.push('/login')
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped lang="scss">
.header-wrapper {
  position: relative;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding: 0 16px 0 0;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
::v-deep .el-avatar {
  background: #fff !important;
}
.hamburger-closed {
  padding: 0 16px;
  float: left;
  line-height: 46px;
  height: 100%;
  cursor: pointer;
  transition: background 0.5s;
}
.hamburger-closed:hover {
  background: #e5e5e5;
}
.header-left {
  float: left;
}
.header-right {
  position: absolute;
  top: 5px;
  right: 16px;
}
</style>
