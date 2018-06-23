import { shallowMount, mount } from '@vue/test-utils'
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

    let wrapper = shallowMount(FlexItem, {
      parent: parentWrapper.vm
    })

    expect(wrapper.name()).toBe('wv-flex-item')
    expect(wrapper.classes()).toContain('weui-flex__item')
  })

  test('comput gutter', () => {
    wrapper = mount(Flex, {
      attachToDocument: true,
      propsData: {
        gutter: 10
      },
      slots: {
        default: FlexItem
      }
    })

    expect(wrapper.find(FlexItem).vm.gutter).toBe(wrapper.vm.gutter)
  })

  test('comput style', () => {
    parentWrapper = mount(Flex, {
      propsData: {}
    })

    let wrapper = shallowMount(FlexItem, {
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
