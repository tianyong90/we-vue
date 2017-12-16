import { shallow } from 'vue-test-utils'
import GridItem from '@/components/grid-item'
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
    expect(wrapper.classes()).toContain('weui-grid')
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
