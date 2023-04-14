module.exports = function (api) {
  api.cache(true)

  // expo-router custom root directory https://github.com/expo/router/discussions/259#discussioncomment-5236515
  // Add the line below (this path is relative from `node_modules/expo-router`)
  process.env.EXPO_ROUTER_APP_ROOT = '../../src/app'

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
