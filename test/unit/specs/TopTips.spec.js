import { shallow } from 'vue-test-utils'
import TopTips from '@/components/top-tips/top-tips.vue'
import TopTipsApi from '@/components/top-tips'

describe('top-tips component', () => {
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

  it('render with message', () => {
    wrapper = shallow(TopTips, {
      propsData: {
        message: 'test-message'
      }
    })

    expect(wrapper.text()).toBe('test-message')
  })
})

describe('top-tips api', () => {
  it('show', () => {
    TopTipsApi({
      duration: 2000,
      messge: 'test-message'
    })
  })
})
