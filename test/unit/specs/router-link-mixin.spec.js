import { shallow } from 'vue-test-utils'
import EmptyComponent from '../components/empty.vue'
import RouterLink from '@/mixins/router-link'
import sinon from 'sinon'

describe('textarea', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(EmptyComponent, {
      mixins: [RouterLink]
    })

    expect(wrapper.props().to).toBe(undefined)
    expect(wrapper.props().url).toBe(undefined)
    expect(wrapper.props().replace).toBe(false)
  })

  it('routerLink method with $router', () => {
    const pushSpy = sinon.spy()
    const replaceSpy = sinon.spy()

    wrapper = shallow(EmptyComponent, {
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

    expect(pushSpy.called).toBeTruthy()
    expect(pushSpy.calledWith('test')).toBeTruthy()

    // replace = true
    wrapper.setProps({
      replace: true
    })

    wrapper.vm.routerLink()

    expect(replaceSpy.called).toBeTruthy()
    expect(replaceSpy.calledWith('test')).toBeTruthy()
  })

  it('routerLink method without $router', () => {
    wrapper = shallow(EmptyComponent, {
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
