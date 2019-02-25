import { shallowMount } from '@vue/test-utils'
import GridItem from '@/components/grid-item'

describe('grid-item', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(GridItem, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-grid-item')
    expect(wrapper.classes()).toContain('weui-grid')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('handle click', () => {
    const routeLinkSpy = jest.fn()
    wrapper = shallowMount(GridItem, {
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
