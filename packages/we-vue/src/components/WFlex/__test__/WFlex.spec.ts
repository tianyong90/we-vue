import { mount, shallowMount } from '@vue/test-utils'
import Flex from '../WFlex'

describe('flex', () => {
  test('create', () => {
    const wrapper = mount(Flex, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('w-flex')
    expect(wrapper.classes()).toContain('weui-flex')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('style should be computed correctly', () => {
    const wrapper = shallowMount(Flex, {
      propsData: {
      },
    })

    expect(wrapper.vm.style).toEqual({})

    const gutterValue = 10

    wrapper.setProps({
      gutter: gutterValue,
    })

    expect(wrapper.vm.style).toEqual({
      marginLeft: `-${gutterValue / 2}px`,
      marginRight: `-${gutterValue / 2}px`,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
