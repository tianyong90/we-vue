import Vue from 'vue'
import { mount } from '@vue/test-utils'
import WTabs from '../../WTabs'
import WTab from '../'

describe('tab', () => {
  test('create', () => {
    const wrapper = mount(WTabs, {
      attachToDocument: true,
      propsData: {},
      slots: {
        default: [WTab, WTab, WTab],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('destroy', () => {
    const wrapper = mount(WTabs, {
      attachToDocument: true,
      propsData: {},
      slots: {
        default: [WTab, WTab, WTab],
      },
    })

    wrapper.findAll(WTab).at(0).vm.$destroy()

    expect(wrapper.vm.tabs).toHaveLength(2)
  })

  test('render title slot', () => {
    Vue.component('w-tab', WTab)

    const wrapper = mount(WTabs, {
      attachToDocument: true,
      propsData: {},
      slots: {
        default: ['<w-tab><span slot="title">title</span>content1</w-tab>'],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
