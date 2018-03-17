import { mount } from '@vue/test-utils'
import PopupMixinComponent from '../components/popup-mixin-component'
import { verticalDrag } from '../utils'

describe('mixins/popup', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('mixed props', () => {
    wrapper = mount(PopupMixinComponent, {
      propsData: {}
    })

    expect(wrapper.vm.$options.props).toHaveProperty('visible')
    expect(wrapper.vm.$options.props).toHaveProperty('mask')
    expect(wrapper.vm.$options.props).toHaveProperty('maskStyle')
    expect(wrapper.vm.$options.props).toHaveProperty('maskClass')
    expect(wrapper.vm.$options.props).toHaveProperty('closeOnClickMask')
    expect(wrapper.vm.$options.props).toHaveProperty('zIndex')
    expect(wrapper.vm.$options.props).toHaveProperty('preventScroll')
    expect(wrapper.vm.$options.props).toHaveProperty('lockOnScroll')
  })

  test('open popup via open method', () => {
    wrapper = mount(PopupMixinComponent, {
      propsData: {
        zIndex: 1
      }
    })

    wrapper.vm.open()

    expect(wrapper.emitted('update:visible').length).toBe(1)
    expect(wrapper.emitted('update:visible')[0]).toEqual([true])
    expect(wrapper.vm.opened).toBe(true)
  })

  test('open method should return while vm.opened === true', () => {
    wrapper = mount(PopupMixinComponent, {
      data: {
        opened: true
      }
    })

    wrapper.vm.open()

    expect(wrapper.emitted('update:visible')).toBeFalsy()
  })

  test('close popup via close method', () => {
    wrapper = mount(PopupMixinComponent, {
      data: {
        opened: true
      }
    })

    wrapper.vm.close()

    expect(wrapper.emitted('update:visible')[0]).toEqual([false])
    expect(wrapper.vm.opened).toBe(false)
  })

  test('close method should return while vm.opened === false', () => {
    wrapper = mount(PopupMixinComponent, {
      data: {
        opened: false
      }
    })

    wrapper.vm.close()

    expect(wrapper.emitted('update:visible')).toBeFalsy()
  })

  test('preventScroll', () => {
    wrapper = mount(PopupMixinComponent, {
      propsData: {
        zIndex: 1,
        preventScroll: true
      }
    })

    wrapper.vm.open()

    verticalDrag(document.body, 0, 1000)

    wrapper.vm.close()
  })

  test('close popup via click mask', () => {
    wrapper = mount(PopupMixinComponent, {
      attachToDocument: true,
      propsData: {
        visible: true,
        mask: true,
        closeOnClickMask: true
      }
    })

    wrapper.vm.open()

    // trigger click on the mask element
    const wvModal = document.querySelector('.wv-modal')
    wvModal.click()

    expect(wrapper.vm.opened).toBe(false)
  })
})
