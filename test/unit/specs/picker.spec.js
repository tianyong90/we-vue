import { mount } from 'vue-test-utils'
import Picker from '@/components/picker'

describe('picker', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: []
      }
    })

    // TODO
    expect(wrapper.name()).toBe('wv-picker')
    // expect(wrapper.contains('.wv-picker')).toBeTruthy()
  })

  it('create', () => {
    wrapper = mount(Picker, {
      propsData: {
        slots: [1, 2, 3]
      }
    })

    // TODO
    expect(wrapper.name()).toBe('wv-picker')
    // expect(wrapper.contains('.wv-picker')).toBeTruthy()
  })
})
