import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import Routable from '@/mixins/routable'

describe('routable mixin', () => {
  type RoutableWrapper = Wrapper<InstanceType<typeof Routable>>

  test('create', () => {
    const wrapper = mount({
      mixins: [Routable],
      render: h => h('div'),
    }) as RoutableWrapper

    expect(wrapper.props().to).toBeUndefined()
    expect(wrapper.props().url).toBeUndefined()
    expect(wrapper.props().replace).toBe(false)
  })

  test('routeLink method with $router', () => {
    const pushSpy = jest.fn()
    const replaceSpy = jest.fn()

    const wrapper = shallowMount({
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
    }) as RoutableWrapper

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
    const wrapper = mount({
      mixins: [Routable],
      render: h => h('div'),
    },
    {
      propsData: {
        href: '#test',
        replace: false,
      },
    }) as RoutableWrapper

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
