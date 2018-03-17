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

  test('click decrease button', () => {
    wrapper = shallow(NumberSpinner, {
      propsData: {},
      data: {
        currentValue: 5
      }
    })

    wrapper.find('.btn-decrease').trigger('click')
    expect(wrapper.vm.currentValue).toBe(5 - wrapper.vm.step)
  })

  test('click increase button', () => {
    wrapper = shallow(NumberSpinner, {
      propsData: {},
      data: {
        currentValue: 1
      }
    })

    wrapper.find('.btn-increase').trigger('click')
    expect(wrapper.vm.currentValue).toBe(1 + wrapper.vm.step)
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
