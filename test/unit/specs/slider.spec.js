import { shallow } from 'vue-test-utils'
import Slider from '@/components/slider'
import { triggerTouch } from '../utils'
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

    wrapper.find({ref: 'thumb'}).trigger('touchstart')
    // // wrapper.find({ref: 'thumb'}).trigger('mousedown')
    //
    // triggerTouch(wrapper.find({ref: 'thumb'}), 'touchstart', 0, 0)
    // triggerTouch(wrapper.find({ref: 'thumb'}), 'touchstart', 0, 0)
    // triggerTouch(wrapper.find({ref: 'thumb'}), 'touchend', 0, 0)
    // dragHelper(wrapper.find({ref: 'thumb'}), 'touchend', 10)

    // wrapper.vm.$refs.thumb.trigger('touchstart')
    // wrapper.find({ref: 'thumb'}).trigger('touchmove')

    // expect(wrapper.contains('.weui-slider-box__value')).toBeFalsy()
  })
})
