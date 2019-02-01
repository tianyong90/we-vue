// Utils
import mixins from '../../utils/mixins'

// Mixins
import findParent from '../../mixins/find-parent'

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

    isSelected (): boolean {
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
      this.inited = this.inited || this.isSelected
    },

    title () {
      this.parent.setLine()
    },
  },
})
