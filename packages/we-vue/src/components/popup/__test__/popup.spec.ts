import { shallowMount, mount } from '@vue/test-utils'
import Popup from '../popup'

describe('popup', () => {
  test('create', () => {
    const wrapper = mount(Popup, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-popup')
    expect(wrapper.classes()).toContain('wv-popup')
  })

  test('create a popup that is visible', () => {
    const wrapper = mount(Popup, {
      attachToDocument: true,
      propsData: {
        visible: true,
      },
    })

    expect(wrapper.classes()).toContain('wv-popup')

    expect(wrapper.isVisible()).toBeTruthy()
  })

  test('computed style', () => {
    const wrapper = shallowMount(Popup, {
      propsData: {
        height: 100,
      },
    })

    expect(wrapper.vm.style).toEqual({
      backgroundColor: wrapper.vm.backgroundColor,
      height: '100px',
    })
  })
})
