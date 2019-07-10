import { shallowMount } from '@vue/test-utils'
import Radio from '../'

const testOptions = [
  'option1',
  'option2',
  'option3',
]

describe('radio', () => {
  test('create', () => {
    let wrapper = shallowMount(Radio, {
      propsData: {
        options: testOptions,
      },
    })

    // expect(wrapper.name()).toBe('w-radio')
    expect(wrapper.contains('.weui-cells_radio')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()

    // create with 'title'
    wrapper = shallowMount(Radio, {
      propsData: {
        title: 'test title',
        options: testOptions,
      },
    })

    expect(wrapper.contains('.weui-cells__title')).toBeTruthy()
    expect(wrapper.find('.weui-cells__title').text()).toBe('test title')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('options', () => {
    const wrapper = shallowMount(Radio, {
      propsData: {
        value: 'value2',
        options: testOptions,
      },
    })

    expect(wrapper.findAll('.weui-check__label')).toHaveLength(3)

    expect(wrapper.findAll('.weui-cell__bd p').at(0).text()).toBe('option1')
    expect(wrapper.findAll('.weui-cell__bd p').at(1).text()).toBe('option2')
    expect(wrapper.findAll('.weui-cell__bd p').at(2).text()).toBe('option3')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('click an option', () => {
    const wrapper = shallowMount(Radio, {
      propsData: {
        options: testOptions,
      },
    })

    wrapper.findAll('.weui-cell__bd p').at(2).trigger('click')

    expect(wrapper.vm.internalValue).toEqual('option3')
  })

  test('test disabled option', () => {
    const wrapper = shallowMount(Radio, {
      propsData: {
        options: [
          'option1',
          'option2',
          {
            label: 'option3',
            disabled: true,
          },
        ],
        value: 'option2',
      },
    })

    // click 'option3', but it is DISABLED
    wrapper.findAll('.weui-cell__bd p').at(2).trigger('click')

    // the value should not change
    expect(wrapper.vm.internalValue).toEqual('option2')
  })

  test('watch currentValue', () => {
    const wrapper = shallowMount(Radio, {
      propsData: {
        options: testOptions,
      },
    })

    wrapper.setData({
      internalValue: 'option2',
    })

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
  })

  test('watch value', () => {
    const wrapper = shallowMount(Radio, {
      propsData: {
        options: testOptions,
      },
    })

    wrapper.setProps({
      value: 'option3',
    })

    expect(wrapper.vm.internalValue).toBe('option3')
  })
})
