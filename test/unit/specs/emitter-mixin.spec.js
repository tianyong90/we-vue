import { shallow, mount } from 'vue-test-utils'
import EmptyComponent from '../components/empty.vue'
import EmitterMixinComponent from '../components/emitter-mixin-component.vue'
import EmitterMixin from '@/mixins/emitter'
// import sinon from 'sinon'

describe('utils emitter', () => {
  let parentWrapper
  let wrapper
  let childWrapper
  afterEach(() => {
    parentWrapper && parentWrapper.destroy()
    wrapper && wrapper.destroy()
    childWrapper && childWrapper.destroy()
  })

  it('dispatch method', () => {
    wrapper = mount(EmptyComponent, {
      slots: {
        default: EmitterMixinComponent
      }
    })

    wrapper.vm.$children[0].dispatch('empty', 'test-event', [])

    // wrapper.vm.dispatch('abc', 'click', [])

    // expect(wrapper.hasProp('to', undefined)).toBeTruthy()
    // expect(wrapper.hasProp('url', undefined)).toBeTruthy()
    // expect(wrapper.hasProp('replace', false)).toBeTruthy()
  })

  // TODO:
  it('broadcast method', () => {
    // const pushSpy = sinon.spy()
    //
    // wrapper = shallow(EmptyComponent, {
    //   propsData: {
    //   },
    //   mixins: [EmitterMixin]
    // })
    //
    // wrapper.vm.dispatch('a', 'b', 'c')
    //
    // expect(pushSpy.called).toBeTruthy()
    // expect(pushSpy.calledWith('test')).toBeTruthy()
  })

  // TODO:
  it('broadcast method', () => {
    // const pushSpy = sinon.spy()
    //
    // wrapper = shallow(EmptyComponent, {
    //   propsData: {
    //   },
    //   mixins: [EmitterMixin]
    // })
    //
    // wrapper.vm.broadcast('a', 'b', 'c')
    //
    // expect(pushSpy.called).toBeTruthy()
    // expect(pushSpy.calledWith('test')).toBeTruthy()
  })
})
