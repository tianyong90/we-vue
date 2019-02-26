import { shallowMount } from '@vue/test-utils'
import Group from '../group'

describe('group', () => {
  test('create', () => {
    const wrapper = shallowMount(Group, {
      propsData: {},
    })

    expect(wrapper.contains('.weui-cells')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('create with title', () => {
    const wrapper = shallowMount(Group, {
      propsData: {
        title: 'test',
      },
    })

    expect(wrapper.contains('.weui-cells__title')).toBeTruthy()
    expect(wrapper.find('.weui-cells__title').text()).toBe('test')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
