import { shallowMount } from '@vue/test-utils'
import Loadmore from '../'

describe('loadmore', () => {
  test('create', () => {
    const wrapper = shallowMount(Loadmore, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('w-loadmore')
    expect(wrapper.classes()).toContain('weui-loadmore')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('text', () => {
    const wrapper = shallowMount(Loadmore, {
      propsData: {
        text: 'test',
      },
    })

    expect(wrapper.find('.weui-loadmore__tips').text()).toBe('test')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
