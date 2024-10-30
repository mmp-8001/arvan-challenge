// this files created manually for showcase
// for better result use vite plugins

export {}

declare module 'vue' {
  export interface GlobalComponents {
    CForm: (typeof import('./src/components/plugins/CForm.vue'))['default']
    CInput: (typeof import('./src/components/plugins/CInput.vue'))['default']
    CButton: (typeof import('./src/components/plugins/CButton.vue'))['default']
    CCheckbox: (typeof import('./src/components/plugins/CCheckbox.vue'))['default']
    CModal: (typeof import('./src/components/plugins/CModal.vue'))['default']
    CTextarea: (typeof import('./src/components/plugins/CTextarea.vue'))['default']
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $rules: {
      required: (v: never) => true | string
    }
    $helpers: {
      formatDate: (date: string) => string
      extractExcerpt: (text: string) => string
    }
  }
}
