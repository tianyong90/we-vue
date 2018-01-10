import { mount } from 'vue-test-utils'
import InfiniteScrollComponent from '../components/infinite-scroll-component'
import sinon from 'sinon'
import { dragHelper } from '../utils'

describe('infinite-scroll', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', (done) => {
    const loadMoreSpy = sinon.spy()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        list: [],
        onLoadMore: loadMoreSpy
      },
      methods: {
        loadMore: loadMoreSpy
      }
    })

    setTimeout(() => {
      expect(loadMoreSpy.called).toBe(true)

      done()
    }, 500)
  })

  // TODO:
  it('test loadMore function', (done) => {
    const loadMoreSpy = sinon.spy(function () {
      wrapper.vm.list = wrapper.vm.list.concat([{id: 1}, {id: 2}, {id: 3}])
      wrapper.vm.disabled = true
    })
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        list: [{id: 10}],
        onLoadMore: loadMoreSpy
      }
    })

    setTimeout(() => {
      const item = wrapper.findAll('.list-item')
      expect(loadMoreSpy.calledOnce).toBe(true)
      expect(item.length).toEqual(4)

      // TODO: SCROLL
      wrapper.find('.list').element.scrollTo(0, 1000)
      document.body.scrollTop = 1000

      dragHelper(wrapper, 0, -200)
      expect(loadMoreSpy.calledOnce).toBe(true)
      done()
    }, 500)
  })

  it('test disabled', (done) => {
    const loadMoreSpy = sinon.spy()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: true,
        list: [],
        onLoadMore: loadMoreSpy
      }
    })

    setTimeout(() => {
      expect(loadMoreSpy.called).toBe(false)
    }, 500)

    setTimeout(() => {
      wrapper.setProps({
        disabled: false
      })

      setTimeout(() => {
        expect(loadMoreSpy.called).toBe(true)
        done()
      }, 500)
    }, 600)
  })

  it('when scrollTarget is hidden, the loadMore callback should not be called', (done) => {
    const loadMoreSpy = sinon.spy()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        disabled: false,
        hidden: true,
        list: [],
        onLoadMore: loadMoreSpy
      }
    })

    setTimeout(() => {
      expect(loadMoreSpy.called).toBe(false)
      done()
    }, 500)
  })

  it('don not loadmore when mounted, immedialateCheck === false', (done) => {
    const loadMoreSpy = sinon.spy()
    wrapper = mount(InfiniteScrollComponent, {
      attachToDocument: true,
      propsData: {
        immediateCheck: false,
        list: [],
        onLoadMore: loadMoreSpy
      }
    })

    setTimeout(() => {
      expect(loadMoreSpy.called).toBe(false)
      done()
    }, 500)
  })
})
