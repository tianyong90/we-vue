import { shallow } from 'vue-test-utils'
import Textarea from '@/components/textarea'

describe('textarea', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Textarea, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-textarea')
    expect(wrapper.classes()).toContain('weui-cell')
  })

  it('show counter', () => {
    wrapper = shallow(Textarea, {
      propsData: {
        showCounter: true
      }
    })

    expect(wrapper.contains('.weui-textarea-counter')).toBeTruthy()
    expect(wrapper.find('.weui-textarea-counter').text()).toEqual(`${wrapper.vm.length}/${wrapper.vm.maxLength}`)

    wrapper.setProps({
      showCounter: false
    })
    expect(wrapper.contains('.weui-textarea-counter')).toBeFalsy()
  })

  it('watch currentValue', () => {
    wrapper = shallow(Textarea, {
      propsData: {}
    })

    wrapper.setData({
      currentValue: 'current-value'
    })

    expect(wrapper.emitted().input).toBeTruthy()
  })

  it('watch value', () => {
    wrapper = shallow(Textarea, {
      propsData: {
        maxLength: 10
      }
    })

    wrapper.setProps({
      value: 'new-value'
    })

    expect(wrapper.vm.currentValue).toBe('new-value')

    // set a value longer than maxLength
    wrapper.setProps({
      value: 'new-value-longer'
    })

    expect(wrapper.vm.currentValue).toBe('new-value-')
  })

  it('check max-length', () => {
    wrapper = shallow(Textarea, {
      propsData: {
        maxLength: 2,
        value: 'test'
      }
    })

    expect(wrapper.vm.currentValue.length).toBe(2)
    expect(wrapper.vm.currentValue).toBe('te')
  })

  it('focus event', () => {
    wrapper = shallow(Textarea, {
      propsData: {}
    })

    wrapper.find('textarea').trigger('focus')

    expect(wrapper.emitted().focus).toBeTruthy()
  })

  it('blur event', () => {
    wrapper = shallow(Textarea, {
      propsData: {}
    })

    wrapper.find('textarea').trigger('blur')

    expect(wrapper.emitted().blur).toBeTruthy()
  })
})
