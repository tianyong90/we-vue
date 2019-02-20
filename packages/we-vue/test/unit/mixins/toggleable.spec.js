import { mount } from '@vue/test-utils'
import Tggleable, { factofy as ToggleFactofy } from '@/mixins/toggleable'

describe('toggleable mixin', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('default toggle mixin', () => {
    wrapper = mount({
      mixins: [Tggleable],
      render: h => h('div'),
    })

    expect(wrapper.props().value).toBe(undefined)
  })
})
