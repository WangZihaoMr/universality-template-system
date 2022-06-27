import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/stylesheet/reset.scss'

const app = createApp(App)
app.use(store).use(ElementPlus).use(router).mount('#app')
