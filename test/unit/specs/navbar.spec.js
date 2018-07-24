import { shallowMount } from '@vue/test-utils'
import Navbar from '@/components/navbar'
import NavbarItem from '@/components/navbar-item'

describe('navbar', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Navbar, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-navbar')
    expect(wrapper.classes()).toContain('wv-navbar')
  })

  test('create with 3 navbar items', () => {
    wrapper = shallowMount(Navbar, {
      slots: {
        default: [NavbarItem, NavbarItem, NavbarItem]
      }
    })

    expect(wrapper.findAll(NavbarItem).length).toBe(3)
  })

  test('fixed navbar', () => {
    wrapper = shallowMount(Navbar, {
      propsData: {
        fixed: true
      }
    })

    expect(wrapper.element.style.position).toBe('fixed')
    expect(wrapper.vm.$el.style.top).toBe('0px')
    expect(wrapper.vm.$el.style.left).toBe('0px')
    expect(wrapper.vm.$el.style.right).toBe('0px')
  })

  test('render with animate', () => {
    wrapper = shallowMount(Navbar, {
      propsData: {
        animate: true
      }
    })

    expect(wrapper.contains('.wv-navbar-underline')).toBeTruthy()
  })

  test('watch value', () => {
    wrapper = shallowMount(Navbar, {
      propsData: {}
    })

    const updateCurrentIndexSpy = jest.spyOn(wrapper.vm, 'updateCurrentIndex')

    wrapper.setProps({
      value: '1'
    })
    expect(wrapper.emitted().change).toBeTruthy()
    expect(updateCurrentIndexSpy).toHaveBeenCalled()
  })
})
