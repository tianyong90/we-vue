import ClickOutside from '@/directives/click-outside'

function bootstrap () {
  let registeredHandler

  const el = document.createElement('div')

  const binding = {
    value: jest.fn(),
  }

  global.document.body.addEventListener = jest.fn((eventName, eventHandler, options) => {
    registeredHandler = eventHandler
  })

  global.document.body.removeEventListener = jest.fn()

  ClickOutside.inserted(el, binding)

  return {
    callback: binding.value,
    el,
    registeredHandler,
  }
}

describe('click-outside', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()

    jest.clearAllMocks()
  })

  test('should register and unregister handler', () => {
    const { registeredHandler, el } = bootstrap()

    expect(global.document.body.addEventListener).toBeCalledWith('click', registeredHandler, true)

    ClickOutside.unbind(el)
    expect(global.document.body.removeEventListener).toBeCalledWith('click', registeredHandler, true)
  })

  test('callback should be called when click outside', () => {
    const { registeredHandler, callback, el } = bootstrap()

    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })

    registeredHandler(event)

    expect(callback).toBeCalled()
  })
})
