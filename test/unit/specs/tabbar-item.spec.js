import { shallow } from '@vue/test-utils'
import TabbarItem from '@/components/tabbar-item'

describe('tabbar-item', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(TabbarItem, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-tabbar-item')
    expect(wrapper.classes()).toContain('weui-tabbar__item')
  })

  test('text', () => {
    wrapper = shallow(TabbarItem, {
      slots: {
        default: 'test'
      }
    })

    expect(wrapper.find('p.weui-tabbar__label').text()).toBe('test')
  })

  test('isOn', () => {
    wrapper = shallow(TabbarItem, {
      propsData: {
        isOn: true
      }
    })

    expect(wrapper.classes()).toContain('weui-bar__item_on')
  })

  test('handle click', () => {
    const routerLinkSpy = jest.fn()
    wrapper = shallow(TabbarItem, {
      propsData: {},
      methods: {
        routerLink: routerLinkSpy
      }
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(routerLinkSpy.mock.calls.length).toBeTruthy()
  })
})
