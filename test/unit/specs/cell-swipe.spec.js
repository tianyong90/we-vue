import { shallow, mount } from '@vue/test-utils'
import CellSwipe from '@/components/cell-swipe'
import CellSwipeButtonComponent from '../components/cell-swipe-button'
import { horizontalDrag } from '../utils'

describe('cell-swipe', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(CellSwipe, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-cell-swipe')
    expect(wrapper.classes()).toContain('weui-cell')
  })

  test('drag to left and show the buttons', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    // mock rightBtns clientWidth
    wrapper.vm.$refs.rightBtns = jest.fn(() => {
      return { clientWidth: 20 }
    })

    const rightWidth = wrapper.vm.$refs.rightBtns.clientWidth

    horizontalDrag(wrapper.find({ref: 'cellBd'}), 0, -rightWidth)

    expect(wrapper.vm.offset).toBe(-rightWidth)
  })

  test('drag to left with a small distance', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    horizontalDrag(wrapper.find({ref: 'cellBd'}), 0, -10)

    expect(wrapper.vm.offset).toBe(0)
  })

  test('drag to left with a distance out of range', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    // mock rightBtns clientWidth
    wrapper.vm.$refs.rightBtns = jest.fn(() => {
      return { clientWidth: 20 }
    })

    const rightWidth = wrapper.vm.$refs.rightBtns.clientWidth

    horizontalDrag(wrapper.find({ref: 'cellBd'}), 0, -(rightWidth + 20))

    expect(wrapper.vm.offset).toBe(-rightWidth)
  })

  test('drag to right and close right buttons', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    const rightWidth = wrapper.vm.$refs.rightBtns.clientWidth

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -rightWidth
    })

    horizontalDrag(wrapper.find({ref: 'cellBd'}), 0, rightWidth)

    expect(wrapper.vm.offset).toBe(0)
  })

  test('drag to right with a small distance', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    // mock rightBtns clientWidth
    wrapper.vm.$refs.rightBtns = jest.fn(() => {
      return { clientWidth: 20 }
    })

    const rightWidth = wrapper.vm.$refs.rightBtns.clientWidth

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -rightWidth
    })

    horizontalDrag(wrapper.find({ref: 'cellBd'}), 0, 10)

    expect(wrapper.vm.offset).toBe(-rightWidth)
  })

  test('drag to right with a distance out of range', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    const rightWidth = wrapper.vm.$refs.rightBtns.clientWidth

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -rightWidth
    })

    horizontalDrag(wrapper.find({ref: 'cellBd'}), 0, rightWidth + 10)

    expect(wrapper.vm.offset).toBe(0)
  })

  test('clickoutside', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true
    })

    const anOtherWrapper = mount(CellSwipe, {
      attachToDocument: true,
      data: {
        offset: 10
      }
    })

    // click warpper, the other cell-swipe's offset should be reset to 0
    wrapper.trigger('touchstart')

    expect(anOtherWrapper.vm.offset).toBe(0)
  })
})
