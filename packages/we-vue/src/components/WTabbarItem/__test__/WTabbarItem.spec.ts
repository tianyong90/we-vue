import { shallowMount } from '@vue/test-utils'
import TabbarItem from '../WTabbarItem'

describe('tabbar-item', () => {
  test('create', () => {
    const wrapper = shallowMount(TabbarItem, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-tabbar-item')
    expect(wrapper.classes()).toContain('weui-tabbar__item')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('text', () => {
    const wrapper = shallowMount(TabbarItem, {
      slots: {
        default: 'test',
      },
    })

    expect(wrapper.find('p.weui-tabbar__label').text()).toBe('test')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('isOn', () => {
    const wrapper = shallowMount(TabbarItem, {
      propsData: {
        isOn: true,
      },
    })

    expect(wrapper.classes()).toContain('weui-bar__item_on')
  })

  test('handle click', () => {
    const routeLinkSpy = jest.fn()
    const wrapper = shallowMount(TabbarItem, {
      propsData: {},
      methods: {
        routeLink: routeLinkSpy,
      },
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(routeLinkSpy).toHaveBeenCalled()
  })
})
