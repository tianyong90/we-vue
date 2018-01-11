import { mount } from '@vue/test-utils'
import Swipe from '@/components/swipe'
import SwipeItem from '@/components/swipe-item'
import { horizontalDrag, verticalDrag, dragAndHoldHelper } from '../utils'
import sinon from 'sinon'
import faker from 'faker'

describe('swipe', () => {
  let wrapper
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    wrapper && wrapper.destroy()
    clock.restore()
  })

  it('create', () => {
    wrapper = mount(Swipe, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-swipe')
    expect(wrapper.classes()).toContain('wv-swipe')
  })

  it('create with single swipe-item', () => {
    wrapper = mount(Swipe, {
      attachToDocument: true,
      propsData: {
        height: 120
      },
      slots: {
        default: [SwipeItem]
      }
    })

    expect(wrapper.findAll(SwipeItem).length).toBe(1)
    expect(wrapper.vm.count).toBe(1)
  })

  it('create with swipe-items', () => {
    wrapper = mount(Swipe, {
      propsData: {
        height: 120,
        showIndicators: true
      },
      slots: {
        default: [SwipeItem, SwipeItem, SwipeItem]
      }
    })

    expect(wrapper.vm.count).toBe(3)
    expect(wrapper.vm.activeIndicator).toBe(0)
  })

  it('drag to right', () => {
    wrapper = mount(Swipe, {
      attachToDocument: true,
      propsData: {
        height: 120
      },
      slots: {
        default: [SwipeItem, SwipeItem, SwipeItem]
      }
    })

    horizontalDrag(wrapper, 0, 100)
    expect(wrapper.vm.active).toBe(-1)
    horizontalDrag(wrapper, 0, 100)
    expect(wrapper.vm.active).toBe(1)
    horizontalDrag(wrapper, 0, 100)
    expect(wrapper.vm.active).toBe(0)
  })

  it('drag to left', () => {
    wrapper = mount(Swipe, {
      attachToDocument: true,
      propsData: {
        height: 120
      },
      slots: {
        default: [SwipeItem, SwipeItem, SwipeItem]
      }
    })

    horizontalDrag(wrapper, 0, -100)
    expect(wrapper.vm.active).toBe(1)
    horizontalDrag(wrapper, 0, -100)
    expect(wrapper.vm.active).toBe(2)
    horizontalDrag(wrapper, 0, -100)
    expect(wrapper.vm.active).toBe(3)
    horizontalDrag(wrapper, 0, -100)
    expect(wrapper.vm.active).toBe(1)
  })

  it('drag single slide while noDragWhenSingle is true', () => {
    wrapper = mount(Swipe, {
      attachToDocument: true,
      propsData: {
        height: 120
      },
      slots: {
        default: [SwipeItem]
      }
    })

    const distance = faker.random.number()

    dragAndHoldHelper(wrapper, distance, 0)
    expect(wrapper.vm.offset).toBe(0)

    horizontalDrag(wrapper, 0, distance)
    expect(wrapper.vm.offset).toBe(0)
  })

  it('drag single slide while noDragWhenSingle is false', () => {
    wrapper = mount(Swipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
        noDragWhenSingle: false
      },
      slots: {
        default: [SwipeItem]
      }
    })

    const distance = faker.random.number()

    dragAndHoldHelper(wrapper, distance, 0)

    if (Math.abs(distance) > 20) {
      expect(wrapper.vm.offset).toBe(20)
    } else {
      expect(wrapper.vm.offset).toBe(distance)
    }

    // drag a single slide, the offset will return to 0 after touchend event
    horizontalDrag(wrapper, 0, distance)
    expect(wrapper.vm.offset).toBe(0)
  })

  it('change swipes', () => {
    const initializeSpy = sinon.spy()
    wrapper = mount(Swipe, {
      attachToDocument: true,
      propsData: {
        height: 120
      },
      methods: {
        initialize: initializeSpy
      }
    })

    wrapper.setData({
      swipes: []
    })

    expect(initializeSpy.called).toBeTruthy()
  })

  it('change defaultIndex', () => {
    wrapper = mount(Swipe, {
      attachToDocument: true,
      propsData: {
        height: 120
      },
      slots: {
        default: [SwipeItem, SwipeItem, SwipeItem]
      }
    })

    wrapper.setProps({
      defaultIndex: 1
    })

    expect(wrapper.vm.active).toBe(1)
  })

  it('autoplay', () => {
    wrapper = mount(Swipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
        autoplay: 3000
      },
      slots: {
        default: [SwipeItem, SwipeItem, SwipeItem]
      }
    })

    clock.tick(3030)
    expect(wrapper.vm.active).toBe(1)
    clock.tick(3030)
    expect(wrapper.vm.active).toBe(2)
    clock.tick(3030)
    expect(wrapper.vm.active).toBe(3)
    clock.tick(3030)
    expect(wrapper.vm.active).toBe(1)
  })

  it('preventScroll', () => {
    wrapper = mount(Swipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
        prevent: true
      },
      slots: {
        default: [SwipeItem, SwipeItem, SwipeItem]
      }
    })

    verticalDrag(wrapper, 0, 100)
  })
})
