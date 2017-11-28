import { shallow } from 'vue-test-utils'
import Input from '@/components/input'

describe('input', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Input, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-input')
    expect(wrapper.hasClass('weui-cell')).toBeTruthy()
  })

  it('render with label', () => {
    wrapper = shallow(Input, {
      propsData: {
        label: 'test-label',
        labelWidth: '100'
      }
    })

    expect(wrapper.contains('label.weui-label')).toBeTruthy()
    expect(wrapper.find('label.weui-label').text()).toBe('test-label')

    expect(wrapper.vm.active).toBeFalsy()
    expect(wrapper.vm.valid).toBeTruthy()
    expect(wrapper.vm.currentValue).toBe(wrapper.vm.value)
  })

  it('default validateMode', () => {
    wrapper = shallow(Input, {
      propsData: {}
    })

    expect(wrapper.vm.validateMode).toEqual({
      onFocus: true,
      onBlur: true,
      onChange: true,
      onInput: true
    })
  })

  it('watch currentValue', () => {
    wrapper = shallow(Input, {
      propsData: {}
    })

    wrapper.setData({
      currentValue: 'current-value'
    })

    expect(wrapper.emitted().input).toBeTruthy()
  })

  it('watch value', () => {
    wrapper = shallow(Input, {
      propsData: {}
    })

    wrapper.setProps({
      value: 'new-value'
    })

    expect(wrapper.vm.currentValue).toBe('new-value')
  })
})
