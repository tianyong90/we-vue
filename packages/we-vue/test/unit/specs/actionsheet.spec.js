import { mount, shallowMount } from '@vue/test-utils'
import Actionsheet from '@/actionsheet'

describe('actionsheet', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = mount(Actionsheet, {
      attachToDocument: true,
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-actionsheet')

    // default type == 'ios', check mask element class
    expect(wrapper.contains('.weui-mask')).toBeTruthy()

    wrapper = mount(Actionsheet, {
      attachToDocument: true,
      propsData: {
        type: 'android',
      },
    })

    wrapper.vm.$nextTick(() => {
      // check mask element class for android type
      expect(wrapper.contains('.weui-skin_android')).toBeTruthy()
    })
  })

  test('watch value change', () => {
    wrapper = shallowMount(Actionsheet, {
      propsData: {},
    })

    wrapper.setProps({
      value: true,
    })

    expect(wrapper.vm.currentValue).toEqual(true)
  })

  test('watch currentValue change', () => {
    wrapper = shallowMount(Actionsheet, {
      propsData: {
        value: false,
      },
    })

    wrapper.setData({
      currentValue: true,
    })

    // 'input' event should have be emitted
    expect(wrapper.emitted().input).toBeTruthy()
  })

  test('render with actions', () => {
    const actions = [
      {
        name: 'test-name',
        key: 'test-key',
      },
    ]

    wrapper = shallowMount(Actionsheet, {
      propsData: {
        actions: actions,
      },
    })

    expect(wrapper.contains('.weui-actionsheet__cell')).toBeTruthy()
    expect(wrapper.find('.weui-actionsheet__cell').text()).toBe('test-name')
  })

  test('handle action item click', () => {
    const itemClickMethodSpy = jest.fn()

    const actions = [
      {
        name: 'test-name',
        key: 'test-key',
        method: itemClickMethodSpy,
      },
    ]

    wrapper = shallowMount(Actionsheet, {
      propsData: {
        actions: actions,
      },
    })

    wrapper.find('.weui-actionsheet__cell').trigger('click')

    expect(itemClickMethodSpy).toHaveBeenCalled()

    // currentValue should be false after action item clicked
    expect(wrapper.vm.currentValue).toBeFalsy()
  })
})
