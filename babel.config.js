module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          "root": ["./"],
          alias: {
            "~": "./src",
            "@proto-native": "./src/packages/proto-native/src",
          },
        },
      ],
    ],
  }
}
