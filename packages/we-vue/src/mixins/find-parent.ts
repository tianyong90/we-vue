import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      parent: {} as Vue,
    }
  },

  methods: {
    findParent (name: string): void {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.name === name) {
          this.parent = parent
          break
        }
        parent = parent.$parent
      }
    },
  },
})
