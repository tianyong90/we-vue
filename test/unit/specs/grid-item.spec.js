import { shallow } from '@vue/test-utils'
import GridItem from '@/components/grid-item'

describe('grid-item', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(GridItem, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-grid-item')
    expect(wrapper.classes()).toContain('weui-grid')
  })

  test('handle click', () => {
    const routerLinkSpy = jest.fn()
    wrapper = shallow(GridItem, {
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
