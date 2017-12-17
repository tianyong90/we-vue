import { mount } from 'vue-test-utils'
import PopupMixinComponent from '../components/popup-mixin-component'

describe('flex', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  // TODO
  it('create', () => {
    wrapper = mount(PopupMixinComponent, {
      propsData: {}
    })

    wrapper.vm.open()
    wrapper.vm.open()
    wrapper.vm.close()
    wrapper.vm.close()

    wrapper.trigger('touchmove')

    expect(wrapper.classes()).toContain('weui-flex')
  })
})
