import { shallow } from '@vue/test-utils'
import Panel from '@/components/panel'

describe('panel', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(Panel, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-panel')
    expect(wrapper.classes()).toContain('weui-panel')
  })

  test('render with title', () => {
    wrapper = shallow(Panel, {
      propsData: {
        title: 'test-title'
      }
    })

    expect(wrapper.contains('.weui-panel__hd')).toBeTruthy()
    expect(wrapper.find('.weui-panel__hd').text()).toBe('test-title')
  })
})
