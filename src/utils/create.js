/**
 * Create a component with common options
 */
import install from './install'

export default function (sfc) {
  sfc.name = 'wv-' + sfc.name
  sfc.mixins = sfc.mixins || []
  sfc.components = sfc.components || {}
  sfc.install = sfc.install || install
  sfc.methods = sfc.methods || {}

  return sfc
}
