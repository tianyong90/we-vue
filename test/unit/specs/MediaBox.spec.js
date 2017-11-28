import { shallow, createLocalVue } from 'vue-test-utils'
import VueRouter from 'vue-router'
import MediaBox from '@/components/media-box'

describe('media-box', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(MediaBox, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-media-box')
    expect(wrapper.hasClass('weui-media-box')).toBeTruthy()
  })

  it('to', () => {
    wrapper = shallow(MediaBox, {
      propsData: {
        to: '/test'
      }
    })

    expect(wrapper.vm.href).toBe('/test')
  })

  it('use with vue-router', () => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)

    const routes = [
      { path: '/test', component: MediaBox }
    ]

    const router = new VueRouter({
      routes
    })

    wrapper = shallow(MediaBox, {
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
