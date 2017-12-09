import { mount } from 'vue-test-utils'
import PickerSlot from '@/components/picker/picker-slot.vue'

describe('picker-slot', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(PickerSlot, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-picker')
    expect(wrapper.contains('.wv-picker')).toBeTruthy()
  })
})
