import { mount, shallowMount } from '@vue/test-utils'
import Picker from '@/components/picker'
import PickerColumn from '@/components/picker/picker-column.vue'
import { slowVerticalDrag } from '../utils'

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

  test('create', () => {
    wrapper = shallowMount(Picker, {
      propsData: {
        visible: true
      }
    })

    expect(wrapper.name()).toBe('wv-picker')
  })

  test('create a single-column picker', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testSingleColumn
      }
    })

    expect(wrapper.findAll(PickerColumn).length).toBe(1)

    expect(wrapper.vm.getColumnValues(0).length).toBe(3)
    expect(wrapper.vm.getValues()).toEqual([1])
  })

  test('create a multi-column picker', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn
      }
    })

    expect(wrapper.findAll(PickerColumn).length).toBe(2)

    expect(wrapper.vm.getColumnValues(0).length).toBe(3)
    expect(wrapper.vm.getColumnValues(1).length).toBe(2)
    expect(wrapper.vm.getValues()).toEqual([1, 'yes'])
  })

  test('getColumnValue method', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testSingleColumn
      }
    })

    expect(wrapper.vm.getColumnValue(0)).toEqual(1)
  })

  test('getColumnValues method', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn
      }
    })

    expect(wrapper.vm.getColumnValues(0)).toEqual([1, 2, 3])
    expect(wrapper.vm.getColumnValues(1)).toEqual(['yes', 'no'])
  })

  test('test setColumnValue method', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn
      }
    })

    wrapper.vm.setColumnValues(0, [1, 2, 3])

    expect(wrapper.vm.getColumnValues(0)).toEqual([1, 2, 3])
  })

  test('test getValues method', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testSingleColumn
      }
    })

    expect(wrapper.vm.getValues()).toEqual([1])
  })

  test('test setValues method', () => {
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
      expect(e.message).toEqual('Length values is not equal to columns count.')
    }

    wrapper.vm.setValues([2])

    expect(wrapper.vm.getValues()).toEqual([2])
  })

  test('test getColumnIndex method', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn
      }
    })

    expect(wrapper.vm.getColumnIndex(0)).toBe(0)
    expect(wrapper.vm.getColumnIndex(1)).toBe(0)
  })

  test('test setColumnIndex method', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn
      }
    })

    wrapper.vm.setColumnIndex(0, 1)
    wrapper.vm.setColumnIndex(1, 1)

    expect(wrapper.vm.getIndexes()).toEqual([1, 1])
  })

  test('test getIndexes method', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn
      }
    })

    expect(wrapper.vm.getIndexes()).toEqual([0, 0])
  })

  test('test setIndexes method', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn
      }
    })

    wrapper.vm.setIndexes([1, 1])

    expect(wrapper.vm.getIndexes()).toEqual([1, 1])
  })

  test('click cancel button', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        'visible.sync': true,
        columns: []
      }
    })

    wrapper.findAll('.weui-picker__action').at(0).trigger('click')
    expect(wrapper.vm.visible).toBe(false)
    expect(wrapper.emitted().cancel).toBeTruthy()
  })

  test('click confirm button', () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        'visible.sync': true,
        columns: []
      }
    })

    wrapper.findAll('.weui-picker__action').at(1).trigger('click')
    expect(wrapper.vm.visible).toBe(false)
    expect(wrapper.emitted().confirm).toBeTruthy()
  })

  test('when column value changed, change event should be emitted', () => {
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

  test('value watcher', () => {
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

    const spy = jest.spyOn(wrapper.vm, 'setValues')

    wrapper.setProps({
      value: [2]
    })

    setTimeout(() => {
      expect(wrapper.vm.currentValue).toEqual([2])
      expect(spy).toHaveBeenCalled()
    }, 50)
  })
})

describe('picker-column', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  // TODO: bugs
  // test('create', () => {
  //   wrapper = shallowMount(PickerColumn, {
  //   })
  //
  //   expect(wrapper.name()).toBe('wv-picker-column')
  // })

  // test('create using object-array values', () => {
  //   const options = [
  //     {
  //       label: 'label1',
  //       value: 'value1'
  //     },
  //     {
  //       label: 'label2',
  //       value: 'value2'
  //     },
  //     {
  //       label: 'label3',
  //       value: 'value3'
  //     }
  //   ]
  //
  //   wrapper = mount(PickerColumn, {
  //     propsData: {
  //       options: options,
  //       valueKey: 'value'
  //     }
  //   })
  //
  //   expect(wrapper.findAll('.weui-picker__item').length).toBe(3)
  // })
  //
  // test('render a divider slot', () => {
  //   wrapper = shallowMount(PickerColumn, {
  //     propsData: {
  //       divider: true,
  //       content: '-'
  //     }
  //   })
  //
  //   expect(wrapper.text()).toBe('-')
  // })

  test('drag slot', async () => {
    wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testSingleColumn
      }
    })

    const columnWrapper = wrapper.find(PickerColumn)

    await slowVerticalDrag(columnWrapper, 0, -34)
    expect(columnWrapper.vm.currentIndex).toBe(1)

    await slowVerticalDrag(columnWrapper, 0, -34)
    expect(columnWrapper.vm.currentIndex).toBe(2)

    // this will out of range
    await slowVerticalDrag(columnWrapper, 0, -34)
    expect(columnWrapper.vm.currentIndex).toBe(2)

    await slowVerticalDrag(columnWrapper, 0, 34)
    expect(columnWrapper.vm.currentIndex).toBe(1)

    // this will out of range
    await slowVerticalDrag(columnWrapper, 0, 100)
    expect(columnWrapper.vm.currentIndex).toBe(0)
  }, 15000)

  test('click slot to change the current-value', () => {
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

    const columnWrapper = wrapper.find(PickerColumn)

    const indicator = wrapper.find('.weui-picker__indicator').element

    const indicatorRect = indicator.getBoundingClientRect()

    columnWrapper.trigger('click', { clientX: 0, clientY: indicatorRect.top + 35 })

    expect(columnWrapper.vm.currentIndex).toBe(1)
  })

  test('divider pickerSlot', () => {
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

    pickerColumnWrapper.setData({
      currentIndex: 1
    })

    // divider should not emit change event when currentIndex changed
    expect(pickerColumnWrapper.emitted().change).toBeFalsy()
  })

  test('index should be adjust to a suitable value when it is exceeded ot disabled', () => {
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

    pickerColumnWrapper.vm.setIndex(4)

    // divider should not emit change event when currentIndex changed
    expect(pickerColumnWrapper.vm.currentIndex).toBe(1)
  })

  test('watch defaultIndex', () => {
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

    pickerColumnWrapper.setProps({
      defaultIndex: 1
    })

    expect(pickerColumnWrapper.vm.currentIndex).toBe(1)
  })

  test('watch options', () => {
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

    const setIndexSpy = jest.spyOn(pickerColumnWrapper.vm, 'setIndex')

    pickerColumnWrapper.setProps({
      options: [1, 2]
    })

    expect(setIndexSpy).toHaveBeenCalledWith(0)
  })

  test('test setValue method', () => {
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

    pickerColumnWrapper.vm.setValue(3)

    expect(pickerColumnWrapper.vm.currentValue).toBe(3)
    expect(pickerColumnWrapper.vm.currentIndex).toBe(2)
  })
})
