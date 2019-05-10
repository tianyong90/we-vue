// Utils
import mixins, { ExtractVue } from '../../utils/mixins'

// Mixins
import findParent from '../../mixins/find-parent'
import Vue, { VNode } from 'vue'

interface options extends Vue {
  parent: any
}

export default mixins<options &
  ExtractVue<typeof findParent>
>(
  findParent,
).extend({
  name: 'w-tab',

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
      return this.parent.tabs.indexOf(this) >= 0 ? this.parent.tabs.indexOf(this) : 0
    },

    selected (): boolean {
      return this.index === this.parent.currentActive
    },
  },

  created () {
    this.findParent('w-tabs')
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

  render (): VNode {
    return (
      <div class="wv-tab__pane" vShow={this.selected || this.parent.animated}>
        { this.inited && this.$slots.default }
        {
          this.$slots.title &&
            <div ref="title">
              {this.$slots.title}
            </div>
        }
      </div>
    )
  },
})
