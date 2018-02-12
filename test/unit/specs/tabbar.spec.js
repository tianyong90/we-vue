import { shallow } from '@vue/test-utils'
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

    expect(wrapper.element.style.position).toBe('absolute')

    wrapper = shallow(Tabbar, {
      propsData: {
        fixed: true
      }
    })

    expect(wrapper.element.style.position).toBe('fixed')
  })
})
