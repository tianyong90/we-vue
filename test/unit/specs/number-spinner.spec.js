import { shallow } from '@vue/test-utils'
import NumberSpinner from '@/components/number-spinner'

describe('number-spinner', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(NumberSpinner, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-number-spinner')
    expect(wrapper.classes()).toContain('wv-number-spinner')
  })

  test('blur event', () => {
    wrapper = shallow(NumberSpinner, {
      propsData: {},
      data: {
        currentValue: ''
      }
    })

    wrapper.find('input').trigger('blur')

    expect(wrapper.vm.currentValue).toBe(wrapper.vm.min)
  })

  test('onChange method', () => {
    wrapper = shallow(NumberSpinner, {
      propsData: {
        value: 1
      }
    })

    wrapper.vm.$refs.input.value = 2

    wrapper.find('input').trigger('change')

    expect(wrapper.vm.currentValue).toBe(2)
  })

  test('onPaste method', () => {
    const spy = jest.fn()

    wrapper = shallow(NumberSpinner, {
      propsData: {
        value: 1
      }
    })

    const mockEvent = {
      clipboardData: {
        getData: jest.fn()
      },
      preventDefault: spy
    }

    wrapper.find('input').trigger('paste', mockEvent)

    expect(spy).toHaveBeenCalled()
  })

  test('click minus button', () => {
    wrapper = shallow(NumberSpinner, {
      propsData: {
        value: 5
      }
    })

    wrapper.find('.btn-minus').trigger('click')
    expect(wrapper.vm.currentValue).toBe(5 - wrapper.vm.step)

    // when the initial value is NaN
    wrapper = shallow(NumberSpinner, {
      propsData: {
        value: NaN
      }
    })

    wrapper.find('.btn-minus').trigger('click')
    expect(wrapper.vm.currentValue).toBe(0)
  })

  test('click plus button', () => {
    wrapper = shallow(NumberSpinner, {
      propsData: {
        value: 1
      }
    })

    wrapper.find('.btn-plus').trigger('click')
    expect(wrapper.vm.currentValue).toBe(1 + wrapper.vm.step)

    // when the initial value is NaN
    wrapper = shallow(NumberSpinner, {
      propsData: {
        value: NaN
      }
    })

    wrapper.find('.btn-plus').trigger('click')
    expect(wrapper.vm.currentValue).toBe(1)
  })

  test('watch currentValue', () => {
    wrapper = shallow(NumberSpinner, {
      propsData: {}
    })

    wrapper.setData({
      currentValue: 'current-value'
    })

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
  })

  test('watch value', () => {
    wrapper = shallow(NumberSpinner, {
      propsData: {
        min: 1,
        max: 10
      }
    })

    wrapper.setProps({
      value: 2
    })

    expect(wrapper.vm.currentValue).toBe(2)

    // set a value bigger than max
    wrapper.setProps({
      value: 11
    })

    expect(wrapper.vm.currentValue).toBe(10)

    // set a value smaller than min
    wrapper.setProps({
      value: 0
    })

    expect(wrapper.vm.currentValue).toBe(1)

    // set an empty string
    wrapper.setProps({
      value: ''
    })

    expect(wrapper.vm.currentValue).toBe('')
  })
})
