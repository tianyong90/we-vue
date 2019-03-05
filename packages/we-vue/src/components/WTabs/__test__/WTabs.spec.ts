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

  test('click tab items', async () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      propsData: {},
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    await wrapper.vm.$nextTick()

    wrapper
      .findAll('.wv-tab')
      .at(1)
      .trigger('click')
  })

  test('watch color', async () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    const spy = jest.spyOn(wrapper.vm, 'setLine')
    await wrapper.vm.$nextTick()
    wrapper.setProps({
      color: '#f00',
    })

    expect(spy).toHaveBeenCalled()
  })

  test('watch sticky', async () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    const spy = jest.spyOn(wrapper.vm, 'handlers')
    await wrapper.vm.$nextTick()
    wrapper.setProps({
      sticky: true,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('watch swipeable', async () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    const spy = jest.spyOn(wrapper.vm, 'handlers')
    await wrapper.vm.$nextTick()
    wrapper.setProps({
      swipeable: true,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('beforeDestroy hooks', () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    const spy = jest.spyOn(wrapper.vm, 'handlers')
    wrapper.vm.$destroy()
    expect(spy).toHaveBeenCalled()
  })
})
