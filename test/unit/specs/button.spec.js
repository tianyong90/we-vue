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
    expect(wrapper.hasClass('weui-btn')).toBeTruthy()
  })

  it('is-loading', () => {
    wrapper = shallow(Button, {
      propsData: {
        isLoading: true
      }
    })

    expect(wrapper.hasClass('weui-btn_loading')).toBeTruthy()
  })

  it('disabled', () => {
    wrapper = shallow(Button, {
      propsData: {
        disabled: true
      }
    })

    const classDisabled = wrapper.vm.plain ? 'weui-btn_plain-disabled' : 'weui-btn_disabled'
    expect(wrapper.hasClass(classDisabled)).toBeTruthy()
  })

  it('mini', () => {
    wrapper = shallow(Button, {
      propsData: {
        mini: true
      }
    })
    expect(wrapper.hasClass('weui-btn_mini')).toBeTruthy()
  })

  it('plain', () => {
    wrapper = shallow(Button, {
      propsData: {
        type: 'primary',
        plain: true
      }
    })
    const classType = wrapper.vm.plain ? `weui-btn_plain-${wrapper.vm.type}` : `weui-btn_${wrapper.vm.type}`
    expect(wrapper.hasClass(classType)).toBeTruthy()
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
