import { mount } from 'vue-test-utils'
import InfiniteScrollComponent from '../components/infinite-scroll-component'
import InfiniteScroll from '@/components/infinite-scroll'
import { dragHelper } from '../utils'
import sinon from 'sinon'

describe('infinite-scroll', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  let defaultList = []
  for (let i = 0; i < 10; i++) {
    defaultList.push(i)
  }

  it('create', () => {
    const loadMoreSpy = sinon.spy()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        list: defaultList
        // loadMore: loadMoreSpy
      },
      methods: {
        loadMore: loadMoreSpy
      }
    })

    // wrapper.trigger('touchstart')

    // dragHelper(wrapper, 0, -1000)
    dragHelper(wrapper, 0, -1000)

    expect(loadMoreSpy.called).toBeTruthy()
  })

  it('unbind directive', () => {
    const loadMoreSpy = sinon.spy()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        list: defaultList,
        loadMore: loadMoreSpy
      }
    })

    const eee = wrapper.vm.$el

    InfiniteScroll.unbind(wrapper.element)

    dragHelper(wrapper, 0, -1000)
    dragHelper(wrapper, 0, 1000)

    expect(loadMoreSpy.called).toBeTruthy()
  })
})
