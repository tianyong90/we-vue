import { mount, shallowMount } from '@vue/test-utils'
import Checklist from '../'

const options = [
  'value1',
  'value2',
  'value3',
]

describe('checklist', () => {
  test('create', () => {
    let wrapper = shallowMount(Checklist, {
      propsData: {
        options: options,
      },
    })

    expect(wrapper.name()).toBe('w-checklist')
    expect(wrapper.contains('.weui-cells_checkbox')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()

    // create with 'title'
    wrapper = shallowMount(Checklist, {
      propsData: {
        title: 'test title',
        options: options,
      },
    })

    expect(wrapper.contains('.weui-cells__title')).toBeTruthy()
    expect(wrapper.find('.weui-cells__title').text()).toBe('test title')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('options', () => {
    const wrapper = mount(Checklist, {
      propsData: {
        value: ['value2'],
        options: options,
      },
    })

    expect(wrapper.findAll('.weui-check__label')).toHaveLength(3)

    expect(wrapper.findAll('.weui-cell__bd p').at(0).text()).toBe('value1')
    expect(wrapper.findAll('.weui-cell__bd p').at(1).text()).toBe('value2')
    expect(wrapper.findAll('.weui-cell__bd p').at(2).text()).toBe('value3')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('max selection', () => {
    let wrapper = mount(Checklist, {
      attachToDocument: true,
      propsData: {
        max: 2,
        options: options,
      },
    })

    wrapper.setData({
      currentValue: options,
    })

    expect(wrapper.emitted().input[0]).toEqual([['value1', 'value2']])

    // create a fresh wrapper
    wrapper = shallowMount(Checklist, {
      propsData: {
        max: 1,
        options: options,
      },
    })

    wrapper.setData({
      currentValue: options,
    })

    expect(wrapper.emitted().input[0]).toEqual([['value1']])
  })

  test('click option', () => {
    const wrapper = mount(Checklist, {
      attachToDocument: true,
      propsData: {
        options: [
          'value1',
          'value2',
          {
            label: 'value3',
            disabled: true,
          },
        ],
        value: [],
      },
    })

    // click 'value1'
    wrapper.findAll('.weui-check__label').at(0).trigger('click')
    expect(wrapper.vm.currentValue).toEqual(['value1'])

    // click 'value2'
    wrapper.findAll('.weui-check__label').at(1).trigger('click')
    expect(wrapper.vm.currentValue).toEqual(['value1', 'value2'])

    // click 'value3', it is DISABLED
    wrapper.findAll('.weui-check__label').at(2).trigger('click')
    expect(wrapper.vm.currentValue).toEqual(['value1', 'value2'])
  })

  test('watch currentValue', () => {
    const wrapper = shallowMount(Checklist, {
      propsData: {
        max: 2,
        options: options,
      },
    })

    wrapper.setData({
      currentValue: ['value1'],
    })

    expect(wrapper.emitted().input[0]).toEqual([['value1']])

    wrapper.setData({
      currentValue: options,
    })

    expect(wrapper.emitted().input[1]).toEqual([['value1', 'value2']])
  })

  test('watch value', () => {
    const wrapper = shallowMount(Checklist, {
      propsData: {
        options: options,
      },
    })

    wrapper.setProps({
      value: ['new-value'],
    })

    expect(wrapper.emitted().change).toEqual([[['new-value']]])
  })
})
