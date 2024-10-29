import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { formValidationKey } from '../plugins/keys'
import CForm from '../plugins/CForm.vue'
import CInput from '../plugins/CInput.vue'

describe('test c-form component', () => {
  it('The form will not submit if there are errors', async () => {
    const wrapper = mount(CForm, {
      // mock provide
      global: {
        provide: {
          [formValidationKey as symbol]: {
            validateFunctions: [[(v: string) => !!v || 'required']],
          },
        },
      },
      slots: {
        default: h(CInput, {
          name: 'test',
          label: 'test',
          rules: [(v: string) => !!v || 'required'],
        }),
      },
    })
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })
  it("The form will submit if there aren't errors", async () => {
    const wrapper = mount(CForm, {
      // mock provide
      global: {
        provide: {
          [formValidationKey as symbol]: {
            validateFunctions: [[(v: string) => !!v || 'required']],
          },
        },
      },
      slots: {
        default: h(CInput, {
          name: 'test',
          label: 'test',
          modelValue: 'test',
          rules: [(v: string) => !!v || 'required'],
        }),
      },
    })
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('submit')).toBeTruthy()
  })
})
