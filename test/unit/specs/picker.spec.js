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

  it('create a single-column picker', () => {
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

  it('create a nulti-column picker', () => {
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

    // expect(wrapper.contains('.wv-picker')).toBeTruthy()
  })

  it('setSlotValue method', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: [1, 2, 3],
          default: 0
        }]
      }
    })

    wrapper.vm.setSlotValues(0, 2)

    // expect(wrapper.contains('.wv-picker')).toBeTruthy()
  })

  it('getSlotValues method', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    const slotValuesResult = wrapper.vm.setSlotValues(0)

    expect(slotValuesResult).toEqual(slotValues)
  })

  it('getSlotValue method', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    expect(wrapper.vm.setSlotValue(0)).toEqual(1)
  })

  it('click cancel button', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: []
      }
    })

    wrapper.findAll('.weui-picker__action').at(0).trigger('click')
    expect(wrapper.vm.visible).toBe(false)
    expect(wrapper.emitted().cancel).toBeTruthy()
  })

  it('click confirm button', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: []
      }
    })

    wrapper.findAll('.weui-picker__action').at(1).trigger('click')
    expect(wrapper.vm.visible).toBe(false)
    expect(wrapper.emitted().confirm).toBeTruthy()
  })
})
