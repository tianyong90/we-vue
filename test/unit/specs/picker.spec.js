import { mount } from 'vue-test-utils'
import Picker from '@/components/picker'
import PickerSlot from '@/components/picker/picker-slot.vue'
import { dragHelper } from '../utils'

describe('picker', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: []
      }
    })

    expect(wrapper.name()).toBe('wv-picker')
  })

  it('create a single-row picker', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: [1, 2, 3],
          defaultIndex: 0
        }]
      }
    })

    expect(wrapper.name()).toBe('wv-picker')
    expect(wrapper.vm.values).toEqual([1])
  })

  it('create a nulti-row picker', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: [1, 2, 3],
          defaultIndex: 0
        }, {
          values: [1, 2, 3],
          defaultIndex: 0
        }]
      }
    })

    expect(wrapper.findAll(PickerSlot).length).toBe(2)
    expect(wrapper.vm.values).toEqual([1, 1])
  })

  it('drag picker to change the value', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: [1, 2, 3],
          defaultIndex: 0
        }]
      }
    })

    dragHelper(wrapper.findAll(PickerSlot).at(0), 10, 0)

    expect(wrapper.name()).toBe('wv-picker')
    // expect(wrapper.contains('.wv-picker')).toBeTruthy()
  })

  it('setSlotValues method', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: [1, 2, 3],
          default: 0
        }]
      }
    })

    wrapper.vm.setSlotValues(0, [1, 2, 3])

    expect(wrapper.name()).toBe('wv-picker')
    // expect(wrapper.contains('.wv-picker')).toBeTruthy()
  })
})
