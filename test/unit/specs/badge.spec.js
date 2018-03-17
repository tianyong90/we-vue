import { shallow } from '@vue/test-utils'
import Badge from '@/components/badge'

describe('badge', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(Badge, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-badge')
    expect(wrapper.classes()).toContain('weui-badge')
  })

  test('is-dot', () => {
    wrapper = shallow(Badge, {
      propsData: {
        isDot: true
      }
    })

    expect(wrapper.classes()).toContain('weui-badge_dot')
  })
})
