import { shallowMount, mount, Wrapper } from '@vue/test-utils'
import WFlex from '../../WFlex'
import WFlexItem from '../WFlexItem'
import { ExtractVue } from '../../../utils/mixins'

describe('flex-item', () => {
  type FlexWrapper = Wrapper<ExtractVue<typeof WFlex>>
  type FlexItemWrapper = Wrapper<ExtractVue<typeof WFlexItem>>

  test('create', () => {
    const parentWrapper = mount(WFlex, {
      propsData: {
        animate: true,
      },
    })

    const wrapper = shallowMount(WFlexItem, {
      provide: {
        flexComponent: parentWrapper.vm,
      },
    })

    expect(wrapper.name()).toBe('wv-flex-item')
    expect(wrapper.classes()).toContain('weui-flex__item')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('comput gutter', () => {
    const wrapper = mount(WFlex, {
      attachToDocument: true,
      propsData: {
        gutter: 10,
      },
      slots: {
        default: WFlexItem,
      },
    }) as FlexWrapper

    const _flexItem = wrapper.find(WFlexItem) as FlexItemWrapper

    expect(_flexItem.vm.gutter).toBe(wrapper.vm.gutter)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('comput style', () => {
    const parentWrapper = mount(WFlex, {
      propsData: {},
    })

    const wrapper = mount(WFlexItem, {
      provide: {
        flexComponent: parentWrapper.vm,
      },
    }) as Wrapper<ExtractVue<[typeof WFlexItem]>>

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
