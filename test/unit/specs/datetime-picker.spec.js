import { mount } from 'vue-test-utils'
import DatetimePicker from '@/components/datetime-picker'
// import { dragHelper } from '../utils'

describe('picker', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create a datetime picker', () => {
    wrapper = mount(DatetimePicker, {
      propsData: {
        slots: []
      }
    })

    expect(wrapper.name()).toBe('wv-datetime-picker')
  })

  it('create date picker', () => {
    wrapper = mount(DatetimePicker, {
      propsData: {
        type: 'date'
      }
    })
  })

  it('create time picker', () => {
    wrapper = mount(DatetimePicker, {
      propsData: {
        type: 'time'
      }
    })
  })
})
