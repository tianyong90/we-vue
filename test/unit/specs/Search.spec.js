import { shallow } from 'vue-test-utils'
import Search from '@/components/search'

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

    expect(wrapper.vm.$refs.searchInput.hasAttribute('autofocus')).toBeTruthy()
    expect(wrapper.vm.$refs.searchInput.getAttribute('autofocus')).toBe('autofocus')
    expect(wrapper.vm.isActive).toBeTruthy()

    wrapper = shallow(Search, {
      propsData: {
        autofocus: false
      }
    })

    expect(wrapper.vm.$refs.searchInput.hasAttribute('autofocus')).toBeFalsy()
    expect(wrapper.vm.isActive).toBeFalsy()
  })
})
