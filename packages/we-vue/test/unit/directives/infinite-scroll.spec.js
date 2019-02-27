import { mount } from '@vue/test-utils'
import InfiniteScrollComponent from '../component-mocks/infinite-scroll-component'

describe('infinite-scroll', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', (done) => {
    const loadMoreSpy = jest.fn()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        list: [],
        onLoadMore: loadMoreSpy,
      },
      methods: {
        loadMore: loadMoreSpy,
      },
    })

    setTimeout(() => {
      expect(loadMoreSpy).toHaveBeenCalled()

      done()
    }, 500)
  })

  test('loadMore function', (done) => {
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        onLoadMore: jest.fn(() => {
          wrapper.vm.list = wrapper.vm.list.concat([{ id: 1 }, { id: 2 }, { id: 3 }])
        }),
      },
    })

    setTimeout(() => {
      const item = wrapper.findAll('.list-item')
      expect(item).toHaveLength(3)

      expect(wrapper.vm.onLoadMore).toHaveBeenCalledTimes(1)
      done()
    }, 500)
  })

  test('test disabled', (done) => {
    const loadMoreSpy = jest.fn()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: true,
        list: [],
        onLoadMore: loadMoreSpy,
      },
    })

    setTimeout(() => {
      expect(loadMoreSpy).not.toHaveBeenCalled()
    }, 500)

    setTimeout(() => {
      wrapper.setProps({
        disabled: false,
      })

      setTimeout(() => {
        expect(loadMoreSpy).toHaveBeenCalled()
        done()
      }, 500)
    }, 600)
  })

  test('when scrollTarget is hidden, the loadMore callback should not be called', () => {
    const loadMoreSpy = jest.fn()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        hidden: true,
        list: [],
        onLoadMore: loadMoreSpy,
      },
    })

    expect(loadMoreSpy).not.toHaveBeenCalled()
  })

  test('do not loadmore when mounted, immedialateCheck === false', (done) => {
    const loadMoreSpy = jest.fn()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        immediateCheck: false,
        list: [],
        onLoadMore: loadMoreSpy,
      },
    })

    setTimeout(() => {
      expect(loadMoreSpy).not.toHaveBeenCalled()
      done()
    }, 500)
  })
})
