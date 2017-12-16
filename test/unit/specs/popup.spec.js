import { shallow } from 'vue-test-utils'
import Popup from '@/components/popup'

describe('popup', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Popup, {
      propsData: {
        value: true
      }
    })

    expect(wrapper.name()).toBe('wv-popup')
    expect(wrapper.classes()).toContain('wv-popup')
  })

  it('computed style', () => {
    wrapper = shallow(Popup, {
      propsData: {
        height: 100
      }
    })

    expect(wrapper.vm.style).toEqual({
      backgroundColor: wrapper.vm.backgroundColor,
      height: '100px'
    })
  })
})
