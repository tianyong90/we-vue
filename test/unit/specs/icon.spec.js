import { shallowMount } from '@vue/test-utils'
import Icon from '@/components/icon'

describe('icon', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Icon, {
      propsData: {
        type: 'info'
      }
    })

    expect(wrapper.name()).toBe('wv-icon')

    // is not 'large' by default
    expect(wrapper.vm.large).toBeFalsy()
  })

  test('element class should be computed correctly', () => {
    wrapper = shallowMount(Icon, {
      propsData: {
        type: 'info',
        large: true
      }
    })

    // large size icon should has class 'weui-icon_msg'
    expect(wrapper.classes()).toContain('weui-icon_msg')

    const iconClassType = `weui-icon-${wrapper.vm.type}`
    expect(wrapper.classes()).toContain(iconClassType)
  })
})
