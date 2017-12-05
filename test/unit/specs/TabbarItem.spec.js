import { shallow } from 'vue-test-utils'
import TabbarItem from '@/components/tabbar-item'

describe('tabbar-item', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    let wrapper = shallow(TabbarItem, {
    })

    expect(wrapper.name()).toBe('wv-tabbar-item')
  })

  // TODO:
})
