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
    expect(wrapper.classes()).toContain('weui-slider-box')

    // set the min be bigger than max
    try {
      wrapper = shallow(Slider, {
        propsData: {
          min: 10,
          max: 1
        }
      })
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })

  it('compute percent', () => {
    const fakeValue = faker.random.number({min: 0, max: 100})
    wrapper = shallow(Slider, {
      propsData: {
        value: fakeValue
      }
    })

    const correctPercent = Math.floor((wrapper.vm.value - wrapper.vm.min) / (wrapper.vm.max - wrapper.vm.min) * 100)

    expect(wrapper.vm.percent).toBe(correctPercent)
  })

  it('show-value', () => {
    wrapper = shallow(Slider, {
      propsData: {
        showValue: true
      }
    })

    expect(wrapper.contains('.weui-slider-box__value')).toBeTruthy()
    wrapper.setProps({
      showValue: false
    })

    expect(wrapper.contains('.weui-slider-box__value')).toBeFalsy()
  })

  it('disabled', () => {
    wrapper = shallow(Slider, {
      propsData: {
        value: 0,
        disabled: true
      }
    })

    // click the inner
    wrapper.find({ ref: 'inner' }).trigger('click')

    // drag handler
    dragHelper(wrapper.find({ref: 'handler'}), 10, 10)

    expect(wrapper.vm.value).toBe(0)
  })

  // TODO:
  it('drag the handler', () => {
    wrapper = shallow(Slider, {
      propsData: {
        value: 0
      }
    })

    dragHelper(wrapper.find({ref: 'handler'}), 10, 10)

    // expect(wrapper.contains('.weui-slider-box__value')).toBeFalsy()
  })

  // TODO:
  it('click the inner', () => {
    wrapper = shallow(Slider, {
      propsData: {
        value: 0
      }
    })

    wrapper.find({ ref: 'inner' }).trigger('click')

    // expect(wrapper.contains('.weui-slider-box__value')).toBeFalsy()
  })
})
