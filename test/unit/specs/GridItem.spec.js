import { shallow, createLocalVue } from 'vue-test-utils'
import GridItem from '@/components/grid-item'
import VueRouter from 'vue-router'

describe('grid-item', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(GridItem, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-grid-item')
    expect(wrapper.hasClass('weui-grid')).toBeTruthy()
  })

  it('to', () => {
    wrapper = shallow(GridItem, {
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
      { path: '/test', component: GridItem }
    ]

    const router = new VueRouter({
      routes
    })

    wrapper = shallow(GridItem, {
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
