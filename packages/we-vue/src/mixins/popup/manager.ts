import Vue from 'vue'
import Modal from './Modal.vue'
import context, { PopupableVue } from './context'

type Config = {
  zIndex?: number
  className: string
  customStyle: object
}

const defaultConfig: Config = {
  className: '',
  customStyle: {},
}

export default {
  open (vm: PopupableVue, config: Config) {
    if (!context.stack.some(item => item.vm === vm)) {
      const el = vm.$el
      const target = el && el.parentNode
            ? el.parentNode
            : document.body
      context.stack.push({ vm, config, target })
      this.update()
    }
  },

  close (vm: PopupableVue): void {
    const { stack } = context

    if (stack.length) {
      if (context.top.vm === vm) {
        stack.pop()
        this.update()
      } else {
        context.stack = stack.filter(item => item.vm !== vm)
      }
    }
  },

  update (): void {
    let { modal } = context

    if (!modal.$el) {
      modal = new (Vue.extend(Modal))({
        el: document.createElement('div'),
      })
      modal.$on('click', this.onClick)
      context.modal = modal
    }

    if (modal.$el.parentNode) {
      modal.visible = false
    }

    if (context.top) {
      const { target, config } = context.top

      target.appendChild(modal.$el)
      Object.assign(modal, defaultConfig, config, {
        visible: true,
      })
    }
  },

  // close popup when click modal && closeOnClickMask is true
  onClick (): void {
    if (context.top) {
      const { vm } = context.top
      vm.$emit('click-mask')
      vm.closeOnClickMask && vm.close()
    }
  },
}
