import { mount, shallow } from 'vue-test-utils'
import Picker from '@/components/picker'
import PickerColumn from '@/components/picker/picker-column.vue'
import { dragHelper } from '../utils'

const testSingleColumn = [
  {
    values: [1, 2, 3]
  }
]

const testMultiColumn = [
  {
    values: [1, 2, 3]
  },
  {
    values: ['yes', 'no']
  }
]

describe('picker', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(Picker, {
      propsData: {
        visible: true,
        columns: []
      }
    })

    expect(wrapper.name()).toBe('wv-picker')
  })

  it('create a single-column picker', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testSingleColumn
      }
    })

    setTimeout(() => {
      expect(wrapper.findAll(PickerColumn).length).toBe(1)

      expect(wrapper.vm.getColumnValues(0).length).toBe(3)
      expect(wrapper.vm.getValues()).toEqual([1])

      done()
    }, 50)
  })

  it('create a nulti-column picker', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn
      }
    })

    setTimeout(() => {
      expect(wrapper.findAll(PickerColumn).length).toBe(2)

      expect(wrapper.vm.getColumnValues(0).length).toBe(3)
      expect(wrapper.vm.getColumnValues(1).length).toBe(2)
      expect(wrapper.vm.getValues()).toEqual([1, 'yes'])

      done()
    }, 50)
  })

  it('getColumnValue method', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testSingleColumn
      }
    })

    setTimeout(() => {
      expect(wrapper.vm.getColumnValue(0)).toEqual(1)

      done()
    }, 50)
  })

  // TODO
  it('setColumnValue method', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testSingleColumn
      }
    })

    wrapper.vm.setColumnValues(0, 2)

    setTimeout(() => {
      expect(wrapper.vm.getColumnValue(0)).toEqual(2)

      done()
    }, 50)
  })

  it('getColumnValues method', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn
      }
    })

    setTimeout(() => {
      expect(wrapper.vm.getColumnValues(0)).toEqual([1, 2, 3])
      expect(wrapper.vm.getColumnValues(1)).toEqual(['yes', 'no'])

      done()
    }, 50)
  })

  // TODO: setColumnValues
  it('setColumnValue method', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: []
      }
    })

    wrapper.vm.setColumnValues(0, [1, 2, 3])

    setTimeout(() => {
      expect(wrapper.vm.getColumnValues(0)).toEqual([1, 2, 3])

      done()
    }, 50)
  })

  // TODO: getValues
  it('test getValues method', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testSingleColumn
      }
    })

    expect(wrapper.vm.getValues()).toEqual([1])
  })

  // TODO: setValues
  it('test setValues method', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [{
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
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    expect(wrapper.vm.getValues()).toEqual(1)
  })

  // TODO: getColumnIndex
  it('test getColumnIndex method', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    expect(wrapper.vm.getColumnIndex(0)).toEqual(1)
  })

  // TODO: setColumnIndex
  it('test setColumnIndex method', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    expect(wrapper.vm.setColumnIndex(0, 1)).toEqual(1)
  })

  // TODO: getIndexes
  it('test getIndexes method', (done) => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    wrapper.vm.$nextTick(() => {
      const ccc = wrapper.vm.children

      expect(wrapper.vm.getIndexes()).toEqual([1])
    })

    setTimeout(() => {
      const ccc = wrapper.vm.children

      expect(wrapper.vm.getIndexes()).toEqual([1])
      done()
    }, 50)
  })

  // TODO: setIndexes
  it('test setIndexes method', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [{
          values: slotValues
        }]
      }
    })

    wrapper.vm.setIndexes([1])

    expect(wrapper.vm.getIndexes()).toEqual([1])
  })

  it('click cancel button', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: []
      }
    })

    wrapper.findAll('.weui-picker__action').at(0).trigger('click')
    expect(wrapper.vm.visible).toBe(false)
    expect(wrapper.emitted().cancel).toBeTruthy()
  })

  it('click confirm button', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: []
      }
    })

    wrapper.findAll('.weui-picker__action').at(1).trigger('click')
    expect(wrapper.vm.visible).toBe(false)
    expect(wrapper.emitted().confirm).toBeTruthy()
  })

  it('when slot value changed, change event should be emitted', () => {
    const slotValues = [1, 2, 3]

    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [{
          values: slotValues,
          default: 0
        }]
      }
    })

    wrapper.findAll(PickerColumn).at(0).vm.$emit('change', 0)

    expect(wrapper.emitted().change).toBeTruthy()
  })
})

describe('picker-column', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(PickerColumn, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-picker-column')
  })

  it('create using object-array values', () => {
    const slotValues = [
      {
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
      }
    ]

    wrapper = mount(PickerColumn, {
      propsData: {
        values: slotValues,
        valueKey: 'value',
        value: 'value1'
      }
    })

    // expect(wrapper.)
  })

  it('render a divider slot', () => {
    wrapper = shallow(PickerColumn, {
      propsData: {
        divider: true,
        content: '-'
      }
    })

    expect(wrapper.text()).toBe('-')
  })

  it('drag slot', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            values: [1, 2, 3],
            defaultIndex: 0
          }
        ]
      }
    })

    dragHelper(wrapper.find(PickerColumn), 0, 50)
  })

  it('click slot to change the current-value', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
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

      wrapper.find(PickerColumn).trigger('click', { clientX: 0, clientY: indicatorRect.top + 35 })

      expect(wrapper.find(PickerColumn).vm.currentIndex).toBe(1)
      done()
    }, 50)
  })

  it('watch currentValue', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            values: [1, 2, 3],
            defaultIndex: 0
          }
        ]
      }
    })

    const pickerColumnWrapper = wrapper.find(PickerColumn)

    setTimeout(() => {
      pickerColumnWrapper.setData({
        currentIndex: 1
      })

      expect(pickerColumnWrapper.emitted().change[0]).toEqual([1])
      done()
    }, 50)
  })

  it('divider pickerSlot', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            divider: true
          }
        ]
      }
    })

    const pickerColumnWrapper = wrapper.find(PickerColumn)

    setTimeout(() => {
      pickerColumnWrapper.setData({
        currentIndex: 1
      })

      // divider should not emit change event when currentIndex changed
      expect(pickerColumnWrapper.emitted().change).toBeFalsy()
      done()
    }, 50)
  })

  it('index should be adjust to a suitable value when it is exceeded ot disabled', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
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

    const pickerColumnWrapper = wrapper.find(PickerColumn)

    setTimeout(() => {
      pickerColumnWrapper.vm.setIndex(4)

      // divider should not emit change event when currentIndex changed
      expect(pickerColumnWrapper.vm.currentIndex).toBe(1)
      done()
    }, 50)
  })

  it('watch defaultIndex', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            values: [1, 2, 3],
            defaultIndex: 0
          }
        ]
      }
    })

    const pickerColumnWrapper = wrapper.find(PickerColumn)

    setTimeout(() => {
      pickerColumnWrapper.setProps({
        defaultIndex: 1
      })

      expect(pickerColumnWrapper.vm.currentIndex).toBe(1)
      done()
    }, 50)
  })

  it('test setValue method', (done) => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            values: [1, 2, 3],
            defaultIndex: 0
          }
        ]
      }
    })

    const pickerColumnWrapper = wrapper.find(PickerColumn)

    setTimeout(() => {
      pickerColumnWrapper.vm.setValue(3)

      expect(pickerColumnWrapper.vm.currentValue).toBe(3)
      expect(pickerColumnWrapper.vm.currentIndex).toBe(2)
      done()
    }, 50)
  })
})
