import { mount, shallowMount } from '@vue/test-utils'
import Slider from '@/components/slider'
import { horizontalDrag } from '../utils'
import faker from 'faker'

describe('slider', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Slider, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-slider')
    expect(wrapper.classes()).toContain('weui-slider-box')

    // vue 默认会将异常转为 console.eeror 输出，为此通过 mock console.error 和 console.warn，避免这一机制，方便测试
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})

    // set the min be bigger than max
    expect(() => {
      shallowMount(Slider, {
        propsData: {
          min: 10,
          max: 1
        }
      })
    }).toThrow('property:max must be bigger than property:min')
  })

  test('compute percent', () => {
    const fakeValue = faker.random.number({min: 0, max: 100})
    wrapper = shallowMount(Slider, {
      propsData: {
        value: fakeValue
      }
    })

    const correctPercent = Math.floor((wrapper.vm.value - wrapper.vm.min) / (wrapper.vm.max - wrapper.vm.min) * 100)

    expect(wrapper.vm.percent).toBe(correctPercent)
  })

  test('show-value', () => {
    wrapper = shallowMount(Slider, {
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

  test('disabled', () => {
    wrapper = shallowMount(Slider, {
      propsData: {
        value: 0,
        disabled: true
      }
    })

    // click the inner
    wrapper.find({ ref: 'inner' }).trigger('click')

    // drag handler
    horizontalDrag(wrapper.find({ref: 'handler'}), 0, 10)

    expect(wrapper.vm.value).toBe(0)
  })

  test('drag the handler', () => {
    wrapper = shallowMount(Slider, {
      propsData: {
        value: 0
      }
    })

    const { sliderLeft, min, max, step, stepWidth } = wrapper.vm

    const mockClientX = sliderLeft + 50

    horizontalDrag(wrapper.find({ ref: 'handler' }), 0, mockClientX)

    let expectedValue = min + step * (Math.round((mockClientX - sliderLeft) / stepWidth))

    expectedValue = expectedValue < min ? min : expectedValue > max ? max : expectedValue

    expect(wrapper.emitted().input[0]).toEqual([expectedValue])
    expect(wrapper.emitted().change[0]).toEqual([expectedValue])
  })

  test('click the inner', () => {
    wrapper = mount(Slider, {
      attachToDocument: true,
      propsData: {
        value: 0
      }
    })

    const { min, step, sliderLeft, stepWidth } = wrapper.vm

    const mockClientX = sliderLeft + 50

    wrapper.find({ ref: 'inner' }).trigger('click', { clientX: mockClientX })

    const expectedValue = min + step * (Math.round((mockClientX - sliderLeft) / stepWidth))

    expect(wrapper.emitted().input[0]).toEqual([expectedValue])
    expect(wrapper.emitted().change[0]).toEqual([expectedValue])
  })
})
