import { shallow } from 'vue-test-utils'
import Navbar from '@/components/navbar'
import NavbarComponent from '../components/navbar.vue'

describe('navbar', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Navbar, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-navbar')
    expect(wrapper.hasClass('wv-navbar')).toBeTruthy()
  })

  it('fixed navbar', () => {
    wrapper = shallow(Navbar, {
      propsData: {
        fixed: true
      }
    })

    expect(wrapper.hasStyle('position', 'fixed')).toBeTruthy()
    expect(wrapper.vm.$el.style.top).toBe('0px')
    expect(wrapper.vm.$el.style.left).toBe('0px')
    expect(wrapper.vm.$el.style.right).toBe('0px')
  })

  it('render with animate', () => {
    wrapper = shallow(Navbar, {
      propsData: {
        animate: true
      }
    })

    expect(wrapper.contains('.wv-navbar-underline')).toBeTruthy()
  })

  it('render with items', () => {
    wrapper = shallow(Navbar, {
      propsData: {
        animate: true
      }
    })

    expect(wrapper.contains('.wv-navbar-underline')).toBeTruthy()
  })
})

describe('navbar with items', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(NavbarComponent, {
      propsData: {}
    })

    // expect(wrapper.vm.$children.length).toBe(3)
    // expect(wrapper.hasClass('wv-navbar')).toBeTruthy()
  })

  // it('render with animate', () => {
  //   wrapper = shallow(Navbar, {
  //     propsData: {
  //       animate: true
  //     }
  //   })
  //
  //   expect(wrapper.contains('.wv-navbar-underline')).toBeTruthy()
  // })
  //
  // it('render with items', () => {
  //   wrapper = shallow(Navbar, {
  //     propsData: {
  //       animate: true
  //     }
  //   })
  //
  //   expect(wrapper.contains('.wv-navbar-underline')).toBeTruthy()
  // })
})
