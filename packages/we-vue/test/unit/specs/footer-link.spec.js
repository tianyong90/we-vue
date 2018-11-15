import { shallowMount } from '@vue/test-utils'
import FooterLink from '@/footer/footer-link.vue'

describe('footer-link', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(FooterLink, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-footer-link')
    expect(wrapper.classes()).toContain('weui-footer__link')
  })

  test('text', () => {
    wrapper = shallowMount(FooterLink, {
      propsData: {
        text: 'test'
      }
    })

    expect(wrapper.text()).toBe('test')
  })

  test('handle click', () => {
    const routerLinkSpy = jest.fn()
    wrapper = shallowMount(FooterLink, {
      propsData: {},
      methods: {
        routerLink: routerLinkSpy
      }
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(routerLinkSpy).toHaveBeenCalled()
  })
})
