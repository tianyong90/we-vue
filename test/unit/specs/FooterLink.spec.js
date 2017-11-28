import { shallow, createLocalVue } from 'vue-test-utils'
import FooterLink from '@/components/footer/footer-link.vue'
import VueRouter from 'vue-router'

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

  it('to', () => {
    wrapper = shallow(FooterLink, {
      propsData: {
        to: 'test'
      }
    })

    expect(wrapper.vm.href).toBe('test')
  })

  it('use with vue-router', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)

    const routes = [
      { path: '/test', component: FooterLink }
    ]

    const router = new VueRouter({
      routes
    })

    wrapper = shallow(FooterLink, {
      propsData: {
        to: '/test'
      },
      localVue,
      router
    })

    wrapper.vm.$nextTick(() => {
      // TODO: test click
      wrapper.trigger('click')

      expect(wrapper.vm.added).toBeTruthy()
    })
  })
})
