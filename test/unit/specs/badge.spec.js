import { shallow } from 'vue-test-utils'
import Badge from '@/components/badge'

describe('badge', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Badge, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-badge')
    expect(wrapper.hasClass('weui-badge')).toBeTruthy()
  })

  it('is-dot', () => {
    wrapper = shallow(Badge, {
      propsData: {
        isDot: true
      }
    })

    expect(wrapper.hasClass('weui-badge_dot')).toBeTruthy()
  })
})
