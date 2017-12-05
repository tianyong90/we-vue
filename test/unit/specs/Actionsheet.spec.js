import { shallow } from 'vue-test-utils'
import Actionsheet from '@/components/actionsheet'
import sinon from 'sinon'

describe('actionsheet', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Actionsheet, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-actionsheet')

    // default type == 'ios', check mask element class
    expect(wrapper.contains('.weui-mask')).toBeTruthy()

    wrapper.setProps({
      type: 'android'
    })

    // check mask element class for android type
    expect(wrapper.contains('.weui-skin_android')).toBeTruthy()
  })

  it('watch value change', () => {
    wrapper = shallow(Actionsheet, {
      propsData: {}
    })

    wrapper.setProps({
      value: true
    })

    expect(wrapper.vm.currentValue).toEqual(true)
  })

  it('watch currentValue change', () => {
    wrapper = shallow(Actionsheet, {
      propsData: {
        value: false
      }
    })

    wrapper.setData({
      currentValue: true
    })

    // 'input' event should have be emitted
    expect(wrapper.emitted().input).toBeTruthy()
  })

  it('render with actions', () => {
    const actions = [
      {
        name: 'test-name',
        key: 'test-key'
      }
    ]

    wrapper = shallow(Actionsheet, {
      propsData: {
        actions: actions
      }
    })

    expect(wrapper.contains('.weui-actionsheet__cell')).toBeTruthy()
    expect(wrapper.find('.weui-actionsheet__cell').text()).toBe('test-name')
  })

  it('handle action item click', () => {
    const itemClickMethodSpy = sinon.spy()

    const actions = [
      {
        name: 'test-name',
        key: 'test-key',
        method: itemClickMethodSpy
      }
    ]

    wrapper = shallow(Actionsheet, {
      propsData: {
        actions: actions
      }
    })

    wrapper.find('.weui-actionsheet__cell').trigger('click')

    expect(itemClickMethodSpy.called).toBeTruthy()

    // currentValue should be false after action item clicked
    expect(wrapper.vm.currentValue).toBeFalsy()
  })
})
