import { shallow, mount } from 'vue-test-utils'
import CellSwipe from '@/components/cell-swipe'
import CellSwipeButtonComponent from '../components/cell-swipe-button'
import { dragHelper } from '../utils'
import { getTranslateX } from '@/utils/transform'

describe('cell-swipe', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(CellSwipe, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-cell-swipe')
    expect(wrapper.hasClass('weui-cell')).toBeTruthy()
  })

  it('drag the handler', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    const rightWidth = wrapper.vm.$refs.rightBtns.clientWidth

    // drag to left (distance = 20px)
    dragHelper(wrapper.find({ref: 'cellBd'}), -20, 0)

    expect(getTranslateX(wrapper.vm.$refs.cellBd)).toBe(0)

    // drag to right (distance = 20px)
    dragHelper(wrapper.find({ref: 'cellBd'}), 20, 0)

    expect(getTranslateX(wrapper.vm.$refs.cellBd)).toBe(0)

    // drag to left (distance < 20px)
    dragHelper(wrapper.find({ref: 'cellBd'}), -10, 0)

    expect(getTranslateX(wrapper.vm.$refs.cellBd)).toBe(0)

    // drag to right (distance = 20px)
    dragHelper(wrapper.find({ref: 'cellBd'}), -rightWidth, 0)

    // drag to right (distance < 20px)
    dragHelper(wrapper.find({ref: 'cellBd'}), 10, 0)

    expect(getTranslateX(wrapper.vm.$refs.cellBd)).toBe(0)
  })
})
