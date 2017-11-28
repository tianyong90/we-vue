import { shallow } from 'vue-test-utils'
import Spinner from '@/components/spinner'

describe('spinner', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Spinner, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-spinner')

    // default type
    expect(wrapper.hasClass('weui-loading')).toBeTruthy()

    wrapper.setProps({
      type: 'snake'
    })
    expect(wrapper.hasClass('wv-spinner')).toBeTruthy()
  })

  it('size', () => {
    wrapper = shallow(Spinner, {
      propsData: {}
    })

    // default size should be 17
    expect(wrapper.vm.size).toBe(17)

    wrapper.setProps({
      size: 20
    })
    expect(wrapper.vm.size).toBe(20)
  })

  it('color', () => {
    wrapper = shallow(Spinner, {
      propsData: {}
    })

    // default color should be '#aaa'
    expect(wrapper.vm.color).toBe('#aaa')

    wrapper.setProps({
      color: 'red'
    })
    expect(wrapper.vm.color).toBe('red')
  })

  it('icon font class should be computed correctly', () => {
    wrapper = shallow(Spinner, {
      propsData: {}
    })

    // default fontClassName should be ''
    expect(wrapper.vm.fontClassName).toBe('')

    wrapper.setProps({
      type: 'snake'
    })
    expect(wrapper.vm.fontClassName).toBe('icon-spinner-1')

    wrapper.setProps({
      type: 'double-snake'
    })
    expect(wrapper.vm.fontClassName).toBe('icon-spinner9')

    wrapper.setProps({
      type: 'bar-circle'
    })
    expect(wrapper.vm.fontClassName).toBe('icon-spinner2')

    wrapper.setProps({
      type: 'dot-circle'
    })
    expect(wrapper.vm.fontClassName).toBe('icon-spinner1')
  })
})
