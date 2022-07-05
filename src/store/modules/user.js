import UserApi from '../../api/user'
// 导入本地存储方法
import { setItem, getItem, removeItem } from '../../utils/storage'

import { resetRouter } from '../../utils/removeRouter'
export default {
  namespaced: true, // 命名空间
  state: () => ({
    token: getItem('token') || '',
    userInfo: {}
  }),
  mutations: {
    // 存储token到vuex和本地
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    // 存储用户信息到vuex和本地
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 获取token
    async userLogin({ commit }, payload) {
      try {
        const userData = await UserApi.login(payload)
        if (userData) {
          commit('setToken', userData.token)
        }
        return userData
      } catch (err) {
        console.log(err)
      }
    },
    // 获取用户信息
    async userInfo({ commit }) {
      try {
        const userInfoData = await UserApi.getUserInfo()
        if (userInfoData) {
          commit('setUserInfo', userInfoData)
        }
        return userInfoData
      } catch (err) {
        console.log(err)
      }
    },
    // 退出登录
    async loginOut({ commit }) {
      try {
        // 退出登录时，删除存储的menus权限（因为menus权限都添加进了路由表里面了）
        resetRouter()
        commit('setToken', '')
        commit('setUserInfo', {})
        removeItem('token')
        // removeItem('userInfo')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
