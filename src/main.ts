import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import GlobalComponents from '@/plugins/global-components'
import FormRules from '@/plugins/form-rules'
import { userPiniaPlugin } from '@/plugins/userPiniaPlugin'

// create pinia and register plugins
const pinia = createPinia()
pinia.use(userPiniaPlugin)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(GlobalComponents)
app.use(FormRules)

app.mount('#app')
