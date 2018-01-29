import { shallow } from '@vue/test-utils'
import SearchBar from '@/components/search-bar'
import sinon from 'sinon'

describe('search', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-search-bar')
    expect(wrapper.contains('.weui-search-bar')).toBeTruthy()
  })

  it('autofocus', () => {
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

  it('method textClick', () => {
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    wrapper.vm.textClick()

    expect(wrapper.vm.isActive).toBeTruthy()
  })

  it('method clear', () => {
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    wrapper.vm.clear()

    expect(wrapper.vm.currentValue).toBe('')
  })

  it('method cancel', () => {
    const spySearchBarClear = sinon.spy()
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    wrapper.setMethods({
      clear: spySearchBarClear
    })

    wrapper.vm.cancel()

    expect(wrapper.vm.isActive).toBeFalsy()
    expect(spySearchBarClear.called).toBeTruthy()
  })

  it('watch currentValue', () => {
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    wrapper.setData({
      currentValue: 'current-value'
    })

    expect(wrapper.emitted().input).toBeTruthy()
  })

  it('watch value', () => {
    wrapper = shallow(SearchBar, {
      propsData: {}
    })

    wrapper.setProps({
      value: 'new-value'
    })

    expect(wrapper.vm.currentValue).toBe('new-value')
  })

  it('click result', () => {
    wrapper = shallow(SearchBar, {
      attachToDocument: true,
      propsData: {
        result: [1, 2, 3]
      }
    })

    wrapper.find('wv-cell').trigger('click')

    expect(wrapper.emitted()['click-result']).toBeTruthy()
    expect(wrapper.emitted()['click-result']).toEqual([[1]])
  })
})
