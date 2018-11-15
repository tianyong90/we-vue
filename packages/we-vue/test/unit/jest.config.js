const base = require('../../../../jest.config.js')
const path = require('path')

module.exports = {
  ...base,
  rootDir: path.resolve(__dirname, '../../'),
  name: 'we-vue',
  displayName: 'we-vue'
}
