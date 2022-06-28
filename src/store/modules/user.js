import User from '../../api/user'
// 导入本地存储方法
import { setItem, getItem } from '../../utils/storage'
export default {
  namespaced: true, // 命名空间
  state: () => ({ // 写法注意！！！
    token: getItem('token') || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(token)
    }
  },
  actions: {
    async userLogin({ commit }, payload) {
      try {
        const response = await User.login(payload)
        if (response) {
          commit('setToken', response.token)
        }
        return response
      } catch (err) {
        console.log(err)
      }
    }
  }
}
