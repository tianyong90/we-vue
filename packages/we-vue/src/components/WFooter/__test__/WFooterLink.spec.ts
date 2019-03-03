import { shallowMount } from '@vue/test-utils'
import FooterLink from '../WFooterLink'

describe('footer-link', () => {
  test('create', () => {
    const wrapper = shallowMount(FooterLink, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-footer-link')
    expect(wrapper.classes()).toContain('weui-footer__link')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('text', () => {
    const wrapper = shallowMount(FooterLink, {
      propsData: {
        text: 'test',
      },
    })

    expect(wrapper.text()).toBe('test')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('handle click', () => {
    const routeLinkSpy = jest.fn()
    const wrapper = shallowMount(FooterLink, {
      propsData: {},
      methods: {
        routeLink: routeLinkSpy,
      },
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(routeLinkSpy).toHaveBeenCalled()
  })
})
