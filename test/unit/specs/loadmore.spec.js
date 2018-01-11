import { shallow } from '@vue/test-utils'
import Loadmore from '@/components/loadmore'

describe('loadmore', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Loadmore, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-loadmore')
    expect(wrapper.classes()).toContain('weui-loadmore')
  })

  it('text', () => {
    wrapper = shallow(Loadmore, {
      propsData: {
        text: 'test'
      }
    })

    expect(wrapper.find('.weui-loadmore__tips').text()).toBe('test')
  })
})
