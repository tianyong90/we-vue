import { shallow, mount } from '@vue/test-utils'
import SearchBar from '@/components/search-bar'
import Cell from '@/components/cell'

describe('search', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-search-bar')
    expect(wrapper.contains('.weui-search-bar')).toBeTruthy()
  })

  test('autofocus', () => {
    wrapper = shallow(SearchBar, {
      propsData: {
        autofocus: true
      }
    })

    expect(wrapper.find({ ref: 'input' }).attributes().autofocus).toBe('autofocus')
    expect(wrapper.vm.isActive).toBeTruthy()

    wrapper = shallow(SearchBar, {
      propsData: {
        autofocus: false
      }
    })

    expect(wrapper.find({ ref: 'input' }).attributes()).not.toContain('autofocus')
    expect(wrapper.vm.isActive).toBeFalsy()
  })

  test('method textClick', () => {
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    wrapper.vm.textClick()

    expect(wrapper.vm.isActive).toBeTruthy()
  })

  test('method clear', () => {
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    wrapper.vm.clear()

    expect(wrapper.vm.currentValue).toBe('')
  })

  test('method cancel', () => {
    const spySearchBarClear = jest.fn()
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    wrapper.setMethods({
      clear: spySearchBarClear
    })

    wrapper.vm.cancel()

    expect(wrapper.vm.isActive).toBeFalsy()
    expect(spySearchBarClear).toHaveBeenCalled()
  })

  test('watch currentValue', () => {
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    wrapper.setData({
      currentValue: 'current-value'
    })

    expect(wrapper.emitted().input).toBeTruthy()
  })

  test('watch value', () => {
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    wrapper.setProps({
      value: 'new-value'
    })

    expect(wrapper.vm.currentValue).toBe('new-value')
  })

  test('click result', () => {
    wrapper = mount(SearchBar, {
      attachToDocument: true,
      propsData: {
        result: [1, 2, 3]
      }
    })

    wrapper.find(Cell).trigger('click')

    expect(wrapper.emitted()['click-result']).toBeTruthy()
    expect(wrapper.emitted()['click-result']).toEqual([[1]])
  })
})
