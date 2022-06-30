<template>
  <div class="header-wrapper">
    <div class="header-left">王子豪</div>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
::v-deep .el-avatar {
  background: #fff !important;
}
</style>
