import { shallowMount } from '@vue/test-utils'
import GridItem from '../grid-item'

describe('grid-item', () => {
  test('create', () => {
    const wrapper = shallowMount(GridItem, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-grid-item')
    expect(wrapper.classes()).toContain('weui-grid')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('handle click', () => {
    const routeLinkSpy = jest.fn()
    const wrapper = shallowMount(GridItem, {
      propsData: {},
      methods: {
        routeLink: routeLinkSpy,
      },
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(routeLinkSpy).toHaveBeenCalled()
  })
})
