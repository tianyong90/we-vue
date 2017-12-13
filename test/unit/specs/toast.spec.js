import { shallow } from 'vue-test-utils'
import ToastApi from '@/components/toast'
import Toast from '@/components/toast/toast.vue'

describe('toast api', () => {
  afterEach(() => {
    ToastApi.close()
  })

  it('open a toast', () => {
    ToastApi({})

    setTimeout(() => {
      expect(document.querySelector('.weui-toast')).toBeTruthy()
    }, 200)
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
    expect(wrapper.hasClass('weui-toast')).toBeTruthy()
  })

  it('text toast', () => {
    wrapper = shallow(Toast, {
      propsData: {
        type: 'text',
        message: 'hello'
      }
    })

    expect(wrapper.contains('.weui-icon_toast')).toBeFalsy()
    expect(wrapper.hasStyle('width', '7em')).toBeTruthy()
  })
})
