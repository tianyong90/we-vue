import { mount } from '@vue/test-utils'
import WDatetimePicker from '../'
import { slowVerticalDrag } from '@/test/unit/utils'

const testTime = '12:00'
const testDate = new Date('2018/01/01 19:00')

describe('datetime-picker', () => {
  test('create datetime picker', () => {
    const date = new Date()

    const wrapper = mount(WDatetimePicker, {
      attachToDocument: true,
      propsData: {
        type: 'datetime',
        value: date,
      },
    })

    expect(wrapper.name()).toBe('w-datetime-picker')
    expect(wrapper.findAll('.weui-picker__group')).toHaveLength(5)
  })

  test('create date picker', () => {
    const wrapper = mount(WDatetimePicker, {
      attachToDocument: true,
      propsData: {
        type: 'date',
      },
    })

    expect(wrapper.name()).toBe('w-datetime-picker')
    expect(wrapper.findAll('.weui-picker__group')).toHaveLength(3)
  })

  test('create time picker', () => {
    const wrapper = mount(WDatetimePicker, {
      attachToDocument: true,
      propsData: {
        type: 'time',
      },
    })

    expect(wrapper.name()).toBe('w-datetime-picker')
    expect(wrapper.findAll('.weui-picker__group')).toHaveLength(2)
  })

  test('test open and close method', () => {
    const wrapper = mount(WDatetimePicker, {
      propsData: {},
    })

    wrapper.vm.$nextTick(() => {
      wrapper.vm.open()
      expect(wrapper.vm.isActive).toBe(true)

      wrapper.vm.close()
      expect(wrapper.vm.isActive).toBe(false)
    })
  })

  test('test getMonthEndDay method', () => {
    const wrapper = mount(WDatetimePicker)

    expect(wrapper.vm.getMonthEndDay(2018, 1)).toBe(31)
    expect(wrapper.vm.getMonthEndDay(2016, 1)).toBe(31)
    expect(wrapper.vm.getMonthEndDay(2016, 4)).toBe(30)

    expect(wrapper.vm.getMonthEndDay(2016, 2)).toBe(29)
    expect(wrapper.vm.getMonthEndDay(2018, 2)).toBe(28)
  })

  test('test getTrueValue method', () => {
    const wrapper = mount(WDatetimePicker)

    expect(wrapper.vm.getTrueValue('1')).toBe(1)
    expect(wrapper.vm.getTrueValue('01')).toBe(1)
    expect(wrapper.vm.getTrueValue('2月')).toBe(2)
    expect(wrapper.vm.getTrueValue('2018年')).toBe(2018)
    expect(wrapper.vm.getTrueValue('A2018年')).toBe(2018)
  })

  test('onConfirm', () => {
    return new Promise(done => {
      const wrapper = mount(WDatetimePicker, {
        propsData: {},
      })

      wrapper.vm.$nextTick(() => {
        wrapper
          .findAll('.weui-picker__action')
          .at(1)
          .trigger('click')

        expect(wrapper.vm.isActive).toBe(false)
        expect(wrapper.emitted().confirm).toBeTruthy()
        done()
      })
    })
  })

  test('onCancel', () => {
    return new Promise(done => {
      const wrapper = mount(WDatetimePicker, {
        propsData: {},
      })

      wrapper.vm.$nextTick(() => {
        wrapper
          .findAll('.weui-picker__action')
          .at(0)
          .trigger('click')

        expect(wrapper.vm.isActive).toBe(false)
        expect(wrapper.emitted().cancel).toBeTruthy()
        done()
      })
    })
  })

  test('drag time picker', async () => {
    const wrapper = mount(WDatetimePicker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        type: 'time',
        value: testTime,
      },
    })

    await wrapper.vm.$nextTick()

    const [hourColumn, minuteColumn] = wrapper.findAll(
      '.weui-picker__group',
    ).wrappers

    slowVerticalDrag(hourColumn, 0, -34)
    expect(wrapper.vm.internalValue).toEqual('13:00')

    slowVerticalDrag(minuteColumn, 0, -34)
    expect(wrapper.vm.internalValue).toEqual('13:01')

    slowVerticalDrag(hourColumn, 0, -34 * 5)
    expect(wrapper.vm.internalValue).toEqual('18:01')

    // hour will be 23
    slowVerticalDrag(hourColumn, 0, -34 * 10)
    expect(wrapper.vm.internalValue).toEqual('23:01')

    // hour will be 0
    slowVerticalDrag(hourColumn, 0, 34 * 24)
    slowVerticalDrag(minuteColumn, 0, 34 * 10)
    expect(wrapper.vm.internalValue).toEqual('0:00')
  })

  test('drag datetime picker', async () => {
    const wrapper = mount(WDatetimePicker, {
      attachToDocument: true,
      propsData: {
        type: 'datetime',
        value: testDate,
      },
    })

    expect(wrapper.vm.internalValue).toEqual(testDate)

    await wrapper.vm.$nextTick()

    const [
      yearColumn,
      monthColumn,
      dateColumn,
      hourColumn,
      minuteColumn,
    ] = wrapper.findAll('.weui-picker__group').wrappers

    slowVerticalDrag(yearColumn, 0, -34)
    slowVerticalDrag(monthColumn, 0, -34)
    slowVerticalDrag(dateColumn, 0, -34)
    slowVerticalDrag(hourColumn, 0, -34)
    slowVerticalDrag(minuteColumn, 0, -34)

    expect(wrapper.vm.internalValue.getFullYear()).toBe(
      testDate.getFullYear() + 1,
    )
    expect(wrapper.vm.internalValue.getMonth()).toBe(testDate.getMonth() + 1)
    expect(wrapper.vm.internalValue.getDate()).toBe(testDate.getDate() + 1)
    expect(wrapper.vm.internalValue.getHours()).toBe(testDate.getHours() + 1)
    expect(wrapper.vm.internalValue.getMinutes()).toBe(testDate.getMinutes() + 1)
  })

  test('drag date picker', async () => {
    const wrapper = mount(WDatetimePicker, {
      attachToDocument: true,
      propsData: {
        type: 'date',
        value: testDate,
      },
    })

    expect(wrapper.vm.internalValue).toEqual(testDate)

    await wrapper.vm.$nextTick()

    const [yearColumn, monthColumn, dateColumn] = wrapper.findAll(
      '.weui-picker__group',
    ).wrappers

    slowVerticalDrag(yearColumn, 0, -34)
    slowVerticalDrag(monthColumn, 0, -34)
    slowVerticalDrag(dateColumn, 0, -34)

    expect(wrapper.vm.internalValue.getFullYear()).toEqual(
      testDate.getFullYear() + 1,
    )
    expect(wrapper.vm.internalValue.getMonth()).toEqual(testDate.getMonth() + 1)
    expect(wrapper.vm.internalValue.getDate()).toEqual(testDate.getDate() + 1)
  })

  test('watch value change', () => {
    const wrapper = mount(WDatetimePicker, {
      propsData: {
        type: 'date',
        value: testDate,
      },
    })

    const newValue = new Date()

    wrapper.setProps({
      value: newValue,
    })

    expect(wrapper.vm.internalValue).toEqual(newValue)
  })
})
