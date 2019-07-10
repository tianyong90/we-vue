import { shallowMount } from '@vue/test-utils'
import Badge from '../'

describe('badge', () => {
  test('create', () => {
    const wrapper = shallowMount(Badge, {
      propsData: {},
    })

    expect(wrapper.classes()).toContain('weui-badge')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('is-dot', () => {
    const wrapper = shallowMount(Badge, {
      propsData: {
        isDot: true,
      },
    })

    expect(wrapper.classes()).toContain('weui-badge_dot')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
