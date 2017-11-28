import { shallow, mount } from 'vue-test-utils'
import Flex from '@/components/flex'
import FlexCompponent from '../components/flex.vue'

describe('flex', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(Flex, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-flex')
    expect(wrapper.hasClass('weui-flex')).toBeTruthy()
  })

  it('style should be computed correctly', () => {
    wrapper = shallow(Flex, {
      propsData: {
      }
    })

    expect(wrapper.vm.style).toEqual({})

    const gutterValue = 10

    wrapper.setProps({
      gutter: gutterValue
    })

    expect(wrapper.vm.style).toEqual({
      marginLeft: `-${gutterValue / 2}px`,
      marginRight: `-${gutterValue / 2}px`
    })
  })
})

describe('Flex with item', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(FlexCompponent, {
      propsData: {
        gutter: 10
      }
    })

    expect(wrapper.vm.$children.length).toBe(1)
    expect(wrapper.vm.$children[0].gutter).toBe(10)
  })
})
