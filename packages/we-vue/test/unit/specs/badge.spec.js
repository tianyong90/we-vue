import { shallowMount } from '@vue/test-utils'
import Badge from '@/badge'

describe('badge', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Badge, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-badge')
    expect(wrapper.classes()).toContain('weui-badge')
  })

  test('is-dot', () => {
    wrapper = shallowMount(Badge, {
      propsData: {
        isDot: true
      }
    })

    expect(wrapper.classes()).toContain('weui-badge_dot')
  })
})
