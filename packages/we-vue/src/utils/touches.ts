function getTouch (event: TouchEvent): Touch {
  return event.changedTouches[0] || event.touches[0]
}

export { getTouch }
