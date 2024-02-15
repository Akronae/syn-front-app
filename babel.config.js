module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      './src/packages/proto-native/src/plugins/babel/env-vars.js',
      '@babel/plugin-proposal-logical-assignment-operators',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            src: './src',
            '@proto-native': './src/packages/proto-native/src',
          },
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  }
}
