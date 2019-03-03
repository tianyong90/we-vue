import { shallowMount } from '@vue/test-utils'
import Header from '../WHeader'

describe('header', () => {
  test('create', () => {
    const wrapper = shallowMount(Header, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-header')
    expect(wrapper.classes()).toContain('wv-header')

    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('click header', () => {
    const wrapper = shallowMount(Header, {
      propsData: {},
    })

    wrapper.trigger('click')

    expect(wrapper.emitted('headerClick')).toBeTruthy()
  })
})
