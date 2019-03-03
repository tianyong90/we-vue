import { shallowMount } from '@vue/test-utils'
import ToastApi from '../'
import Toast from '../toast'

describe('toast api', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    ToastApi.close()
    jest.clearAllTimers()
  })

  test('create a toast', () => {
    ToastApi({})

    expect(document.querySelector('.weui-toast')).toBeTruthy()
  })

  test('create a toast using string parameter', () => {
    ToastApi('test')

    setTimeout(() => {
      expect(document.querySelector('.weui-toast')).toBeTruthy()
      expect(document.querySelector('.weui-toast__content')!.textContent).toBe('test')
    }, 200)
  })

  test('create a toast with duration', () => {
    const instance = ToastApi({
      duration: 2000,
    })

    jest.advanceTimersByTime(2001)

    expect(instance.visible).toBe(false)
  })

  test('create a text toast', () => {
    const instance = ToastApi.text('test')

    expect(document.querySelector('.weui-toast')).toBeTruthy()
    expect(instance.type).toBe('text')
  })

  test('create a success toast', () => {
    const instance = ToastApi.success('test')

    expect(document.querySelector('.weui-toast')).toBeTruthy()
    expect(instance.type).toBe('success')
  })

  test('create a fail toast', () => {
    const instance = ToastApi.fail('test')

    expect(document.querySelector('.weui-toast')).toBeTruthy()
    expect(instance.type).toBe('fail')
  })

  test('create a loading toast', () => {
    const instance = ToastApi.loading('test')

    expect(document.querySelector('.weui-toast')).toBeTruthy()
    expect(instance.type).toBe('loading')
  })

  test('setDefaultOptions & resetDefaultOptions method', () => {
    ToastApi.setDefaultOptions({
      duration: 1000,
    })

    expect(ToastApi.defaultOptions.duration).toBe(1000)

    ToastApi.resetDefaultOptions()

    expect(ToastApi.defaultOptions.duration).toBe(2000)
  })

  test('singleton toast', () => {
    ToastApi.allowMultiple(false)
    // close all
    ToastApi.close(true)

    const toast1 = ToastApi.success('1')
    const toast2 = ToastApi.success('2')

    // 因为是单例，第二次调用时返回前一个实例
    expect(toast2).toEqual(toast1)
  })

  test('cloase all', () => {
    ToastApi.allowMultiple(true)

    const toast1 = ToastApi.success('1')
    const toast2 = ToastApi.success('2')

    ToastApi.close(true)

    expect(toast1.currentVisible).toBeFalsy()
    expect(toast2.currentVisible).toBeFalsy()
  })
})

describe('toast', () => {
  test('create', () => {
    const wrapper = shallowMount(Toast, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-toast')
    expect(wrapper.find('.weui-toast').classes()).toContain('weui-toast')
  })

  test('text toast', () => {
    const wrapper = shallowMount(Toast, {
      attachToDocument: true,
      propsData: {
        type: 'text',
        message: 'hello',
      },
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains('.weui-icon_toast')).toBeFalsy()
    })
  })
})
