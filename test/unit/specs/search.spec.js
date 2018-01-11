import { shallow } from '@vue/test-utils'
import Search from '@/components/search'
import sinon from 'sinon'

describe('search', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Search, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-search')
    expect(wrapper.contains('.weui-search-bar')).toBeTruthy()
  })

  it('autofocus', () => {
    wrapper = shallow(Search, {
      propsData: {
        autofocus: true
      }
    })

    expect(wrapper.find({ ref: 'searchInput' }).attributes().autofocus).toBe('autofocus')
    expect(wrapper.vm.isActive).toBeTruthy()

    wrapper = shallow(Search, {
      propsData: {
        autofocus: false
      }
    })

    expect(wrapper.find({ ref: 'searchInput' }).attributes()).not.toContain('autofocus')
    expect(wrapper.vm.isActive).toBeFalsy()
  })

  it('method textClick', () => {
    wrapper = shallow(Search, {
      propsData: {}
    })

    wrapper.vm.textClick()

    expect(wrapper.vm.isActive).toBeTruthy()
  })

  it('method serachClear', () => {
    wrapper = shallow(Search, {
      propsData: {}
    })

    wrapper.vm.searchClear()

    expect(wrapper.vm.currentValue).toBe('')
  })

  it('method searchCancel', () => {
    const spySearchClear = sinon.spy()
    wrapper = shallow(Search, {
      propsData: {}
    })

    wrapper.setMethods({
      searchClear: spySearchClear
    })

    wrapper.vm.searchCancel()

    expect(wrapper.vm.isActive).toBeFalsy()
    expect(spySearchClear.called).toBeTruthy()
  })

  it('watch currentValue', () => {
    wrapper = shallow(Search, {
      propsData: {}
    })

    wrapper.setData({
      currentValue: 'current-value'
    })

    expect(wrapper.emitted().input).toBeTruthy()
  })

  it('watch value', () => {
    wrapper = shallow(Search, {
      propsData: {}
    })

    wrapper.setProps({
      value: 'new-value'
    })

    expect(wrapper.vm.currentValue).toBe('new-value')
  })
})
