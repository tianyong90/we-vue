import { shallowMount, mount } from '@vue/test-utils'
import Tabs from '../WTabs'
import Tab from '../../WTab'

describe('tabs', () => {
  test('create', () => {
    const wrapper = shallowMount(Tabs, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('w-tabs')
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

    expect(wrapper.name()).toBe('w-tabs')
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
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      propsData: {},
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('destroy', () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      propsData: {},
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    wrapper.findAll(Tab).at(0).vm.$destroy()

    expect(wrapper.vm.tabs).toHaveLength(2)
  })
})
