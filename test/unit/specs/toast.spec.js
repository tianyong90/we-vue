import { shallow, createLocalVue } from 'vue-test-utils'
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

  it('create a toast', () => {
    const localVue = createLocalVue()
    ToastApi({})

    localVue.nextTick(() => {
      expect(document.querySelector('.weui-toast')).toBeTruthy()
    })
  })

  it('create a toast using string parameter', () => {
    ToastApi('test')

    setTimeout(() => {
      expect(document.querySelector('.weui-toast')).toBeTruthy()
      expect(document.querySelector('.weui-toast__content').textContent).toBe('test')
    }, 200)
  })

  it('create a toast with duration', () => {
    let instance = ToastApi({
      duration: 2000
    })

    clock.tick(2001)

    expect(instance.visible).toBe(false)
  })

  it('create a text toast', () => {
    let instance = ToastApi.text('test')

    setTimeout(() => {
      expect(document.querySelector('.weui-toast')).toBeTruthy()
      expect(instance.type).toBe('text')
    }, 200)
  })

  it('create a success toast', () => {
    let instance = ToastApi.success('test')

    setTimeout(() => {
      expect(document.querySelector('.weui-toast')).toBeTruthy()
      expect(instance.type).toBe('success')
    }, 200)
  })

  it('create a fail toast', () => {
    const localVue = createLocalVue()
    let instance = ToastApi.fail('test')

    localVue.nextTick(() => {
      expect(document.querySelector('.weui-toast')).toBeTruthy()
      expect(instance.type).toBe('fail')
    })
  })

  it('create a loading toast', () => {
    const localVue = createLocalVue()
    let instance = ToastApi.loading('test')

    localVue.nextTick(() => {
      expect(document.querySelector('.weui-toast')).toBeTruthy()
      expect(instance.type).toBe('loading')
    })
  })
})

describe('toast', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Toast, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-toast')
    expect(wrapper.find('.weui-toast').classes()).toContain('weui-toast')
  })

  it('text toast', () => {
    wrapper = shallow(Toast, {
      propsData: {
        type: 'text',
        message: 'hello'
      }
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains('.weui-icon_toast')).toBeFalsy()
      expect(wrapper.find('.weui-toast').hasStyle('width', '7em')).toBeTruthy()
    })
  })
})
