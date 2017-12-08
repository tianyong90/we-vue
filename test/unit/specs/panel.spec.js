import { shallow } from 'vue-test-utils'
import Panel from '@/components/panel'

describe('panel', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Panel, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-panel')
    expect(wrapper.hasClass('weui-panel')).toBeTruthy()
  })

  it('render with title', () => {
    wrapper = shallow(Panel, {
      propsData: {
        title: 'test-title'
      }
    })

    expect(wrapper.contains('.weui-panel__hd')).toBeTruthy()
    expect(wrapper.find('.weui-panel__hd').text()).toBe('test-title')
  })
})
