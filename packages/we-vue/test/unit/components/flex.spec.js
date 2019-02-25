import { shallowMount, mount } from '@vue/test-utils'
import Flex from '@/components/flex'

describe('flex', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = mount(Flex, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-flex')
    expect(wrapper.classes()).toContain('weui-flex')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('style should be computed correctly', () => {
    wrapper = shallowMount(Flex, {
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
