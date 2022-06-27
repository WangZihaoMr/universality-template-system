import { createStore } from 'vuex'
// 导入功能模块
import user from './modules/user'

export default createStore({
  modules: {
    user
  }
})
