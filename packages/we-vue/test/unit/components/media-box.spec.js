import { shallowMount } from '@vue/test-utils'
import MediaBox from '@/components/media-box'

describe('media-box', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(MediaBox, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-media-box')
    expect(wrapper.classes()).toContain('weui-media-box')
  })

  test('handle click', () => {
    const routeLinkSpy = jest.fn()
    wrapper = shallowMount(MediaBox, {
      propsData: {},
      methods: {
        routeLink: routeLinkSpy,
      },
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(routeLinkSpy).toHaveBeenCalled()
  })
})
