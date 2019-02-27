import { shallowMount } from '@vue/test-utils'
import NumberSpinner from '../number-spinner'

describe('number-spinner', () => {
  test('create', () => {
    const wrapper = shallowMount(NumberSpinner, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-number-spinner')
    expect(wrapper.classes()).toContain('wv-number-spinner')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('blur event', () => {
    const wrapper = shallowMount(NumberSpinner, {
      data: function () {
        return {
          currentValue: '',
        }
      },
    })

    wrapper.find('input').trigger('blur')

    expect(wrapper.vm.currentValue).toBe(wrapper.vm.min)
  })

  test('onChange method', () => {
    const wrapper = shallowMount(NumberSpinner, {
      propsData: {
        value: 1,
      },
    })

    wrapper.vm.$refs.input.value = 2

    wrapper.find('input').trigger('change')

    expect(wrapper.vm.currentValue).toBe(2)
  })

  test('onPaste method', () => {
    const wrapper = shallowMount(NumberSpinner, {
      propsData: {
        value: 1,
        fillable: false,
      },
    })

    const mockEvent = {
      preventDefault: jest.fn(),
    }

    wrapper.vm.onPaste(mockEvent)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  test('onKeypress method when fillable is false', () => {
    const spy = jest.fn()

    const wrapper = shallowMount(NumberSpinner, {
      propsData: {
        value: 1,
        fillable: false,
      },
    })

    const mockEvent = {
      preventDefault: spy,
    }

    wrapper.find('input').trigger('keypress', mockEvent)

    expect(spy).toHaveBeenCalled()
  })

  test('click minus button', () => {
    let wrapper = shallowMount(NumberSpinner, {
      propsData: {
        value: 5,
      },
    })

    wrapper.find('.btn-minus').trigger('click')
    expect(wrapper.vm.currentValue).toBe(5 - wrapper.vm.step)

    // when the initial value is NaN
    wrapper = shallowMount(NumberSpinner, {
      propsData: {
        value: NaN,
      },
    })

    wrapper.find('.btn-minus').trigger('click')
    expect(wrapper.vm.currentValue).toBe(0)
  })

  test('click plus button', () => {
    let wrapper = shallowMount(NumberSpinner, {
      propsData: {
        value: 1,
      },
    })

    wrapper.find('.btn-plus').trigger('click')
    expect(wrapper.vm.currentValue).toBe(1 + wrapper.vm.step)

    // when the initial value is NaN
    wrapper = shallowMount(NumberSpinner, {
      propsData: {
        value: NaN,
      },
    })

    wrapper.find('.btn-plus').trigger('click')
    expect(wrapper.vm.currentValue).toBe(1)
  })

  test('watch currentValue', () => {
    const wrapper = shallowMount(NumberSpinner, {
      propsData: {},
    })

    wrapper.setData({
      currentValue: 'current-value',
    })

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
  })

  test('watch value', () => {
    const wrapper = shallowMount(NumberSpinner, {
      propsData: {
        min: 1,
        max: 10,
      },
    })

    wrapper.setProps({
      value: 2,
    })

    expect(wrapper.vm.currentValue).toBe(2)

    // set a value bigger than max
    wrapper.setProps({
      value: 11,
    })

    expect(wrapper.vm.currentValue).toBe(10)

    // set a value smaller than min
    wrapper.setProps({
      value: 0,
    })

    expect(wrapper.vm.currentValue).toBe(1)

    // set an empty string
    wrapper.setProps({
      value: '',
    })

    expect(wrapper.vm.currentValue).toBe(1)
  })
})
