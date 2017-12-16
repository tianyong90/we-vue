import { shallow, mount } from 'vue-test-utils'
import Navbar from '@/components/navbar'
import NavbarItem from '@/components/navbar-item'
import sinon from 'sinon'

describe('navbar-item', () => {
  let parentWrapper
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
    parentWrapper && parentWrapper.destroy()
  })

  it('create', () => {
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

  it('comput isSelected', () => {
    parentWrapper = mount(Navbar, {
      propsData: {}
    })

    let wrapper = shallow(NavbarItem, {
      parent: parentWrapper.vm
    })

    const isSelected = wrapper.vm.id === wrapper.vm.$parent.value

    expect(wrapper.vm.isSelected).toBe(isSelected)
  })

  it('comput style', () => {
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

  it('click', () => {
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

    expect(emitSpy.called).toBeTruthy()
    expect(emitSpy.calledWith('input', wrapper.vm.id)).toBeTruthy()
  })

  it('disabled', () => {
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

    expect(emitSpy.called).toBeFalsy()
  })
})
