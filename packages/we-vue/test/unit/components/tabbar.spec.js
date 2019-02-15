import { shallowMount } from '@vue/test-utils'
import Tabbar from '@/components/tabbar'

describe('tabbar', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Tabbar, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-tabbar')
    expect(wrapper.classes()).toContain('weui-tabbar')
  })

  test('fixed tabbar', () => {
    // is not fixed by default
    wrapper = shallowMount(Tabbar, {
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
