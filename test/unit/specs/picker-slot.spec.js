import { mount } from 'vue-test-utils'
// import Picker from '@/components/picker/picker.vue'
import PickerSlot from '@/components/picker/picker-slot.vue'
// import { dragHelper } from '../utils'

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
  })

  it('create using object-array values', () => {
    const slotValues = [{
      label: 'label1',
      value: 'value1'
    },
    {
      label: 'label2',
      value: 'value2'
    },
    {
      label: 'label3',
      value: 'value3'
    }]

    wrapper = mount(PickerSlot, {
      propsData: {
        values: slotValues,
        valueKey: 'value',
        value: 'value1'
      }
    })
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
})
