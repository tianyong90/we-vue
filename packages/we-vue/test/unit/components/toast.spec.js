import { shallowMount } from '@vue/test-utils'
import ToastApi from '@/components/toast'
import Toast from '@/components/toast/toast'

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
      expect(document.querySelector('.weui-toast__content').textContent).toBe('test')
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

  test('setDefaultOptions method', () => {
    ToastApi.setDefaultOptions({
      duration: 1000,
    })

    expect(ToastApi.currentOptions.duration).toBe(1000)
  })

  test('resetDefaultOptions method', () => {
    ToastApi.setDefaultOptions({
      duration: 1000,
    })

    ToastApi.resetDefaultOptions()

    expect(ToastApi.currentOptions).toEqual(ToastApi.defaultOptions)
  })

  // TODO
  // test('multiple toast', async () => {
  //   ToastApi.allowMultiple()
  //   // close all
  //   ToastApi.close(true)
  //
  //   // await later(500)
  //
  //   const toast1 = ToastApi.success('1')
  //   const toast2 = ToastApi.success('2')
  //   ToastApi.close()
  //   // await later(500)
  //   expect(toast1.visible).toBeFalsy()
  //   expect(toast2.visible).toBeTruthy()
  //   ToastApi.close()
  //   ToastApi.close()
  //   // await later(500)
  //   expect(toast2.visible).toBeFalsy()
  //   ToastApi.allowMultiple(false)
  // })
})

describe('toast', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Toast, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-toast')
    expect(wrapper.find('.weui-toast').classes()).toContain('weui-toast')
  })

  test('text toast', () => {
    wrapper = shallowMount(Toast, {
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
