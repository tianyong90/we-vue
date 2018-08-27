import { shallowMount } from '@vue/test-utils'
import Cell from '@/cell'

describe('cell', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Cell, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-cell')
    expect(wrapper.classes()).toContain('weui-cell')
  })

  test('is-link', () => {
    wrapper = shallowMount(Cell, {
      propsData: {
        isLink: true
      }
    })

    expect(wrapper.classes()).toContain('weui-cell_access')
  })

  test('handle click', () => {
    const routerLinkSpy = jest.fn()
    wrapper = shallowMount(Cell, {
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
