module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
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
      require.resolve('expo-router/babel'),
    ],
  }
}
