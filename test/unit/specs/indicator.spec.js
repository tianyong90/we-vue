import { shallow, createLocalVue } from 'vue-test-utils'
import IndicatorApi from '@/components/indicator'
import Indicator from '@/components/indicator/indicator.vue'

describe('test indicator api', () => {
  afterEach(() => {
    IndicatorApi.close()
  })

  it('open and close a indicator', () => {
    const localVue = createLocalVue()
    IndicatorApi.open()

    expect(document.querySelector('.weui-toast')).toBeTruthy()

    IndicatorApi.close()

    localVue.nextTick(() => {
      expect(document.querySelector('.weui-toast')).toBeFalsy()
    })
  })

  it('indicator should be singletom', () => {
    const localVue = createLocalVue()
    IndicatorApi.open()

    localVue.nextTick(() => {
      // try to open another indicator
      IndicatorApi.open()

      expect(document.querySelectorAll('.weui-toast').length).toBe(1)
    })
  })

  it('open with a string paramter', () => {
    const localVue = createLocalVue()
    IndicatorApi.open('test')

    localVue.nextTick(() => {
      expect(document.querySelector('.weui-toast__content').textContent).toBe('test')
    })
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
