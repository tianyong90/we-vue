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

    wrapper.vm.$nextTick(() => {
      expect(wrapper.isVisible()).toBe(true)
    })
  })

  test('method move() should have been called when property getContainer is set', () => {
    const spyMove = jest.fn()

    wrapper = mount(PopupMixinComponent, {
      propsData: {
        getContainer: () => {}
      },
      methods: {
        move: spyMove
      }
    })

    wrapper.vm.$nextTick(() => {
      expect(spyMove).toHaveBeenCalled()
    })
  })

  test('close popup via close method', () => {
    wrapper = mount(PopupMixinComponent, {
      data: {
        visible: true
      }
    })

    wrapper.vm.close()

    expect(wrapper.emitted('update:visible')[0]).toEqual([false])

    wrapper.vm.$nextTick(() => {
      expect(wrapper.isVisible()).toBe(false)
    })
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

    expect(wrapper.isVisible()).toBe(false)
  })

  test('getContainer watcher', () => {
    const moveSpy = jest.fn()

    wrapper = mount(PopupMixinComponent, {
      attachToDocument: true,
      propsData: {},
      methods: {
        move: moveSpy
      }
    })

    wrapper.setProps({
      getContainer: jest.fn()
    })

    expect(moveSpy).toHaveBeenCalled()
  })

  test('mask watcher', () => {
    const renderMaskSpy = jest.fn()

    wrapper = mount(PopupMixinComponent, {
      attachToDocument: true,
      propsData: {
        mask: true
      },
      methods: {
        renderMask: renderMaskSpy
      }
    })

    wrapper.setProps({
      mask: false
    })

    expect(renderMaskSpy).toHaveBeenCalled()
  })
})
