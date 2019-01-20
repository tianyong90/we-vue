import { mount, shallowMount } from '@vue/test-utils'
import Routable from '@/mixins/routable'

describe('routable mixin', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = mount({
      mixins: [Routable],
      render: h => h('div'),
    })

    expect(wrapper.props().to).toBe(undefined)
    expect(wrapper.props().url).toBe(undefined)
    expect(wrapper.props().replace).toBe(false)
  })

  test('routeLink method with $router', () => {
    const pushSpy = jest.fn()
    const replaceSpy = jest.fn()

    wrapper = shallowMount({
      mixins: [Routable],
      propsData: {
        to: 'test',
      },
      render: h => h('div'),
      mocks: {
        $router: {
          push: pushSpy,
          replace: replaceSpy,
        },
      },
    })

    wrapper.vm.routeLink()

    const to = wrapper.vm.to

    expect(pushSpy).toHaveBeenCalled()
    expect(pushSpy).toHaveBeenCalledWith('test')

    // replace = true
    wrapper.setProps({
      replace: true,
    })

    wrapper.vm.routeLink()

    expect(replaceSpy).toHaveBeenCalled()
    expect(pushSpy).toHaveBeenCalledWith('test')
  })

  test('routeLink method without $router', () => {
    wrapper = mount({
      mixins: [Routable],
      render: h => h('div'),
      propsData: {
        url: '#test',
        replace: false,
      },
    })

    wrapper.vm.routeLink()

    expect(window.location.hash).toBe('#test')
    window.location.hash = ''

    // replace = true
    wrapper.setProps({
      replace: true,
    })

    const length = window.history.length
    wrapper.vm.routeLink()

    expect(window.location.hash).toBe('#test')
    expect(window.history.length).toBe(length)
    window.location.hash = ''
  })
})
