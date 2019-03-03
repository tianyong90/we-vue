import Vue, { CreateElement, VNode } from 'vue'
import { shallowMount, mount, Wrapper } from '@vue/test-utils'
import CellSwipe from '../WCellSwipe'
import WCellSwipeButton from '../../WCellSwipeButton'
import { horizontalDrag } from '@/test/unit/utils'

describe('cell-swipe', () => {
  const CellSwipeButtonComponent = Vue.extend({
    render (h: CreateElement): VNode {
      return h(WCellSwipeButton, 'test')
    },
  })

  const getRightBtnsWidth = (wrapper: Wrapper<Vue>) => {
    return (wrapper.vm.$refs.rightBtns as HTMLElement).clientWidth
  }

  beforeEach(() => {
    // to MOCK the clientWidth properfy
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', {
      value: 20,
      writable: true,
    })
  })

  afterEach(() => {
    Object.defineProperty(HTMLDivElement.prototype, 'clientWidth', {
      value: 0,
      writable: true,
    })
  })

  test('create', () => {
    const wrapper = shallowMount(CellSwipe, {
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    expect(wrapper.name()).toBe('w-cell-swipe')
    expect(wrapper.classes()).toContain('weui-cell')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('drag to left and show the buttons', () => {
    const wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, -getRightBtnsWidth(wrapper))

    expect(wrapper.vm.offset).toBe(-getRightBtnsWidth(wrapper))
  })

  test('drag to left with a small distance', () => {
    const wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, -10)

    expect(wrapper.vm.offset).toBe(0)
  })

  test('drag to left with a distance out of range', () => {
    const wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, -(getRightBtnsWidth(wrapper) + 20))

    expect(wrapper.vm.offset).toBe(-getRightBtnsWidth(wrapper))
  })

  test('drag to right and close right buttons', () => {
    const wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -getRightBtnsWidth(wrapper),
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, getRightBtnsWidth(wrapper))

    expect(wrapper.vm.offset).toBe(0)
  })

  test('drag to right with a small distance', () => {
    const wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -getRightBtnsWidth(wrapper),
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, 10)

    expect(wrapper.vm.offset).toBe(-getRightBtnsWidth(wrapper))
  })

  test('drag to right with a distance out of range', () => {
    const wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent],
      },
    })

    // set offset to show the right buttons before drag
    wrapper.setData({
      offset: -getRightBtnsWidth(wrapper),
    })

    horizontalDrag(wrapper.find({ ref: 'cellBd' }), 0, getRightBtnsWidth(wrapper) + 10)

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
