const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  tagsView: (state) => state.tagsView.tagsView,
  // 如果用户信息存在的话，我就调用用户信息方法，反之返回login页面
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}

export default getters
