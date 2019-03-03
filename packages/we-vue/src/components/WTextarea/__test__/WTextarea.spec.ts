import { shallowMount } from '@vue/test-utils'
import WTextarea from '../WTextarea'

describe('textarea', () => {
  test('create', () => {
    const wrapper = shallowMount(WTextarea, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-textarea')
    expect(wrapper.classes()).toContain('weui-cell')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('show counter', () => {
    const wrapper = shallowMount(WTextarea, {
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
    const wrapper = shallowMount(WTextarea, {
      propsData: {},
    })

    wrapper.setData({
      internalValue: 'current-value',
    })

    expect(wrapper.emitted().input).toBeTruthy()
  })

  test('watch value', () => {
    const wrapper = shallowMount(WTextarea, {
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
    const wrapper = shallowMount(WTextarea, {
      propsData: {
        maxLength: 2,
        value: 'test',
      },
    })

    expect(wrapper.vm.internalValue).toHaveLength(2)
    expect(wrapper.vm.internalValue).toBe('te')
  })

  test('focus event', () => {
    const wrapper = shallowMount(WTextarea, {
      propsData: {},
    })

    wrapper.find('textarea').trigger('focus')

    expect(wrapper.emitted().focus).toBeTruthy()
  })

  test('blur event', () => {
    const wrapper = shallowMount(WTextarea, {
      propsData: {},
    })

    wrapper.find('textarea').trigger('blur')

    expect(wrapper.emitted().blur).toBeTruthy()
  })
})
