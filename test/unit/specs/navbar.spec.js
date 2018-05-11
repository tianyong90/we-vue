import { shallowMount } from '@vue/test-utils'
import Navbar from '@/components/navbar'

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
