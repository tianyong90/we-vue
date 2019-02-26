import { shallowMount, mount } from '@vue/test-utils'
import Popup from '../popup'

describe('popup', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = mount(Popup, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-popup')
    expect(wrapper.classes()).toContain('wv-popup')
  })

  test('create a popup that is visible', () => {
    wrapper = mount(Popup, {
      attachToDocument: true,
      propsData: {
        visible: true,
      },
    })

    expect(wrapper.classes()).toContain('wv-popup')

    expect(wrapper.isVisible()).toBeTruthy()
  })

  test('computed style', () => {
    wrapper = shallowMount(Popup, {
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
