import { mount, TransitionStub } from '@vue/test-utils'
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
      propsData: {
        visible: true
      }
    })

    wrapper.vm.close()

    expect(wrapper.emitted('update:visible')[1]).toEqual([false])
  })

  test('close popup via click mask', () => {
    // closeOnClick is true
    wrapper = mount(PopupMixinComponent, {
      attachToDocument: true,
      propsData: {
        visible: true,
        mask: true,
        closeOnClickMask: true
      },
      stubs: {
        transition: TransitionStub
      }
    })

    wrapper.vm.open()

    const spy = jest.spyOn(wrapper.vm, 'close')

    // trigger click on the mask element
    document.querySelector('.wv-modal').click()

    expect(spy).toHaveBeenCalled()

    spy.mockReset()
    spy.mockRestore()

    // closeOnClick is false
    wrapper.setProps({
      closeOnClickMask: false
    })

    wrapper.vm.open()

    // trigger click on the mask element
    document.querySelector('.wv-modal').click()

    expect(spy).not.toHaveBeenCalled()
  })

  test('lockOnScroll', () => {
    wrapper = mount(PopupMixinComponent, {
      attachToDocument: true,
      propsData: {
        visible: true,
        lockOnScroll: true
      }
    })

    wrapper.vm.open()

    verticalDrag(wrapper, 0, -100)

    const listener = jest.fn()
    document.addEventListener('touchmove', listener)

    expect(listener).not.toHaveBeenCalled()
  })

  test('visible watcher', () => {
    const openSpy = jest.fn()
    const closeSpy = jest.fn()

    wrapper = mount(PopupMixinComponent, {
      attachToDocument: true,
      methods: {
        open: openSpy,
        close: closeSpy
      }
    })

    wrapper.setProps({
      visible: true
    })

    expect(openSpy).toHaveBeenCalled()

    wrapper.setProps({
      visible: false
    })

    expect(closeSpy).toHaveBeenCalled()
  })

  test('getContainer watcher', () => {
    wrapper = mount(PopupMixinComponent, {
      attachToDocument: true,
      propsData: {
        visible: true
      }
    })

    const spy = jest.spyOn(wrapper.vm, 'move')

    wrapper.setProps({
      getContainer: function () {
        return document.createElement('div')
      }
    })

    expect(spy).toHaveBeenCalled()
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
