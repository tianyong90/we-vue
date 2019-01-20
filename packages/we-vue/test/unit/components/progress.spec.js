import { shallowMount } from '@vue/test-utils'
import Input from '@/components/progress'

describe('progress', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Input, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-progress')
    expect(wrapper.classes()).toContain('weui-progress')
  })

  test('render with percent', () => {
    // 0 到 100 的随机数
    const percent = Math.round(Math.random() * 100)

    wrapper = shallowMount(Input, {
      propsData: {
        percent: percent,
      },
    })

    const innerBarEl = wrapper.find('.weui-progress__inner-bar')
    expect(innerBarEl.element.style.width).toBe(percent + '%')
  })

  test('clearBtn action', () => {
    wrapper = shallowMount(Input, {
      propsData: {
        showClear: true,
      },
    })

    expect(wrapper.contains('i.weui-icon-cancel')).toBeTruthy()

    // click on cancelBtn
    wrapper.find('i.weui-icon-cancel').trigger('click')
    expect(wrapper.emitted().cancel).toBeTruthy()

    wrapper.setProps({
      showClear: false,
    })

    expect(wrapper.contains('weui-progress__opr')).toBeFalsy()
  })
})
