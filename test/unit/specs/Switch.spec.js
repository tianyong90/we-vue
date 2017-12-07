import { mount } from 'vue-test-utils'
import Switch from '@/components/switch'
import { getTranslateX } from '@/utils/transform'

const THUMB_STROKE = 20

describe('switch', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(Switch, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-switch')
    expect(wrapper.contains('.wv-switch')).toBeTruthy()
  })

  it('is-in-cell', () => {
    wrapper = mount(Switch, {
      propsData: {
        isInCell: true
      }
    })

    expect(wrapper.hasClass('weui-cell')).toBeTruthy()

    wrapper = mount(Switch, {
      propsData: {
        isInCell: false
      }
    })

    expect(wrapper.hasClass('weui-cell')).toBeFalsy()
    expect(wrapper.hasClass('wv-switch')).toBeTruthy()
  })

  it('click', () => {
    wrapper = mount(Switch, {
      propsData: {
        value: true
      }
    })

    // first click
    wrapper.find('.wv-switch').trigger('click')
    expect(wrapper.vm.currentValue).toBe(false)

    // second click
    wrapper.find('.wv-switch').trigger('click')
    expect(wrapper.vm.currentValue).toBe(true)

    // click a disabled switch
    wrapper = mount(Switch, {
      propsData: {
        disabled: true,
        value: true
      }
    })

    wrapper.find('.wv-switch').trigger('click')

    expect(wrapper.vm.currentValue).toBe(true)
  })

  it('watch currentValue', () => {
    wrapper = mount(Switch, {
      attachToDocument: true,
      data: {
        currentValue: false
      }
    })

    wrapper.setData({
      currentValue: true
    })

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
    expect(getTranslateX(wrapper.vm.$refs.thumb)).toBe(THUMB_STROKE)

    wrapper.setData({
      currentValue: false
    })
    expect(getTranslateX(wrapper.vm.$refs.thumb)).toBe(0)
  })

  it('watch value', () => {
    wrapper = mount(Switch, {
      propsData: {
        value: false
      }
    })

    wrapper.setProps({
      value: false
    })

    expect(wrapper.vm.currentValue).toBe(false)

    wrapper.setProps({
      value: true
    })

    expect(wrapper.vm.currentValue).toBe(true)
  })
})
