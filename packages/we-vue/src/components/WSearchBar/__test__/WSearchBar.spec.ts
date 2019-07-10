import { mount, shallowMount } from '@vue/test-utils'
import SearchBar from '../'
import Cell from '../../WCell'

describe('search', () => {
  test('create', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('w-search-bar')
    expect(wrapper.contains('.weui-search-bar')).toBeTruthy()

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('autofocus', () => {
    let wrapper = shallowMount(SearchBar, {
      propsData: {
        autofocus: true,
      },
    })

    expect(wrapper.find({ ref: 'input' }).attributes().autofocus).toBe('autofocus')
    expect(wrapper.vm.isActive).toBeTruthy()

    wrapper = shallowMount(SearchBar, {
      propsData: {
        autofocus: false,
      },
    })

    expect(wrapper.find({ ref: 'input' }).attributes()).not.toContain('autofocus')
    expect(wrapper.vm.isActive).toBeFalsy()
  })

  test('method textClick', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {},
    })

    wrapper.vm.textClick()

    expect(wrapper.vm.isActive).toBeTruthy()
  })

  test('method clear', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {},
    })

    wrapper.vm.clear()

    expect(wrapper.vm.currentValue).toBe('')
  })

  test('method cancel', () => {
    const spySearchBarClear = jest.fn()
    const wrapper = shallowMount(SearchBar, {
      propsData: {},
    })

    wrapper.setMethods({
      clear: spySearchBarClear,
    })

    wrapper.vm.cancel()

    expect(wrapper.vm.isActive).toBeFalsy()
    expect(spySearchBarClear).toHaveBeenCalled()
  })

  test('click cancel btn', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {},
    })

    jest.spyOn(wrapper.vm, 'cancel')

    wrapper.find('.weui-search-bar__cancel-btn').trigger('click')

    expect(wrapper.vm.cancel).toHaveBeenCalled()
  })

  test('watch currentValue', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {},
    })

    wrapper.setData({
      currentValue: 'current-value',
    })

    expect(wrapper.emitted().input).toBeTruthy()
  })

  test('watch value', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {},
    })

    wrapper.setProps({
      value: 'new-value',
    })

    expect(wrapper.vm.currentValue).toBe('new-value')
  })

  test('click result', () => {
    const wrapper = mount(SearchBar, {
      attachToDocument: true,
      propsData: {
        result: [1, 2, 3],
      },
    })

    wrapper.find(Cell).trigger('click')

    expect(wrapper.emitted()['click-result']).toBeTruthy()
    expect(wrapper.emitted()['click-result']).toEqual([[1]])
  })
})
