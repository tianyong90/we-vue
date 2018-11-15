import { shallowMount } from '@vue/test-utils'
import EmptyComponent from '../components/empty.vue'
import RouterLink from '@/mixins/router-link'

describe('textarea', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(EmptyComponent, {
      mixins: [RouterLink]
    })

    expect(wrapper.props().to).toBe(undefined)
    expect(wrapper.props().url).toBe(undefined)
    expect(wrapper.props().replace).toBe(false)
  })

  test('routerLink method with $router', () => {
    const pushSpy = jest.fn()
    const replaceSpy = jest.fn()

    wrapper = shallowMount(EmptyComponent, {
      propsData: {
        to: 'test'
      },
      mixins: [RouterLink],
      mocks: {
        $router: {
          push: pushSpy,
          replace: replaceSpy
        }
      }
    })

    wrapper.vm.routerLink()

    expect(pushSpy).toHaveBeenCalled()
    expect(pushSpy).toHaveBeenCalledWith('test')

    // replace = true
    wrapper.setProps({
      replace: true
    })

    wrapper.vm.routerLink()

    expect(replaceSpy).toHaveBeenCalled()
    expect(pushSpy).toHaveBeenCalledWith('test')
  })

  test('routerLink method without $router', () => {
    wrapper = shallowMount(EmptyComponent, {
      propsData: {
        url: '#test',
        replace: false
      },
      mixins: [RouterLink]
    })

    wrapper.vm.routerLink()

    expect(window.location.hash).toBe('#test')
    window.location.hash = ''

    // replace = true
    wrapper.setProps({
      replace: true
    })

    const length = window.history.length
    wrapper.vm.routerLink()

    expect(window.location.hash).toBe('#test')
    expect(window.history.length).toBe(length)
    window.location.hash = ''
  })
})
