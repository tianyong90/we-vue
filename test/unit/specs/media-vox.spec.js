import { shallow } from '@vue/test-utils'
import MediaBox from '@/components/media-box'
import sinon from 'sinon'

describe('media-box', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(MediaBox, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-media-box')
    expect(wrapper.classes()).toContain('weui-media-box')
  })

  it('handle click', () => {
    const routerLinkSpy = sinon.spy()
    wrapper = shallow(MediaBox, {
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
