import { mount, Wrapper } from '@vue/test-utils'
import FindParentMixin from '@/mixins/find-parent'

describe('mixins/find-parent', () => {
  type MockWrapper = Wrapper<InstanceType<typeof FindParentMixin>>

  test('mixed props', () => {
    const wrapper = mount({
      mixins: [FindParentMixin],
      render (h) {
        return h('div', {})
      },
    }, {
      propsData: {},
    }) as MockWrapper

    expect(wrapper.vm.findParent('test')).toBeFalsy()
  })
})
