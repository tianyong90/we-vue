import { shallowMount } from '@vue/test-utils'
import MediaBox from '../'

describe('media-box', () => {
  test('create', () => {
    let wrapper = shallowMount(MediaBox, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('w-media-box')
    expect(wrapper.html()).toMatchSnapshot()

    wrapper = shallowMount(MediaBox, {
      propsData: {
        type: 'text',
      },
    })

    expect(wrapper.name()).toBe('w-media-box')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('handle click', () => {
    const routeLinkSpy = jest.fn()
    const wrapper = shallowMount(MediaBox, {
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
