import { mount } from '@vue/test-utils'
import WAreaPicker from '../'

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

  test('getValues', async () => {
    const wrapper = mount(WAreaPicker, {
      propsData: {
        areaList: areaList,
        value: '110000',
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.getArea()).toEqual({
      code: '110000',
      country: '',
      city: '北京市',
      county: '东城区',
      province: '北京市',
    })
  })

  test('onChange method', () => {
    const wrapper = mount(WAreaPicker, {
      propsData: {
        areaList: areaList,
      },
    })

    const values = [
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

  test('click confirm button', () => {
    const wrapper = mount(WAreaPicker, {
      propsData: {
        areaList: areaList,
        value: '110000',
      },
    })

    wrapper.findAll('.weui-picker__action').at(1).trigger('click')

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })
})
