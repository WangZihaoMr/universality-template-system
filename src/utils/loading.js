// 引入loading加载组件
import { ElLoading } from 'element-plus'

const loading = {
  loadingInstance: null,
  // 开启loading加载
  open() {
    if (this.loadingInstance === null) {
      this.loadingInstance = ElLoading.service({
        target: 'body',
        text: '皇上，您别急...',
        background: 'rgba(0, 0, 0, 0.4)'
      })
    }
  },
  close() {
    if (this.loadingStance !== null) {
      this.loadingInstance.close()
      this.loadingInstance = null
    }
  }
}

export default loading
