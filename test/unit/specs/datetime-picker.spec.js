import { mount } from 'vue-test-utils'
import DatetimePicker from '@/components/datetime-picker'
// import { dragHelper } from '../utils'

describe('picker', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a datetime picker', () => {
    wrapper = mount(DatetimePicker, {
      propsData: {
        slots: []
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
      expect(wrapper.vm.visible).toBe(true)

      wrapper.vm.close()
      expect(wrapper.vm.visible).toBe(false)
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
})
