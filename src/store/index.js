import { createStore } from 'vuex'
// 导入功能模块
import user from './modules/user'
// 导入getters
import getters from './getters'

export default createStore({
  getters,
  modules: {
    user
  }
})
