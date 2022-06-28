<template>
  <div class="login-containner">
    <div class="loginFormBox">
      <div class="title-container">
        <!-- <svg-icon icon="https://res.lgdsunday.club/user.svg"></svg-icon> -->
        <!-- <svg-icon icon="#icon-article"></svg-icon> -->
        <h3 class="title">用户登录</h3>
        <svg-icon className="svg-language" icon="language"></svg-icon>
        <!-- <chineseEnglish-Svg
          class="iconfont icon-zhongyingwen"
          style="font-size: 30px; color: white"
        ></chineseEnglish-Svg> -->
        <!-- <span class="iconfont icon-zhongyingwen"></span> -->
      </div>
      <el-form
        ref="LoginForm"
        :model="loginForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item prop="username">
          <span class="svg-container">
            <el-icon>
              <svg-icon icon="user"></svg-icon>
            </el-icon>
          </span>
          <el-input v-model.trim="loginForm.username" placeholder="username" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <el-icon>
              <svg-icon icon="password"></svg-icon>
            </el-icon>
          </span>
          <el-input
            v-model.trim="loginForm.password"
            :type="passwordType"
            placeholder="password"
          />
          <span
            class="svg-container svg-container-password"
            @click="handleEyeStatus"
          >
            <el-icon class="show-pwd">
              <svg-icon :icon="passwordIconStatus"></svg-icon>
            </el-icon>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            @click="handleLoginSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import md5 from 'md5'
import { reactive, ref, computed } from 'vue'
import { validatePassWord } from './rules'
import Utils from '@/utils/deepCopy'
import { useStore } from 'vuex'
import SvgIcon from '@/components/SvgIcon'

// 数据源
const loginForm = reactive({
  username: 'super-admin',
  password: '123456'
})
// store实例
const store = useStore()
// 表单DOM元素
const LoginForm = ref()
const passwordType = ref('password')

// 数据规则校验
const rules = {
  username: [
    {
      required: true,
      message: '用户名为必填项',
      trigger: 'blur'
    }
  ],
  password: [
    {
      requierd: true,
      trigger: 'blur',
      validator: validatePassWord
    }
  ]
}
// 登录校验
const handleLoginSubmit = async () => {
  // 如果检验不成功则终止程序
  if (!LoginForm.value) return
  // 成功则执行登录逻辑代码块
  await LoginForm.value.validate(async (valid) => {
    if (valid) {
      let newLoginForm = Utils.deepCopy(loginForm)
      newLoginForm.password = md5(newLoginForm.password)
      const response = await store.dispatch('user/userLogin', newLoginForm)
      console.log(response)
      if (!response) return
    }
  })
}
// 密码框明文密文切换
const handleEyeStatus = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
// 密码框的icon
const passwordIconStatus = computed(() => {
  return passwordType.value === 'password' ? 'eye' : 'eye-open'
})
</script>

<style scoped lang="scss">
.login-containner {
  min-height: 100%;
  width: 100%;
  background: #2d3a4b;
}
.loginFormBox {
  width: 520px;
  margin: auto;
  padding: 160px 35px 0;
}
.title-container {
  position: relative;
  display: flex;
  .title {
    text-align: center;
    font-size: 26px;
    color: #eee;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: 700;
  }
  ::v-deep .svg-language {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}
.svg-container-password {
  cursor: pointer;
}

:deep(.el-form-item__content) {
  background: rgba(0, 0, 0, 0.1) !important;
  margin-left: 0 !important;
  display: flex;
  flex-wrap: nowrap;
  border-radius: 5px;
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    display: inline-block;
  }
  ::deep .el-input__inner {
    color: #fff !important;
  }
}

::v-deep(.el-input__wrapper) {
  box-shadow: none !important;
  height: 47px;
  background-color: transparent !important;
}
::deep(.el-input) {
  flex: 1;
  border: none;
}
.login-button {
  min-width: 100%;
}
::deep(.el-form-item) {
  background: rgba(0, 0, 0, 0.1) !important;
}
:deep(.el-input__inner) {
  color: #eee !important;
}
</style>
