import { shallow, mount } from '@vue/test-utils'
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
    parentWrapper = mount(Navbar, {
      propsData: {
        animate: true
      }
    })

    let wrapper = shallow(NavbarItem, {
      parent: parentWrapper.vm
    })

    expect(wrapper.name()).toBe('wv-navbar-item')
  })

  test('comput isSelected', () => {
    parentWrapper = mount(Navbar, {
      propsData: {}
    })

    let wrapper = shallow(NavbarItem, {
      parent: parentWrapper.vm
    })

    const isSelected = wrapper.vm.id === wrapper.vm.$parent.value

    expect(wrapper.vm.isSelected).toBe(isSelected)
  })

  test('comput style', () => {
    parentWrapper = mount(Navbar, {
      propsData: {}
    })

    let wrapper = shallow(NavbarItem, {
      parent: parentWrapper.vm
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

    let wrapper = shallow(NavbarItem, {
      propsData: {},
      parent: parentWrapper.vm
    })

    const emitSpy = sinon.spy(wrapper.vm.$parent, '$emit')

    wrapper.trigger('click')

    expect(emitSpy.mock.calls.length).toBeTruthy()
    expect(emitSpy.calledWith('input', wrapper.vm.id)).toBeTruthy()
  })

  test('disabled', () => {
    parentWrapper = mount(Navbar, {
      propsData: {
        animate: true
      }
    })

    let wrapper = shallow(NavbarItem, {
      propsData: {
        disabled: true
      },
      parent: parentWrapper.vm
    })

    // should has disabled class
    expect(wrapper.classes()).toContain('disabled')

    const emitSpy = sinon.spy(wrapper.vm.$parent, '$emit')

    wrapper.trigger('click')

    expect(emitSpy.mock.calls.length).toBeFalsy()
  })
})
