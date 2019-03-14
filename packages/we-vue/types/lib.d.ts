declare module 'we-vue/lib' {
  import Vue, { DirectiveOptions, PluginFunction } from 'vue'
  import { WeVue } from 'we-vue'
  import { WDialog } from '@components/WDialog'
  import { WToast } from '@components/WToast'
  import { WTopTips } from '@components/WTopTips'

  const WeVue: WeVue

  class WeVueComponent {
    static name: string
    static install: (vue: Vue) => void
  }

  const directives: {
    ClickOutside: DirectiveOptions
    InfiniteScroll: DirectiveOptions
  }

  const plugins: {
    Lazyload: PluginFunction<Vue>
  }

  const WActionsheet: WeVueComponent
  const WAreaPicker: WeVueComponent
  const WBadge: WeVueComponent
  const WButton: WeVueComponent
  const WCell: WeVueComponent
  const WCellSwipe: WeVueComponent
  const WCellSwipeButton: WeVueComponent
  const WChecklist: WeVueComponent
  const WCircle: WeVueComponent
  const WDatetimePicker: WeVueComponent
  const WDialog: WDialog
  const WFlex: WeVueComponent
  const WFlexItem: WeVueComponent
  const WFooter: WeVueComponent
  const WFormPreview: WeVueComponent
  const WGrid: WeVueComponent
  const WGridItem: WeVueComponent
  const WGroup: WeVueComponent
  const WHeader: WeVueComponent
  const WIcon: WeVueComponent
  const WInput: WeVueComponent
  const WLoadmore: WeVueComponent
  const WMediaBox: WeVueComponent
  const WNumberSpinner: WeVueComponent
  const WPanel: WeVueComponent
  const WPicker: WeVueComponent
  const WPopup: WeVueComponent
  const WProgress: WeVueComponent
  const WRadio: WeVueComponent
  const WSearchBar: WeVueComponent
  const WSlider: WeVueComponent
  const WSpinner: WeVueComponent
  const WSwipe: WeVueComponent
  const WSwipeItem: WeVueComponent
  const WSwitch: WeVueComponent
  const WTab: WeVueComponent
  const WTabbar: WeVueComponent
  const WTabbarItem: WeVueComponent
  const WTabs: WeVueComponent
  const WTextarea: WeVueComponent
  const WToast: WToast
  const WTopTips: WTopTips

  export default WeVue

  export {
    directives,
    plugins,
    WActionsheet,
    WAreaPicker,
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
