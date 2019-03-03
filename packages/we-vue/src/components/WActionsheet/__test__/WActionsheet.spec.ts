import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Actionsheet from '../WActionsheet'
import { ExtractVue } from '@utils/mixins'

describe('actionsheet', () => {
  type Instance = ExtractVue<typeof Actionsheet>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(Actionsheet, options)
    }
  })

  test('create', () => {
    let wrapper = mount(Actionsheet, {
      attachToDocument: true,
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-actionsheet')

    // default type == 'ios', check mask element class
    expect(wrapper.contains('.weui-mask')).toBeTruthy()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper = mount(Actionsheet, {
      attachToDocument: true,
      propsData: {
        type: 'android',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.$nextTick(() => {
      // check mask element class for android type
      expect(wrapper.contains('.weui-skin_android')).toBeTruthy()
    })
  })

  test('watch value change', () => {
    const wrapper = shallowMount(Actionsheet, {
      propsData: {},
    })

    wrapper.setProps({
      value: true,
    })

    expect(wrapper.vm.currentValue).toEqual(true)
  })

  test('watch currentValue change', () => {
    const wrapper = shallowMount(Actionsheet, {
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

    const wrapper = shallowMount(Actionsheet, {
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

    const wrapper = mount(Actionsheet, {
      attachToDocument: true,
      propsData: {
        actions: actions,
      },
    })

    wrapper.find('.weui-actionsheet__cell').trigger('click')

    expect(itemClickMethodSpy).toHaveBeenCalled()

    // currentValue should be false after action item clicked
    expect(wrapper.vm.currentValue).toBeFalsy()
  })

  test('click mask to close the actionsheet', () => {
    const actions = [
      {
        name: 'test-name',
        key: 'test-key',
      },
    ]

    // default type = 'ios'
    let wrapper = mountFunction({
      attachToDocument: true,
      propsData: {
        actions: actions,
      },
    })

    wrapper.find('.weui-mask').trigger('click')

    expect(wrapper.vm.currentValue).toBeFalsy()

    jest.resetAllMocks()

    // type = 'android'
    wrapper = mount(Actionsheet, {
      attachToDocument: true,
      propsData: {
        actions: actions,
        type: 'android',
      },
    })

    wrapper.find('.weui-mask').trigger('click')

    expect(wrapper.vm.currentValue).toBeFalsy()
  })
})
