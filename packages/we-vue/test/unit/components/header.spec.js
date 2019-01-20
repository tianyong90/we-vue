import { shallowMount } from '@vue/test-utils'
import Header from '@/components/header'

describe('badge', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Header, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-header')
    expect(wrapper.classes()).toContain('wv-header')
  })

  // TODO 更多详细测试
})
