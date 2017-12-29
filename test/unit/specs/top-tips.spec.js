import { shallow, createLocalVue } from 'vue-test-utils'
import TopTipsApi from '@/components/top-tips'
import TopTips from '@/components/top-tips/top-tips.vue'
import sinon from 'sinon'

describe('test top-tips api', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    TopTipsApi.close()
    clock.reset()
  })

  it('open a top-tips and then close it', () => {
    const instance = TopTipsApi({
      message: 'test',
      duration: 3000
    })

    clock.tick(1000)

    TopTipsApi.close()

    expect(instance.visible).toBe(false)
  })

  it('open a top-tips with string parameter', () => {
    const localVue = createLocalVue()
    let instance = TopTipsApi('test')

    expect(instance.visible).toBe(true)

    localVue.nextTick(() => {
      expect(document.querySelectorAll('.weui-toptips').length).toBe(1)
      expect(document.querySelector('.weui-toptips').textContent).toBe('test')
    })

  })

  it('create a toast with duration', () => {
    let instance = TopTipsApi({
      duration: 2000
    })

    clock.tick(2001)

    expect(instance.visible).toBe(false)
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
