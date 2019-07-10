import { shallowMount } from '@vue/test-utils'
import Tabbar from '../'

describe('tabbar', () => {
  test('create', () => {
    const wrapper = shallowMount(Tabbar, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('w-tabbar')
    expect(wrapper.classes()).toContain('weui-tabbar')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('fixed tabbar', () => {
    // is not fixed by default
    let wrapper = shallowMount(Tabbar, {
      propsData: {},
    })

    expect(wrapper.element.style.position).toBe('absolute')

    wrapper = shallowMount(Tabbar, {
      propsData: {
        fixed: true,
      },
    })

    expect(wrapper.element.style.position).toBe('fixed')
  })
})
