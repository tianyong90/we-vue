import { mount, Wrapper } from '@vue/test-utils'
import Popup from '../popup'
import { ExtractVue } from '@utils/mixins'

describe('popup', () => {
  type Instance = ExtractVue<typeof Popup>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(Popup, {
        ...options
      })
    }
  })

  test('create', () => {
    const wrapper = mount(Popup, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-popup')
    expect(wrapper.classes()).toContain('wv-popup')
    expect(wrapper.html()).toMatchSnapshot()
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
    const wrapper = mountFunction({
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
