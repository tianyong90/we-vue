import { mount } from 'vue-test-utils'
// import Picker from '@/components/picker/picker.vue'
import PickerSlot from '@/components/picker/picker-slot.vue'
import { dragHelper } from '../utils'

describe('picker-slot', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(PickerSlot, {
      propsData: {}
    })

    // TODO:
    expect(wrapper.name()).toBe('wv-picker')
    // expect(wrapper.contains('.wv-picker')).toBeTruthy()
  })

  it('render a divider slot', () => {
    wrapper = mount(PickerSlot, {
      propsData: {
        divider: true,
        content: '-'
      }
    })

    expect(wrapper.text()).toBe('-')
  })

  it('drag the picker-slot', () => {
    wrapper = mount(PickerSlot, {
      propsData: {
        values: [1, 2, 3, 4]
      }
    })

    dragHelper(wrapper, 0, 10)

    // TODO:
    // expect(wrapper.name()).toBe('wv-picker')
    // expect(wrapper.contains('.wv-picker')).toBeTruthy()
  })
})
