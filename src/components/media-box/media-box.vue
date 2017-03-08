<template>
  <a :href="href" class="weui-media-box" :class="'weui-media-box_' + type" v-if="type === 'appmsg'">
    <div class="weui-media-box__hd" v-if="type !== 'text'">
      <img class="weui-media-box__thumb" :src="thumb" alt="">
    </div>
    <div class="weui-media-box__bd">
      <h4 class="weui-media-box__title" v-text="title"></h4>
      <p class="weui-media-box__desc" v-text="description"></p>
    </div>
  </a>
  <div class="weui-media-box" :class="'weui-media-box_' + type" v-else>
    <h4 class="weui-media-box__title" v-text="title"></h4>
    <p class="weui-media-box__desc" v-text="description"></p>
    <slot name="box_ft"></slot>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'wv-media-box',

  props: {
    type: {
      type: String,
      default: 'appmsg'
    },
    thumb: String,
    title: String,
    description: String,
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
