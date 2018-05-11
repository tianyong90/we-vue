import { shallowMount } from '@vue/test-utils'
import CellSwipeButtom from '@/components/cell-swipe-button'

describe('cell-swipe-button', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(CellSwipeButtom, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-cell-swipe-button')
    expect(wrapper.classes()).toContain('weui-swiped-btn')

    // create with type
    wrapper = shallowMount(CellSwipeButtom, {
      propsData: {
        type: 'test'
      }
    })

    expect(wrapper.classes()).toContain('weui-swiped-btn_test')

    wrapper = shallowMount(CellSwipeButtom, {
      slots: {
        default: 'test'
      }
    })

    expect(wrapper.text()).toBe('test')
  })
})
