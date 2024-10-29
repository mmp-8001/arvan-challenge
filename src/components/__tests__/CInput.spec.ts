import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CInput from '../plugins/CInput.vue'
import { formValidationKey } from '../plugins/keys'
import { nextTick } from 'vue'

describe('test c-input component', () => {
  const inputSelector = '[data-test-id=input]'
  const labelSelector = '[data-test-id=label]'
  const errorSelector = '[data-test-id=error]'

  it('renders properly', () => {
    const wrapper = mount(CInput, {
      // mock provide
      global: {
        provide: {
          [formValidationKey as symbol]: {
            validateFunctions: [],
          },
        },
      },
      props: {
        label: 'test',
        name: 'test-input-component',
      },
    })

    // check label is correct
    expect(wrapper.get(labelSelector).text()).toBe('test')

    // input is clear and don't have error
    const inputElement = <HTMLInputElement>wrapper.get(inputSelector).element
    expect(inputElement.value).toBe('')
    expect(wrapper.get(inputSelector).classes().includes('error')).toBe(false)

    // and have not error
    expect(wrapper.get(errorSelector).text()).toBe('')
  })

  it('handle rules properly', async () => {
    const wrapper = mount(CInput, {
      // mock provide
      global: {
        provide: {
          [formValidationKey as symbol]: {
            validateFunctions: [(v: string) => !!v || 'required'],
          },
        },
      },
      props: {
        label: 'test',
        name: 'test-input-component',
        rules: [(v: string) => !!v || 'required'],
      },
    })
    // trigger blur on input to check if error applied
    await wrapper.get(inputSelector).trigger('input')
    await wrapper.get(inputSelector).trigger('blur', {
      relatedTarget: wrapper.get(errorSelector).element,
    })

    expect(wrapper.get(errorSelector).text()).toBe('required')
  })
})
