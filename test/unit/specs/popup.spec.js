import { shallow } from '@vue/test-utils'
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
    expect(wrapper.classes()).toContain('wv-popup')
  })

  it('create a popup that is visible', () => {
    wrapper = shallow(Popup, {
      attachToDocument: true,
      propsData: {
        visible: true
      }
    })

    expect(wrapper.classes()).toContain('wv-popup')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.element.style.display).toBe('block')
    })
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
