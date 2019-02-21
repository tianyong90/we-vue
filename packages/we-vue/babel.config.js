const wevuePackage = require('./package.json')

const versions = {
  __WE_VUE_VERSION__: wevuePackage.version,
  __REQUIRED_VUE__: wevuePackage.peerDependencies.vue
}

module.exports = function(api) {
  const { BABEL_MODULE, NODE_ENV } = process.env
  const useESModules = BABEL_MODULE !== 'commonjs' && NODE_ENV !== 'test'

  api && api.cache(false)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: useESModules ? false : 'commonjs'
        }
      ],
      [
        '@vue/babel-preset-jsx',
        {
          functional: false
        }
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: false,
          useESModules
        }
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-object-assign',
      [
        'transform-define', versions
      ]
    ],
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              loose: true,
              modules: useESModules ? false : 'commonjs'
            }
          ],
          [
            '@vue/babel-preset-jsx',
            {
              functional: false
            }
          ],
          [
            '@babel/preset-typescript',
            // TODO:
            // {
            //   isTSX: true,
            //   jsxPragma: 'h',
            //   allExtensions: true
            // }
          ]
        ],
      },
      es5: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: [">0.5%", "last 2 versions", "not dead", "not op_mini all"],
                node: 8
              }
            }
          ]
        ],
        plugins: [
          './build/babel-transform-scss-paths.js',
        ]
      },
      lib: {
        presets: [
          [
            '@babel/preset-env',
            {
              loose: true,
              modules: false
            }
          ]
        ],
        plugins: [
          './build/babel-transform-scss-paths.js',
        ]

      }
    }
  }
}
