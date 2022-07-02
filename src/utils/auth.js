/* 对于 token 本身是拥有时效的，这个大家都知道。
但是通常情况下，这个时效都是在服务端进行处理。
而此时我们要在 服务端处理 token 时效的同时，在前端主动介入 token 时效的处理中。
从而保证用户信息的更加安全性。 */
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/utils/constant'
import { setItem, getItem } from '@/utils/storage'

// 获取时间戳
export function getTimeStamp() {
  console.log('oldTime===>', TIME_STAMP)
  return getItem(TIME_STAMP)
}

// 设置时间戳
export function setTimeStamp() {
  console.log('失效时间===>', Date.now())
  setItem(TIME_STAMP, Date.now())
}

// 是否超时
export function isCheckTimeout() {
  // 当前时间戳
  var currentTime = Date.now()
  // 缓存时间戳
  var timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
