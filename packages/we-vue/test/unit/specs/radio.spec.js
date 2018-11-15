import { shallowMount } from '@vue/test-utils'
import Radio from '@/components/radio'

const testOptions = [
  'option1',
  'option2',
  'option3'
]

describe('radio', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Radio, {
      propsData: {
        options: testOptions
      }
    })

    // expect(wrapper.name()).toBe('wv-radio')
    expect(wrapper.contains('.weui-cells_radio')).toBeTruthy()

    // create with 'title'
    wrapper = shallowMount(Radio, {
      propsData: {
        title: 'test title',
        options: testOptions
      }
    })

    expect(wrapper.contains('.weui-cells__title')).toBeTruthy()
    expect(wrapper.find('.weui-cells__title').text()).toBe('test title')
  })

  test('options', () => {
    wrapper = shallowMount(Radio, {
      propsData: {
        value: 'value2',
        options: testOptions
      }
    })

    expect(wrapper.findAll('.weui-check__label').length).toBe(3)

    expect(wrapper.findAll('.weui-cell__bd p').at(0).text()).toBe('option1')
    expect(wrapper.findAll('.weui-cell__bd p').at(1).text()).toBe('option2')
    expect(wrapper.findAll('.weui-cell__bd p').at(2).text()).toBe('option3')

    expect(wrapper.findAll('input').at(0).attributes().value).toBe('option1')
    expect(wrapper.findAll('input').at(1).attributes().value).toBe('option2')
    expect(wrapper.findAll('input').at(2).attributes().value).toBe('option3')
  })

  test('watch currentValue', () => {
    wrapper = shallowMount(Radio, {
      propsData: {
        options: testOptions
      }
    })

    wrapper.setData({
      currentValue: 'option2'
    })

    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
  })

  test('watch value', () => {
    wrapper = shallowMount(Radio, {
      propsData: {
        options: testOptions
      }
    })

    wrapper.setProps({
      value: 'option3'
    })

    expect(wrapper.vm.currentValue).toBe('option3')
  })
})
