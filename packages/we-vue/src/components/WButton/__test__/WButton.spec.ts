import { shallowMount } from '@vue/test-utils'
import Button from '../'

describe('button', () => {
  test('create', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'primary',
      },
    })

    expect(wrapper.name()).toBe('w-button')
    expect(wrapper.classes()).toContain('weui-btn')
  })

  test('is-loading', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        isLoading: true,
      },
    })

    expect(wrapper.classes()).toContain('weui-btn_loading')
  })

  test('disabled', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        disabled: true,
      },
    })

    const classDisabled = wrapper.vm.plain ? 'weui-btn_plain-disabled' : 'weui-btn_disabled'
    expect(wrapper.classes()).toContain(classDisabled)
  })

  test('mini', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        mini: true,
      },
    })
    expect(wrapper.classes()).toContain('weui-btn_mini')
  })

  test('plain', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'primary',
        plain: true,
      },
    })
    const classType = wrapper.vm.plain ? `weui-btn_plain-${wrapper.vm.type}` : `weui-btn_${wrapper.vm.type}`
    expect(wrapper.classes()).toContain(classType)
  })

  test('click', () => {
    const wrapper = shallowMount(Button, {
      propsData: {},
    })

    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
