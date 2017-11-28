import { shallow } from 'vue-test-utils'
import IndicatorApi from '@/components/indicator'
import Indicator from '@/components/indicator/indicator.vue'

describe('test indicator api', () => {
  afterEach(() => {
    IndicatorApi.close()
  })

  it('open and close a indicator', () => {
    IndicatorApi.open()

    expect(document.querySelector('.weui-toast')).toBeTruthy()

    IndicatorApi.close()

    setTimeout(() => {
      expect(document.querySelector('.weui-toast')).toBeFalsy()
    }, 200)
  })
})

describe('indicator', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Indicator, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-indicator')
    expect(wrapper.hasClass('weui-toast')).toBeTruthy()
  })
})
