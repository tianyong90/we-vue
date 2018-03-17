import { shallow } from '@vue/test-utils'
import ToastApi from '@/components/toast'
import Toast from '@/components/toast/toast.vue'
import sinon from 'sinon'

describe('toast api', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    ToastApi.close()
    clock.restore()
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
      duration: 2000
    })

    clock.tick(2001)

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
})

describe('toast', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(Toast, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-toast')
    expect(wrapper.find('.weui-toast').classes()).toContain('weui-toast')
  })

  test('text toast', () => {
    wrapper = shallow(Toast, {
      attachToDocument: true,
      propsData: {
        type: 'text',
        message: 'hello'
      }
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains('.weui-icon_toast')).toBeFalsy()
    })
  })
})
