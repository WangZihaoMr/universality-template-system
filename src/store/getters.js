const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  tagsView: (state) => state.tagsView.tagsView
}

export default getters
