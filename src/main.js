import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/stylesheet/reset.scss'

import SvgIcon from '@/components/SvgIcon'

const app = createApp(App)
// svg
app.component('svg-icon', SvgIcon)

app.use(store).use(ElementPlus).use(router).mount('#app')
