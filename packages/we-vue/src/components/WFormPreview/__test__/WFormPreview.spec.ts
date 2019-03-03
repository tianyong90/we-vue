import { shallowMount } from '@vue/test-utils'
import FormPreview from '../WFormPreview'

describe('preview', () => {
  test('create', () => {
    const wrapper = shallowMount(FormPreview, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('w-form-preview')
    expect(wrapper.classes()).toContain('weui-form-preview')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render title and value', () => {
    const wrapper = shallowMount(FormPreview, {
      propsData: {
        title: 'test-title',
        value: 'test-value',
      },
    })

    expect(wrapper.find('label.weui-form-preview__label').text()).toBe('test-title')
    expect(wrapper.find('em.weui-form-preview__value').text()).toBe('test-value')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render dataItems', () => {
    const wrapper = shallowMount(FormPreview, {
      propsData: {
        dataItems: [
          {
            label: 'label1',
            value: 'value1',
          },
          {
            label: 'label2',
            value: 'value2',
          },
          {
            label: 'label3',
            value: 'value3',
          },
        ],
      },
    })

    expect(wrapper.findAll('.weui-form-preview__item')).toHaveLength(3)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('test buttons', () => {
    const actionSpy = jest.fn()

    const wrapper = shallowMount(FormPreview, {
      propsData: {
        buttons: [
          {
            text: 'OK',
            action: actionSpy,
          },
          {
            text: 'CANCEL',
          },
        ],
      },
    })

    expect(wrapper.findAll('.weui-form-preview__btn')).toHaveLength(2)

    expect(wrapper.html()).toMatchSnapshot()

    // click the 'OK' button
    wrapper.findAll('.weui-form-preview__btn').at(0).trigger('click')
    expect(actionSpy).toHaveBeenCalled()
  })
})
