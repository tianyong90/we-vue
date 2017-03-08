<template>
	<a :href="href" class="weui-grid">
		<div class="weui-grid__icon">
			<slot name="icon"></slot>
		</div>
		<p class="weui-grid__label"><slot></slot></p>
	</a>
</template>

<script type="text/babel">
export default {
  name: 'wv-grid-item',

  props: {
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
