import { mount } from '@vue/test-utils'
import Touchable from '@/mixins/touchable'

describe('touchable mixin', () => {
  test('default toggle mixin', () => {
    const wrapper = mount({
      mixins: [Touchable],
      render: h => h('div'),
    })

    expect(wrapper.vm.direction).toBe('')
  })
})
