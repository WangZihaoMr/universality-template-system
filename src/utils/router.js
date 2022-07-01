const getChildChildren = (routes) => {
  console.log('routes===>', routes)
  // 空数组
  const allNotFirstRoutes = []
  // 接收所有的非一级子路由的数据
  routes.forEach((item) => {
    if (item.children && item.children.length > 0) {
      allNotFirstRoutes.push(item)
    }
  })
  console.log('所有的非一级子路由的数据===>', allNotFirstRoutes)
  return allNotFirstRoutes
}

// 与完整路由进行进行匹配
export const filterRoutes = (routes) => {
  const childrenRoutes = getChildChildren(routes)
  return routes.filter((route) => {
    // console.log(route)
    return !childrenRoutes.find((childrenRoute) => {
      return route.path === childrenRoute.path
    })
  })
  // console.log(data)
}

// 检测空对象以及空数组
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

// 处理成菜单数据
export const generateMenus = (routes) => {
  const result = []
  routes.forEach((item) => {
    if (isNull(item.meta) && isNull(item.children)) return
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 获取path路径
    const routePath = item.path
    // 返回所有路由的路径path
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // 如果当前项存在title和icon，则是我们满足我们菜单数据的条件
      if (item.meta.title && item.meta.icon) {
        result.push(route)
      }
    }
    // 递归：如果还有子数据，则调用自身
    if (item.children) {
      route.children.push(...generateMenus(item.children))
    }
  })
  console.log(result)
  // 返回：注意点
  return result
}
