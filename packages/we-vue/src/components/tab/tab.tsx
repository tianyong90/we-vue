// Utils
import mixins from '../../utils/mixins'

// Mixins
import findParent from '../../mixins/find-parent'
import { CreateElement, VNode } from 'vue'

export default mixins(
  findParent,
).extend({
  name: 'wv-tab',

  props: {
    title: String,
    disabled: Boolean,
  },

  data () {
    return {
      inited: false,
    }
  },

  computed: {
    index (): number {
      return this.parent.tabs.indexOf(this)
    },

    selected (): boolean {
      return this.index === this.parent.currentActive
    },
  },

  created () {
    this.findParent('wv-tabs')
  },

  mounted () {
    const { tabs } = this.parent
    const index = this.parent.$slots.default.indexOf(this.$vnode)
    tabs.splice(index === -1 ? tabs.length : index, 0, this)

    if (this.$slots.title) {
      this.parent.renderTitle(this.$refs.title, this.index)
    }
  },

  beforeDestroy () {
    this.parent.tabs.splice(this.index, 1)
  },

  watch: {
    'parent.currentActive' () {
      this.inited = this.inited || this.selected
    },

    title () {
      this.parent.setLine()
    },
  },

  render (h: CreateElement): VNode {
    return (
      <div class="wv-tab__pane" vShow={this.selected || this.parent.animated}>
        { this.inited ? this.$slots.default : h() }
        {
          this.$slots.title
            ? <div ref="title">
              {this.$slots.title}
            </div>
            : h()
        }
      </div>
    )
  },
})
