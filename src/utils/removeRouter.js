import store from '../store'
import router from '../router'
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    // console.log(menus);
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}
