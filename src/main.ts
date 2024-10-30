import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import GlobalComponents from '@/plugins/global-components'
import FormRules from '@/plugins/form-rules'
import { userPiniaPlugin } from '@/plugins/userPiniaPlugin'
import Toast from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import Helpers from '@/plugins/helpers'

// create pinia and register plugins
const pinia = createPinia()
pinia.use(userPiniaPlugin)

// create toast config
const options: PluginOptions = {
  // You can set your default options here
  icon: false,
  hideProgressBar: true,
  closeButtonClassName: 'custom-toast-button',
  toastDefaults: {
    error: {
      toastClassName: 'custom-toast-error',
    },
    success: {
      toastClassName: 'custom-toast-success',
    },
  },
}

const app = createApp(App)

app.use(Toast, options)
app.use(pinia)
app.use(router)
app.use(GlobalComponents)
app.use(Helpers)
app.use(FormRules)

app.mount('#app')
