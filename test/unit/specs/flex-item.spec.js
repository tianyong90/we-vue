import { shallow, mount } from '@vue/test-utils'
import Flex from '@/components/flex'
import FlexItem from '@/components/flex-item'

describe('flex-item', () => {
  let parentWrapper
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
    parentWrapper && parentWrapper.destroy()
  })

  test('create', () => {
    parentWrapper = mount(Flex, {
      propsData: {
        animate: true
      }
    })

    let wrapper = shallow(FlexItem, {
      parent: parentWrapper.vm
    })

    expect(wrapper.name()).toBe('wv-flex-item')
    expect(wrapper.classes()).toContain('weui-flex__item')
  })

  test('comput gutter', () => {
    parentWrapper = mount(Flex, {
      propsData: {
        gutter: 10
      }
    })

    let wrapper = shallow(FlexItem, {
      parent: parentWrapper.vm
    })

    expect(wrapper.vm.gutter).toBe(wrapper.vm.$parent.gutter)
  })

  test('comput style', () => {
    parentWrapper = mount(Flex, {
      propsData: {}
    })

    let wrapper = shallow(FlexItem, {
      parent: parentWrapper.vm
    })

    let computedStyle = {
      flex: wrapper.vm.flex,
      marginLeft: wrapper.vm.offset
    }

    if (wrapper.vm.gutter) {
      computedStyle.paddingLeft = wrapper.vm.gutter / 2 + 'px'
      computedStyle.paddingRight = computedStyle.paddingLeft
    }

    expect(wrapper.vm.style).toEqual(computedStyle)
  })
})
