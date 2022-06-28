// 存储数据到本地
export const setItem = (value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem('token', value)
}
// 获取数据
export const getItem = (key) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
// 删除单个本地数据
export const removeItem = (key) => {
  localStorage.removeItem(key)
}
// 删除所有本地数据
export const removeAllItem = () => {
  localStorage.clear()
}
