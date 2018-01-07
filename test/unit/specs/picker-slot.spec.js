import { mount, shallow } from 'vue-test-utils'
import Picker from '@/components/picker/index.vue'
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

    expect(wrapper.name()).toBe('wv-picker-slot')
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

    // expect(wrapper.)
  })

  it('render a divider slot', () => {
    wrapper = shallow(PickerSlot, {
      propsData: {
        divider: true,
        content: '-'
      }
    })

    expect(wrapper.text()).toBe('-')
  })

  it('drag slot', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: [
          {
            values: [1, 2, 3],
            defaultIndex: 0
          }
        ]
      }
    })

    dragHelper(wrapper.find(PickerSlot), 0, 50)
  })

  it('click slot to change the current-value', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        slots: [
          {
            values: [1, 2, 3],
            defaultIndex: 0
          }
        ]
      }
    })

    setTimeout(() => {
      const indicator = wrapper.find('.weui-picker__indicator').element

      const indicatorRect = indicator.getBoundingClientRect()

      wrapper.find(PickerSlot).trigger('click', { clientX: 0, clientY: indicatorRect.top + 35 })

      expect(wrapper.find(PickerSlot).vm.currentIndex).toBe(1)
      done()
    }, 500)
  })

  it('watch currentValue', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        slots: [
          {
            values: [1, 2, 3],
            defaultIndex: 0
          }
        ]
      }
    })

    const pickerSlotWrapper = wrapper.find(PickerSlot)

    setTimeout(() => {
      pickerSlotWrapper.setData({
        currentIndex: 1
      })

      expect(pickerSlotWrapper.emitted().change[0]).toEqual([1])
      done()
    }, 500)
  })

  it('divider pickerSlot', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        slots: [
          {
            divider: true
          }
        ]
      }
    })

    const pickerSlotWrapper = wrapper.find(PickerSlot)

    setTimeout(() => {
      pickerSlotWrapper.setData({
        currentIndex: 1
      })

      // divider should not emit change event when currentIndex changed
      expect(pickerSlotWrapper.emitted().change).toBeFalsy()
      done()
    }, 500)
  })

  it('index should be adjust to a suitable value when it is exceeded ot disabled', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        slots: [
          {
            values: [
              {
                text: 1
              },
              {
                text: 2
              },
              {
                text: 3,
                disabled: true
              }
            ],
            defaultIndex: 0
          }
        ]
      }
    })

    const pickerSlotWrapper = wrapper.find(PickerSlot)

    setTimeout(() => {
      pickerSlotWrapper.vm.setIndex(4)

      // divider should not emit change event when currentIndex changed
      expect(pickerSlotWrapper.vm.currentIndex).toBe(1)
      done()
    }, 500)
  })

  it('watch defaultIndex', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        slots: [
          {
            values: [1, 2, 3],
            defaultIndex: 0
          }
        ]
      }
    })

    const pickerSlotWrapper = wrapper.find(PickerSlot)

    setTimeout(() => {
      pickerSlotWrapper.setProps({
        defaultIndex: 1
      })

      expect(pickerSlotWrapper.vm.currentIndex).toBe(1)
      done()
    }, 500)
  })

  it('test setValue method', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        slots: [
          {
            values: [1, 2, 3],
            defaultIndex: 0
          }
        ]
      }
    })

    const pickerSlotWrapper = wrapper.find(PickerSlot)

    setTimeout(() => {
      pickerSlotWrapper.vm.setValue(3)

      expect(pickerSlotWrapper.vm.currentValue).toBe(3)
      expect(pickerSlotWrapper.vm.currentIndex).toBe(2)
      done()
    }, 500)
  })
})
