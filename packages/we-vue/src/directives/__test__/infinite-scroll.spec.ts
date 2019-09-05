import Vue, { CreateElement } from 'vue'
import { mount } from '@vue/test-utils'
import { InfiniteScroll } from '@/directives'

describe('infinite-scroll', () => {
  test('by default, loadMore callback should be called', async () => {
    const spy = jest.fn()

    const testComponent = Vue.component('test', {
      directives: {
        InfiniteScroll,
      },
      render (h: CreateElement) {
        const data = {
          directives: [{
            name: 'infinite-scroll',
            value: spy,
          }],
        }
        return h('div', data)
      },
    })

    const wrapper = mount(testComponent, {})
    await wrapper.vm.$nextTick()
    expect(spy).toHaveBeenCalled()
  })

  test('attrs', async () => {
    const spy = jest.fn()

    const testComponent = Vue.component('test', {
      directives: {
        InfiniteScroll,
      },
      render (h: CreateElement) {
        const data = {
          attrs: {
            'infinite-scroll-disabled': 'true',
            'infinite-scroll-immediate-check': 'true',
            'infinite-scroll-distance': '200',
          },
          directives: [{
            name: 'infinite-scroll',
            value: spy,
          }],
        }
        return h('div', data)
      },
    })

    const wrapper = mount(testComponent, {})
    await wrapper.vm.$nextTick()

    expect(wrapper.element._onInfiniteScroll!.disabled).toBeTruthy()
    expect(wrapper.element._onInfiniteScroll!.distance).toBe(200)
  })

  test('should remove event listeners and delete _onInfiniteScroll on unbind', () => {
    const el = {
      _onInfiniteScroll: {
        target: {
          removeEventListener: jest.fn(),
        },
      },
    }

    InfiniteScroll.unbind(el as any)

    expect(el._onInfiniteScroll).toBeUndefined()
  })
})
