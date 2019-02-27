import { shallowMount } from '@vue/test-utils'
import Spinner from '../spinner'

describe('spinner', () => {
  test('create', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-spinner')
    expect(wrapper.html()).toMatchSnapshot()

    // default type
    expect(wrapper.classes()).toContain('weui-loading')

    wrapper.setProps({
      type: 'snake',
    })
    expect(wrapper.classes()).toContain('wv-spinner')
  })

  test('size', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {},
    })

    // default size should be 17
    expect(wrapper.vm.size).toBe(17)

    wrapper.setProps({
      size: 20,
    })
    expect(wrapper.vm.size).toBe(20)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('color', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {},
    })

    // default color should be '#aaa'
    expect(wrapper.vm.color).toBe('#aaa')

    wrapper.setProps({
      color: 'red',
    })
    expect(wrapper.vm.color).toBe('red')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('icon font class should be computed correctly', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {},
    })

    // default fontclass should be ''
    expect(wrapper.vm.fontclass).toBe('')

    wrapper.setProps({
      type: 'snake',
    })
    expect(wrapper.vm.fontclass).toBe('icon-spinner-1')

    wrapper.setProps({
      type: 'double-snake',
    })
    expect(wrapper.vm.fontclass).toBe('icon-spinner9')

    wrapper.setProps({
      type: 'bar-circle',
    })
    expect(wrapper.vm.fontclass).toBe('icon-spinner2')

    wrapper.setProps({
      type: 'dot-circle',
    })
    expect(wrapper.vm.fontclass).toBe('icon-spinner1')
  })
})
