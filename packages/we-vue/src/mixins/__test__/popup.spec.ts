import { mount, TransitionStub, Wrapper } from '@vue/test-utils'
import PopupMixin from '@/mixins/popup'
import { verticalDrag } from '@/test/unit/utils'

describe('mixins/popup', () => {
  type PopupWrapper = Wrapper<InstanceType<typeof PopupMixin>>

  test('mixed props', () => {
    const wrapper = mount({
      mixins: [PopupMixin],
      render (h) {
        return h('div', {
          directives: [
            {
              name: 'show',
              value: (this as any).visible,
            },
          ],
        })
      },
    }, {
      propsData: {},
    }) as PopupWrapper

    expect(wrapper.vm.$options.props).toHaveProperty('visible')
    expect(wrapper.vm.$options.props).toHaveProperty('mask')
    expect(wrapper.vm.$options.props).toHaveProperty('maskStyle')
    expect(wrapper.vm.$options.props).toHaveProperty('maskClass')
    expect(wrapper.vm.$options.props).toHaveProperty('closeOnClickMask')
    expect(wrapper.vm.$options.props).toHaveProperty('zIndex')
    expect(wrapper.vm.$options.props).toHaveProperty('lockScroll')
  })

  test('open popup via open method', () => {
    const wrapper = mount({
      mixins: [PopupMixin],
      render (h) {
        return h('div', {
          directives: [
            {
              name: 'show',
              value: (this as any).visible,
            },
          ],
        })
      },
    }, {
      propsData: {
        zIndex: 1,
      },
    }) as PopupWrapper

    wrapper.vm.open()

    expect(wrapper.emitted('update:visible')).toHaveLength(1)
    expect(wrapper.emitted('update:visible')[0]).toEqual([true])
  })

  test('method move() should have been called when property getContainer is set', () => {
    const spyMove = jest.fn()

    const wrapper = mount({
      mixins: [PopupMixin],
      render (h) {
        return h('div', {
          directives: [
            {
              name: 'show',
              value: (this as any).visible,
            },
          ],
        })
      },
    }, {
      propsData: {
        getContainer: () => {},
      },
      methods: {
        move: spyMove,
      },
    }) as PopupWrapper

    wrapper.vm.$nextTick(() => {
      expect(spyMove).toHaveBeenCalled()
    })
  })

  test('close popup via close method', () => {
    const wrapper = mount({
      mixins: [PopupMixin],
      render (h) {
        return h('div', {
          directives: [
            {
              name: 'show',
              value: (this as any).visible,
            },
          ],
        })
      },
    }, {
      propsData: {
        visible: true,
      },
    }) as PopupWrapper

    wrapper.vm.close()

    expect(wrapper.emitted('update:visible')[1]).toEqual([false])
  })

  test('close popup via click mask', () => {
    // closeOnClick is true
    const wrapper = mount({
      mixins: [PopupMixin],
      render (h) {
        return h('div', {
          directives: [
            {
              name: 'show',
              value: (this as any).visible,
            },
          ],
        })
      },
    }, {
      attachToDocument: true,
      propsData: {
        visible: true,
        mask: true,
        closeOnClickMask: true,
      },
      stubs: {
        transition: TransitionStub,
      },
    }) as PopupWrapper

    wrapper.vm.open()

    const spy = jest.spyOn(wrapper.vm, 'close')

    // trigger click on the mask element
    ;(document.querySelector('.wv-modal') as HTMLElement).click()

    expect(spy).toHaveBeenCalled()

    spy.mockReset()
    spy.mockRestore()

    // closeOnClick is false
    wrapper.setProps({
      closeOnClickMask: false,
    })

    wrapper.vm.open()

    // trigger click on the mask element
    ;(document.querySelector('.wv-modal') as HTMLElement).click()

    expect(spy).not.toHaveBeenCalled()
  })

  test('lockScroll', () => {
    const wrapper = mount({
      mixins: [PopupMixin],
      render (h) {
        return h('div', {
          directives: [
            {
              name: 'show',
              value: (this as any).visible,
            },
          ],
        })
      },
    }, {
      attachToDocument: true,
      propsData: {
        visible: true,
        lockScroll: true,
      },
    }) as PopupWrapper

    wrapper.vm.open()

    verticalDrag(wrapper, 0, -100)

    const listener = jest.fn()
    document.addEventListener('touchmove', listener)

    expect(listener).not.toHaveBeenCalled()
  })

  test('visible watcher', () => {
    const openSpy = jest.fn()
    const closeSpy = jest.fn()

    const wrapper = mount({
      mixins: [PopupMixin],
      render (h) {
        return h('div', {
          directives: [
            {
              name: 'show',
              value: (this as any).visible,
            },
          ],
        })
      },
    }, {
      attachToDocument: true,
      methods: {
        open: openSpy,
        close: closeSpy,
      },
    }) as PopupWrapper

    wrapper.setProps({
      visible: true,
    })

    expect(openSpy).toHaveBeenCalled()

    wrapper.setProps({
      visible: false,
    })

    expect(closeSpy).toHaveBeenCalled()
  })

  test('getContainer watcher', () => {
    const wrapper = mount({
      mixins: [PopupMixin],
      render (h) {
        return h('div', {
          directives: [
            {
              name: 'show',
              value: (this as any).visible,
            },
          ],
        })
      },
    }, {
      attachToDocument: true,
      propsData: {
        visible: true,
      },
    }) as PopupWrapper

    const spy = jest.spyOn(wrapper.vm, 'move')

    wrapper.setProps({
      getContainer: 'body',
    })

    expect(spy).toHaveBeenCalled()
  })

  test('mask watcher', () => {
    const renderMaskSpy = jest.fn()

    const wrapper = mount({
      mixins: [PopupMixin],
      render (h) {
        return h('div', {
          directives: [
            {
              name: 'show',
              value: (this as any).visible,
            },
          ],
        })
      },
    }, {
      attachToDocument: true,
      propsData: {
        mask: true,
      },
      methods: {
        renderMask: renderMaskSpy,
      },
    }) as PopupWrapper

    wrapper.setProps({
      mask: false,
    })

    expect(renderMaskSpy).toHaveBeenCalled()
  })
})
