import { shallow, createLocalVue } from 'vue-test-utils'
import TopTipsApi from '@/components/top-tips'
import TopTips from '@/components/top-tips/top-tips.vue'

describe('test top-tips api', () => {
  afterEach(() => {
    TopTipsApi.close()
  })

  it('open a top-tips', () => {
    const localVue = createLocalVue()
    TopTipsApi({
      message: 'test'
    })

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
    TopTipsApi({})

    localVue.nextTick(() => {
      // try to open another top-tips
      TopTipsApi({})

      expect(document.querySelectorAll('.weui-toptips').length).toBe(1)
    })
  })
})

describe('top-tips component', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(TopTips, {
      propsData: {
        visible: true
      }
    })

    expect(wrapper.name()).toBe('wv-top-tips')
    expect(wrapper.classes()).toContain('weui-toptips')
  })

  it('render message correctlly', () => {
    wrapper = shallow(TopTips, {
      propsData: {
        message: 'test',
        visible: true
      }
    })

    expect(wrapper.text()).toContain('test')
  })
})
