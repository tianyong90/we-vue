import { shallow } from '@vue/test-utils'
import Input from '@/components/input'
import sinon from 'sinon'

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
    expect(wrapper.classes()).toContain('weui-cell')
  })

  it('input event', () => {
    const validateSpy = sinon.spy()

    // use with maxlength
    wrapper = shallow(Input, {
      propsData: {
        value: '',
        maxlength: 2
      },
      methods: {
        validate: validateSpy
      }
    })

    wrapper.find('input').element.value = 'test'
    wrapper.find('input').trigger('input')

    wrapper.update()
    expect(wrapper.vm.currentValue).toBe('te')
    expect(validateSpy.called).toBeTruthy()

    // use with maxlength
    wrapper = shallow(Input, {
      propsData: {
        value: ''
      },
      methods: {
        validate: validateSpy
      }
    })

    wrapper.find('input').element.value = 'test'
    wrapper.find('input').trigger('input')

    wrapper.update()
    expect(wrapper.vm.currentValue).toBe('test')
    expect(validateSpy.called).toBeTruthy()

    // reset the spy states
    validateSpy.resetHistory()

    // do not validate on input
    wrapper = shallow(Input, {
      propsData: {
        validateMode: {
          onInput: false
        }
      },
      methods: {
        validate: validateSpy
      }
    })

    wrapper.find('input').element.value = 'test'
    wrapper.find('input').trigger('input')

    wrapper.update()
    expect(validateSpy.called).toBeFalsy()
  })

  it('render with label', () => {
    wrapper = shallow(Input, {
      propsData: {
        label: 'test-label',
        labelWidth: 100
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

  it('focus event', () => {
    const mockValidateMethod = sinon.spy()
    wrapper = shallow(Input, {
      propsData: {
        validateMode: {
          onFocus: false
        }
      }
    })

    // set the validate method
    wrapper.setMethods({'validate': mockValidateMethod})

    wrapper.find('input').trigger('focus')

    expect(wrapper.vm.active).toBeTruthy()
    // validate should not be called while validateMode.onFocus is false
    expect(mockValidateMethod.called).toBeFalsy()

    // set validateMode.onFocus to true
    wrapper.setProps({
      validateMode: {
        onFocus: true
      }
    })

    wrapper.find('input').trigger('focus')

    expect(wrapper.vm.active).toBeTruthy()

    // validate should be called while validateMode.onFocus is true
    expect(mockValidateMethod.called).toBeTruthy()
  })

  it('blur event', () => {
    const mockValidateMethod = sinon.spy()
    wrapper = shallow(Input, {
      propsData: {
        validateMode: {
          onBlur: false
        }
      }
    })

    // set the validate method
    wrapper.setMethods({'validate': mockValidateMethod})

    wrapper.find('input').trigger('blur')

    expect(wrapper.vm.active).toBeFalsy()
    // validate should not be called while validateMode.onBlur is false
    expect(mockValidateMethod.called).toBeFalsy()

    // set validateMode.onBlur to true
    wrapper.setProps({
      validateMode: {
        onBlur: true
      }
    })

    wrapper.find('input').trigger('blur')

    expect(wrapper.vm.active).toBeFalsy()

    // validate should be called while validateMode.onBlur is true
    expect(mockValidateMethod.called).toBeTruthy()
  })

  it('change event', () => {
    const mockValidateMethod = sinon.spy()
    wrapper = shallow(Input, {
      propsData: {
        validateMode: {
          onChange: false
        }
      }
    })

    // set the validate method
    wrapper.setMethods({'validate': mockValidateMethod})

    wrapper.find('input').trigger('change')

    expect(wrapper.emitted().change).toBeTruthy()
    // validate should not be called while validateMode.onChange is false
    expect(mockValidateMethod.called).toBeFalsy()

    // set validateMode.onChange to true
    wrapper.setProps({
      validateMode: {
        onChange: true
      }
    })

    wrapper.find('input').trigger('change')

    // validate should be called while validateMode.onChange is true
    expect(mockValidateMethod.called).toBeTruthy()
  })

  it('validate with pattern', () => {
    wrapper = shallow(Input, {
      propsData: {
        pattern: '^test$',
        value: 'test'
      }
    })

    wrapper.vm.validate()
    expect(wrapper.vm.valid).toBeTruthy()

    wrapper.setProps({
      value: 'hello'
    })

    wrapper.vm.validate()
    expect(wrapper.vm.valid).toBeFalsy()
  })

  it('validate required', () => {
    wrapper = shallow(Input, {
      propsData: {
        required: true,
        value: ''
      }
    })
    wrapper.vm.validate()
    expect(wrapper.vm.valid).toBeFalsy()

    wrapper.setProps({
      value: 'test'
    })
    wrapper.vm.validate()
    expect(wrapper.vm.valid).toBeTruthy()
  })

  it('validate minlength', () => {
    wrapper = shallow(Input, {
      propsData: {
        minlength: 5,
        value: 'test'
      }
    })
    wrapper.vm.validate()
    expect(wrapper.vm.valid).toBeFalsy()

    wrapper.setProps({
      value: 'test-hello'
    })
    wrapper.vm.validate()
    expect(wrapper.vm.valid).toBeTruthy()
  })

  it('focus method', () => {
    wrapper = shallow(Input, {
      propsData: {}
    })

    wrapper.vm.focus()
    expect(document.activeElement).toBeTruthy()
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
