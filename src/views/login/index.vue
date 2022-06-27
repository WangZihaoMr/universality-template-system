<template>
  <div class="login-containner">
    <div class="loginFormBox">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
        <span class="icon">icon</span>
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
              <avatar />
            </el-icon>
          </span>
          <el-input v-model.trim="loginForm.username" placeholder="username" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <el-icon>
              <avatar />
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
            <el-icon v-if="passwordType === 'text'"><View /></el-icon>
            <el-icon v-else><Hide /></el-icon>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            @click="handleLoginSubmit()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import md5 from 'md5'
import UserApi from '@/api/user'
import { reactive, ref } from 'vue'
import { validatePassWord } from './rules'
import { Avatar, View, Hide } from '@element-plus/icons-vue'

// 数据源
const loginForm = reactive({
  username: 'super-admin',
  password: '123456'
})
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
  // if (!LoginForm.value) return
  // 成功则执行登录逻辑代码块
  await LoginForm.value.validate(async (valid) => {
    if (valid) {
      console.log('登录')
      loginForm.password = md5(loginForm.password)
      const response = await UserApi.login(loginForm)
      console.log(response)
    }
  })
}
// 密码框明文密文切换
const handleEyeStatus = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
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
  .title {
    text-align: center;
    font-size: 26px;
    color: #eee;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: 700;
  }
  .icon {
    position: absolute;
    top: 0;
    right: 0;
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
