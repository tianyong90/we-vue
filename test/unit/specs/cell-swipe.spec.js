import { shallowMount, mount } from '@vue/test-utils'
import CellSwipe from '@/components/cell-swipe'
import CellSwipeButtonComponent from '../components/cell-swipe-button'
import { horizontalDrag } from '../utils'

describe('cell-swipe', () => {
  let wrapper

  const getRightBtnsWidth = () => wrapper.vm.$refs.rightBtns.clientWidth

  beforeEach(() => {
    // to MOCK the clientWidth properfy
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', {
      value: 20,
      writable: true
    })
  })

  afterEach(() => {
    wrapper && wrapper.destroy()

    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', {
      value: 0,
      writable: true
    })
  })

  test('create', () => {
    wrapper = shallowMount(CellSwipe, {
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

    horizontalDrag(wrapper.find({ref: 'cellBd'}), 0, -getRightBtnsWidth())

    expect(wrapper.vm.offset).toBe(-getRightBtnsWidth())
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

    horizontalDrag(wrapper.find({ref: 'cellBd'}), 0, -(getRightBtnsWidth() + 20))

    expect(wrapper.vm.offset).toBe(-getRightBtnsWidth())
  })

  test('drag to right and close right buttons', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -getRightBtnsWidth()
    })

    horizontalDrag(wrapper.find({ref: 'cellBd'}), 0, getRightBtnsWidth())

    expect(wrapper.vm.offset).toBe(0)
  })

  test('drag to right with a small distance', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -getRightBtnsWidth()
    })

    horizontalDrag(wrapper.find({ref: 'cellBd'}), 0, 10)

    expect(wrapper.vm.offset).toBe(-getRightBtnsWidth())
  })

  test('drag to right with a distance out of range', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -getRightBtnsWidth()
    })

    horizontalDrag(wrapper.find({ref: 'cellBd'}), 0, getRightBtnsWidth() + 10)

    expect(wrapper.vm.offset).toBe(0)
  })

  test('clickoutside', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true
    })

    const anOtherWrapper = mount(CellSwipe, {
      attachToDocument: true,
      data: function () {
        return {
          offset: 10
        }
      }
    })

    // click warpper, the other cell-swipe's offset should be reset to 0
    wrapper.trigger('touchstart')

    expect(anOtherWrapper.vm.offset).toBe(0)
  })
})
