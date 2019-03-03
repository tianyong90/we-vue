import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import TopTipsApi from '../'
import TopTips from '../WTopTips'

describe('test top-tips api', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    TopTipsApi.close()
    jest.clearAllTimers()
  })

  test('open a top-tips and then close it', () => {
    const instance = TopTipsApi({
      message: 'test',
      duration: 3000,
    })

    jest.advanceTimersByTime(1000)

    TopTipsApi.close()

    expect(instance.visible).toBe(false)
  })

  test('open a top-tips with string parameter', () => {
    const localVue = createLocalVue()
    let instance = TopTipsApi('test')

    expect(instance.visible).toBe(true)

    localVue.nextTick(() => {
      expect(document.querySelectorAll('.weui-toptips')).toHaveLength(1)
      expect(document.querySelector('.weui-toptips')!.textContent).toBe('test')
    })
  })

  test('create a toast with duration', () => {
    let instance = TopTipsApi({
      message: 'foo',
      duration: 2000,
    })

    jest.advanceTimersByTime(2001)

    expect(instance.visible).toBe(false)
  })

  test('top-tips should be singletom', () => {
    const localVue = createLocalVue()
    TopTipsApi({
      message: 'foo',
    })

    localVue.nextTick(() => {
      // try to open another top-tips
      TopTipsApi({
        message: 'foo',
      })

      expect(document.querySelectorAll('.weui-toptips')).toHaveLength(1)
    })
  })

  test('setDefaultOptions and resetDefaultOptions', () => {
    const theDefault = {
      visible: true,
      message: '',
      duration: 3000,
    }

    const opts = {
      duration: 3000,
    }

    TopTipsApi.setDefaultOptions(opts)

    expect(TopTipsApi.defaultOptions).toEqual({ ...theDefault, ...opts })

    TopTipsApi.resetDefaultOptions()

    expect(TopTipsApi.defaultOptions).toEqual(theDefault)
  })
})

describe('top-tips component', () => {
  test('create', () => {
    const wrapper = mount(TopTips, {
      attachToDocument: true,
      propsData: {
        visible: true,
      },
    })

    expect(wrapper.name()).toBe('wv-top-tips')
    expect(wrapper.classes()).toContain('weui-toptips')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render message correctlly', () => {
    const wrapper = shallowMount(TopTips, {
      propsData: {
        message: 'test',
        visible: true,
      },
    })

    expect(wrapper.text()).toContain('test')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
