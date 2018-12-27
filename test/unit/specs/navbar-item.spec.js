import { shallowMount, mount } from '@vue/test-utils'
import Navbar from '@/components/navbar'
import NavbarItem from '@/components/navbar-item'

describe('navbar-item', () => {
  let parentWrapper
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
    parentWrapper && parentWrapper.destroy()
  })

  test('create', () => {
    let wrapper = shallowMount(NavbarItem, {
      parentComponent: Navbar
    })

    expect(wrapper.name()).toBe('wv-navbar-item')
  })

  test('comput isSelected', () => {
    let wrapper = shallowMount(NavbarItem, {
      parentComponent: Navbar
    })

    const isSelected = wrapper.vm.id === wrapper.vm.$parent.value

    expect(wrapper.vm.isSelected).toBe(isSelected)
  })

  test('comput style', () => {
    let wrapper = shallowMount(NavbarItem, {
      parentComponent: Navbar
    })

    const computedStyle = {
      borderWidth: wrapper.vm.$parent.lineWidth + 'px',
      borderColor: wrapper.vm.$parent.activeColor,
      color: wrapper.vm.isSelected ? wrapper.vm.$parent.activeColor : wrapper.vm.$parent.color
    }

    expect(wrapper.vm.style).toEqual(computedStyle)
  })

  test('click', () => {
    parentWrapper = mount(Navbar, {
      propsData: {
        animate: true
      }
    })

    let wrapper = shallowMount(NavbarItem, {
      propsData: {},
      parent: parentWrapper.vm
    })

    const emitSpy = jest.spyOn(wrapper.vm.$parent, '$emit')

    wrapper.trigger('click')

    expect(emitSpy).toHaveBeenCalled()
    expect(emitSpy).toHaveBeenCalledWith('input', wrapper.vm.id)
  })

  test('disabled', () => {
    parentWrapper = mount(Navbar, {
      propsData: {
        animate: true
      }
    })

    let wrapper = shallowMount(NavbarItem, {
      propsData: {
        disabled: true
      },
      parent: parentWrapper.vm
    })

    // should has disabled class
    expect(wrapper.classes()).toContain('disabled')

    const emitSpy = jest.spyOn(wrapper.vm.$parent, '$emit')

    wrapper.trigger('click')

    expect(emitSpy).not.toHaveBeenCalled()
  })
})
