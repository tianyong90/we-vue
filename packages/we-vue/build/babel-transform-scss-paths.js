const _path = require('path')

module.exports = function ({ types: babelTypes }) {
  return {
    name: 'transform-scss-paths',
    visitor: {
      ImportDeclaration (path, source) {
        if (
          babelTypes.isStringLiteral(path.node.source) &&
          path.node.source.value.endsWith('scss') &&
          path.node.source.value.startsWith('.')
        ) {
          const parsedPath = _path.parse(path.node.source.value)

          path.node.source.value = parsedPath.dir.replace('../..', '../../../src') + '/' + parsedPath.base
        }
      },
    },
  }
}
