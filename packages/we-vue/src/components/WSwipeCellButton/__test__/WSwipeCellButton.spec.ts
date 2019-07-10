import { shallowMount } from '@vue/test-utils'
import SwipeCellButton from '../'

describe('cell-swipe-button', () => {
  test('create', () => {
    let wrapper = shallowMount(SwipeCellButton, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('w-cell-swipe-button')
    expect(wrapper.classes()).toContain('weui-swiped-btn')

    expect(wrapper.html()).toMatchSnapshot()

    // create with type
    wrapper = shallowMount(SwipeCellButton, {
      propsData: {
        type: 'test',
      },
    })

    expect(wrapper.classes()).toContain('weui-swiped-btn_test')

    wrapper = shallowMount(SwipeCellButton, {
      slots: {
        default: 'test',
      },
    })

    expect(wrapper.text()).toBe('test')
  })
})
