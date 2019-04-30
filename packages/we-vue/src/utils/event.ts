import { isServer } from './'

type EventHandler = (event: Event) => void

export let supportsPassive = false

if (!isServer) {
  try {
    const opts = {}
    Object.defineProperty(opts, 'passive', {
      get () {
        /* istanbul ignore next */
        supportsPassive = true
      },
    })
    window.addEventListener('test-passive', null as any, opts)
  } catch (e) {}
}

export function on (target: Element | Window | Document, event: string, handler: EventHandler, passive = false) {
  !isServer &&
    target.addEventListener(
      event,
      handler,
      supportsPassive ? { capture: false, passive } : false
    )
}

export function off (target: Element | Window | Document, event: string, handler: EventHandler) {
  !isServer && target.removeEventListener(event, handler)
}
