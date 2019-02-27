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

    expect(wrapper.props().to).toBeUndefined()
    expect(wrapper.props().url).toBeUndefined()
    expect(wrapper.props().replace).toBe(false)
  })

  test('routeLink method with $router', () => {
    const pushSpy = jest.fn()
    const replaceSpy = jest.fn()

    wrapper = shallowMount({
      mixins: [Routable],
      render: h => h('div'),
    }, {
      propsData: {
        to: 'test',
      },
      mocks: {
        $router: {
          push: pushSpy,
          replace: replaceSpy,
        },
      },
    })

    wrapper.vm.routeLink()

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
    },
    {
      propsData: {
        href: '#test',
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
    expect(window.history).toHaveLength(length)
    window.location.hash = ''
  })
})
