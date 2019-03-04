declare module 'we-vue/lib' {
  import { Component, DirectiveOptions } from 'vue'
  import { WeVue } from 'we-vue'

  const WeVue: WeVue

  const directives: {
    ClickOutside: DirectiveOptions
    InfiniteScroll: DirectiveOptions
  }

  const WActionsheet: Component
  const WArea: Component
  const WBadge: Component
  const WButton: Component
  const WCell: Component
  const WCellSwipe: Component
  const WCellSwipeButton: Component
  const WChecklist: Component
  const WCircle: Component
  const WDatetimePicker: Component
  const WDialog: Component
  const WFlex: Component
  const WFlexItem: Component
  const WFooter: Component
  const WFormPreview: Component
  const WGrid: Component
  const WGridItem: Component
  const WGroup: Component
  const WHeader: Component
  const WIcon: Component
  const WInput: Component
  const WLoadmore: Component
  const WMediaBox: Component
  const WNumberSpinner: Component
  const WPanel: Component
  const WPicker: Component
  const WPopup: Component
  const WProgress: Component
  const WRadio: Component
  const WSearchBar: Component
  const WSlider: Component
  const WSpinner: Component
  const WSwipe: Component
  const WSwipeItem: Component
  const WSwitch: Component
  const WTab: Component
  const WTabbar: Component
  const WTabbarItem: Component
  const WTabs: Component
  const WTextarea: Component
  const WToast: Component
  const WTopTips: Component

  export default WeVue

  export {
    directives,
    WActionsheet,
    WArea,
    WBadge,
    WButton,
    WCell,
    WCellSwipe,
    WCellSwipeButton,
    WChecklist,
    WCircle,
    WDatetimePicker,
    WDialog,
    WFlex,
    WFlexItem,
    WFooter,
    WFormPreview,
    WGrid,
    WGridItem,
    WGroup,
    WHeader,
    WIcon,
    WInput,
    WLoadmore,
    WMediaBox,
    WNumberSpinner,
    WPanel,
    WPicker,
    WPopup,
    WProgress,
    WRadio,
    WSearchBar,
    WSlider,
    WSpinner,
    WSwipe,
    WSwipeItem,
    WSwitch,
    WTab,
    WTabbar,
    WTabbarItem,
    WTabs,
    WTextarea,
    WToast,
    WTopTips,
  }
}
