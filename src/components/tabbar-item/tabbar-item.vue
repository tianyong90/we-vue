<template>
  <a class="weui-tabbar__item" :class="{ 'weui-bar__item_on': isOn }" :href="href">
    <slot name="icon"></slot>
    <p class="weui-tabbar__label">
      <slot></slot>
    </p>
  </a>
</template>

<script type="text/babel">
  export default {
    name: 'wv-tabbar-item',

    props: {
      to: String,
      isOn: Boolean
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
