import { shallow } from '@vue/test-utils'
import Circle from '@/components/circle'

describe('circle', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Circle, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-circle')
    expect(wrapper.classes()).toContain('wv-circle')
  })

  it('what value change', () => {
    wrapper = shallow(Circle, {
      propsData: {
        value: 0
      }
    })

    wrapper.setProps({
      value: 100
    })

    expect(wrapper.vm.currentValue).toBe(100)
  })

  it('what currentValue change', () => {
    wrapper = shallow(Circle, {
      propsData: {
        value: 0
      }
    })

    wrapper.setData({
      currentValue: 100
    })

    expect(wrapper.emitted().input).toBeTruthy()
  })
})
