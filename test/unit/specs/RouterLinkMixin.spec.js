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

    expect(wrapper.hasProp('to', undefined)).toBeTruthy()
    expect(wrapper.hasProp('url', undefined)).toBeTruthy()
    expect(wrapper.hasProp('replace', false)).toBeTruthy()
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

  // TODO:
  it('routerLink method without $router', () => {
    const locationReplaceStub = sinon.stub(window.location, 'replace')

    wrapper = shallow(EmptyComponent, {
      propsData: {
        url: 'test'
      },
      mixins: [RouterLink]
    })

    wrapper.vm.routerLink()

    // expect(location.href).toBe('test')

    // replace = true
    wrapper.setProps({
      replace: true
    })

    wrapper.vm.routerLink()

    expect(locationReplaceStub.called).toBeTruthy()
  })
})
