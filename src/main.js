import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入重置样式表
import '@/stylesheet/reset.scss'
// 引入iconFont
import '@/iconfonts/iconfont.css'
// 引入svg
// import '@/icons/index'
import installIcons from './icons/index.js'

const app = createApp(App)
installIcons(app)
app.use(store).use(ElementPlus).use(router).mount('#app')
