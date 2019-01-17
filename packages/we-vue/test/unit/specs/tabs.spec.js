import { shallowMount, mount } from '@vue/test-utils'
import Tabs from '@/tabs'
import Tab from '@/tab'

describe('tabs', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Tabs, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-tabs')
    expect(wrapper.classes()).toContain('wv-tabs')
  })

  test('create with tab items', () => {
    wrapper = mount(Tabs, {
      propsData: {},
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    expect(wrapper.name()).toBe('wv-tabs')
    expect(wrapper.classes()).toContain('wv-tabs')
  })

  test('click tab items', () => {
    wrapper = mount(Tabs, {
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
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = mount(Tabs, {
      propsData: {},
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    const tabItem = wrapper.find(Tab)

    expect(tabItem.name()).toBe('wv-tab')
  })

  // TODO
  test('title', () => {
    wrapper = mount(Tabs, {
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
