import { mount, shallowMount } from '@vue/test-utils'
import Footer from '../footer'

describe('footer', () => {
  test('create', () => {
    const wrapper = shallowMount(Footer, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-footer')
    expect(wrapper.classes()).toContain('weui-footer')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('text', () => {
    const wrapper = shallowMount(Footer, {
      propsData: {
        text: 'test',
      },
    })

    expect(wrapper.contains('p.weui-footer__text')).toBeTruthy()
    expect(wrapper.find('p.weui-footer__text').text()).toBe('test')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render with links', () => {
    const wrapper = mount(Footer, {
      propsData: {
        text: 'test',
        links: [
          {
            text: 'foo',
            link: 'bar',
          },
          {
            text: 'foo',
            link: 'bar',
          },
        ],
      },
    })

    expect(wrapper.findAll('.weui-footer__link')).toHaveLength(2)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
