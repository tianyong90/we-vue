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

  it('create a single-column picker', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        slots: [{
          values: [1, 2, 3],
          defaultIndex: 0
        }]
      }
    })

    setTimeout(() => {
      expect(wrapper.vm.children.length).toBe(1)
      expect(wrapper.vm.getValues()).toEqual([1])
      done()
    }, 500)
  })

  it('create a nulti-column picker', (done) => {
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

    setTimeout(() => {
      expect(wrapper.findAll(PickerSlot).length).toBe(2)
      expect(wrapper.vm.getValues()).toEqual([1, 1])
      done()
    }, 500)
  })

  // TODO: getSlotValue
  it('getSlotValue method', (done) => {
    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: [1, 2, 3],
          default: 0
        }]
      }
    })

    setTimeout(() => {
      wrapper.vm.getSlotValue(0)
      done()
    }, 500)
  })

  // TODO: setSlotValue
  it('setSlotValue method', () => {
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

  // TODO: getSlotValues
  it('getSlotValues method', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: [1, 2, 3],
          default: 0
        }]
      }
    })

    wrapper.vm.$nextTick(() => {
      wrapper.vm.getSlotValues(0)
    })
  })

  // TODO: setSlotValues
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

  // TODO: getValues
  it('test getValues method', () => {
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

  // TODO: setValues
  it('test setValues method', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    // it should throw an error when value length does not math the slot count
    try {
      wrapper.vm.setValues([])
    } catch (e) {
      expect(e.message).toEqual('values length is not equal slot count.')
    }

    wrapper.vm.setValues([2])

    expect(wrapper.vm.setValues([0])).toEqual(1)
  })

  // TODO: getValues
  it('test getValues method', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    expect(wrapper.vm.getValues()).toEqual(1)
  })

  // TODO: getSlotIndex
  it('test getSlotIndex method', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    expect(wrapper.vm.getSlotIndex(0)).toEqual(1)
  })

  // TODO: setSlotIndex
  it('test setSlotIndex method', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    expect(wrapper.vm.setSlotIndex(0, 1)).toEqual(1)
  })

  // TODO: getIndexes
  it('test getIndexes method', (done) => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    setTimeout(() => {
      // const ccc = wrapper.vm.children
      //
      // expect(wrapper.vm.getIndexes()).toEqual(1)
      done()
    }, 500)
  })

  // TODO: setIndexes
  it('test setIndexes method', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    expect(wrapper.vm.setIndexes([1])).toEqual(1)
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

  it('when slot value changed, change event should be emitted', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      propsData: {
        slots: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    wrapper.findAll(PickerSlot).at(0).vm.$emit('change', 0)

    expect(wrapper.emitted().change).toBeTruthy()
  })
})
