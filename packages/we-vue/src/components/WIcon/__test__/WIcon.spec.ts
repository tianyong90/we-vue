import { shallowMount } from '@vue/test-utils'
import Icon from '../WIcon'

describe('icon', () => {
  test('create', () => {
    const wrapper = shallowMount(Icon, {
      propsData: {
        type: 'info',
      },
    })

    expect(wrapper.name()).toBe('w-icon')

    expect(wrapper.html()).toMatchSnapshot()

    // is not 'large' by default
    expect(wrapper.vm.large).toBeFalsy()
  })

  test('element class should be computed correctly', () => {
    const wrapper = shallowMount(Icon, {
      propsData: {
        type: 'info',
        large: true,
      },
    })

    // large size icon should has class 'weui-icon_msg'
    expect(wrapper.classes()).toContain('weui-icon_msg')

    const iconClassType = `weui-icon-${wrapper.vm.type}`
    expect(wrapper.classes()).toContain(iconClassType)
  })
})
