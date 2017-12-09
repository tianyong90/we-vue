import { shallow } from 'vue-test-utils'
import Slider from '@/components/slider'
import { dragHelper } from '../utils'
import faker from 'faker'

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

  it('compute progress', () => {
    const fakeValue = faker.random.number({min: 0, max: 100})
    wrapper = shallow(Slider, {
      propsData: {
        value: fakeValue
      }
    })

    const correctProgress = Math.floor((wrapper.vm.value - wrapper.vm.min) / (wrapper.vm.max - wrapper.vm.min) * 100)

    expect(wrapper.vm.progress).toBe(correctProgress)
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

  // TODO:
  it('drag the thumb', () => {
    wrapper = shallow(Slider, {
      propsData: {
        value: 0
      }
    })

    dragHelper(wrapper.find({ref: 'thumb'}), 10, 10)

    // expect(wrapper.contains('.weui-slider-box__value')).toBeFalsy()
  })
})
