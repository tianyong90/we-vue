module.exports = function (api) {
  const {BABEL_MODULE, NODE_ENV} = process.env
  const useESModules = BABEL_MODULE !== 'commonjs' && NODE_ENV !== 'test'

  api && api.cache(false)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          'modules': useESModules ? false : 'commonjs'
        }
      ]
    ],
    'plugins': [
      // TODO
      'transform-runtime'
    ]
  }
}
