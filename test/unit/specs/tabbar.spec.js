import { shallow } from 'vue-test-utils'
import Tabbar from '@/components/tabbar'

describe('tabbar', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Tabbar, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-tabbar')
    expect(wrapper.classes()).toContain('weui-tabbar')
  })

  it('fixed tabbar', () => {
    // is not fixed by default
    wrapper = shallow(Tabbar, {
      propsData: {}
    })

    expect(wrapper.hasStyle('position', 'absolute')).toBeTruthy()

    wrapper = shallow(Tabbar, {
      propsData: {
        fixed: true
      }
    })

    expect(wrapper.hasStyle('position', 'fixed')).toBeTruthy()
  })
})
