import { isServer } from './'

export let supportsPassive: boolean = false

if (!isServer) {
  try {
    const opts = {}
    Object.defineProperty(opts, 'passive', {
      get () {
        /* istanbul ignore next */
        supportsPassive = true
      },
    })
    window.addEventListener('test-passive', {} as EventListenerObject, opts)
  } catch (e) {}
}

// type eventHandler = EventListenerOrEventListenerObject | (evt: Event) => void

export function on (target: Element | Window, event: string, handler: EventListenerOrEventListenerObject, passive = false) {
  !isServer &&
    target.addEventListener(
      event,
      handler,
      supportsPassive ? { capture: false, passive } : false
    )
}

export function off (target: Element | Window, event: string, handler: EventListenerOrEventListenerObject) {
  !isServer && target.removeEventListener(event, handler)
}
