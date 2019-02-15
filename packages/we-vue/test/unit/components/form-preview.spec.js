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
  })
})
