import UserApi from '../../api/user'
// 导入本地存储方法
import { setItem, getItem, removeItem } from '../../utils/storage'
export default {
  namespaced: true, // 命名空间
  state: () => ({
    token: getItem('token') || '',
    userInfo: getItem('userInfo') || ''
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
      setItem('userInfo', userInfo)
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
        commit('setToken', '')
        commit('setUserInfo', {})
        removeItem('token')
        removeItem('userInfo')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
