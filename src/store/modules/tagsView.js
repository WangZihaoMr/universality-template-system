import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    tagsView: getItem('tags') || []
  },
  mutations: {
    // 存储标签
    setTagView(state, payload) {
      const tagsViewStatus = state.tagsView.find(
        (item) => item.path === payload.path
      )
      console.log(tagsViewStatus)
      if (!tagsViewStatus) {
        state.tagsView.push(payload)
        // state.tagsView = payload    :::: 错误
        setItem('tags', state.tagsView)
      }
    },
    // 删除标签
    closeTagView(state, i) {
      state.tagsView.splice(i, 1)
      setItem('tags', state.tagsView)
    }
  },
  actions: {
    // 存储标签
    setTagsView({ commit }, tag) {
      commit('setTagView', tag)
    },
    // 关闭标签
    closeTag({ commit }, i) {
      console.log(i)
      commit('closeTagView', i)
    }
  }
}
