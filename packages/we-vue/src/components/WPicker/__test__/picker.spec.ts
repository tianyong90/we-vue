import { mount, Wrapper } from '@vue/test-utils'
import Picker from '../picker'
import PickerColumn from '../../picker/picker-column'
import { slowVerticalDrag } from '@/test/unit/utils'
import { ExtractVue } from '@utils/mixins'

const testSingleColumn = [
  {
    options: [1, 2, 3],
  },
]

const testMultiColumn = [
  {
    options: [1, 2, 3],
  },
  {
    options: ['yes', 'no'],
  },
]

type PickerWrapper = Wrapper<ExtractVue<typeof Picker>>
type PickerColumnWrapper = Wrapper<ExtractVue<typeof PickerColumn>>

describe('picker', () => {
  test('create', () => {
    const wrapper = mount(Picker, {
      propsData: {
        visible: true,
      },
    })

    expect(wrapper.name()).toBe('wv-picker')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('create a single-column picker', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testSingleColumn,
      },
    })

    expect(wrapper.findAll(PickerColumn)).toHaveLength(1)

    expect(wrapper.vm.getColumnOptions(0)).toHaveLength(3)
    expect(wrapper.vm.getValues()).toEqual([1])

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('create a multi-column picker', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn,
      },
    })

    expect(wrapper.findAll(PickerColumn)).toHaveLength(2)

    expect(wrapper.vm.getColumnOptions(0)).toHaveLength(3)
    expect(wrapper.vm.getColumnOptions(1)).toHaveLength(2)
    expect(wrapper.vm.getValues()).toEqual([1, 'yes'])
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('getColumnValue method', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testSingleColumn,
      },
    })

    expect(wrapper.vm.getColumnValue(0)).toEqual(1)
  })

  test('getColumnOptions method', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn,
      },
    })

    expect(wrapper.vm.getColumnOptions(0)).toEqual([1, 2, 3])
    expect(wrapper.vm.getColumnOptions(1)).toEqual(['yes', 'no'])
  })

  test('test setColumnValue method', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn,
      },
    })

    wrapper.vm.setColumnOptions(0, [1, 2, 3])

    expect(wrapper.vm.getColumnOptions(0)).toEqual([1, 2, 3])
  })

  test('test getValues method', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testSingleColumn,
      },
    })

    expect(wrapper.vm.getValues()).toEqual([1])
  })

  test('test setValues method', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            options: [1, 2, 3],
            default: 0,
          },
        ],
      },
    })

    wrapper.vm.setValues([2])

    expect(wrapper.vm.getValues()).toEqual([2])
  })

  test('test getColumnIndex method', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn,
      },
    })

    expect(wrapper.vm.getColumnIndex(0)).toBe(0)
    expect(wrapper.vm.getColumnIndex(1)).toBe(0)
  })

  test('test setColumnIndex method', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn,
      },
    })

    wrapper.vm.setColumnIndex(0, 1)
    wrapper.vm.setColumnIndex(1, 1)

    expect(wrapper.vm.getIndexes()).toEqual([1, 1])
  })

  test('test getIndexes method', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn,
      },
    })

    expect(wrapper.vm.getIndexes()).toEqual([0, 0])
  })

  test('test setIndexes method', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: testMultiColumn,
      },
    })

    wrapper.vm.setIndexes([1, 1])

    expect(wrapper.vm.getIndexes()).toEqual([1, 1])
  })

  test('click cancel button', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        'visible.sync': true,
        columns: [],
      },
    })

    wrapper
      .findAll('.weui-picker__action')
      .at(0)
      .trigger('click')
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.emitted().cancel).toBeTruthy()
  })

  test('click confirm button', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        'visible.sync': true,
        columns: [],
      },
    })

    wrapper
      .findAll('.weui-picker__action')
      .at(1)
      .trigger('click')
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.emitted().confirm).toBeTruthy()
  })

  test('when column value changed, change event should be emitted', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            options: [1, 2, 3],
            default: 0,
          },
        ],
      },
    })

    wrapper
      .findAll(PickerColumn)
      .at(0)
      .vm.$emit('change', 0)

    expect(wrapper.emitted().change).toBeTruthy()
  })

  test('value watcher', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            options: [1, 2, 3],
            default: 0,
          },
        ],
      },
    })

    const spy = jest.spyOn(wrapper.vm, 'setValues')

    wrapper.setProps({
      value: [2],
    })

    expect(spy).toHaveBeenCalled()
  })
})

describe('picker-column', () => {
  // test('create', () => {
  //   const wrapper = mount(PickerColumn, {
  //     parentComponent: Picker
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
  //   const wrapper = mount(PickerColumn, {
  //     parentComponent: Picker,
  //     propsData: {
  //       options: options,
  //       valueKey: 'value'
  //     }
  //   })
  //
  //   expect(wrapper.findAll('.weui-picker__item').length).toBe(3)
  // })

  // test('render a divider slot', () => {
  //   const wrapper = mount(PickerColumn, {
  //     parentComponent: Picker,
  //     propsData: {
  //       divider: true,
  //       content: '-'
  //     }
  //   })
  //
  //   expect(wrapper.text()).toBe('-')
  // })

  test(
    'drag slot',
    () => {
      const wrapper = mount(Picker, {
        attachToDocument: true,
        propsData: {
          visible: true,
          columns: testSingleColumn,
        },
      })

      const columnWrapper = wrapper.find(PickerColumn) as PickerColumnWrapper

      slowVerticalDrag(columnWrapper, 0, -34)
      expect(columnWrapper.vm.currentIndex).toBe(1)

      slowVerticalDrag(columnWrapper, 0, -34)
      expect(columnWrapper.vm.currentIndex).toBe(2)

      // this will out of range
      slowVerticalDrag(columnWrapper, 0, -34)
      expect(columnWrapper.vm.currentIndex).toBe(2)

      slowVerticalDrag(columnWrapper, 0, 34)
      expect(columnWrapper.vm.currentIndex).toBe(1)

      // this will out of range
      slowVerticalDrag(columnWrapper, 0, 100)
      expect(columnWrapper.vm.currentIndex).toBe(0)
    },
    15000
  )

  test('click slot to change the current-value', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            options: [1, 2, 3],
            defaultIndex: 0,
          },
        ],
      },
    })

    const columnWrapper = wrapper.find(PickerColumn) as PickerColumnWrapper

    const option1 = wrapper.findAll('.weui-picker__item').at(1)
    option1.trigger('click')

    expect(columnWrapper.vm.currentIndex).toBe(1)
  })

  test('divider pickerSlot', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            divider: true,
          },
        ],
      },
    })

    const pickerColumnWrapper = wrapper.find(PickerColumn)

    pickerColumnWrapper.setData({
      currentIndex: 1,
    })

    // divider should not emit change event when currentIndex changed
    expect(pickerColumnWrapper.emitted().change).toBeFalsy()
  })

  test('index should be adjust to a suitable value when it is exceeded ot disabled', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            options: [
              {
                text: 1,
              },
              {
                text: 2,
              },
              {
                text: 3,
                disabled: true,
              },
            ],
            defaultIndex: 0,
          },
        ],
      },
    })

    const pickerColumnWrapper = wrapper.find(PickerColumn) as PickerColumnWrapper

    pickerColumnWrapper.vm.setIndex(4)

    // divider should not emit change event when currentIndex changed
    expect(pickerColumnWrapper.vm.currentIndex).toBe(1)
  })

  test('watch defaultIndex', () => {
    const wrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            options: [1, 2, 3],
            defaultIndex: 0,
          },
        ],
      },
    })

    const pickerColumnWrapper = wrapper.find(PickerColumn) as PickerColumnWrapper

    pickerColumnWrapper.setProps({
      defaultIndex: 1,
    })

    expect(pickerColumnWrapper.vm.currentIndex).toBe(1)
  })

  test('test setValue method', () => {
    const wrapper: PickerWrapper = mount(Picker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        columns: [
          {
            options: [1, 2, 3],
            defaultIndex: 0,
          },
        ],
      },
    })

    const pickerColumnWrapper = wrapper.find(PickerColumn) as PickerColumnWrapper

    const spy = jest.spyOn(pickerColumnWrapper.vm, 'setIndex')

    pickerColumnWrapper.vm.setValue(3)

    expect(spy).toHaveBeenCalledWith(2)
  })
})
