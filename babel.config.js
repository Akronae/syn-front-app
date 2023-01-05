module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-logical-assignment-operators',
      'react-native-reanimated/plugin',
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
    ],
  }
}
