import { shallow, mount } from 'vue-test-utils'
import CellSwipe from '@/components/cell-swipe'
import CellSwipeButtonComponent from '../components/cell-swipe-button'
import { dragHelper } from '../utils'
import sinon from 'sinon'

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
    expect(wrapper.classes()).toContain('weui-cell')
  })

  it('drag to left and show the buttons', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    const rightWidth = wrapper.vm.$refs.rightBtns.clientWidth

    dragHelper(wrapper.find({ref: 'cellBd'}), -rightWidth, 0)

    expect(wrapper.vm.offset).toBe(-rightWidth)
  })

  it('drag to left with a small distance', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    dragHelper(wrapper.find({ref: 'cellBd'}), -10, 0)

    expect(wrapper.vm.offset).toBe(0)
  })

  it('drag to left with a distance out of range', () => {
    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    const rightWidth = wrapper.vm.$refs.rightBtns.clientWidth

    dragHelper(wrapper.find({ref: 'cellBd'}), -(rightWidth + 20), 0)

    expect(wrapper.vm.offset).toBe(-rightWidth)
  })

  it('drag to right and close right buttons', () => {
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

    dragHelper(wrapper.find({ref: 'cellBd'}), rightWidth, 0)

    expect(wrapper.vm.offset).toBe(0)
  })

  it('drag to right with a small distance', () => {
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

    dragHelper(wrapper.find({ref: 'cellBd'}), 10, 0)

    expect(wrapper.vm.offset).toBe(-rightWidth)
  })

  it('drag to right with a distance out of range', () => {
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

    dragHelper(wrapper.find({ref: 'cellBd'}), rightWidth + 10, 0)

    expect(wrapper.vm.offset).toBe(0)
  })

  // TODO
  it('clickoutside', () => {
    let onClickoutsideSpy = sinon.spy()

    wrapper = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      },
      methods: {
        onClickoutside: onClickoutsideSpy
      }
    })

    let wrapper2 = mount(CellSwipe, {
      attachToDocument: true,
      slots: {
        right: [CellSwipeButtonComponent, CellSwipeButtonComponent]
      }
    })

    const rightWidth = wrapper.vm.$refs.rightBtns.clientWidth

    dragHelper(wrapper.find({ref: 'cellBd'}), -rightWidth, 0)

    expect(wrapper.vm.offset).toBe(-rightWidth)

    // click at a point that outside the cell (like the body element)
    wrapper2.trigger('click')

    // expect(onClickoutsideSpy.called).toBeTruthy()
  })
})
