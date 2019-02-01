import Vue from 'vue'
import '../../scss/search-bar.scss'
import WVCell from '../cell/index'

import { PropValidator } from 'vue/types/options'

// Utils
import mixins, { ExtractVue } from '../../utils/mixins'

// Mixins
import Validatable from '../../mixins/validatable'

interface options extends Vue {
  $refs: {
    input: HTMLInputElement
  }
}

export default mixins<options &
  ExtractVue<[
   typeof Validatable
  ]>
>(
  Validatable
  /* @vue/component */
).extend({
  name: 'wv-search-bar',

  components: {
    WVCell,
  },

  props: {
    autofocus: Boolean,
    show: Boolean,
    placeholder: {
      type: String,
      default: '搜索',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    resultTextKey: String,
    result: {
      type: Array,
    } as PropValidator<Array<any>>,
  },

  data () {
    return {
      currentValue: this.value,
      isActive: false,
    }
  },

  mounted () {
    if (this.autofocus) {
      this.isActive = true
    }
  },

  methods: {
    textClick (): void {
      // focus the input
      this.$refs.input.focus()
      this.isActive = true
    },

    // 清除输入
    clear (): void {
      this.currentValue = ''
    },

    // 取消搜索
    cancel (): void {
      this.$emit('cancel')
      this.clear()
      this.isActive = false
    },
  },

  watch: {
    currentValue (val): void {
      this.$emit('input', val)
    },

    value (val): void {
      this.currentValue = val
    },
  },
})
