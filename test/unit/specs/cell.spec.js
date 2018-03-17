import { shallow } from '@vue/test-utils'
import Cell from '@/components/cell'

describe('cell', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(Cell, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-cell')
    expect(wrapper.classes()).toContain('weui-cell')
  })

  test('is-link', () => {
    wrapper = shallow(Cell, {
      propsData: {
        isLink: true
      }
    })

    expect(wrapper.classes()).toContain('weui-cell_access')
  })

  test('handle click', () => {
    const routerLinkSpy = jest.fn()
    wrapper = shallow(Cell, {
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
