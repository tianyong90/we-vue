import { shallow } from 'vue-test-utils'
import Popup from '@/components/popup'

describe('popup', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Popup, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-popup')
    expect(wrapper.hasClass('wv-popup')).toBeTruthy()
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

  it('click mask', () => {
    // hideOnMask is true
    wrapper = shallow(Popup, {
      propsData: {
        hideOnMask: true
      }
    })

    wrapper.find('.weui-mask').trigger('click')

    expect(wrapper.vm.currentValue).toBeFalsy()

    // hideOnMask is false
    wrapper = shallow(Popup, {
      propsData: {
        hideOnMask: false,
        value: true
      }
    })

    wrapper.find('.weui-mask').trigger('click')

    expect(wrapper.vm.currentValue).toBeTruthy()
  })
})
