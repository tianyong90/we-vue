// Utils
import mixins from '@/utils/mixins'

import WCell from '../WCell'
import WSwitch from '../WSwitch'

// Mixins
import Toggleable from '@/mixins/toggleable'

export default mixins(
  Toggleable
).extend({
  name: 'w-switch-cell',

  components: {
    WCell,
    WSwitch,
  },

  props: {
    title: String,
    disabled: Boolean,
  },

  render () {
    return (
      <WCell title={this.title}>
        <WSwitch
          slot="ft"
          vModel={this.isActive}
          disabled={this.disabled}
        />
      </WCell>
    )
  },
})
