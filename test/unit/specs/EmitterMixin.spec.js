import { shallow } from 'vue-test-utils'
import EmptyComponent from '../components/empty.vue'
import EmitterMixin from '@/mixins/emitter'
import sinon from 'sinon'

describe('textarea', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(EmptyComponent, {
      mixins: [EmitterMixin]
    })

    // expect(wrapper.hasProp('to', undefined)).toBeTruthy()
    // expect(wrapper.hasProp('url', undefined)).toBeTruthy()
    // expect(wrapper.hasProp('replace', false)).toBeTruthy()
  })

  // TODO:
  it('dispatch method', () => {
    const pushSpy = sinon.spy()

    wrapper = shallow(EmptyComponent, {
      propsData: {
      },
      mixins: [EmitterMixin]
    })

    wrapper.vm.dispatch('a', 'b', 'c')

    expect(pushSpy.called).toBeTruthy()
    expect(pushSpy.calledWith('test')).toBeTruthy()
  })

  // TODO:
  it('broadcast method', () => {
    const pushSpy = sinon.spy()

    wrapper = shallow(EmptyComponent, {
      propsData: {
      },
      mixins: [EmitterMixin]
    })

    wrapper.vm.broadcast('a', 'b', 'c')

    expect(pushSpy.called).toBeTruthy()
    expect(pushSpy.calledWith('test')).toBeTruthy()
  })
})
