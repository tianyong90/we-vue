const wevuePackage = require('./package.json')

const versions = {
  __WE_VUE_VERSION__: wevuePackage.version,
}

module.exports = function (api) {
  const { BABEL_MODULE, NODE_ENV } = process.env
  const useESModules = BABEL_MODULE !== 'commonjs' && NODE_ENV !== 'test'

  api && api.cache(false)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['>0.5%', 'last 2 versions', 'not dead', 'not op_mini all'],
            node: 8,
          },
          modules: useESModules ? false : 'commonjs',
        },
      ],
      [
        '@vue/babel-preset-jsx',
        {
          functional: true,
          injectH: true,
          vModel: true,
          vOn: false, // 暂不使用 vOn:click 语法，因为 eslint 无法解析
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: false,
          useESModules,
        },
      ],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-object-assign',
      [
        'transform-define', versions,
      ],
    ],
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: true,
              },
            },
          ],
        ],
      },
      es5: {
        plugins: [
          './build/babel-transform-scss-paths.js',
        ],
      },
      lib: {
        plugins: [
          './build/babel-transform-scss-paths.js',
        ],

      },
    },
  }
}
