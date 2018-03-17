import ScrollUtil from '@/utils/scroll'

describe('utils scroll', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.reset()
  })

  test('isAttached method', () => {
    const element = document.createElement('div')

    expect(ScrollUtil.isAttached(element)).toBe(false)

    // append element to document
    document.body.appendChild(element)
    expect(ScrollUtil.isAttached(element)).toBe(true)

    // create a mockElement
    const mockElement = {
      parentNode: {
        nodeType: 11
      }
    }
    expect(ScrollUtil.isAttached(mockElement)).toBe(false)
  })

  test('debounce method', () => {
    // debounce should be defines as functin
    expect(typeof ScrollUtil.debounce).toEqual('function')

    // debounce should return a functin
    expect(typeof ScrollUtil.debounce()).toEqual('function')

    // the callback stub
    const callback = sinon.stub()

    const fn = ScrollUtil.debounce(callback, 100)

    fn() // callback should be called

    setTimeout(fn, 50) // callback should NOT be called
    setTimeout(fn, 151) // callback should be called

    clock.tick(500)

    expect(callback.mock.calls.length).toBe(2)
  })

  test('getScrollEventTarget method', () => {
    const element = document.createElement('div')

    element.style.overflowY = 'scroll'

    // append element to document
    document.body.appendChild(element)
    expect(ScrollUtil.getScrollEventTarget(element)).toBe(element)

    // overflowY is not 'scroll' or 'auto'
    element.style.overflowY = 'hidden'
    expect(ScrollUtil.getScrollEventTarget(element)).toBe(window)
  })

  test('getScrollTop method', () => {
    // the element has scrollTop property
    let element = { scrollTop: 10 }

    expect(ScrollUtil.getScrollTop(element)).toBe(10)

    // the element has no scrollTop property
    element = { pageYOffset: 20 }

    expect(ScrollUtil.getScrollTop(element)).toBe(20)
  })

  test('setScrollTop method', () => {
    // the element has scrollTop property
    let element = { scrollTop: null }

    ScrollUtil.setScrollTop(element, 10)

    expect(element.scrollTop).toBe(10)

    // the element HAS NO scrollTop property
    const scrollToSpy = jest.fn()
    element = {
      scrollX: 0,
      scrollTo: scrollToSpy
    }

    ScrollUtil.setScrollTop(element, 10)

    expect(scrollToSpy.calledWith(0, 10)).toBe(true)
  })

  test('getElementTop method', () => {
    // getElementTop of window
    expect(ScrollUtil.getElementTop(window)).toBe(0)

    const element = {getBoundingClientRect: () => {}}

    const getBoundingClientRectStub = sinon.stub(element, 'getBoundingClientRect')
    getBoundingClientRectStub.returns({ top: 10 })

    const getScrollTopStub = sinon.stub(ScrollUtil, 'getScrollTop')
    getScrollTopStub.withArgs(window).returns(10)

    expect(ScrollUtil.getElementTop(element)).toBe(20)

    getBoundingClientRectStub.restore()
    getScrollTopStub.restore()
  })

  test('getVisibleHeight method', () => {
    // getVisibleHeight of window
    expect(ScrollUtil.getVisibleHeight(window)).toBe(window.innerHeight)

    const element = {getBoundingClientRect: () => {}}

    const getBoundingClientRectStub = sinon.stub(element, 'getBoundingClientRect')
    getBoundingClientRectStub.returns({ height: 10 })

    expect(ScrollUtil.getVisibleHeight(element)).toBe(10)

    getBoundingClientRectStub.restore()
  })
})
