import { shallowMount, mount } from '@vue/test-utils'
import CellSwipe from '../cell-swipe'
import CellSwipeButtonComponent from '../component-mocks/cell-swipe-button'
import { horizontalDrag } from '../utils'

describe('cell-swipe', () => {
  let wrapper

  const getRightBtnsWidth = () => wrapper.vm.$refs.rightBtns.clientWidth

  beforeEach(() => {
    // to MOCK the clientWidth properfy
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', {
      value: 20,
      writable: true,
    })
  })

  afterEach(() => {
    wrapper && wrapper.destroy()

    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', {
      value: 0,
      writable: true,
    })
  })

  test('create', () => {
    wrapper = shallowMount(CellSwipe, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-cell-swipe')
    expect(wrapper.classes()).toContain('weui-cell')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('drag to left and show the buttons', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, -getRightBtnsWidth())

    expect(wrapper.vm.offset).toBe(-getRightBtnsWidth())
  })

  test('drag to left with a small distance', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, -10)

    expect(wrapper.vm.offset).toBe(0)
  })

  test('drag to left with a distance out of range', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, -(getRightBtnsWidth() + 20))

    expect(wrapper.vm.offset).toBe(-getRightBtnsWidth())
  })

  test('drag to right and close right buttons', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -getRightBtnsWidth(),
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, getRightBtnsWidth())

    expect(wrapper.vm.offset).toBe(0)
  })

  test('drag to right with a small distance', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -getRightBtnsWidth(),
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, 10)

    expect(wrapper.vm.offset).toBe(-getRightBtnsWidth())
  })

  test('drag to right with a distance out of range', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -getRightBtnsWidth(),
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, getRightBtnsWidth() + 10)

    expect(wrapper.vm.offset).toBe(0)
  })

  test('click outside', () => {
    const wrapper = mount(CellSwipe, {
      attachToDocument: true,
      data: function () {
        return {
          offset: 10,
        }
      },
    })

    wrapper.vm.onClickOutside()

    expect(wrapper.vm.offset).toBe(0)
  })
})
