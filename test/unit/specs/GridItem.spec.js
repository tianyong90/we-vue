import { shallow, createLocalVue } from 'vue-test-utils'
import GridItem from '@/components/grid-item'
import VueRouter from 'vue-router'
import sinon from 'sinon'

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

  it('handle click', () => {
    const routerLinkSpy = sinon.spy()
    wrapper = shallow(GridItem, {
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
