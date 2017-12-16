import { shallow } from 'vue-test-utils'
import Button from '@/components/button'

describe('button', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Button, {
      propsData: {
        type: 'primary'
      }
    })

    expect(wrapper.name()).toBe('wv-button')
    expect(wrapper.classes()).toContain('weui-btn')
  })

  it('is-loading', () => {
    wrapper = shallow(Button, {
      propsData: {
        isLoading: true
      }
    })

    expect(wrapper.classes()).toContain('weui-btn_loading')
  })

  it('disabled', () => {
    wrapper = shallow(Button, {
      propsData: {
        disabled: true
      }
    })

    const classDisabled = wrapper.vm.plain ? 'weui-btn_plain-disabled' : 'weui-btn_disabled'
    expect(wrapper.classes()).toContain(classDisabled)
  })

  it('mini', () => {
    wrapper = shallow(Button, {
      propsData: {
        mini: true
      }
    })
    expect(wrapper.classes()).toContain('weui-btn_mini')
  })

  it('plain', () => {
    wrapper = shallow(Button, {
      propsData: {
        type: 'primary',
        plain: true
      }
    })
    const classType = wrapper.vm.plain ? `weui-btn_plain-${wrapper.vm.type}` : `weui-btn_${wrapper.vm.type}`
    expect(wrapper.classes()).toContain(classType)
  })

  it('click', () => {
    wrapper = shallow(Button, {
      propsData: {}
    })

    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click').length).toBe(1)
  })
})
