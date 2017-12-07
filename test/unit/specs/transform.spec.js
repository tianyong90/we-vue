import { getTranslateX, getTranslateY, setTranslateX, setTranslateY } from '@/utils/transform'

describe('utils/transform', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
  })

  afterEach(() => {
    el = null
  })

  it('function getTranslateX', () => {
    // translateX should be zero when the element has no style
    expect(getTranslateX(el)).toBe(0)

    // get a random integer as the translateX
    let translateX = Number.parseInt(Math.random() * 100)

    el.style.transform = `translate3d(${translateX}px, 0, 0)`
    expect(getTranslateX(el)).toBe(translateX)

    // assign a negtive value
    translateX = -translateX
    el.style.transform = `translate3d(${translateX}px, 0, 0)`
    expect(getTranslateX(el)).toBe(translateX)
  })

  it('function getTranslateY', () => {
    // translateY should be zero when the element has no style
    expect(getTranslateY(el)).toBe(0)

    // get a random integer as the translateY
    let translateY = Number.parseInt(Math.random() * 100)

    el.style.transform = `translate3d(0, ${translateY}px, 0)`
    expect(getTranslateY(el)).toBe(translateY)

    // assign a negtive value
    translateY = -translateY
    el.style.transform = `translate3d(0, ${translateY}px, 0)`
    expect(getTranslateY(el)).toBe(translateY)
  })

  it('function setTranslateX', () => {
    // get a random integer as the translateY
    let translateX = Number.parseInt(Math.random() * 100)

    setTranslateX(el, translateX)

    const transformValue = `translate3d(${translateX}px, 0px, 0px)`

    expect(el.style.transform).toBe(transformValue)
    expect(el.style.webkitTransform).toBe(transformValue)
  })

  it('function setTranslateY', () => {
    // get a random integer as the translateY
    let translateY = Number.parseInt(Math.random() * 100)

    setTranslateY(el, translateY)

    const transformValue = `translate3d(0px, ${translateY}px, 0px)`

    expect(el.style.transform).toBe(transformValue)
    expect(el.style.webkitTransform).toBe(transformValue)
  })
})
