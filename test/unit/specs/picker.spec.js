import { mount } from 'vue-test-utils'
import Picker from '@/components/picker'

describe('picker', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(Picker, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-picker')
    expect(wrapper.contains('.wv-picker')).toBeTruthy()
  })
})
