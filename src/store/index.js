import { createStore } from 'vuex'
// 导入功能模块
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'

// 导入getters
import getters from './getters'

export default createStore({
  getters,
  modules: {
    user,
    tagsView,
    permission
  }
})
