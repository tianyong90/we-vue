import { mount, shallowMount } from '@vue/test-utils'
import Tabs from '../'
import Tab from '../../WTab'
import { horizontalDrag } from '@/test/unit/utils'

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

  test('lineHeight property', async () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      propsData: {
        lineHeight: 10,
      },
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    expect((wrapper.vm.lineStyle as any).height).toBe('10px')
    expect((wrapper.vm.lineStyle as any).borderRadius).toBe('10px')
  })

  test('color property', async () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      propsData: {
        color: 'red',
      },
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('getTabStyle method', async () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      propsData: {
        color: 'red',
        type: 'card',
        titleActiveColor: '#fff',
        titleInactiveColor: '#000',
      },
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    await wrapper.vm.$nextTick()

    const tab1 = wrapper.findAll(Tab).at(0)

    expect(wrapper.vm.getTabStyle(tab1.vm as any, 0)).toEqual({
      backgroundColor: 'red',
      borderColor: 'red',
      color: '#fff',
    })
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

  test('swipe content', async () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      propsData: {
        swipeable: true,
      },
      slots: {
        default: [Tab, Tab, Tab, Tab, Tab],
      },
    })

    const spy = jest.spyOn(wrapper.vm, 'setCurActive')
    await wrapper.vm.$nextTick()

    // drag to left
    horizontalDrag(wrapper.vm.$refs.content, 0, -1000)
    expect(spy).toHaveBeenCalledWith(1)

    await wrapper.vm.$nextTick()

    // drag to right
    horizontalDrag(wrapper.vm.$refs.content, 0, 1000)
    expect(spy).toHaveBeenLastCalledWith(0)
  })

  test('watch active', async () => {
    const wrapper = mount(Tabs, {
      attachToDocument: true,
      slots: {
        default: [Tab, Tab, Tab],
      },
    })

    const spy = jest.spyOn(wrapper.vm, 'setLine')
    await wrapper.vm.$nextTick()

    wrapper.setProps({
      active: 1,
    })

    expect(spy).toHaveBeenCalled()
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
