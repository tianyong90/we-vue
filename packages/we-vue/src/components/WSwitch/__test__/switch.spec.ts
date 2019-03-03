import { mount } from '@vue/test-utils'
import Switch from '../switch'
import { horizontalDrag } from '@/test/unit/utils'

const THUMB_STROKE = 20

describe('switch', () => {
  test('create', () => {
    const wrapper = mount(Switch, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-switch')
    expect(wrapper.contains('.wv-switch')).toBeTruthy()

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('is-in-cell', () => {
    let wrapper = mount(Switch, {
      propsData: {
        isInCell: true,
      },
    })

    expect(wrapper.classes()).toContain('weui-cell')

    expect(wrapper.html()).toMatchSnapshot()

    wrapper = mount(Switch, {
      propsData: {
        isInCell: false,
      },
    })

    expect(wrapper.classes()).not.toContain('weui-cell')
    expect(wrapper.classes()).toContain('wv-switch')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('click', () => {
    let wrapper = mount(Switch, {
      propsData: {
        value: true,
      },
    })

    // first click
    wrapper.find('.wv-switch').trigger('click')
    expect(wrapper.vm.isActive).toBe(false)

    // second click
    wrapper.find('.wv-switch').trigger('click')
    expect(wrapper.vm.isActive).toBe(true)

    // click a disabled switch
    wrapper = mount(Switch, {
      propsData: {
        disabled: true,
        value: true,
      },
    })

    wrapper.find('.wv-switch').trigger('click')

    expect(wrapper.vm.isActive).toBe(true)
  })

  test('drag the thumb', () => {
    const wrapper = mount(Switch, {
      propsData: {
        value: false,
        disabled: true,
      },
    })

    // the switch can not drag when it's disabled
    horizontalDrag(wrapper.find('.thumb'), 0, THUMB_STROKE)
    expect(wrapper.vm.isActive).toBe(false)

    // enable the switch
    wrapper.setProps({
      disabled: false,
    })

    // drag to right (distance <= THUMB_STROKE / 2), the value should not change
    horizontalDrag(wrapper.find('.thumb'), 0, THUMB_STROKE / 2)
    expect(wrapper.vm.isActive).toBe(false)

    // drag to right (distance >= THUMB_STROKE / 2), the value should change
    horizontalDrag(wrapper.find('.thumb'), 0, THUMB_STROKE / 2 + 5)
    expect(wrapper.vm.isActive).toBe(true)

    // drag to left (distance <= THUMB_STROKE / 2), the value should not change
    horizontalDrag(wrapper.find('.thumb'), 0, -(THUMB_STROKE / 2))
    expect(wrapper.vm.isActive).toBe(true)

    // drag to left (distance >= THUMB_STROKE / 2), the value should change
    horizontalDrag(wrapper.find('.thumb'), 0, -(THUMB_STROKE / 2 + 5))
    expect(wrapper.vm.isActive).toBe(false)

    // drag to right with a distance bigger than THUMB_STROKE
    horizontalDrag(wrapper.find('.thumb'), 0, THUMB_STROKE + 5)
    expect(wrapper.vm.isActive).toBe(true)

    // drag to left with a distance bigger than THUMB_STROKE
    horizontalDrag(wrapper.find('.thumb'), 0, -(THUMB_STROKE + 5))
    expect(wrapper.vm.isActive).toBe(false)
  })

  test('watch isActive', () => {
    const wrapper = mount(Switch, {
      attachToDocument: true,
      data: function () {
        return {
          isActive: false,
        }
      },
    })

    wrapper.setData({
      isActive: true,
    })

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.vm.offset).toBe(THUMB_STROKE)

    wrapper.setData({
      isActive: false,
    })
    expect(wrapper.vm.offset).toBe(0)
  })

  test('watch value', () => {
    const wrapper = mount(Switch, {
      propsData: {
        value: false,
      },
    })

    wrapper.setProps({
      value: false,
    })

    expect(wrapper.vm.isActive).toBe(false)

    wrapper.setProps({
      value: true,
    })

    expect(wrapper.vm.isActive).toBe(true)
  })
})
