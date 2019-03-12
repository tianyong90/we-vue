type ElementOrWindow = HTMLElement | Window

/**
 * 找到最近的触发滚动事件的元素
 * @param {Element} element
 * @param {Element} rootParent
 * @returns {Element | window}
 */
export function getScrollEventTarget (element: HTMLElement, rootParent: ElementOrWindow = window) {
  let node = element
  while (
    node &&
    node.tagName !== 'HTML' &&
    node.tagName !== 'BODY' &&
    node.nodeType === 1 &&
    node !== rootParent
  ) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return node
    }
    node = <HTMLElement>node.parentNode
  }
  return rootParent
}

// 获取滚动高度
export function getScrollTop (element: ElementOrWindow): number {
  return 'scrollTop' in element ? element.scrollTop : element.pageYOffset
}

// 设置滚动高度
export function setScrollTop (element: ElementOrWindow, value: number) {
  'scrollTop' in element ? (element.scrollTop = value) : element.scrollTo(element.scrollX, value)
}

// 获取元素距离顶部高度
export function getElementTop (element: ElementOrWindow) {
  return (
    (element === window ? 0 : (element as HTMLElement).getBoundingClientRect().top) + getScrollTop(window)
  )
}

export function getVisibleHeight (element: ElementOrWindow) {
  return element === window
    ? element.innerHeight
    : (element as HTMLElement).getBoundingClientRect().height
}
