import { shallow } from '@vue/test-utils'
import Footer from '@/components/footer'

describe('footer', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(Footer, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-footer')
    expect(wrapper.classes()).toContain('weui-footer')
  })

  test('text', () => {
    wrapper = shallow(Footer, {
      propsData: {
        text: 'test'
      }
    })

    expect(wrapper.contains('p.weui-footer__text')).toBeTruthy()
    expect(wrapper.find('p.weui-footer__text').text()).toBe('test')
  })
})
