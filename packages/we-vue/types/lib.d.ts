declare module 'we-vue/lib' {
  import { Component, DirectiveOptions } from 'vue'
  import { WeVue } from 'we-vue'

  const WeVue: WeVue

  const directives: {
    ClickOutside: DirectiveOptions
    InfiniteScroll: DirectiveOptions
  }

  export default WeVue
  // TODO
  // export const WvActionsheet: Component
  // export const WvArea: Component
  export const WvBadge: Component
  // export const WvButton: Component
  // export const WvCell: Component
  // export const WvCellSwipe: Component
  // export const WvCellSwipeButton: Component
  // export const WvChecklist: Component
  // export const WvCircle: Component
  // export const WvDatetimePicker: Component
  // export const WvDialog: Component
  // export const WvFlex: Component
  // export const WvFlexItem: Component
  // export const WvFooter: Component
  // export const WvFormPreview: Component
  // export const WvGrid: Component
  // export const WvGridItem: Component
  // export const WvGroup: Component
  // export const WvHeader: Component
  // export const WvIcon: Component
  // export const WvInfiniteScroll: Component
  // export const WvInput: Component
  // export const WvLazyload: Component
  // export const WvLoadmore: Component
  // export const WvMediaBox: Component
  // export const WvNumberSpinner: Component
  // export const WvPanel: Component
  // export const WvPicker: Component
  // export const WvPopup: Component
  // export const WvProgress: Component
  // export const WvRadio: Component
  // export const WvSearchBar: Component
  // export const WvSlider: Component
  // export const WvSpinner: Component
  // export const WvSwipe: Component
  // export const WvSwipeItem: Component
  // export const WvSwitch: Component
  // export const WvTab: Component
  // export const WvTabbar: Component
  // export const WvTabbarItem: Component
  // export const WvTabs: Component
  // export const WvTextarea: Component
  // export const WvToast: Component
  // export const WvTopTips: Component
}
