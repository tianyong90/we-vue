import { shallowMount, mount } from '@vue/test-utils'
import Tabs from '../tabs'
import Tab from '../../tab'
import { renderToString } from '@vue/server-test-utils'

describe('tabs', () => {
  test('create', () => {
    const wrapper = shallowMount(Tabs, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-tabs')
    expect(wrapper.classes()).toContain('wv-tabs')
  })

  test('create with tab items', () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      propsData: {},
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.name()).toBe('wv-tabs')
    expect(wrapper.classes()).toContain('wv-tabs')
  })

  test('click tab items', () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      propsData: {},
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    wrapper
      .findAll(Tab)
      .at(1)
      .trigger('click')
  })
})

describe('tab', () => {
  test('create', () => {
    const wrapper = renderToString(Tabs, {
      propsData: {},
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  test('title', () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      propsData: {},
      slots: {
        default: [
          '<wv-tab title="title1">1</wv-tab>',
          '<wv-tab title="title2">2</wv-tab>',
        ],
      },
    })

    const tabItem = wrapper.find(Tab)
  })
})
