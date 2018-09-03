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
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-tabs')
    expect(wrapper.classes()).toContain('wv-tabs')
  })

  test('create', () => {
    wrapper = mount(Tabs, {
      propsData: {},
      slots: {
        default: [Tab, Tab, Tab]
      }
    })

    expect(wrapper.name()).toBe('wv-tabs')
    expect(wrapper.classes()).toContain('wv-tabs')
  })
})

// describe('tab', () => {
//   let wrapper
//   afterEach(() => {
//     wrapper && wrapper.destroy()
//   })
//
//   test('create', () => {
//     wrapper = shallowMount(Tab, {
//       propsData: {}
//     })
//
//     expect(wrapper.name()).toBe('wv-tab')
//     expect(wrapper.classes()).toContain('wv-tab')
//   })
// })
