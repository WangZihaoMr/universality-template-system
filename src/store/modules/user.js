import User from '../../api/user'
export default {
  namespaced: true, // 命名空间
  state: () => {},
  mutations: {
    setToken(state, token) {}
  },
  actions: {
    async userLogin({ commit }, payload) {
      const response = await User.login(payload)
      // console.log(response)
      if (response) {
        commit('setToken', response)
      }
      return response
    }
  }
}
