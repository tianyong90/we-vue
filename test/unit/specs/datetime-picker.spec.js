import { mount } from '@vue/test-utils'
import DatetimePicker from '@/components/datetime-picker'
import { verticalDrag } from '../utils'

const testTime = '9:00'
const testDate = new Date('2018/01/01 19:00')

describe('datetime-picker', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a datetime picker', () => {
    let date = new Date()

    wrapper = mount(DatetimePicker, {
      propsData: {
        type: 'datetime',
        value: date
      }
    })

    expect(wrapper.name()).toBe('wv-datetime-picker')
  })

  it('create date picker', () => {
    wrapper = mount(DatetimePicker, {
      propsData: {
        type: 'date'
      }
    })
  })

  it('create time picker', () => {
    wrapper = mount(DatetimePicker, {
      propsData: {
        type: 'time'
      }
    })
  })

  it('test open and close method', () => {
    wrapper = mount(DatetimePicker, {
      propsData: {}
    })

    wrapper.vm.$nextTick(() => {
      wrapper.vm.open()
      expect(wrapper.vm.currentVisible).toBe(true)

      wrapper.vm.close()
      expect(wrapper.vm.currentVisible).toBe(false)
    })
  })

  it('test isLeapyear method', () => {
    wrapper = mount(DatetimePicker, {
      propsData: {}
    })

    expect(wrapper.vm.isLeapYear(2012)).toBe(true)
    expect(wrapper.vm.isLeapYear(2000)).toBe(true)
    expect(wrapper.vm.isLeapYear(2001)).toBe(false)
  })

  it('test isShortMonth method', () => {
    wrapper = mount(DatetimePicker, {
      propsData: {}
    })

    expect(wrapper.vm.isShortMonth(4)).toBe(true)
    expect(wrapper.vm.isShortMonth(1)).toBe(false)
  })

  it('test getMonthEndDay method', () => {
    wrapper = mount(DatetimePicker, {
      propsData: {}
    })

    expect(wrapper.vm.getMonthEndDay(2018, 1)).toBe(31)
    expect(wrapper.vm.getMonthEndDay(2016, 1)).toBe(31)
    expect(wrapper.vm.getMonthEndDay(2016, 4)).toBe(30)

    expect(wrapper.vm.getMonthEndDay(2016, 2)).toBe(29)
    expect(wrapper.vm.getMonthEndDay(2018, 2)).toBe(28)
  })

  it('test getTrueValue method', () => {
    wrapper = mount(DatetimePicker, {
      propsData: {}
    })

    expect(wrapper.vm.getTrueValue()).toBe(undefined)
    expect(wrapper.vm.getTrueValue('1')).toBe(1)
    expect(wrapper.vm.getTrueValue('01')).toBe(1)
    expect(wrapper.vm.getTrueValue('2月')).toBe(2)
    expect(wrapper.vm.getTrueValue('2018年')).toBe(2018)
    expect(wrapper.vm.getTrueValue('A2018年')).toBe(2018)
  })

  it('test onConfirm', (done) => {
    wrapper = mount(DatetimePicker, {
      propsData: {}
    })

    setTimeout(() => {
      wrapper.findAll('.weui-picker__action').at(1).trigger('click')

      expect(wrapper.vm.visible).toBe(false)
      expect(wrapper.emitted().confirm).toBeTruthy()
      done()
    }, 500)
  })

  it('test onCancel', (done) => {
    wrapper = mount(DatetimePicker, {
      propsData: {}
    })

    setTimeout(() => {
      wrapper.findAll('.weui-picker__action').at(0).trigger('click')

      expect(wrapper.vm.visible).toBe(false)
      expect(wrapper.emitted().cancel).toBeTruthy()
      done()
    }, 500)
  })

  // TODO:
  it('drag time picker', (done) => {
    wrapper = mount(DatetimePicker, {
      attachToDocument: true,
      propsData: {
        visible: true,
        type: 'time',
        value: '12:00'
      }
    })

    setTimeout(() => {
      expect(wrapper.vm.currentValue).toEqual('12:00')

      const hour = wrapper.findAll('.weui-picker__group').at(0)
      const minute = wrapper.findAll('.weui-picker__group').at(1)

      verticalDrag(hour, 0, 0)
      verticalDrag(minute, 0, 0)

      // TODO
      // expect(wrapper.vm.currentValue).toEqual('1:01')
      done()
    }, 50)
  })

  // TODO:
  it('drag datetime picker', (done) => {
    wrapper = mount(DatetimePicker, {
      attachToDocument: true,
      propsData: {
        type: 'datetime',
        value: testDate
      }
    })

    setTimeout(() => {
      const year = wrapper.findAll('.weui-picker__group').at(0)
      const month = wrapper.findAll('.weui-picker__group').at(1)
      const date = wrapper.findAll('.weui-picker__group').at(2)
      const hour = wrapper.findAll('.weui-picker__group').at(3)
      const minute = wrapper.findAll('.weui-picker__group').at(4)

      verticalDrag(year, 0, -50)
      verticalDrag(month, 0, -50)
      verticalDrag(date, 0, -50)
      verticalDrag(hour, 0, -50)
      verticalDrag(minute, 0, -50)

      done()
    }, 500)
  })

  // TODO:
  it('drag date picker', (done) => {
    wrapper = mount(DatetimePicker, {
      attachToDocument: true,
      propsData: {
        type: 'date',
        value: testDate
      }
    })

    setTimeout(() => {
      const year = wrapper.findAll('.weui-picker__group').at(0)
      const month = wrapper.findAll('.weui-picker__group').at(1)
      const date = wrapper.findAll('.weui-picker__group').at(2)

      verticalDrag(year, 0, -50)
      verticalDrag(month, 0, -50)
      verticalDrag(date, 0, -50)

      done()
    }, 500)
  })

  it('watch value change', (done) => {
    wrapper = mount(DatetimePicker, {
      propsData: {}
    })

    const newValue = new Date()

    setTimeout(() => {
      wrapper.setProps({
        value: newValue
      })

      expect(wrapper.vm.currentValue).toEqual(newValue)
      done()
    }, 500)
  })
})
