import { shallow, createLocalVue } from 'vue-test-utils'
import VueRouter from 'vue-router'
import Cell from '@/components/cell'

describe('cell', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Cell, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-cell')
    expect(wrapper.hasClass('weui-cell')).toBeTruthy()
  })

  it('is-link', () => {
    wrapper = shallow(Cell, {
      propsData: {
        isLink: true
      }
    })

    expect(wrapper.hasClass('weui-cell_access')).toBeTruthy()
  })

  it('to', () => {
    wrapper = shallow(Cell, {
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
      { path: '/test', component: Cell }
    ]

    const router = new VueRouter({
      routes
    })

    wrapper = shallow(Cell, {
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
