import { shallowMount, mount, Wrapper } from '@vue/test-utils'
import Flex from '../../flex'
import FlexItem from '../flex-item'
import { ExtractVue } from '../../../utils/mixins'

describe('flex-item', () => {
  type FlexWrapper = Wrapper<ExtractVue<typeof Flex>>
  type FlexItemWrapper = Wrapper<ExtractVue<typeof FlexItem>>

  test('create', () => {
    const parentWrapper = mount(Flex, {
      propsData: {
        animate: true,
      },
    })

    const wrapper = shallowMount(FlexItem, {
      provide: {
        flexComponent: parentWrapper.vm,
      },
    })

    expect(wrapper.name()).toBe('wv-flex-item')
    expect(wrapper.classes()).toContain('weui-flex__item')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('comput gutter', () => {
    const wrapper = mount(Flex, {
      attachToDocument: true,
      propsData: {
        gutter: 10,
      },
      slots: {
        default: FlexItem,
      },
    }) as FlexWrapper

    const _flexItem = wrapper.find(FlexItem) as FlexItemWrapper

    expect(_flexItem.vm.gutter).toBe(wrapper.vm.gutter)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('comput style', () => {
    const parentWrapper = mount(Flex, {
      propsData: {},
    })

    const wrapper = mount(FlexItem, {
      provide: {
        flexComponent: parentWrapper.vm,
      },
    }) as Wrapper<ExtractVue<[typeof FlexItem]>>

    let computedStyle: {[key: string]: any} = {
      flex: wrapper.vm.flex,
      marginLeft: wrapper.vm.offset,
    }

    if (wrapper.vm.gutter) {
      computedStyle.paddingLeft = wrapper.vm.gutter / 2 + 'px'
      computedStyle.paddingRight = computedStyle.paddingLeft
    }

    expect(wrapper.vm.style).toEqual(computedStyle)
  })
})
