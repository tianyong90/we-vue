import { shallow } from 'vue-test-utils'
import TabbarItem from '@/components/tabbar-item'
import sinon from 'sinon'

describe('tabbar-item', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(TabbarItem, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-tabbar-item')
    expect(wrapper.classes()).toContain('weui-tabbar__item')
  })

  it('text', () => {
    wrapper = shallow(TabbarItem, {
      slots: {
        default: 'test'
      }
    })

    expect(wrapper.contains('.weui-tabbar__label')).toBeTruthy()
    // TODO:
    // expect(wrapper.find('p.weui-tabbar__label').text()).toBe('test')
  })

  it('isOn', () => {
    wrapper = shallow(TabbarItem, {
      propsData: {
        isOn: true
      }
    })

    expect(wrapper.classes()).toContain('weui-bar__item_on')
  })

  it('handle click', () => {
    const routerLinkSpy = sinon.spy()
    wrapper = shallow(TabbarItem, {
      propsData: {},
      methods: {
        routerLink: routerLinkSpy
      }
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(routerLinkSpy.called).toBeTruthy()
  })
})
