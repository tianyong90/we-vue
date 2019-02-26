import { mount, shallowMount } from '@vue/test-utils'
import Cell from '../cell'

describe('cell', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Cell, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-cell')
    expect(wrapper.classes()).toContain('weui-cell')

    expect(wrapper).toMatchSnapshot()
  })

  test('is-link', () => {
    wrapper = shallowMount(Cell, {
      propsData: {
        isLink: true,
      },
    })

    expect(wrapper.classes()).toContain('weui-cell_access')

    expect(wrapper).toMatchSnapshot()
  })

  test('handle click', () => {
    const routeLinkSpy = jest.fn()
    wrapper = mount(Cell, {
      propsData: {},
      methods: {
        routeLink: routeLinkSpy,
      },
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(routeLinkSpy).toHaveBeenCalled()

    expect(wrapper).toMatchSnapshot()
  })
})
