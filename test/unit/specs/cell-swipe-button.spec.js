import { shallow } from '@vue/test-utils'
import CellSwipeButtom from '@/components/cell-swipe-button'

describe('cell-swipe-button', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(CellSwipeButtom, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-cell-swipe-button')
    expect(wrapper.classes()).toContain('weui-swiped-btn')

    // create with type
    wrapper = shallow(CellSwipeButtom, {
      propsData: {
        type: 'test'
      }
    })

    expect(wrapper.classes()).toContain('weui-swiped-btn_test')

    wrapper = shallow(CellSwipeButtom, {
      slots: {
        default: 'test'
      }
    })

    expect(wrapper.text()).toBe('test')
  })
})
