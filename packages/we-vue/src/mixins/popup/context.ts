import Vue from 'vue'
import { styleObject } from '../../globals'

export interface PopupableVue extends Vue {
  closeOnClickMask: boolean
  close (): void
}

type stackItem = {
  vm: PopupableVue
  config: {
    className: string
    customStyle: object
  }
  target: Element | Node
}

interface ModalInstance extends Vue {
  visible: boolean
  style?: styleObject
}

const PopupContext = {
  zIndex: 2000,
  stack: [] as Array<stackItem>,
  lockCount: 0,
  modal: {} as ModalInstance,

  get top (): stackItem {
    return this.stack[this.stack.length - 1]
  },
}

export default PopupContext
