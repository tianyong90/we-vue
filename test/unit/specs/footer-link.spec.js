import { shallow } from '@vue/test-utils'
import FooterLink from '@/components/footer/footer-link.vue'

describe('footer-link', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(FooterLink, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-footer-link')
    expect(wrapper.classes()).toContain('weui-footer__link')
  })

  test('text', () => {
    wrapper = shallow(FooterLink, {
      propsData: {
        text: 'test'
      }
    })

    expect(wrapper.text()).toBe('test')
  })

  test('handle click', () => {
    const routerLinkSpy = jest.fn()
    wrapper = shallow(FooterLink, {
      propsData: {},
      methods: {
        routerLink: routerLinkSpy
      }
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(routerLinkSpy.mock.calls.length).toBeTruthy()
  })
})
