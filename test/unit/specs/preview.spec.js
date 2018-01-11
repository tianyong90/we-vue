import { shallow } from '@vue/test-utils'
import Preview from '@/components/preview'

describe('preview', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Preview, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-preview')
    expect(wrapper.classes()).toContain('weui-form-preview')
  })

  it('render title and value', () => {
    wrapper = shallow(Preview, {
      propsData: {
        title: 'test-title',
        value: 'test-value'
      }
    })

    expect(wrapper.find('label.weui-form-preview__label').text()).toBe('test-title')
    expect(wrapper.find('em.weui-form-preview__value').text()).toBe('test-value')
  })
})
