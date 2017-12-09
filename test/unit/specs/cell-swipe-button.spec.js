import { shallow } from 'vue-test-utils'
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
    expect(wrapper.hasClass('weui-swiped-btn')).toBeTruthy()

    // create with type
    wrapper = shallow(CellSwipeButtom, {
      propsData: {
        type: 'test'
      }
    })

    expect(wrapper.hasClass('weui-swiped-btn_test')).toBeTruthy()

    wrapper = shallow(CellSwipeButtom, {
      slots: {
        default: 'test'
      }
    })

    expect(wrapper.text()).toBe('test')
  })
})
