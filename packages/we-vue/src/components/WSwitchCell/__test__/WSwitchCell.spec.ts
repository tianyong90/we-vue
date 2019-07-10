import { mount } from '@vue/test-utils'
import WSwitchCell from '../'

describe('switch-cell', () => {
  test('create', () => {
    const wrapper = mount(WSwitchCell, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('w-switch-cell')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('click', () => {
    let wrapper = mount(WSwitchCell, {
      propsData: {
        value: true,
      },
    })

    // first click
    wrapper.find('.wv-switch').trigger('click')
    expect(wrapper.vm.isActive).toBe(false)

    // second click
    wrapper.find('.wv-switch').trigger('click')
    expect(wrapper.vm.isActive).toBe(true)

    // click a disabled switch
    wrapper = mount(WSwitchCell, {
      propsData: {
        disabled: true,
        value: true,
      },
    })

    wrapper.find('.wv-switch').trigger('click')

    expect(wrapper.vm.isActive).toBe(true)
  })

  test('watch value', () => {
    const wrapper = mount(WSwitchCell, {
      propsData: {
        value: false,
      },
    })

    wrapper.setProps({
      value: false,
    })

    expect(wrapper.vm.isActive).toBe(false)

    wrapper.setProps({
      value: true,
    })

    expect(wrapper.vm.isActive).toBe(true)
  })
})
