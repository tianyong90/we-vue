import Vue from 'vue'
import '../../scss/footer.scss'
import FooterLink from './footer-link'

export default Vue.extend({
  name: 'wv-footer',

  components: {
    FooterLink,
  },

  props: {
    text: String,
    links: {
      type: Array,
      default: () => [],
    },
  },
})
