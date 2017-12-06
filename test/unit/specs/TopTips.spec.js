import { shallow, createLocalVue } from 'vue-test-utils'
import TopTipsApi from '@/components/top-tips'
import TopTips from '@/components/top-tips/top-tips.vue'

describe('test top-tips api', () => {
  afterEach(() => {
    TopTipsApi.close()
  })

  it('open and close a top-tips', () => {
    const localVue = createLocalVue()
    TopTipsApi.open()

    localVue.nextTick(() => {
      expect(document.querySelector('.weui-toptips')).toBeTruthy()
    })

    TopTipsApi.close()

    localVue.nextTick(() => {
      expect(document.querySelector('.weui-toptips')).toBeFalsy()
    })
  })

  it('top-tips should be singletom', () => {
    const localVue = createLocalVue()
    TopTipsApi.open()

    localVue.nextTick(() => {
      // try to open another top-tips
      TopTipsApi.open()

      expect(document.querySelectorAll('.weui-toptips').length).toBe(1)
    })
  })

  it('open with a string paramter', () => {
    const localVue = createLocalVue()
    TopTipsApi.open('test')

    localVue.nextTick(() => {
      expect(document.querySelector('.weui-toptips').textContent).toBe('test')
    })
  })
})

describe('top-tips', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(TopTips, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-top-tips')
    expect(wrapper.hasClass('weui-toptips')).toBeTruthy()
  })
})
