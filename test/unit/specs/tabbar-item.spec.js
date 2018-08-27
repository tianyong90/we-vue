import { shallowMount } from '@vue/test-utils'
import TabbarItem from '@/tabbar-item'

describe('tabbar-item', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(TabbarItem, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-tabbar-item')
    expect(wrapper.classes()).toContain('weui-tabbar__item')
  })

  test('text', () => {
    wrapper = shallowMount(TabbarItem, {
      slots: {
        default: 'test'
      }
    })

    expect(wrapper.find('p.weui-tabbar__label').text()).toBe('test')
  })

  test('isOn', () => {
    wrapper = shallowMount(TabbarItem, {
      propsData: {
        isOn: true
      }
    })

    expect(wrapper.classes()).toContain('weui-bar__item_on')
  })

  test('handle click', () => {
    const routerLinkSpy = jest.fn()
    wrapper = shallowMount(TabbarItem, {
      propsData: {},
      methods: {
        routerLink: routerLinkSpy
      }
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(routerLinkSpy).toHaveBeenCalled()
  })
})
