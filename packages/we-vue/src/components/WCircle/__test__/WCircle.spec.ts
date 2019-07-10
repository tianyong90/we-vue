import { shallowMount } from '@vue/test-utils'
import Circle from '../'

describe('circle', () => {
  test('create', () => {
    const wrapper = shallowMount(Circle, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('w-circle')
    expect(wrapper.classes()).toContain('wv-circle')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('what value change', () => {
    const wrapper = shallowMount(Circle, {
      propsData: {
        value: 0,
      },
    })

    wrapper.setProps({
      value: 100,
    })

    expect(wrapper.vm.currentValue).toBe(100)
  })

  test('what currentValue change', () => {
    const wrapper = shallowMount(Circle, {
      propsData: {
        value: 0,
      },
    })

    wrapper.setData({
      currentValue: 100,
    })

    expect(wrapper.emitted().input).toBeTruthy()
  })
})
