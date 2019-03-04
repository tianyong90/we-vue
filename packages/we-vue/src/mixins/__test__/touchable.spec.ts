import { mount, Wrapper } from '@vue/test-utils'
import Touchable from '@/mixins/touchable'

describe('touchable mixin', () => {
  type InstanceTouchable = InstanceType<typeof Touchable>

  test('default toggle mixin', () => {
    const wrapper = mount({
      mixins: [Touchable],
      render: h => h('div'),
    }) as Wrapper<InstanceTouchable>

    expect(wrapper.vm.direction).toBe('')
  })
})
