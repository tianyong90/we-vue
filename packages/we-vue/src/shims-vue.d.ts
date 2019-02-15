import Vue, { CreateElement, VNode } from 'vue'

// interface renderFunWrapper {
//   render: (h: CreateElement) => VNode
// }
//
// declare module '*.haha.vue' {
//   export default renderFunWrapper
// }

declare module '*.vue' {
  export default Vue
}
