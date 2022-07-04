const filtration = (menuData) => {
  for (let i = 0; i < menuData.length; i++) {
    if (menuData[i].children && menuData[i].children.length <= 0) {
      delete menuData[i].children
    }
    if (menuData[i].children && menuData[i].children.length > 0) {
      filtration(menuData[i].children)
    }
  }
  return menuData
}

export const filterMenuData = (menu) => {
  const menuList = filtration(menu)
  return menuList
}
