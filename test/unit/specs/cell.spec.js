import { shallow } from 'vue-test-utils'
import Cell from '@/components/cell'
import sinon from 'sinon'

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

  it('handle click', () => {
    const routerLinkSpy = sinon.spy()
    wrapper = shallow(Cell, {
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
