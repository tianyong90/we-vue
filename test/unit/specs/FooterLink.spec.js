import { shallow } from 'vue-test-utils'
import FooterLink from '@/components/footer/footer-link.vue'
import sinon from 'sinon'

describe('footer-link', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(FooterLink, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-footer-link')
    expect(wrapper.hasClass('weui-footer__link')).toBeTruthy()
  })

  it('text', () => {
    wrapper = shallow(FooterLink, {
      propsData: {
        text: 'test'
      }
    })

    expect(wrapper.text()).toBe('test')
  })

  it('handle click', () => {
    const routerLinkSpy = sinon.spy()
    wrapper = shallow(FooterLink, {
      propsData: {},
      methods: {
        routerLink: routerLinkSpy
      }
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(routerLinkSpy.called).toBeTruthy()
  })
})
