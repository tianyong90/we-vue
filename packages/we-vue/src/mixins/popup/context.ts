const PopupContext: any = {
  idSeed: 1,
  zIndex: 2000,
  stack: [],

  plusKey (key): number {
    return this[key]++
  },

  get top (): any {
    return this.stack[this.stack.length - 1]
  }
}

export default PopupContext
