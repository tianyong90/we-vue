import { mount } from 'vue-test-utils'
import Switch from '@/components/switch'

describe('switch', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(Switch, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-switch')
    expect(wrapper.contains('.wv-switch')).toBeTruthy()
  })

  it('is-in-cell', () => {
    wrapper = mount(Switch, {
      propsData: {
        isInCell: true
      }
    })

    expect(wrapper.hasClass('weui-cell')).toBeTruthy()

    wrapper = mount(Switch, {
      propsData: {
        isInCell: false
      }
    })

    expect(wrapper.hasClass('weui-cell')).toBeFalsy()
    expect(wrapper.hasClass('wv-switch')).toBeTruthy()
  })
})
