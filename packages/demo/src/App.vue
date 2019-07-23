<template>
  <div id="app">
    <transition :name="$root.transitionName">
      <router-view/>
    </transition>
    <div class="qrcode" v-on-clickaway="clickAway">
      <img
        :src="qrcodeUrl"
        :class="{ 'qrcode-big': bigQrcode }"
        @click="clickQrcode"
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  directives: {
    onClickaway: onClickaway,
  },

  data () {
    return {
      bigQrcode: false,
    }
  },

  computed: {
    ...mapState({
      qrcodeUrl: state => state.qrcodeUrl,
    }),
  },

  methods: {
    clickQrcode () {
      this.bigQrcode = true
    },

    clickAway () {
      this.bigQrcode = false
    },
  },
}
</script>
