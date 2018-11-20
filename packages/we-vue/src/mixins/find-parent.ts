export default {
  data (): object {
    return {
      parent: null
    }
  },

  methods: {
    findParent (name: string) {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.name === name) {
          this.parent = parent
          break
        }
        parent = parent.$parent
      }
    }
  }
}
