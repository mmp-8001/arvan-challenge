import type { App } from 'vue'
import CForm from '@/components/plugins/CForm.vue'
import CInput from '@/components/plugins/CInput.vue'
import CButton from '@/components/plugins/CButton.vue'
import CCheckbox from '@/components/plugins/CCheckbox.vue'
import CModal from '@/components/plugins/CModal.vue'
import CTextarea from '@/components/plugins/CTextarea.vue'

export default {
  install(app: App) {
    app.component('CForm', CForm)
    app.component('CInput', CInput)
    app.component('CButton', CButton)
    app.component('CCheckbox', CCheckbox)
    app.component('CModal', CModal)
    app.component('CTextarea', CTextarea)
  },
}
