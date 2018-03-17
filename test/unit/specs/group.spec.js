import { shallow } from '@vue/test-utils'
import Group from '@/components/group'

describe('group', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallow(Group, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-group')
    expect(wrapper.contains('.weui-cells')).toBeTruthy()
  })

  test('create with title', () => {
    wrapper = shallow(Group, {
      propsData: {
        title: 'test'
      }
    })

    expect(wrapper.contains('.weui-cells__title')).toBeTruthy()
    expect(wrapper.find('.weui-cells__title').text()).toBe('test')
  })
})
