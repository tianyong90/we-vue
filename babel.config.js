module.exports = function (api) {
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
          modules: false,
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
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-object-assign',
    ],
  }
}
