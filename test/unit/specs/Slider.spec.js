import { shallow } from 'vue-test-utils'
import Slider from '@/components/slider'

describe('slider', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Slider, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-slider')
    expect(wrapper.hasClass('weui-slider-box')).toBeTruthy()
  })

  it('show-value-box', () => {
    wrapper = shallow(Slider, {
      propsData: {
        showValueBox: true
      }
    })

    expect(wrapper.contains('.weui-slider-box__value')).toBeTruthy()
    wrapper.setProps({
      showValueBox: false
    })

    expect(wrapper.contains('.weui-slider-box__value')).toBeFalsy()
  })
})
