import { shallowMount } from '@vue/test-utils'
import Loadmore from '@/loadmore'

describe('loadmore', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Loadmore, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-loadmore')
    expect(wrapper.classes()).toContain('weui-loadmore')
  })

  test('text', () => {
    wrapper = shallowMount(Loadmore, {
      propsData: {
        text: 'test'
      }
    })

    expect(wrapper.find('.weui-loadmore__tips').text()).toBe('test')
  })
})
