<template>
  <a :href="href" class="weui-footer__link">{{ text }}</a>
</template>

<script type="text/babel">
export default {
  name: 'wv-footer-link',

  props: {
    text: String,
    to: String
  },

  computed: {
    href () {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to)
        if (!resolved.matched.length) return this.to

        this.$nextTick(() => {
          this.added = true
          this.$el.addEventListener('click', this.handleClick)
        })
        return resolved.path
      }
      return this.to
    }
  },

  methods: {
    handleClick ($event) {
      $event.preventDefault()
      this.$router.push(this.href)
    }
  }
}
</script>
