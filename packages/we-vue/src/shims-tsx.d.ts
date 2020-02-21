import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
    // TODO: 仅为关闭 TSX 中的部分类型检查，有更好方案时去掉这个
    type LibraryManagedAttributes<C, P> = {[name: string]: any}
  }
}
