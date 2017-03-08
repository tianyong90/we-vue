<template>
  <a class="weui-cell" :class="{'weui-cell_access': isLink}" :href="href" v-if="to">
    <div class="weui-cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui-cell__bd">
      <slot name="bd"><p>{{ title }}</p></slot>
    </div>
    <div class="weui-cell__ft"><slot name="ft">{{ value }}</slot></div>
  </a>
  <div class="weui-cell" :class="{'weui-cell_access': isLink}" v-else>
    <div class="weui-cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="weui-cell__bd">
      <slot name="bd"><p>{{ title }}</p></slot>
    </div>
    <div class="weui-cell__ft"><slot name="ft">{{ value }}</slot></div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'wv-cell',

  props: {
    title: String,
    value: String,
    label: String,
    isLink: Boolean,
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
