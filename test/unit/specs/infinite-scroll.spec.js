import { mount } from 'vue-test-utils'
import InfiniteScrollComponent from '../components/infinite-scroll-component'
import InfiniteScroll from '@/components/infinite-scroll'
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
      },
      methods: {
        loadMore: loadMoreSpy
      }
    })

    wrapper.element.scrollTo(0, 1000)

    expect(loadMoreSpy.called).toBeTruthy()
  })

  // TODO;
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

    InfiniteScroll.unbind(wrapper.find('.list').element)

    expect(loadMoreSpy.called).toBeTruthy()
  })
})
