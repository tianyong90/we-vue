import { getTranslateX, getTranslateY } from '../../../src/utils/transform'

describe('test top-tips api', () => {
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

    el.style.transform = `translate3d(${translateY}px, 0, 0)`
    expect(getTranslateY(el)).toBe(translateY)

    // assign a negtive value
    translateY = -translateY
    el.style.transform = `translate3d(${translateY}px, 0, 0)`
    expect(getTranslateY(el)).toBe(translateY)
  })
})
