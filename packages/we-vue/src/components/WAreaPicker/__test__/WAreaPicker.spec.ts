import { mount } from '@vue/test-utils'
import WAreaPicker from '../WAreaPicker'

import areaList from './area'

describe('area picker', () => {
  test('create', () => {
    const wrapper = mount(WAreaPicker)

    expect(wrapper.name()).toBe('w-area-picker')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render with area list', () => {
    const wrapper = mount(WAreaPicker, {
      propsData: {
        areaList: areaList,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('watch value', async () => {
    const wrapper = mount(WAreaPicker, {
      propsData: {
        areaList: areaList,
      },
    })

    const spy = jest.spyOn(wrapper.vm, 'setOptions')

    await wrapper.vm.$nextTick()

    wrapper.setProps({
      value: '110000',
    })

    expect(spy).toHaveBeenCalled()

    expect(wrapper.vm.internalValue).toBe('110000')
  })

  test('watch areaList', async () => {
    const wrapper = mount(WAreaPicker, {
      propsData: {},
    })

    await wrapper.vm.$nextTick()

    const spy = jest.spyOn(wrapper.vm, 'setOptions')

    wrapper.setProps({
      areaList: areaList,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('reset method', async () => {
    const wrapper = mount(WAreaPicker, {
      propsData: {
        areaList: areaList,
      },
    })

    await wrapper.vm.$nextTick()

    const spy = jest.spyOn(wrapper.vm, 'setOptions')

    wrapper.vm.reset()

    expect(spy).toHaveBeenCalled()
  })

  test('drag columns', () => {
    const wrapper = mount(WAreaPicker, {
      propsData: {
        areaList: areaList,
        value: '110000',
      },
    })

    // FIXME
    console.log(wrapper.vm.getArea())
  })

  test('onChange method', () => {
    const wrapper = mount(WAreaPicker, {
      propsData: {
        areaList: areaList,
      },
    })

    let values = [
      {
        name: 'foo',
        code: 'foo',
      },
      {
        name: 'bar',
        code: 'bar',
      },
      {
        name: 'baz',
        code: 'baz',
      },
    ]

    wrapper.vm.onChange(wrapper.vm.$refs.picker, values, 0)

    expect(wrapper.vm.internalValue).toBe('foo')
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  test('click cancel button', () => {
    const wrapper = mount(WAreaPicker, {
      propsData: {
        areaList: areaList,
      },
    })

    wrapper.findAll('.weui-picker__action').at(0).trigger('click')

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  // TODO
  test('click confirm button', () => {
    const wrapper = mount(WAreaPicker, {
      propsData: {
        areaList: areaList,
      },
    })

    wrapper.findAll('.weui-picker__action').at(1).trigger('click')

    expect(wrapper.vm.isActive).toBe(false)
    // expect(wrapper.emitted('cancel')).toBeTruthy()
  })
})
