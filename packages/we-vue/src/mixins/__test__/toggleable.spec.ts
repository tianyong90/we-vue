import { mount, Wrapper } from '@vue/test-utils'
import Tggleable from '@/mixins/toggleable'

describe('toggleable mixin', () => {
  type ToggleableInstance = InstanceType<typeof Tggleable>

  test('default toggle mixin', () => {
    const wrapper = mount({
      mixins: [Tggleable],
      render: h => h('div'),
    }) as Wrapper<ToggleableInstance>

    expect(wrapper.props().value).toBeUndefined()
  })
})
