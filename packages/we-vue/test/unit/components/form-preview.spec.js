import { shallowMount } from '@vue/test-utils'
import FormPreview from '@/components/form-preview'

describe('preview', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(FormPreview, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-form-preview')
    expect(wrapper.classes()).toContain('weui-form-preview')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render title and value', () => {
    wrapper = shallowMount(FormPreview, {
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
    wrapper = shallowMount(FormPreview, {
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

    expect(wrapper.findAll('.weui-form-preview__item').length).toBe(3)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('test buttons', () => {
    const actionSpy = jest.fn()

    wrapper = shallowMount(FormPreview, {
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

    expect(wrapper.findAll('.weui-form-preview__btn').length).toBe(2)

    expect(wrapper.html()).toMatchSnapshot()

    // click the 'OK' button
    wrapper.findAll('.weui-form-preview__btn').at(0).trigger('click')
    expect(actionSpy).toBeCalled()
  })
})
