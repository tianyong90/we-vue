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
          vOn: false, // ts 不支持 vOn:click 语法（namespaced syntax），同时导致 eslint 也无法解析
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
      ['transform-define', versions],
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
          // 模块路径转换
          ['module-resolver', {
            cwd: 'babelrc',
            root: ['./'],
            alias: {
              '@/scss': './src/scss', // 不可调换顺序
              '@': './es5',
            },
          }],
        ],
      },
      lib: {
        plugins: [
          // 模块路径转换
          ['module-resolver', {
            cwd: 'babelrc',
            root: ['./'],
            alias: {
              '@/scss': './src/scss', // 不可调换顺序
              '@': './lib',
            },
          }],
        ],
      },
    },
  }
}
