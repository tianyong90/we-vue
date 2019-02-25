import { shallowMount } from '@vue/test-utils'
import Textarea from '@/components/textarea'

describe('textarea', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Textarea, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-textarea')
    expect(wrapper.classes()).toContain('weui-cell')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('show counter', () => {
    wrapper = shallowMount(Textarea, {
      propsData: {
        showCounter: true,
      },
    })

    expect(wrapper.contains('.weui-textarea-counter')).toBeTruthy()
    expect(wrapper.find('.weui-textarea-counter').text()).toEqual(`${wrapper.vm.length}/${wrapper.vm.maxLength}`)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      showCounter: false,
    })
    expect(wrapper.contains('.weui-textarea-counter')).toBeFalsy()

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('watch currentValue', () => {
    wrapper = shallowMount(Textarea, {
      propsData: {},
    })

    wrapper.setData({
      internalValue: 'current-value',
    })

    expect(wrapper.emitted().input).toBeTruthy()
  })

  test('watch value', () => {
    wrapper = shallowMount(Textarea, {
      propsData: {
        maxLength: 10,
      },
    })

    wrapper.setProps({
      value: 'new-value',
    })

    expect(wrapper.vm.internalValue).toBe('new-value')

    // set a value longer than maxLength
    wrapper.setProps({
      value: 'new-value-longer',
    })

    expect(wrapper.vm.internalValue).toBe('new-value-')
  })

  test('check max-length', () => {
    wrapper = shallowMount(Textarea, {
      propsData: {
        maxLength: 2,
        value: 'test',
      },
    })

    expect(wrapper.vm.internalValue.length).toBe(2)
    expect(wrapper.vm.internalValue).toBe('te')
  })

  test('focus event', () => {
    wrapper = shallowMount(Textarea, {
      propsData: {},
    })

    wrapper.find('textarea').trigger('focus')

    expect(wrapper.emitted().focus).toBeTruthy()
  })

  test('blur event', () => {
    wrapper = shallowMount(Textarea, {
      propsData: {},
    })

    wrapper.find('textarea').trigger('blur')

    expect(wrapper.emitted().blur).toBeTruthy()
  })
})
