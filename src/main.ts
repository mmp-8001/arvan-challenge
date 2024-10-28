import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import GlobalComponents from '@/plugins/global-components'
import FormRules from '@/plugins/form-rules'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(GlobalComponents)
app.use(FormRules)

app.mount('#app')
